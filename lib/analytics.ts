import posthog from "posthog-js";

// Thin, safe event wrapper. No-ops when PostHog isn't initialised (e.g. the key is
// absent in local dev) so analytics can never throw into the UX. Import `track`
// everywhere instead of calling posthog.capture directly.
export function track(event: string, props?: Record<string, unknown>) {
  try {
    if (typeof window !== "undefined" && posthog.__loaded) {
      posthog.capture(event, props);
    }
  } catch {
    // analytics is best-effort — never let it break a click or render
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
