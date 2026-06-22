import type { Metadata } from "next";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import "./globals.css";
import { SITE } from "@/lib/navigation";
import { Header } from "@/components/ds/Header";
import { Footer } from "@/components/ds/Footer";
import { Analytics } from "@/components/Analytics";

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
    <html lang="en-NZ">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <VercelAnalytics />
      </body>
    </html>
  );
}
