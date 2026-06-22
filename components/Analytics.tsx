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
    if (phKey) {
      posthog.init(phKey, { api_host: phHost, capture_pageview: true });
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
