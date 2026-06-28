import Link from "next/link";
import { AuthorByline } from "./AuthorByline";
import { FAQ } from "./FAQ";
import { Card } from "./Card";
import { HPIcon } from "./Icons";
import { EmailCapture } from "./EmailCapture";
import { Figure } from "./Figure";
import { SourcesList } from "./SourcesList";
import { Mdx } from "@/components/Mdx";

const wrap: React.CSSProperties = { maxWidth: 720, margin: "0 auto", padding: "0 20px" };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ArticleTemplate({ doc }: { doc: any }) {
  const territoryLabel = (doc.territory || "").replace(/-/g, " ");
  return (
    <div>
      <section style={{ background: "var(--green-light)" }}>
        <div style={{ ...wrap, padding: "clamp(28px,4vw,48px) 20px clamp(24px,3vw,36px)" }}>
          <div style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13, color: "var(--green-dark)", marginBottom: 14, flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "var(--green-dark)", textDecoration: "none" }}>Home</Link>
            <HPIcon name="arrowRight" size={13} />
            <Link href={`/${doc.territory}`} style={{ color: "var(--ink-soft)", textDecoration: "none" }}>{territoryLabel}</Link>
          </div>
          <h1 style={{ margin: "0 0 16px", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem, 1.3rem + 2.2vw, 2.7rem)", lineHeight: 1.12, letterSpacing: "-0.02em", color: "var(--ink)" }}>{doc.title}</h1>
          <AuthorByline author={doc.author || "The Healthy Pets Team"} role="Healthy Pets" date={doc.updated ? `Updated ${doc.updated}` : undefined} />
        </div>
      </section>

      <article style={{ background: "var(--white)" }}>
        <div style={{ ...wrap, padding: "clamp(28px,4vw,48px) 20px" }}>
          {doc.image && (
            <div style={{ marginTop: -4, marginBottom: 24 }}>
              <Figure id={doc.image} alt={doc.title} aspect="16 / 9" priority rounded />
            </div>
          )}
          <Mdx source={doc.body} />

          {/* Link up to the pillar / territory */}
          <Card padding="lg" style={{ display: "flex", gap: 14, alignItems: "center", background: "var(--green-light)", border: "none", margin: "28px 0" }}>
            <span style={{ flex: "none" }}><HPIcon name="arrowRight" size={22} color="var(--green-primary)" /></span>
            <div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 16, color: "var(--ink)" }}>Looking to buy?</div>
              <Link href={`/${doc.territory}`} style={{ color: "var(--green-dark)", fontWeight: 600, textDecoration: "underline", fontSize: 15 }}>See all our {territoryLabel} guides &amp; picks →</Link>
            </div>
          </Card>

          {doc.faq?.length > 0 && (
            <div style={{ margin: "8px 0 32px" }}>
              <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.4rem,1.2rem+1vw,1.8rem)", color: "var(--ink)" }}>FAQs</h2>
              <FAQ items={doc.faq} />
            </div>
          )}

          <SourcesList sources={doc.sources} />
        </div>

        <div style={{ ...wrap, padding: "0 20px clamp(40px,5vw,56px)" }}><EmailCapture source={`article:${doc.slug}`} /></div>
      </article>
    </div>
  );
}
