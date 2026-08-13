import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import "./globals.css";
import { SITE } from "@/lib/navigation";
import { Header } from "@/components/ds/Header";
import { Footer } from "@/components/ds/Footer";
import { Analytics } from "@/components/Analytics";

// Self-hosted by Next at build time: no Google round trip, no preconnects, automatic preload,
// and the fallback is size-adjusted so swapping in causes no layout shift. Only the weights
// the design system actually uses are downloaded.
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} — ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: SITE.description,
  openGraph: { siteName: SITE.name, type: "website", locale: "en_NZ" },
  twitter: { card: "summary_large_image" },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ" className={`${inter.variable} ${poppins.variable}`}>
      {/* Caveat (the scrapbook handwriting) is declared in app/page.tsx, not here — only the
          homepage uses it, and next/font scopes the download to the route that imports it. */}
      {/* Impact affiliate network site verification (uses `value`, not `content`, so rendered raw) */}
      <meta {...({ name: "impact-site-verification", value: "f915bff6-435a-455e-975a-148b0bc58b2b" } as Record<string, string>)} />
      {/* Ahrefs Web Analytics (public site key). Rendered as a plain async script so
          React 19 hoists the literal tag into <head> in the server-rendered HTML. */}
      <script
        async
        src="https://analytics.ahrefs.com/analytics.js"
        data-key="ORsSw+/XZNzaHbqdXKhToQ"
      />
      <body>
        <a className="hp-skip" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
