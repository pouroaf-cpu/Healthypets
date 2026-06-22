import { NextRequest, NextResponse } from "next/server";
import { resolveLink } from "@/lib/affiliate-links";
import { supabase } from "@/lib/supabase";

// Cloaked affiliate redirect: /go/<key> -> logs the click -> 302 to the real URL.
// The affiliate COOKIE is set by the retailer/network on arrival; we only forward + log.
export async function GET(req: NextRequest, ctx: { params: Promise<{ link: string }> }) {
  const { link } = await ctx.params;
  const target = resolveLink(link);

  if (!target) {
    return NextResponse.redirect(new URL("/", req.url), 302);
  }

  // Fire-and-forget click log (don't block the redirect or fail it).
  try {
    const db = supabase();
    if (db) {
      await db.from("hp_clicks").insert({
        link_key: link,
        target_url: target,
        page: req.headers.get("referer") ?? null,
        referrer: req.headers.get("referer") ?? null,
        user_agent: req.headers.get("user-agent") ?? null,
      });
    }
  } catch {
    // never let logging break the user's click-through
  }

  return NextResponse.redirect(target, 302);
}
