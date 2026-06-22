import type { Metadata } from "next";

export const metadata: Metadata = { title: "Affiliate Disclosure" };

export default function AffiliateDisclosure() {
  return (
    <div className="prose-content mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold">Affiliate Disclosure</h1>
      <p>
        Healthy Pets is reader-supported. Some links on this site are affiliate links, meaning we
        may earn a commission if you click through and make a purchase — at no additional cost to
        you.
      </p>
      <p>
        We participate in New Zealand affiliate programs and networks (including, where applicable,
        Pet Direct, Petstock and others) and may earn from qualifying purchases.
      </p>
      <p>
        Commissions never influence our rankings or recommendations. We recommend products based on
        research and suitability for New Zealand pet owners, and we&apos;ll always tell you when a
        cheaper option is just as good.
      </p>
    </div>
  );
}
