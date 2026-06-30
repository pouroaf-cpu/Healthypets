import Link from "next/link";
import { AuthorByline } from "./AuthorByline";
import { ComparisonTable } from "./ComparisonTable";
import { TopPick } from "./TopPick";
import { FAQ } from "./FAQ";
import { CTAButton } from "./CTAButton";
import { Card } from "./Card";
import { Badge } from "./Badge";
import { Button } from "./Button";
import { HPIcon } from "./Icons";
import { EmailCapture } from "./EmailCapture";
import { Figure } from "./Figure";
import { SourcesList } from "./SourcesList";
import { Mdx } from "@/components/Mdx";

function retailerFromKey(key?: string): string | undefined {
  if (!key) return undefined;
  if (key.includes("petdirect")) return "Pet Direct";
  if (key.includes("petstock")) return "Petstock";
  if (key.includes("animates")) return "Animates";
  if (key.includes("vetpost")) return "Vetpost";
  return undefined;
}

const wrap: React.CSSProperties = { maxWidth: 760, margin: "0 auto", padding: "0 20px" };

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 12.5, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--green-dark)", marginBottom: 10 }}>{children}</div>;
}
function H2({ children }: { children: React.ReactNode }) {
  return <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.5rem, 1.2rem + 1.3vw, 2rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>{children}</h2>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PillarTemplate({ doc }: { doc: any }) {
  const products = (doc.products || []).map((p: any) => ({
    product: p.name, bestFor: p.bestFor, protects: p.protects, rating: p.rating,
    linkKey: p.linkKey, retailer: retailerFromKey(p.linkKey), topPick: p.topPick,
  }));
  const premium = (doc.products || []).find((p: any) => p.topPick) || (doc.products || [])[0];
  const budget = (doc.products || []).find((p: any) => !p.topPick) || (doc.products || [])[1];
  const territoryLabel = (doc.territory || "").replace(/-/g, " ");

  return (
    <div>
      {/* HEADER */}
      <section style={{ background: "var(--green-light)" }}>
        <div style={{ ...wrap, padding: "clamp(32px,5vw,56px) 20px clamp(28px,4vw,44px)" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--green-dark)", marginBottom: 16, flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "var(--green-dark)", textDecoration: "none" }}>Home</Link>
            <HPIcon name="arrowRight" size={13} />
            <Link href={`/${doc.territory}`} style={{ color: "var(--ink-soft)", textDecoration: "none" }}>{territoryLabel}</Link>
          </div>
          <Eyebrow>{territoryLabel}</Eyebrow>
          <h1 style={{ margin: "0 0 18px", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2rem, 1.4rem + 2.8vw, 3.1rem)", lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--ink)" }}>{doc.title}</h1>
          <AuthorByline author={doc.author || "The Healthy Pets Team"} role="Healthy Pets" date={doc.updated ? `Updated ${doc.updated}` : undefined} />
        </div>
      </section>

      <article style={{ background: "var(--white)" }}>
        <div style={{ ...wrap, padding: "clamp(32px,5vw,56px) 20px" }}>
          {/* HERO IMAGE */}
          {doc.image && (
            <div style={{ marginTop: -8, marginBottom: 28 }}>
              <Figure id={doc.image} alt={doc.title} aspect="16 / 9" priority rounded />
            </div>
          )}

          {/* QUICK VERDICT */}
          {doc.description && (
            <Card highlight padding="lg" style={{ marginBottom: 28 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}><Badge tone="coral">★ Quick verdict</Badge></div>
              <p style={{ margin: 0, fontSize: 17.5, lineHeight: 1.7, color: "var(--ink)" }}>{doc.description}</p>
              {premium && (
                <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
                  <CTAButton retailer={retailerFromKey(premium.linkKey)} linkKey={premium.linkKey} position="pillar_premium" />
                </div>
              )}
            </Card>
          )}

          {/* WRITER'S BODY (MDX) */}
          <Mdx source={doc.body} />

          {/* COMPARISON */}
          {products.length > 0 && (
            <>
              <H2>The options compared</H2>
              <div style={{ margin: "8px 0 36px" }}><ComparisonTable rows={products} /></div>
            </>
          )}

          {/* TOP PICKS */}
          {(budget || premium) && (
            <>
              <H2>Our budget &amp; premium picks</H2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, margin: "8px 0 40px" }} className="hp-picks">
                {budget && <TopPick kind="budget" product={budget.name} tagline={budget.bestFor} rating={budget.rating} retailer={retailerFromKey(budget.linkKey)} linkKey={budget.linkKey} />}
                {premium && <TopPick kind="premium" product={premium.name} tagline={premium.bestFor} rating={premium.rating} retailer={retailerFromKey(premium.linkKey)} linkKey={premium.linkKey} />}
              </div>
            </>
          )}

          {/* FAQ */}
          {doc.faq?.length > 0 && (
            <>
              <H2>FAQs</H2>
              <div style={{ margin: "8px 0 40px" }}><FAQ items={doc.faq} /></div>
            </>
          )}

          {/* SOURCES */}
          <SourcesList sources={doc.sources} />
        </div>

        {/* EMAIL */}
        <div style={{ ...wrap, padding: "0 20px clamp(40px,5vw,56px)" }}><EmailCapture source={`pillar:${doc.slug}`} /></div>

        {/* RELATED */}
        {doc.related?.length > 0 && (
          <section style={{ background: "var(--section)" }}>
            <div style={{ ...wrap, padding: "clamp(40px,5vw,64px) 20px" }}>
              <Eyebrow>Keep reading</Eyebrow>
              <h2 style={{ margin: "0 0 24px", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.4rem,1.2rem+1vw,1.9rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>Related guides</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="hp-related">
                {doc.related.map((slug: string) => (
                  <Link key={slug} href={`/${doc.territory}/${slug}`} style={{ textDecoration: "none" }}>
                    <Card hoverLift padding="lg" style={{ height: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
                      <span style={{ width: 44, height: 44, borderRadius: "var(--radius-md)", background: "var(--green-light)", display: "grid", placeItems: "center" }}><HPIcon name="leaf" size={22} color="var(--green-primary)" stroke={1.8} /></span>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 16.5, lineHeight: 1.3, color: "var(--ink)", textWrap: "pretty" }}>{slug.replace(/-/g, " ")}</div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <style>{`
        @media (max-width: 720px) {
          .hp-picks { grid-template-columns: 1fr !important; }
          .hp-related { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
