import Link from "next/link";
import type { Metadata } from "next";
import { TERRITORIES } from "@/lib/navigation";
import { getAllDocs, getDocsByTerritory, getDocsBySpecies } from "@/lib/content";
import { Card } from "@/components/ds/Card";
import { Badge } from "@/components/ds/Badge";
import { HPIcon, PetImage } from "@/components/ds/Icons";
import { EmailCapture } from "@/components/ds/EmailCapture";
import { getImage } from "@/lib/images";
import Image from "next/image";

const EXTRA = ["guides", "cats", "dogs"];

const HUB_LABELS: Record<string, string> = {
  guides: "All Guides",
  cats: "Cat Health",
  dogs: "Dog Health",
};

export function generateStaticParams() {
  return [...TERRITORIES.map((t) => t.href.replace("/", "")), ...EXTRA].map((territory) => ({ territory }));
}

function label(territory: string) {
  return (
    HUB_LABELS[territory] ??
    TERRITORIES.find((t) => t.href === `/${territory}`)?.label ??
    territory.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export async function generateMetadata({ params }: { params: Promise<{ territory: string }> }): Promise<Metadata> {
  const { territory } = await params;
  const name = label(territory);
  return { title: `${name} (NZ)`, description: `Honest NZ guides and product comparisons for ${name.toLowerCase()}.` };
}

export default async function TerritoryPage({ params }: { params: Promise<{ territory: string }> }) {
  const { territory } = await params;
  const docs =
    territory === "guides"
      ? getAllDocs()
      : territory === "cats"
        ? getDocsBySpecies("cat")
        : territory === "dogs"
          ? getDocsBySpecies("dog")
          : getDocsByTerritory(territory);
  const name = label(territory);

  return (
    <div>
      <section style={{ background: "var(--green-light)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "clamp(40px,6vw,72px) 20px" }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--green-dark)", marginBottom: 10 }}>Healthy Pets</div>
          <h1 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2rem,1.5rem+2.4vw,3rem)", letterSpacing: "-0.02em", color: "var(--ink)" }}>{name}</h1>
          <p style={{ margin: "14px 0 0", maxWidth: 560, fontSize: 17, lineHeight: 1.6, color: "var(--ink-soft)" }}>
            Independent, vet-informed NZ advice and the best buys — honest picks, real NZ$ prices.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--white)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "clamp(40px,6vw,72px) 20px" }}>
          {docs.length === 0 ? (
            <Card padding="xl" style={{ textAlign: "center", color: "var(--ink-muted)" }}>
              <div style={{ marginBottom: 8 }}><HPIcon name="leaf" size={32} color="var(--green-primary)" /></div>
              <p style={{ margin: 0, fontSize: 16 }}>Guides for {name.toLowerCase()} are coming soon. Grab the reminder calendar below and we&apos;ll let you know.</p>
            </Card>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="hp-hub-grid">
              {docs.map((d) => {
                const hero = d.image ? getImage(d.image) : undefined;
                return (
                <Link key={d.slug} href={`/${d.territory}/${d.slug}`} style={{ textDecoration: "none" }}>
                  <Card hoverLift padding="none" style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                    <div style={{ position: "relative", aspectRatio: "16 / 10" }}>
                      {hero ? (
                        <Image src={hero.src} alt={hero.alt || d.title} fill sizes="(max-width:560px) 100vw, (max-width:900px) 50vw, 360px" style={{ objectFit: "cover" }} />
                      ) : (
                        <PetImage label="" tone="green" icon="smile" radius="0" />
                      )}
                    </div>
                    <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                      <div>{d.type === "pillar" ? <Badge tone="light">Buyer&apos;s guide</Badge> : <Badge tone="neutral">Guide</Badge>}</div>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 16.5, lineHeight: 1.3, color: "var(--ink)", textWrap: "pretty" }}>{d.title}</div>
                      <div style={{ marginTop: "auto", paddingTop: 6, fontSize: 13, color: "var(--ink-muted)", display: "flex", alignItems: "center", gap: 6 }}><HPIcon name="check" size={14} color="var(--green-primary)" /> Vet-reviewed</div>
                    </div>
                  </Card>
                </Link>
                );
              })}
            </div>
          )}

          <div style={{ marginTop: 48, maxWidth: 640, marginInline: "auto" }}><EmailCapture source={`territory:${territory}`} /></div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) { .hp-hub-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 560px) { .hp-hub-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
