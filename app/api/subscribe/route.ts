import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Email capture -> Supabase (hp_subscribers) + MailerLite (when MAILERLITE_API_KEY set).
export async function POST(req: NextRequest) {
  let email = "";
  let source = "";
  let petType = "";
  try {
    const body = await req.json();
    email = (body.email || "").trim().toLowerCase();
    source = body.source || "";
    petType = body.petType || "";
  } catch {
    return NextResponse.json({ ok: false, error: "bad request" }, { status: 400 });
  }

  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid email" }, { status: 400 });
  }

  // Store in Supabase (idempotent on email).
  const db = supabase();
  if (db) {
    await db.from("hp_subscribers").upsert(
      { email, source, pet_type: petType || null },
      { onConflict: "email" }
    );
  }

  // Optional: push to MailerLite group for the re-treat reminder automation.
  const ml = process.env.MAILERLITE_API_KEY;
  if (ml) {
    try {
      await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${ml}` },
        body: JSON.stringify({
          email,
          ...(process.env.MAILERLITE_GROUP_ID
            ? { groups: [process.env.MAILERLITE_GROUP_ID] }
            : {}),
        }),
      });
    } catch {
      // Supabase already has it; don't fail the signup on MailerLite hiccups.
    }
  }

  return NextResponse.json({ ok: true });
}
