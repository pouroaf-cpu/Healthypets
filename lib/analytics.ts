import posthog from "posthog-js";

// Events fired before posthog.init() has run (e.g. a component's mount effect that
// races ahead of <Analytics/>'s init effect) are buffered here and replayed once the
// SDK is ready, so mount-time events like comparison_table_viewed aren't dropped.
const pending: Array<[string, Record<string, unknown> | undefined]> = [];
let draining = false;

function drain() {
  if (typeof window === "undefined") return;
  if (posthog.__loaded) {
    while (pending.length) {
      const [event, props] = pending.shift()!;
      try {
        posthog.capture(event, props);
      } catch {
        /* best-effort */
      }
    }
  } else if (pending.length && !draining) {
    // posthog.init() runs in <Analytics/>'s effect moments later — poll briefly.
    draining = true;
    setTimeout(() => {
      draining = false;
      drain();
    }, 300);
  }
}

// Thin, safe event wrapper. Buffers until PostHog is ready and no-ops on the server,
// so analytics can never throw into the UX. Import `track` everywhere instead of
// calling posthog.capture directly.
export function track(event: string, props?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  try {
    if (posthog.__loaded) {
      posthog.capture(event, props);
    } else {
      pending.push([event, props]);
      drain();
    }
  } catch {
    // analytics is best-effort — never let it break the UX
  }
}

// Normalised retailer slug derived from an affiliate link key
// (e.g. "petdirect-nexgard-spectra" -> "petdirect"). Used as an event property so
// clicks can be broken down by retailer in PostHog. Mirrors lib/affiliate-links.ts.
export function retailerFromKey(key?: string): string | undefined {
  if (!key) return undefined;
  if (key.includes("petdirect")) return "petdirect";
  if (key.includes("petstock")) return "petstock";
  if (key.includes("animates")) return "animates";
  if (key.includes("vetpost")) return "vetpost";
  return undefined;
}

// Current page path, safe on the server (returns undefined during SSR).
export function pagePath(): string | undefined {
  return typeof window !== "undefined" ? window.location.pathname : undefined;
}
