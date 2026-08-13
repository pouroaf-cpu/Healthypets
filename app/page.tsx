import Link from "next/link";
import Image from "next/image";
import { Caveat } from "next/font/google";
import { getImage } from "@/lib/images";
import type { CSSProperties, ReactNode } from "react";
import { Button } from "@/components/ds/Button";
import { Card } from "@/components/ds/Card";
import { Badge } from "@/components/ds/Badge";
import { TrustStrip } from "@/components/ds/TrustStrip";
import { EmailCapture } from "@/components/ds/EmailCapture";
import { HPIcon } from "@/components/ds/Icons";
import { WalkingPet } from "@/components/WalkingPet";
import { TOOLS } from "@/lib/navigation";

// Homepage — "beige scrapbook edition" ported from the Healthy Pets Design System
// (claude.ai/design project 3ed375). The warm-brown/beige palette is the SITE-WIDE default
// and lives in app/ds/colors.css. This block used to re-declare nine of those colours as raw
// hex, which quietly made the homepage a second source of truth — a palette change in
// colors.css would have skipped the highest-traffic page. Only genuinely homepage-scoped
// values belong here now: the Caveat handwriting font used by the scrapbook elements.

const PILLAR = "/flea-and-worming/best-cat-flea-treatment-nz";

// Full-body cartoon cats & dogs for the "happy pets parade".
const PETS = ["🐕", "🐈", "🐩", "🐈‍⬛", "🐕‍🦺", "🐕", "🐈", "🐩", "🐈‍⬛", "🐕‍🦺", "🐕", "🐈"];

// Caveat is declared here rather than in the root layout so next/font only ships it on this
// route — it's the scrapbook handwriting and no other page uses --font-hand.
const caveat = Caveat({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

// Homepage-scoped tokens. Colours come from app/ds/colors.css — do not add hex here.
const BEIGE = {
  "--font-hand": "var(--font-caveat), 'Caveat', cursive",
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

// `image` is an id in the lib/images.ts manifest — the same licensed photo the article itself
// runs as its hero. The cards used to show emoji-on-gradient panels, which made four different
// guides look like one repeated tile; real animals give the eye something to land on.
const GUIDES = [
  { kicker: "Flea & Worming", title: "Best Flea Treatments for Cats (NZ 2026)", read: "8 min", image: "best-cat-flea-treatment-nz-hero", href: PILLAR },
  { kicker: "Joint & Mobility", title: "Best Joint Supplements for Dogs (NZ)", read: "8 min", image: "best-joint-supplements-for-dogs-nz-hero", href: "/joint-and-mobility/best-joint-supplements-for-dogs-nz" },
  { kicker: "Nutrition", title: "Best Cat Food in NZ (Brands Compared)", read: "8 min", image: "best-cat-food-nz-hero", href: "/food/best-cat-food-nz" },
  { kicker: "Skin & Coat", title: "Dog Allergies: Treatment & Relief (NZ)", read: "9 min", image: "dog-allergies-treatment-relief-nz-hero", href: "/skin-and-coat/dog-allergies-treatment-relief-nz" },
];

// Which scene gradient each topic tile wears, cycled so no two neighbours match.
const TERRITORY_TONES = ["tan", "sand", "rose", "clay", "sand", "tan"];

const SCENE_TONES: Record<string, string> = {
  tan: "linear-gradient(135deg, #F2E6D1 0%, #E3CDA9 100%)",
  sand: "linear-gradient(135deg, #F6EAD3 0%, #EAD2A9 100%)",
  rose: "linear-gradient(135deg, #F3E2CE 0%, #E6C7A6 100%)",
  clay: "linear-gradient(135deg, #EFE0CC 0%, #DBC09C 100%)",
};

// Emoji that have an official animated version (Google Noto Animated Emoji) bundled in
// /public/lottie. When a PetScene is `animated`, these render as a looping Lottie instead of
// the static glyph — i.e. "the emoji, but alive". Others fall back to the styled emoji.
const ANIM_EMOJI: Record<string, string> = { "🐕": "/lottie/emoji-dog.json", "🐈": "/lottie/emoji-cat.json" };

function PetScene({ tone = "tan", pets = ["🐕", "🐈"], radius = "var(--radius-xl)", label, animated = false }: { tone?: string; pets?: string[]; radius?: string; label?: string; animated?: boolean }) {
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
          animated && ANIM_EMOJI[p] ? (
            <WalkingPet key={i} src={ANIM_EMOJI[p]} style={{ width: "clamp(58px, 15vw, 118px)", height: "clamp(58px, 15vw, 118px)", filter: "drop-shadow(0 6px 10px rgba(80,52,28,0.18))" }} />
          ) : (
            <Pet key={i} idle={i + 1} pop size="clamp(50px, 13vw, 108px)" style={{ lineHeight: 1, filter: "drop-shadow(0 6px 10px rgba(80,52,28,0.18))" }} inStyle={{ animationDelay: `${i * 0.4}s` }}>{p}</Pet>
          )
        ))}
      </div>
      {label ? (
        <span style={{ position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center", fontFamily: "var(--font-hand)", fontWeight: 700, fontSize: 18, color: "var(--green-dark)", opacity: 0.85 }}>{label}</span>
      ) : null}
    </div>
  );
}

// A guide's real hero photo, filling its container. Falls back to the warm gradient if the id
// isn't in the manifest, so a missing photo never leaves a hole.
function GuidePhoto({ id, sizes, priority = false }: { id: string; sizes: string; priority?: boolean }) {
  const img = getImage(id);
  if (!img) return <div style={{ position: "absolute", inset: 0, background: SCENE_TONES.tan }} />;
  return (
    <Image
      src={img.src}
      alt=""
      fill
      sizes={sizes}
      priority={priority}
      style={{ objectFit: "cover" }}
    />
  );
}

function Section({ children, tint, style = {} }: { children: ReactNode; tint?: boolean; style?: CSSProperties }) {
  return (
    <section style={{ position: "relative", background: tint ? "var(--section)" : "var(--white)", overflow: "hidden", ...style }}>
      <div style={{ position: "relative", maxWidth: "var(--container)", margin: "0 auto", padding: "clamp(48px, 7vw, 88px) 20px" }}>{children}</div>
    </section>
  );
}

// (An `Eyebrow` used to live here — a small-caps label above every single section heading.
// Four sections carrying the identical device is what made the page read as one repeated
// block. The headings say the same thing on their own. Don't bring it back.)

// Animated pet emoji. THREE nested spans so the effects never fight over `transform`
// (each layer owns its own transform and they compose through the DOM):
//   outer  .hp-pet      → pop-in scale (on scroll reveal)
//   middle .hp-pet-lean → leans the way you swipe (carousel cards)
//   inner  .hp-pet-in   → idle loop (varied by `idle` 1–3) + the run bounce during a swipe
// Decorative → aria-hidden.
function Pet({ children, idle = 1, pop = false, size, className = "", style = {}, inStyle = {} }: {
  children: ReactNode; idle?: number; pop?: boolean; size?: string; className?: string; style?: CSSProperties; inStyle?: CSSProperties;
}) {
  return (
    <span aria-hidden="true" className={`hp-pet${pop ? " hp-reveal" : ""}${className ? " " + className : ""}`} style={style}>
      <span className="hp-pet-lean">
        <span className={`hp-pet-in hp-i${((idle - 1) % 3) + 1}`} style={{ fontSize: size, ...inStyle }}>{children}</span>
      </span>
    </span>
  );
}

function ScatterPets({ items }: { items: { pet: string; size: string; pos: CSSProperties; opacity?: number }[] }) {
  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}>
      {items.map((it, i) => (
        <span key={i} className={`hp-pet-in hp-i${(i % 3) + 1}`} style={{ position: "absolute", fontSize: it.size, opacity: it.opacity ?? 0.9, animationDelay: `${i * 0.5}s`, ...it.pos, filter: "drop-shadow(0 4px 6px rgba(80,52,28,0.12))" }}>{it.pet}</span>
      ))}
    </div>
  );
}

function Tape({ style = {} }: { style?: CSSProperties }) {
  return <span aria-hidden="true" style={{ position: "absolute", width: 78, height: 24, background: "rgba(214,180,128,0.55)", border: "1px solid rgba(180,140,90,0.25)", boxShadow: "0 1px 2px rgba(80,52,28,0.12)", ...style }} />;
}

function Polaroid({ rot = 0, width = 220, tone, pets, caption, sceneH = 190, animated = false, style = {} }: { rot?: number; width?: number; tone?: string; pets?: string[]; caption?: string; sceneH?: number; animated?: boolean; style?: CSSProperties }) {
  return (
    <div style={{ position: "absolute", width, background: "#FFFDF8", padding: "12px 12px 14px", borderRadius: 6, boxShadow: "0 14px 30px rgba(80,52,28,0.22), 0 2px 6px rgba(80,52,28,0.12)", transform: `rotate(${rot}deg)`, ...style }}>
      <Tape style={{ top: -11, left: "50%", marginLeft: -39, transform: "rotate(-4deg)" }} />
      <div style={{ height: sceneH, borderRadius: 3, overflow: "hidden" }}>
        <PetScene tone={tone} pets={pets} radius="3px" animated={animated} />
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
    <div className={caveat.variable} style={BEIGE}>
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
              We read the labels, check what things actually cost at NZ retailers, and tell you the best pick — so you can sort flea, worming, joints and food without the guesswork.
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
            <Polaroid rot={-5} width={236} tone="sand" pets={["🐕"]} caption="Rua, 4 🦴" sceneH={196} animated style={{ top: 10, left: "6%", zIndex: 2 }} />
            <Polaroid rot={6} width={194} tone="tan" pets={["🐈"]} caption="Miso 🐾" sceneH={156} animated style={{ top: 168, right: "2%", zIndex: 3 }} />

            {/* Every claim on this collage has to be one we can actually stand behind. It used
                to say "Megan's top pick" (no such person), "Loved by 2,300+ Kiwi owners" (no such
                readers) and "$84.99 BEST NZ PRICE" (no such product). Replaced with the two facts
                that are true and checkable. Don't reintroduce social proof we don't have. */}
            <Sticky style={{ top: -8, right: "8%", transform: "rotate(7deg)", zIndex: 4 }}>our<br />top pick! →</Sticky>

            <div style={{ position: "absolute", bottom: 8, left: "-2%", zIndex: 5, transform: "rotate(-3deg)", background: "#FFFDF8", border: "2px solid var(--ink)", borderRadius: "var(--radius-pill)", padding: "9px 16px", boxShadow: "0 8px 18px rgba(80,52,28,0.18)", display: "flex", alignItems: "center", gap: 8 }}>
              <span aria-hidden="true" style={{ fontSize: 15 }}>🇳🇿</span>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 12.5, color: "var(--ink)" }}>Real prices, real NZ retailers</span>
            </div>

            <div className="hp-collage-extra" style={{ position: "absolute", top: 150, left: "-4%", zIndex: 6, transform: "rotate(-9deg)", width: 84, height: 84, borderRadius: "50%", background: "var(--green-primary)", color: "#fff", display: "grid", placeItems: "center", textAlign: "center", boxShadow: "0 8px 18px rgba(80,52,28,0.25)", border: "2px dashed rgba(255,255,255,0.6)" }}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, lineHeight: 1.1, textAlign: "center" }}>
                <span style={{ display: "block", fontSize: 13 }}>100%</span>
                <span style={{ display: "block", fontSize: 9, letterSpacing: "-0.01em" }}>INDEPENDENT</span>
              </div>
            </div>

            <span className="hp-pet-in hp-i2 hp-collage-extra" aria-hidden="true" style={{ position: "absolute", top: -18, left: "44%", fontSize: 40, zIndex: 1, filter: "drop-shadow(0 5px 7px rgba(80,52,28,0.18))" }}>🐩</span>
            <span className="hp-collage-extra" aria-hidden="true" style={{ position: "absolute", bottom: 0, right: "30%", fontSize: 30, zIndex: 1, opacity: 0.8, transform: "rotate(12deg)" }}>🐾</span>

            {/* The one real walking pet (Lottie) — a dog trotting along the bottom of the scrapbook */}
            <WalkingPet src="/lottie/dog-walk.json" style={{ position: "absolute", bottom: -22, right: "6%", zIndex: 7, width: "clamp(104px, 13vw, 148px)", height: "clamp(104px, 13vw, 148px)", filter: "drop-shadow(0 8px 10px rgba(80,52,28,0.16))" }} />
          </div>
        </div>
      </section>

      {/* HAPPY PETS PARADE — a static band of pets (no marquee; motion is intentionally minimal) */}
      <section style={{ background: "var(--green-primary)", overflow: "hidden" }}>
        <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "20px", display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(10px, 3vw, 28px)", flexWrap: "wrap" }}>
          {PETS.map((p, i) => (
            <Pet key={i} idle={i + 1} size="clamp(28px, 4vw, 44px)" style={{ lineHeight: 1 }}>{p}</Pet>
          ))}
        </div>
      </section>

      {/* TERRITORIES */}
      <Section>
        <div style={{ textAlign: "center", maxWidth: 620, margin: "0 auto 40px" }}>
          <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 1.2rem + 1.6vw, 2.25rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>What does your pet need help with?</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }} className="hp-terr-grid">
          {/* Tiles carry the warm scene gradients instead of sitting as six identical white
              boxes — the topic grid is the first thing under the hero and it should read as a
              band of colour, not a list. Same palette, turned up. */}
          {TERRITORIES.map((t, i) => (
            <Link key={t.name + i} href={t.href} style={{ textDecoration: "none" }}>
              <Card hoverLift padding="none" style={{ height: "100%", overflow: "hidden", background: SCENE_TONES[TERRITORY_TONES[i % TERRITORY_TONES.length]], border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "22px 22px 24px" }}>
                  <Pet idle={i + 1} pop size="46px" style={{ flex: "none", lineHeight: 1, filter: "drop-shadow(0 5px 8px rgba(80,52,28,0.20))" }}>{t.pet}</Pet>
                  <div>
                    <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 18.5, color: "var(--ink)", letterSpacing: "-0.01em" }}>{t.name}</div>
                    <div style={{ fontSize: 13.5, color: "var(--green-dark)", marginTop: 3 }}>{t.blurb}</div>
                  </div>
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
              <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 1.2rem + 1.6vw, 2.25rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>Guides Kiwi owners read most</h2>
            </div>
            <Button variant="ghost" as="a" href="/guides" iconRight={<HPIcon name="arrowRight" size={17} />}>See all guides</Button>
          </div>
          {/* One guide leads at double width with the photo behind the title; the other three
              run as a column beside it. Four equal tiles read as a list — this reads as an
              editor's front page, which is what the section actually is. */}
          <div style={{ display: "grid", gridTemplateColumns: "1.35fr 1fr", gap: 18, alignItems: "stretch" }} className="hp-guide-grid">
            <Link href={GUIDES[0].href} style={{ textDecoration: "none" }}>
              <Card hoverLift padding="none" style={{ height: "100%", minHeight: 380, position: "relative", overflow: "hidden", display: "flex" }}>
                <GuidePhoto id={GUIDES[0].image} sizes="(max-width: 900px) 100vw, 620px" priority />
                {/* Scrim: the title sits on the photo, so it has to stay AA-legible whatever the
                    image is. Bottom-weighted so the animal's face stays visible. */}
                <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(31,42,55,0.92) 0%, rgba(31,42,55,0.72) 26%, rgba(31,42,55,0.22) 48%, rgba(31,42,55,0) 72%)" }} />
                <div style={{ position: "relative", marginTop: "auto", padding: "clamp(20px, 3vw, 30px)", display: "flex", flexDirection: "column", gap: 10, color: "#fff" }}>
                  <span style={{ alignSelf: "flex-start", background: "var(--coral-cta)", color: "#fff", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 12, letterSpacing: ".04em", textTransform: "uppercase", padding: "5px 11px", borderRadius: "var(--radius-pill)" }}>Start here</span>
                  <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.4rem, 1.05rem + 1.2vw, 2rem)", lineHeight: 1.15, letterSpacing: "-0.02em", textWrap: "balance" }}>{GUIDES[0].title}</div>
                  <div style={{ fontSize: 14, color: "rgba(255,255,255,0.86)" }}>{GUIDES[0].read} read · {GUIDES[0].kicker}</div>
                </div>
              </Card>
            </Link>

            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {GUIDES.slice(1).map((g) => (
                <Link key={g.title} href={g.href} style={{ textDecoration: "none", flex: 1 }}>
                  <Card hoverLift padding="none" style={{ height: "100%", display: "flex", alignItems: "stretch", overflow: "hidden", gap: 0 }}>
                    <div style={{ position: "relative", flex: "none", width: "38%", minWidth: 116 }}>
                      <GuidePhoto id={g.image} sizes="180px" />
                    </div>
                    <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 6, flex: 1 }}>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 11.5, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--green-dark)" }}>{g.kicker}</div>
                      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 16.5, lineHeight: 1.3, color: "var(--ink)", textWrap: "pretty" }}>{g.title}</div>
                      <div style={{ fontSize: 13, color: "var(--ink-muted)", display: "flex", alignItems: "center", gap: 6 }}><HPIcon name="check" size={14} color="var(--green-primary)" /> {g.read} read</div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* FREE TOOLS */}
      <Section>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, marginBottom: 32, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.6rem, 1.2rem + 1.6vw, 2.25rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>Handy tools for Kiwi pet owners</h2>
          </div>
          <Button variant="ghost" as="a" href="/tools" iconRight={<HPIcon name="arrowRight" size={17} />}>See all tools</Button>
        </div>
        {/* One tool today. A 2-up grid left half the row empty (looked like a missing card) and
            a full-width single card was a 1120px box holding one line of text. Cap it at a
            card-sized column instead; the 2-up grid re-forms as soon as a second tool lands. */}
        <div style={{ display: "grid", gridTemplateColumns: TOOLS.length > 1 ? "repeat(2, 1fr)" : "minmax(0, 560px)", gap: 18 }} className="hp-tools-grid">
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
        {/* Trust strip rides in the tools section rather than owning a Section of its own —
            two stacked section paddings around one thin row left a dead band of empty page. */}
        <div style={{ marginTop: 40, paddingTop: 32, borderTop: "1px solid var(--border-soft)" }}>
          <TrustStrip />
        </div>
      </Section>

      {/* EMAIL — full-width brand-green segment (lighter --leaf) with the deep --leaf-deep band floating on it */}
      <Section style={{ background: "var(--leaf)" }}>
        <EmailCapture source="homepage" tone="green" />
      </Section>

      {/* WHY HEALTHY PETS */}
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "center" }} className="hp-why">
          <div style={{ aspectRatio: "5 / 4", borderRadius: "var(--radius-xl)", boxShadow: "var(--shadow-md)" }}>
            <PetScene tone="tan" pets={["🐕", "🐈"]} radius="var(--radius-xl)" label="Written for Kiwi cats & dogs" animated />
          </div>
          <div>
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
        /* Pet emoji layout wrappers (Pet component). Deliberately NO CSS animation — the only
           motion on the page now is the Lottie pets (the walking dog + the animated polaroid /
           why-scene emoji). Emoji elsewhere (parade, cards, scatter) are static. */
        .hp-pet, .hp-pet-lean, .hp-pet-in { display: inline-block; }
        @media (max-width: 900px) {
          .hp-hero { grid-template-columns: 1fr !important; }
          .hp-collage { height: 440px !important; margin-top: 40px; }
          .hp-terr-grid { grid-template-columns: 1fr 1fr !important; }
          /* The lead guide and the three-up column stack rather than squeeze side by side. */
          .hp-guide-grid { grid-template-columns: 1fr !important; }
          .hp-why { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          .hp-tools-grid { grid-template-columns: 1fr !important; }
          /* Topics: swipeable horizontal carousel on phones (a peek of the next card signals
             "swipe") instead of a tall vertical stack. Desktop/tablet keep the grid.
             Guides are NOT a carousel — the lead card is the section's anchor and needs to be
             seen, not swiped past. */
          .hp-terr-grid {
            display: flex !important;
            overflow-x: auto;
            overflow-y: hidden; /* stops the container jitter: overflow-x:auto alone forces
                                   overflow-y to 'auto', so any pet transform poking past a card
                                   made the carousel grow a phantom scroll area and shift. */
            scroll-snap-type: x mandatory;
            scroll-padding-inline: 0;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }
          .hp-terr-grid::-webkit-scrollbar { display: none; }
          .hp-terr-grid > * { flex: 0 0 82%; scroll-snap-align: start; }
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
