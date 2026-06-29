import type { Metadata } from "next";
import Link from "next/link";
import { DogRegFeeCalculator } from "@/components/tools/DogRegFeeCalculator";
import { META, listCouncils } from "@/lib/dog-reg-fees";

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
  return (
    <div>
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

          {/* LIVE COUNCIL COVERAGE — driven by the dataset, grows as councils are verified */}
          {(() => {
            const councils = listCouncils();
            return (
              <div style={{ marginTop: 36 }}>
                <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "var(--ink)", margin: "0 0 6px" }}>
                  Councils with live data <span style={{ color: "var(--green-dark)" }}>({councils.length} of 67)</span>
                </h2>
                <p style={{ margin: "0 0 14px", fontSize: 14, color: "var(--ink-muted)" }}>
                  We&apos;re verifying every NZ council and adding them here. This list updates as each one is checked — don&apos;t see yours yet? It&apos;s coming.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {councils.map((c) => (
                    <span key={c.slug} style={{
                      display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 12px",
                      background: "var(--green-light)", color: "var(--green-dark)", borderRadius: "var(--radius-pill)",
                      fontSize: 14, fontWeight: 600, fontFamily: "var(--font-heading)",
                    }}>
                      <span aria-hidden="true" style={{ color: "var(--green-primary)" }}>✓</span> {c.name}
                    </span>
                  ))}
                </div>
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
