import type { Metadata } from "next";

export const metadata: Metadata = { title: "Editorial Policy" };

export default function EditorialPolicy() {
  return (
    <div className="prose-content mx-auto max-w-3xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold">Editorial Policy</h1>
      <p>How we research, write and review content at Healthy Pets.</p>
      <h2>Independent recommendations</h2>
      <p>
        Our picks are based on research, product suitability for NZ pets, and real-world value —
        never on commission rates. We recommend budget options when they&apos;re the smart choice.
      </p>
      <h2>Vet-informed, not vet advice</h2>
      <p>
        Health content is researched against reputable sources and, where indicated, reviewed for
        accuracy. It is general information only — we always direct readers to their vet for
        diagnosis, medication and dosing.
      </p>
      <h2>Accuracy &amp; updates</h2>
      <p>
        We keep guides current, show when they were last updated, and correct errors promptly. We
        don&apos;t publish prices on-page — you&apos;ll always see the live price at the retailer.
      </p>
    </div>
  );
}
