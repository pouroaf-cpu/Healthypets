"use client";

import Script from "next/script";
import { useEffect } from "react";
import posthog from "posthog-js";

// All env-driven — each tool activates only when its key is present.
// GA4: NEXT_PUBLIC_GA_ID · PostHog: NEXT_PUBLIC_POSTHOG_KEY (+ HOST) · Vercel: <Analytics/> in layout.
export function Analytics() {
  const ga = process.env.NEXT_PUBLIC_GA_ID;
  const phKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  const phHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

  useEffect(() => {
    if (phKey && !posthog.__loaded) {
      posthog.init(phKey, {
        api_host: phHost,
        // App-Router-aware: capture pageviews on History API navigations, not just first load.
        capture_pageview: "history_change",
        capture_pageleave: true,
        autocapture: true, // element clicks ($autocapture) + rageclicks ($rageclick)
        capture_dead_clicks: true, // clicks that hit nothing — UX dead-ends
        capture_performance: { web_vitals: true }, // Core Web Vitals
      });
    }
  }, [phKey, phHost]);

  if (!ga) return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
      <Script id="ga4" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
          gtag('js',new Date());gtag('config','${ga}');`}
      </Script>
    </>
  );
}
