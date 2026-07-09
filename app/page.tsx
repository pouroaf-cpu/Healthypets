import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { Badge } from "@/components/ds/Badge";
import { TrustStrip } from "@/components/ds/TrustStrip";
import { EmailCapture } from "@/components/ds/EmailCapture";
import { HPIcon } from "@/components/ds/Icons";
import { TOOLS } from "@/lib/navigation";

// Homepage — "beige scrapbook edition" ported from the Healthy Pets Design System
// (claude.ai/design project 3ed375). The warm-brown/beige palette is now the SITE-WIDE
// default (see app/ds/colors.css); this BEIGE block re-affirms those values and adds the
// --font-hand (Caveat) handwriting font used by the scrapbook elements on this page.

const PILLAR = "/flea-and-worming/best-cat-flea-treatment-nz";

// Full-body cartoon cats & dogs for the "happy pets parade".
const PETS = ["🐕", "🐈", "🐩", "🐈‍⬛", "🐕‍🦺", "🐕", "🐈", "🐩", "🐈‍⬛", "🐕‍🦺", "🐕", "🐈"];

// Beige / warm-brown palette overrides (homepage only).
const BEIGE = {
  "--green-primary": "#9C6A41",
  "--green-dark": "#6E4A2B",
  "--green-light": "#EFE2CE",
  "--section": "#F1E6D4",
  "--white": "#FCF8F0",
  "--border": "#E6D8C2",
  "--border-soft": "#EEE3D0",
  "--border-strong": "#D6C4A9",
  "--success": "#9C6A41",
  "--font-hand": "'Caveat', cursive",
  background: "var(--white)",
} as CSSProperties;

const TERRITORIES = [
  { pet: "🐈", name: "Flea & Worming", blurb: "Spot-ons, tablets & combos", href: "/flea-and-worming" },
  { pet: "🐕", name: "Joint & Mobility", blurb: "Supplements for stiff legs", href: "/joint-and-mobility" },
  { pet: "🐩", name: "Gut Health", blurb: "Probiotics & sensitive tummies", href: "/gut-health" },
  { pet: "🐈‍⬛", name: "Skin & Coat", blurb: "Itch relief & shiny fur", href: "/skin-and-coat" },
  { pet: "🐕‍🦺", name: "Dental Care", blurb: "Chews, gels & fresh breath", href: "/dental" },
  { pet: "🐈", name: "Food & Nutrition", blurb: "What to feed, how much", href: "/food" },
];

const GUIDES = [
  { kicker: "Flea & Worming", title: "Best Flea Treatments for Cats (NZ 2026)", read: "8 min", tone: "tan", pets: ["🐈", "🐈‍⬛"], href: PILLAR },
  { kicker: "Joint & Mobility", title: "Best Joint Supplements for Dogs (NZ)", read: "8 min", tone: "sand", pets: ["🐕", "🐕‍🦺"], href: "/joint-and-mobility/best-joint-supplements-for-dogs-nz" },
  { kicker: "Nutrition", title: "Best Cat Food in NZ (Brands Compared)", read: "8 min", tone: "rose", pets: ["🐈"], href: "/food/best-cat-food-nz" },
  { kicker: "Skin & Coat", title: "Dog Allergies: Treatment & Relief (NZ)", read: "9 min", tone: "clay", pets: ["🐩", "🐕"], href: "/skin-and-coat/dog-allergies-treatment-relief-nz" },
];

const SCENE_TONES: Record<string, string> = {
  tan: "linear-gradient(135deg, #F2E6D1 0%, #E3CDA9 100%)",
  sand: "linear-gradient(135deg, #F6EAD3 0%, #EAD2A9 100%)",
  rose: "linear-gradient(135deg, #F3E2CE 0%, #E6C7A6 100%)",
  clay: "linear-gradient(135deg, #EFE0CC 0%, #DBC09C 100%)",
};

function PetScene({ tone = "tan", pets = ["🐕", "🐈"], radius = "var(--radius-xl)", label }: { tone?: string; pets?: string[]; radius?: string; label?: string }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", minHeight: 0, background: SCENE_TONES[tone] || SCENE_TONES.tan, borderRadius: radius, overflow: "hidden", display: "grid", placeItems: "center" }}>
      <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.45, fontSize: 20, lineHeight: 1, color: "var(--green-dark)" }}>
        <span style={{ position: "absolute", top: "12%", left: "14%" }}>🐾</span>
        <span style={{ position: "absolute", top: "26%", right: "12%", transform: "rotate(18deg)" }}>🐾</span>
        <span style={{ position: "absolute", bottom: "16%", left: "20%", transform: "rotate(-14deg)" }}>🐾</span>
        <span style={{ position: "absolute", bottom: "22%", right: "22%" }}>🐾</span>
      </div>
      <div style={{ position: "relative", display: "flex", alignItems: "flex-end", gap: "min(5%, 16px)" }}>
        {pets.map((p, i) => (
          <span key={i} className="hp-bob" style={{ fontSize: "clamp(50px, 13vw, 108px)", lineHeight: 1, animationDelay: `${i * 0.4}s`, filter: "drop-shadow(0 6px 10px rgba(80,52,28,0.18))" }}>{p}</span>
        ))}
      </div>
      {label ? (
        <span style={{ position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center", fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 18, color: "var(--green-dark)", opacity: 0.85 }}>{label}</span>
      ) : null}
    </div>
  );
}

function Section({ children, tint, style = {} }: { children: ReactNode; tint?: boolean; style?: CSSProperties }) {
  return (
    <section style={{ position: "relative", background: tint ? "var(--section)" : "var(--white)", overflow: "hidden", ...style }}>
      <div style={{ position: "relative", maxWidth: "var(--container)", margin: "0 auto", padding: "clamp(48px, 7vw, 88px) 20px" }}>{children}</div>
    </section>
  );
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--green-dark)", marginBottom: 12 }}>{children}</div>;
}

function ScatterPets({ items }: { items: { pet: string; size: string; pos: CSSProperties; opacity?: number }[] }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {items.map((it, i) => (
        <span key={i} className="hp-bob" style={{ position: "absolute", fontSize: it.size, opacity: it.opacity ?? 0.9, animationDelay: `${i * 0.5}s`, ...it.pos, filter: "drop-shadow(0 4px 6px rgba(80,52,28,0.12))" }}>{it.pet}</span>
      ))}
    </div>
  );
}

function Tape({ style = {} }: { style?: CSSProperties }) {
  return <span aria-hidden="true" style={{ position: "absolute", width: 78, height: 24, background: "rgba(214,180,128,0.55)", border: "1px solid rgba(180,140,90,0.25)", boxShadow: "0 1px 2px rgba(80,52,28,0.12)", ...style }} />;
}

function Polaroid({ rot = 0, width = 220, tone, pets, caption, sceneH = 190, style = {} }: { rot?: number; width?: number; tone?: string; pets?: string[]; caption?: string; sceneH?: number; style?: CSSProperties }) {
  return (
    <div style={{ position: "absolute", width, background: "#FFFDF8", padding: "12px 12px 14px", borderRadius: 6, boxShadow: "0 14px 30px rgba(80,52,28,0.22), 0 2px 6px rgba(80,52,28,0.12)", transform: `rotate(${rot}deg)`, ...style }}>
      <Tape style={{ top: -11, left: "50%", marginLeft: -39, transform: "rotate(-4deg)" }} />
      <div style={{ height: sceneH, borderRadius: 3, overflow: "hidden" }}>
        <PetScene tone={tone} pets={pets} radius="3px" />
      </div>
      <div style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 22, color: "var(--ink)", textAlign: "center", marginTop: 6, lineHeight: 1 }}>{caption}</div>
    </div>
  );
}

function Sticky({ children, style = {} }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div style={{ position: "absolute", background: "#FBE7A8", padding: "14px 16px", borderRadius: 2, boxShadow: "0 8px 18px rgba(80,52,28,0.20)", fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 22, color: "#5b4a1e", lineHeight: 1.1, maxWidth: 180, ...style }}>{children}</div>
  );
}

export default function Home() {
  return (
    <div style={BEIGE}>
      {/* HERO — busy scrapbook collage */}
      <section style={{ position: "relative", background: "linear-gradient(180deg, #EFE2CE 0%, #F6EFE2 55%, var(--white) 100%)", overflow: "hidden" }}>
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, opacity: 0.07, fontSize: 30, color: "#6E4A2B", lineHeight: "64px", letterSpacing: "44px", wordSpacing: "20px", padding: 30, userSelect: "none" }}>
          {"🐾".repeat(50)}
        </div>

        <div style={{ position: "relative", zIndex: 1, maxWidth: "var(--container)", margin: "0 auto", padding: "clamp(36px, 5vw, 64px) 20px clamp(56px, 6vw, 88px)", display: "grid", gridTemplateColumns: "1.02fr 0.98fr", gap: 30, alignItems: "center" }} className="hp-hero">
          {/* LEFT — pitch */}
          <div style={{ position: "relative" }}>
            <Badge tone="light" style={{ marginBottom: 18 }}>🇳🇿 Made for Kiwi pet owners</Badge>
            <h1 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(2.1rem, 1.3rem + 3.2vw, 3.5rem)", lineHeight: 1.06, letterSpacing: "-0.02em", color: "var(--ink)" }}>
              <span style={{ display: "inline-block", background: "linear-gradient(180deg, transparent 58%, #E8C28E 58%, #E8C28E 92%, transparent 92%)", padding: "0 4px", transform: "rotate(-1.2deg)" }}>Honest</span> pet-health advice for Kiwi cat &amp; dog owners
            </h1>
            <p style={{ margin: "18px 0 26px", fontSize: "clamp(1.05rem, 1rem + 0.4vw, 1.22rem)", lineHeight: 1.6, color: "var(--ink-soft)", maxWidth: 500 }}>
              We test the claims, check the prices at NZ retailers, and tell you the best pick — so you can sort flea, worming, joints and food without the guesswork.
            </p>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
              <Button variant="primary" size="lg" as="a" href={PILLAR} iconRight={<HPIcon name="arrowRight" size={18} />}>Start with fleas</Button>
              <Button variant="secondary" size="lg" as="a" href="/guides">Browse all guides</Button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 26, color: "var(--ink-muted)", fontSize: 13.5, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><HPIcon name="check" size={17} color="var(--green-primary)" /> NZ$ prices</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}><HPIcon name="check" size={17} color="var(--green-primary)" /> Independent</span>
            </div>

            <div aria-hidden="true" style={{ position: "absolute", left: 6, bottom: -54, display: "flex", alignItems: "center", gap: 6, transform: "rotate(-4deg)" }}>
              <span style={{ fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 21, color: "var(--green-dark)" }}>free, no fluff, no shop</span>
              <span style={{ fontSize: 22 }}>↗</span>
            </div>
          </div>

          {/* RIGHT — collage stage */}
          <div style={{ position: "relative", height: "clamp(380px, 42vw, 500px)" }} className="hp-collage">
            <Polaroid rot={-5} width={236} tone="sand" pets={["🐕"]} caption="Rua, 4 🦴" sceneH={196} style={{ top: 10, left: "6%", zIndex: 2 }} />
            <Polaroid rot={6} width={194} tone="tan" pets={["🐈"]} caption="Miso 🐾" sceneH={156} style={{ top: 168, right: "2%", zIndex: 3 }} />

            <Sticky style={{ top: -8, right: "8%", transform: "rotate(7deg)", zIndex: 4 }}>Megan&apos;s<br />top pick! →</Sticky>

            <div style={{ position: "absolute", bottom: 8, left: "-2%", zIndex: 5, transform: "rotate(-3deg)", background: "#FFFDF8", border: "2px solid var(--ink)", borderRadius: "var(--radius-pill)", padding: "9px 16px", boxShadow: "0 8px 18px rgba(80,52,28,0.18)", display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ color: "var(--rating-star)", fontSize: 16, letterSpacing: 1 }}>★★★★★</span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 12.5, color: "var(--ink)" }}>Loved by 2,300+ Kiwi owners</span>
            </div>

            <div className="hp-collage-extra" style={{ position: "absolute", bottom: 92, right: "-3%", zIndex: 6, transform: "rotate(5deg)", background: "var(--coral-cta)", color: "#fff", borderRadius: 8, padding: "8px 13px", boxShadow: "0 8px 20px rgba(255,107,92,0.35)", fontFamily: "var(--font-heading)", fontWeight: 700, lineHeight: 1.1, textAlign: "center" }}>
              <div style={{ fontSize: 17 }}>$84.99</div>
              <div style={{ fontSize: 10, fontWeight: 600, opacity: 0.9, letterSpacing: ".04em" }}>BEST NZ PRICE</div>
            </div>

            <div className="hp-collage-extra" style={{ position: "absolute", top: 150, left: "-4%", zIndex: 6, transform: "rotate(-9deg)", width: 84, height: 84, borderRadius: "50%", background: "var(--green-primary)", color: "#fff", display: "grid", placeItems: "center", textAlign: "center", boxShadow: "0 8px 18px rgba(80,52,28,0.25)", border: "2px dashed rgba(255,255,255,0.6)" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, lineHeight: 1.1, textAlign: "center" }}>
                <span style={{ display: "block", fontSize: 13 }}>100%</span>
                <span style={{ display: "block", fontSize: 9, letterSpacing: "-0.01em" }}>INDEPENDENT</span>
              </div>
            </div>

            <span className="hp-bob hp-collage-extra" aria-hidden="true" style={{ position: "absolute", top: -18, left: "44%", fontSize: 40, zIndex: 1, filter: "drop-shadow(0 5px 7px rgba(80,52,28,0.18))" }}>🐩</span>
            <span className="hp-collage-extra" aria-hidden="true" style={{ position: "absolute", bottom: 0, right: "30%", fontSize: 30, zIndex: 1, opacity: 0.8, transform: "rotate(12deg)" }}>🐾</span>
          </div>
        </div>
      </section>

      {/* HAPPY PETS PARADE */}
      <section style={{ background: "var(--green-primary)", overflow: "hidden" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(10px, 3vw, 28px)", flexWrap: "wrap" }}>
          {PETS.map((p, i) => (
            <span key={i} className="hp-bob" style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1, animationDelay: `${i * 0.25}s` }}>{p}</span>
          ))}
        </div>
      </section>

      {/* TERRITORIES */}
      <Section>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 40px" }}>
          <Eyebrow>Find your topic</Eyebrow>
          <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 1.2rem + 1.6vw, 2.25rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>What does your pet need help with?</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="hp-terr-grid">
          {TERRITORIES.map((t, i) => (
            <Link key={t.name + i} href={t.href} style={{ textDecoration: "none" }}>
              <Card hoverLift padding="lg" style={{ height: "100%", display: "flex", alignItems: "center", gap: 16 }}>
                <span style={{ width: 58, height: 58, borderRadius: "var(--radius-md)", flex: "none", background: "var(--green-light)", display: "grid", placeItems: "center", fontSize: 30 }}>{t.pet}</span>
                <div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 17, color: "var(--ink)" }}>{t.name}</div>
                  <div style={{ fontSize: 13.5, color: "var(--ink-muted)", marginTop: 2 }}>{t.blurb}</div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>

      {/* POPULAR GUIDES */}
      <Section tint>
        <ScatterPets items={[
          { pet: "🐾", size: "30px", pos: { top: "6%", right: "4%" }, opacity: 0.3 },
          { pet: "🐩", size: "38px", pos: { bottom: "8%", left: "2%" }, opacity: 0.8 },
        ]} />
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
            <div>
              <Eyebrow>Most popular</Eyebrow>
              <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 1.2rem + 1.6vw, 2.25rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>Guides Kiwi owners read most</h2>
            </div>
            <Button variant="ghost" as="a" href="/guides" iconRight={<HPIcon name="arrowRight" size={17} />}>See all guides</Button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }} className="hp-guide-grid">
            {GUIDES.map((g) => (
              <Link key={g.title} href={g.href} style={{ textDecoration: "none" }}>
                <Card hoverLift padding="none" style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
                  <div style={{ aspectRatio: "16 / 10" }}><PetScene tone={g.tone} pets={g.pets} radius="0" /></div>
                  <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 11.5, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--green-dark)" }}>{g.kicker}</div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 16.5, lineHeight: 1.3, color: "var(--ink)", textWrap: "pretty" }}>{g.title}</div>
                    <div style={{ marginTop: "auto", paddingTop: 6, fontSize: 13, color: "var(--ink-muted)", display: "flex", alignItems: "center", gap: 6 }}><HPIcon name="check" size={14} color="var(--green-primary)" /> {g.read} read · Independent &amp; honest</div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* FREE TOOLS */}
      <Section>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
          <div>
            <Eyebrow>Free tools</Eyebrow>
            <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 1.2rem + 1.6vw, 2.25rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>Handy tools for Kiwi pet owners</h2>
          </div>
          <Button variant="ghost" as="a" href="/tools" iconRight={<HPIcon name="arrowRight" size={17} />}>See all tools</Button>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 18 }} className="hp-tools-grid">
          {TOOLS.map((t) => (
            <Link key={t.href} href={t.href} style={{ textDecoration: "none" }}>
              <Card hoverLift padding="lg" style={{ height: "100%", display: "flex", alignItems: "flex-start", gap: 16 }}>
                <span style={{ width: 58, height: 58, borderRadius: "var(--radius-md)", flex: "none", background: "var(--green-light)", display: "grid", placeItems: "center", fontSize: 30 }}>🧮</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 11.5, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--green-dark)" }}>Free tool</div>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 17, color: "var(--ink)", lineHeight: 1.3 }}>{t.label}</div>
                  <div style={{ fontSize: 13.5, color: "var(--ink-muted)", lineHeight: 1.6 }}>{t.blurb}</div>
                  <span style={{ marginTop: 4, display: "inline-flex", alignItems: "center", gap: 7, color: "var(--green-primary)", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 14 }}>Open the tool <span aria-hidden="true">→</span></span>
                </div>
              </Card>
            </Link>
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
        <EmailCapture source="homepage" tone="green" />
      </Section>

      {/* WHY HEALTHY PETS */}
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "center" }} className="hp-why">
          <div style={{ aspectRatio: "5 / 4", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-md)" }}>
            <PetScene tone="tan" pets={["🐕", "🐈"]} radius="var(--radius-xl)" label="Our team & their pets" />
          </div>
          <div>
            <Eyebrow>Why Healthy Pets</Eyebrow>
            <h2 style={{ margin: "0 0 16px", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 1.2rem + 1.6vw, 2.25rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>A trusted guide — not a vet, not a shop</h2>
            <p style={{ margin: "0 0 16px", fontSize: 16.5, lineHeight: 1.7, color: "var(--ink-soft)" }}>
              We&apos;re Kiwi pet owners ourselves. Every guide is <strong style={{ color: "var(--ink)" }}>researched, fact-checked, and written in plain English</strong> before it goes live. We recommend products we&apos;d use on our own cats and dogs.
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
        @media (prefers-reduced-motion: no-preference) {
          .hp-bob { animation: hpBob 3.2s ease-in-out infinite; }
        }
        @keyframes hpBob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-7px); } }
        @media (max-width: 900px) {
          .hp-hero { grid-template-columns: 1fr !important; }
          .hp-collage { height: 440px !important; margin-top: 40px; }
          .hp-terr-grid { grid-template-columns: 1fr 1fr !important; }
          .hp-guide-grid { grid-template-columns: 1fr 1fr !important; }
          .hp-why { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .hp-tools-grid { grid-template-columns: 1fr !important; }
          /* Topics + Guides: swipeable horizontal carousels on phones (a peek of the next card
             signals "swipe") instead of a tall vertical stack. Desktop/tablet keep the grid. */
          .hp-terr-grid, .hp-guide-grid {
            display: flex !important;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            scroll-padding-inline: 0;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .hp-terr-grid::-webkit-scrollbar, .hp-guide-grid::-webkit-scrollbar { display: none; }
          .hp-terr-grid > *, .hp-guide-grid > * { flex: 0 0 82%; scroll-snap-align: start; }
        }
        /* Phones: the collage squashes and the floating stickers overlap the pet polaroids
           (the "$84.99 best price" tag landing on a cartoon pet reads like the pet is priced).
           Hide the extra clutter on small screens; keep the two polaroids, the top-pick sticky
           and the star badge. Desktop/tablet keep the full collage. */
        @media (max-width: 600px) {
          .hp-collage-extra { display: none !important; }
        }
      `}</style>
    </div>
  );
}
