import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { Badge } from "@/components/ds/Badge";
import { TrustStrip } from "@/components/ds/TrustStrip";
import { EmailCapture } from "@/components/ds/EmailCapture";
import { HPIcon, PetImage } from "@/components/ds/Icons";

const TERRITORIES = [
  { icon: "bug", name: "Flea & Worming", blurb: "Spot-ons, tablets & combos", href: "/flea-and-worming" },
  { icon: "bone", name: "Joint & Mobility", blurb: "Supplements for stiff legs", href: "/joint-and-mobility" },
  { icon: "droplet", name: "Gut Health", blurb: "Probiotics & sensitive tummies", href: "/gut-health" },
  { icon: "sparkles", name: "Skin & Coat", blurb: "Itch relief & shiny fur", href: "/skin-and-coat" },
  { icon: "tooth", name: "Dental Care", blurb: "Chews, gels & fresh breath", href: "/dental" },
  { icon: "apple", name: "Food & Nutrition", blurb: "What to feed, how much", href: "/food" },
];

const PILLAR = "/flea-and-worming/best-cat-flea-treatment-nz";
const GUIDES = [
  { kicker: "Flea & Worming", title: "Best Flea Treatments for Cats (NZ 2026)", read: "8 min", tone: "green", icon: "smile", href: PILLAR },
  { kicker: "Joint & Mobility", title: "Best Joint Supplements for Senior Dogs", read: "7 min", tone: "sky", icon: "bone", href: "/guides" },
  { kicker: "Nutrition", title: "How Much Should I Feed My Cat? A Kiwi Guide", read: "6 min", tone: "sand", icon: "apple", href: "/guides" },
  { kicker: "Skin & Coat", title: "Stop the Itch: Treating Allergies in Dogs", read: "9 min", tone: "blush", icon: "sparkles", href: "/guides" },
];

function Section({ children, tint, style = {} }: { children: React.ReactNode; tint?: boolean; style?: React.CSSProperties }) {
  return (
    <section style={{ background: tint ? "var(--section)" : "var(--white)", ...style }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "clamp(48px, 7vw, 88px) 20px" }}>{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--green-dark)", marginBottom: 12 }}>{children}</div>;
}

export default function Home() {
  return (
    <div>
      {/* HERO */}
      <section style={{ background: "linear-gradient(180deg, var(--green-light) 0%, var(--white) 100%)" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "clamp(40px, 6vw, 80px) 20px clamp(48px, 6vw, 80px)", display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 48, alignItems: "center" }} className="hp-hero">
          <div>
            <Badge tone="light" style={{ marginBottom: 18 }}>🇳🇿 Made for Kiwi pet owners</Badge>
            <h1 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2.1rem, 1.4rem + 3vw, 3.4rem)", lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--ink)" }}>
              Honest pet-health advice for Kiwi cat &amp; dog owners
            </h1>
            <p style={{ margin: "18px 0 28px", fontSize: "clamp(1.05rem, 1rem + 0.4vw, 1.25rem)", lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 520 }}>
              We test the claims, check the prices at NZ retailers, and tell you the best pick — so you can sort flea, worming, joints and food without the guesswork.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <Button variant="primary" size="lg" as="a" href={PILLAR} iconRight={<HPIcon name="arrowRight" size={18} />}>Start with fleas</Button>
              <Button variant="secondary" size="lg" as="a" href="/guides">Browse all guides</Button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 28, color: "var(--ink-muted)", fontSize: 13.5, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><HPIcon name="shield" size={17} color="var(--green-primary)" /> Vet-reviewed</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><HPIcon name="check" size={17} color="var(--green-primary)" /> NZ$ prices</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><HPIcon name="check" size={17} color="var(--green-primary)" /> Independent</span>
            </div>
          </div>
          <div style={{ position: "relative" }}>
            <div style={{ aspectRatio: "4 / 5", boxShadow: "var(--shadow-lg)", borderRadius: "var(--radius-xl)" }}>
              <PetImage label="Happy cat & dog at home" tone="sand" icon="smile" radius="var(--radius-xl)" />
            </div>
            <Card elevation="md" style={{ position: "absolute", bottom: -18, left: -18, padding: 14, display: "flex", alignItems: "center", gap: 11, width: 220 }}>
              <span style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--green-light)", display: "grid", placeItems: "center", flex: "none" }}><HPIcon name="bug" size={20} color="var(--green-primary)" /></span>
              <div style={{ lineHeight: 1.3 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 14, color: "var(--ink)" }}>Top pick: Revolution Plus</div>
                <div style={{ fontSize: 12.5, color: "var(--ink-muted)" }}>Flea + worm + tick</div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* TERRITORIES */}
      <Section>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 40px" }}>
          <Eyebrow>Find your topic</Eyebrow>
          <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 1.2rem + 1.6vw, 2.25rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>What does your pet need help with?</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="hp-terr-grid">
          {TERRITORIES.map((t) => (
            <a key={t.name} href={t.href} style={{ textDecoration: "none" }}>
              <Card hoverLift padding="lg" style={{ height: "100%", display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ width: 54, height: 54, borderRadius: "var(--radius-md)", flex: "none", background: "var(--green-light)", display: "grid", placeItems: "center" }}>
                  <HPIcon name={t.icon} size={26} color="var(--green-primary)" stroke={1.8} />
                </span>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 17, color: "var(--ink)" }}>{t.name}</div>
                  <div style={{ fontSize: 13.5, color: "var(--ink-muted)", marginTop: 2 }}>{t.blurb}</div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </Section>

      {/* POPULAR GUIDES */}
      <Section tint>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
          <div>
            <Eyebrow>Most popular</Eyebrow>
            <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 1.2rem + 1.6vw, 2.25rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>Guides Kiwi owners read most</h2>
          </div>
          <Button variant="ghost" as="a" href="/guides" iconRight={<HPIcon name="arrowRight" size={17} />}>See all guides</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }} className="hp-guide-grid">
          {GUIDES.map((g) => (
            <a key={g.title} href={g.href} style={{ textDecoration: "none" }}>
              <Card hoverLift padding="none" style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                <div style={{ aspectRatio: "16 / 10" }}><PetImage label="" tone={g.tone} icon={g.icon} radius="0" /></div>
                <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 11.5, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--green-dark)" }}>{g.kicker}</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 16.5, lineHeight: 1.3, color: "var(--ink)", textWrap: "pretty" }}>{g.title}</div>
                  <div style={{ marginTop: "auto", paddingTop: 6, fontSize: 13, color: "var(--ink-muted)", display: "flex", alignItems: "center", gap: 6 }}><HPIcon name="check" size={14} color="var(--green-primary)" /> {g.read} read · Vet-reviewed</div>
                </div>
              </Card>
            </a>
          ))}
        </div>
      </Section>

      {/* TRUST STRIP */}
      <Section>
        <div style={{ background: "var(--white)", border: "1px solid var(--border-soft)", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-sm)", padding: "clamp(24px, 4vw, 36px)" }}>
          <TrustStrip />
        </div>
      </Section>

      {/* EMAIL */}
      <Section tint style={{ paddingTop: 0 }}>
        <EmailCapture source="homepage" />
      </Section>

      {/* WHY HEALTHY PETS */}
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "center" }} className="hp-why">
          <div style={{ aspectRatio: "5 / 4", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-md)" }}>
            <PetImage label="Our team & their pets" tone="green" icon="leaf" radius="var(--radius-xl)" />
          </div>
          <div>
            <Eyebrow>Why Healthy Pets</Eyebrow>
            <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 1.2rem + 1.6vw, 2.25rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>A trusted guide — not a vet, not a shop</h2>
            <p style={{ margin: "0 0 16px", fontSize: 16.5, lineHeight: 1.7, color: "var(--ink-soft)" }}>
              We&apos;re Kiwi pet owners ourselves. Every guide is researched, written in plain English, and <strong style={{ color: "var(--ink)" }}>reviewed by a registered NZ vet</strong> before it goes live. We recommend products we&apos;d use on our own cats and dogs.
            </p>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {["We check real NZ$ prices at NZ retailers", "Our picks are honest — never paid placements", "Always a budget option and a premium option", "Vet-informed, and we'll tell you when to call yours"].map((t) => (
                <li key={t} style={{ display: "flex", gap: 11, alignItems: "flex-start", fontSize: 15.5, color: "var(--ink-soft)" }}>
                  <span style={{ flex: "none", marginTop: 1, width: 22, height: 22, borderRadius: "50%", background: "var(--green-light)", display: "grid", placeItems: "center" }}><HPIcon name="check" size={14} color="var(--green-primary)" /></span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <style>{`
        @media (max-width: 900px) {
          .hp-hero { grid-template-columns: 1fr !important; }
          .hp-terr-grid { grid-template-columns: 1fr 1fr !important; }
          .hp-guide-grid { grid-template-columns: 1fr 1fr !important; }
          .hp-why { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .hp-terr-grid, .hp-guide-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
