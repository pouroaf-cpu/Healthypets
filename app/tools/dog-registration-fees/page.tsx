import type { Metadata } from "next";
import Link from "next/link";
import { DogRegFeeCalculator } from "@/components/tools/DogRegFeeCalculator";
import { CouncilFeeTable } from "@/components/tools/CouncilFeeTable";
import { META, MENACING_BREEDS, councilFeeRows } from "@/lib/dog-reg-fees";

const CAVEATS: { t: string; d: string }[] = [
  { t: "Guide, hearing & disability assist dogs are free", d: "Registration is free for certified assist dogs everywhere, by law (Dog Control Act 1996)." },
  { t: "Desexed discounts need proof", d: "Most councils require a vet certificate confirming your dog is neutered/spayed to get the desexed rate." },
  { t: "“Working dog” is a legal definition", d: "It means a dog kept mainly for herding/droving stock or hunting on rural land — a pet on a lifestyle block usually doesn't qualify." },
  { t: "Responsible-owner discounts must be applied for", d: "Schemes like Auckland's RDOL or a council's “good owner” rate need you to qualify (no infringements, secure property, microchipped, etc.)." },
  { t: "Fees change every 1 July", d: `Figures shown are the ${META.year} year. The registration year runs ${META.yearRuns}; we re-verify all councils each July.` },
  { t: "Late = penalty", d: "Pay after your council's due date and a penalty (often +50%) applies. New puppies are usually charged pro-rata from 3 months old." },
  { t: "This is a guide, not the invoice", d: "Always confirm the exact amount on your council's website (linked in your result) before paying. Microchipping is a separate legal requirement and cost." },
];

export const metadata: Metadata = {
  title: "Dog Registration Fee Calculator (NZ) — by Council",
  description:
    "Work out your NZ dog registration fee. Pick your council, tell us about your dog (desexed, working, assist) and see the fee payable today, the due date, and any extra council charges.",
  alternates: { canonical: "/tools/dog-registration-fees" },
};

const wrap: React.CSSProperties = { maxWidth: 820, margin: "0 auto", padding: "0 20px" };

export default function DogRegFeesPage() {
  const feeRows = councilFeeRows();
  const dataset = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: `New Zealand dog registration fees by council (${META.year})`,
    description: `On-time dog registration fees for ${feeRows.length} of 67 New Zealand territorial authorities for the ${META.year} registration year (${META.yearRuns}). Includes the standard (entire) fee, desexed and working-dog rates, council type, and the registration due date. NZD, GST inclusive.`,
    url: "https://www.healthypets.co.nz/tools/dog-registration-fees",
    keywords: ["dog registration fees", "New Zealand", "council", "Dog Control Act 1996", "dog registration cost NZ"],
    temporalCoverage: "2026-07-01/2027-06-30",
    isAccessibleForFree: true,
    creator: { "@type": "Organization", name: "Healthy Pets", url: "https://www.healthypets.co.nz" },
    variableMeasured: [
      "Standard (entire) dog registration fee",
      "Desexed dog registration fee",
      "Working dog registration fee",
      "Registration due date",
    ],
  };
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dataset) }} />
      <section style={{ background: "var(--green-light)" }}>
        <div style={{ ...wrap, padding: "clamp(36px,6vw,64px) 20px clamp(28px,4vw,40px)" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--green-dark)", marginBottom: 10 }}>
            Free tool
          </div>
          <h1 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2rem,1.5rem+2.4vw,3rem)", letterSpacing: "-0.02em", color: "var(--ink)" }}>
            NZ Dog Registration Fee Calculator
          </h1>
          <p style={{ margin: "14px 0 0", maxWidth: 620, fontSize: 17, lineHeight: 1.6, color: "var(--ink-soft)" }}>
            Dog registration fees are set by each council, so they vary a lot around New Zealand —
            and desexed, working and assist dogs are charged differently. Pick your council and dog
            below to see the fee payable today, your due date, and any extras.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--white)" }}>
        <div style={{ ...wrap, padding: "clamp(28px,4vw,44px) 20px clamp(40px,6vw,64px)" }}>
          <DogRegFeeCalculator />

          {/* ALL-COUNCIL FEE COMPARISON — full dataset, server-rendered (crawlable) + interactive */}
          {(() => {
            const rows = councilFeeRows();
            return (
              <div id="all-councils" style={{ marginTop: 44, scrollMarginTop: 20 }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, color: "var(--ink)", margin: "0 0 6px" }}>
                  Dog registration fees by council <span style={{ color: "var(--green-dark)" }}>({rows.length} of 67)</span>
                </h2>
                <p style={{ margin: "0 0 16px", fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-muted)" }}>
                  Every New Zealand council&apos;s {META.year} dog registration fees in one table — search, sort and compare.
                  Figures are the on-time / early-payment rate (NZD, GST incl.), last verified {META.lastBulkVerified}.
                </p>
                <CouncilFeeTable rows={rows} />
              </div>
            );
          })()}

          {/* CAVEATS */}
          <div style={{ marginTop: 36 }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "var(--ink)", margin: "0 0 14px" }}>
              Good to know
            </h2>
            <div style={{ display: "grid", gap: 12 }}>
              {CAVEATS.map((c) => (
                <div key={c.t} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ flex: "none", marginTop: 2, width: 22, height: 22, borderRadius: "50%", background: "var(--green-light)", display: "grid", placeItems: "center", color: "var(--green-primary)", fontSize: 13, fontWeight: 700 }}>!</span>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 15.5, color: "var(--ink)" }}>{c.t}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.6, color: "var(--ink-soft)" }}>{c.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dangerous & menacing breeds — national, not per-council. Expandable info box. */}
          <details style={{ marginTop: 36, background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}>
            <summary style={{ cursor: "pointer", listStyle: "none", padding: "14px 18px", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 16, color: "var(--ink)", display: "flex", alignItems: "center", gap: 10 }}>
              <span aria-hidden="true" style={{ flex: "none", width: 22, height: 22, borderRadius: "50%", background: "var(--green-primary)", color: "#fff", display: "grid", placeItems: "center", fontSize: 13, fontWeight: 700 }}>i</span>
              Dangerous &amp; menacing breeds — what NZ law says
              <span aria-hidden="true" style={{ marginLeft: "auto", color: "var(--ink-muted)", fontSize: 13 }}>tap to expand</span>
            </summary>
            <div style={{ padding: "0 18px 16px", fontSize: 14.5, lineHeight: 1.7, color: "var(--ink-soft)" }}>
              <p style={{ margin: "0 0 10px" }}>
                Unlike the fees, the <strong>breed list is national, not set by councils.</strong> Under the Dog Control Act 1996,
                dogs of these breeds/types are <strong>&ldquo;menacing by breed&rdquo;</strong> everywhere in NZ — they must be
                muzzled in public and neutered:
              </p>
              <ul style={{ margin: "0 0 10px", paddingLeft: 20 }}>
                {MENACING_BREEDS.map((b) => <li key={b} style={{ marginBottom: 2 }}>{b}</li>)}
              </ul>
              <p style={{ margin: 0 }}>
                Importing these breeds is banned. Separately, a council can classify any individual dog as
                <strong> menacing or dangerous by behaviour</strong> (e.g. after an attack) — that&apos;s case-by-case, not
                breed-based. What <em>does</em> vary between councils is the <strong>dangerous-dog registration fee</strong>,
                not the breed list.
              </p>
              <p style={{ margin: "10px 0 0", fontWeight: 600, color: "var(--ink)" }}>
                No NZ council can ban a breed — these national rules apply everywhere.
              </p>
            </div>
          </details>

          <div style={{ marginTop: 36, fontSize: 14.5, lineHeight: 1.7, color: "var(--ink-soft)" }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "var(--ink)", margin: "0 0 8px" }}>
              How dog registration fees work in NZ
            </h2>
            <p style={{ margin: "0 0 10px" }}>
              Every dog over three months old must be registered with its local council under the
              Dog Control Act 1996. The registration year runs <strong>{META.yearRuns}</strong>, with
              invoices going out around 1 July and most councils applying a penalty (often +50%) if
              you pay late. Desexing your dog, qualifying for a council&apos;s responsible-owner scheme,
              or registering a working dog can all reduce the fee.
            </p>
            <p style={{ margin: 0, color: "var(--ink-muted)", fontSize: 13.5 }}>
              Fees shown are for the {META.year} registration year (last bulk-verified {META.lastBulkVerified}).
              This tool is a guide only — always confirm the exact amount with your council before paying.
            </p>
          </div>

          {/* RELATED — internal links to dog guides */}
          <div style={{ marginTop: 36 }}>
            <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "var(--ink)", margin: "0 0 14px" }}>
              Sorted your rego? Next for your dog
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12 }} className="hp-related-tool">
              {[
                { t: "Best flea & tick treatments for dogs (NZ)", href: "/flea-and-worming/best-dog-flea-treatment-nz" },
                { t: "Dog worming: what, when & how (NZ)", href: "/flea-and-worming/dog-flea-and-worm-treatment-nz" },
                { t: "Best dog food in NZ, compared", href: "/food/best-dog-food-nz" },
                { t: "All our dog health guides", href: "/dogs" },
              ].map((r) => (
                <Link key={r.href} href={r.href} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
                  padding: "14px 16px", background: "var(--white)", border: "1px solid var(--border)",
                  borderRadius: "var(--radius-md)", textDecoration: "none",
                  fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 15, color: "var(--ink)",
                }}>
                  {r.t} <span aria-hidden="true" style={{ color: "var(--green-primary)" }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
      <style>{`@media (max-width: 560px) { .hp-related-tool { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
