import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Privacy() {
  return (
    <div className="prose-content mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold">Privacy Policy</h1>
      <p>
        This policy explains how Healthy Pets handles your information, in line with the New Zealand
        Privacy Act 2020.
      </p>
      <h2>What we collect</h2>
      <p>
        If you join our email list we store your email address to send the reminder calendar and
        related updates. We use privacy-respecting analytics to understand how the site is used.
      </p>
      <h2>Affiliate links &amp; cookies</h2>
      <p>
        When you click an outbound product link, the retailer or affiliate network may set a cookie
        to attribute any purchase. We don&apos;t control those cookies — see the relevant
        retailer&apos;s privacy policy.
      </p>
      <h2>Your choices</h2>
      <p>
        You can unsubscribe from emails at any time. To request access to or deletion of your data,
        contact us via the <a href="/contact">contact page</a>.
      </p>
      <p className="text-sm text-ink/60">This is a starter policy — review with appropriate advice before launch.</p>
    </div>
  );
}
