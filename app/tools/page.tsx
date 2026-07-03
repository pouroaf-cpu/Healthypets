import type { Metadata } from "next";
import Link from "next/link";
import { TOOLS } from "@/lib/navigation";
import { Card } from "@/components/ds/Card";

export const metadata: Metadata = {
  title: "Free Pet Tools & Calculators (NZ)",
  description:
    "Free tools for New Zealand cat and dog owners — including the NZ Dog Registration Fee Calculator. Quick, practical, and built around real NZ council and product data.",
  alternates: { canonical: "/tools" },
};

const wrap: React.CSSProperties = { maxWidth: "var(--container)", margin: "0 auto", padding: "0 20px" };

export default function ToolsHubPage() {
  return (
    <div>
      <section style={{ background: "var(--green-light)" }}>
        <div style={{ ...wrap, padding: "clamp(40px,6vw,72px) 20px clamp(28px,4vw,40px)" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--green-dark)", marginBottom: 10 }}>
            Free tools
          </div>
          <h1 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2rem,1.5rem+2.4vw,3rem)", letterSpacing: "-0.02em", color: "var(--ink)" }}>
            Pet tools &amp; calculators
          </h1>
          <p style={{ margin: "14px 0 0", maxWidth: 600, fontSize: 17, lineHeight: 1.6, color: "var(--ink-soft)" }}>
            Free, practical tools for New Zealand cat and dog owners — built around real NZ council
            and product data. More on the way.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--white)" }}>
        <div style={{ ...wrap, padding: "clamp(32px,5vw,56px) 20px clamp(48px,7vw,80px)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }} className="hp-tools-grid">
            {TOOLS.map((t) => (
              <Link key={t.href} href={t.href} style={{ textDecoration: "none" }}>
                <Card hoverLift padding="lg" style={{ height: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--green-dark)" }}>
                    Free tool
                  </div>
                  <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, lineHeight: 1.25, color: "var(--ink)", textWrap: "pretty" }}>
                    {t.label}
                  </h2>
                  <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "var(--ink-soft)" }}>{t.blurb}</p>
                  <span style={{ marginTop: "auto", paddingTop: 8, display: "inline-flex", alignItems: "center", gap: 8, color: "var(--green-primary)", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 15 }}>
                    Open the tool <span aria-hidden="true">→</span>
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <style>{`@media (max-width: 640px) { .hp-tools-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}
