# Healthy Pets — Wireframes & Build Rules

> Low-fidelity wireframes + the rules every page must follow. Mobile-first (design
> the narrow view first, enhance up). Pairs with `site-spec.md` (stack) and
> `audience-persona.md` (voice). ASCII = structure only; styling comes from the theme.

## Build rules (non-negotiable)

### Layout — one universal shell
- **ONE `<Header>`, ONE `<Footer>`, ONE `<Nav>` component**, rendered from the Next.js
  **root `app/layout.tsx`** — every page inherits them. Change the header/footer once,
  it changes everywhere. **No per-page copies of nav/header/footer, ever.**
- Nav links + footer links come from a **single config** (`lib/navigation.ts`) so menus
  are edited in one place, not in markup.
- Page templates (`Pillar`, `Spoke`, `CategoryHub`, `Home`) are also shared components —
  a new article = new MDX content, never new layout code.

### Mobile-first, desktop-second
- Build and test the **mobile (~375px) view first**; layer desktop with Tailwind
  breakpoints (`sm md lg xl`). Base classes = mobile; larger screens add overrides.
- Single-column on mobile; multi-column only at `lg+`. Tap targets ≥ 44px. No horizontal scroll.
- Tables → **stacked cards on mobile**, real table at `md+`.

### SEO (every page)
- **One `<h1>`**, then logical `h2`/`h3` — never skip levels, never style-driven headings.
- **Answer the query in the first 2–3 sentences** (above the fold on mobile).
- `generateMetadata`: unique title + meta description + canonical + OG image per page.
- **JSON-LD**: Article + FAQ on every guide; Product/Review on comparison pages.
- Semantic HTML (`<main> <article> <nav> <section>`), descriptive `alt` on every image.
- Clean URLs `/<territory>/<slug>/`; internal links spoke→pillar→siblings (from content-map).
- `sitemap.ts`, `robots.ts`, RSS; ISR so edits redeploy fast.

### Performance / CWV (it's a ranking factor + Megan's on a phone)
- `next/image` (correct sizes, lazy below the fold), self-hosted fonts (`next/font`),
  reserve space for images/tables → **zero layout shift (CLS 0)**. Target LCP < 2.0s.
- Ship minimal JS — most of the site is static; interactivity only where needed.

### Accessibility — WCAG AA
- Colour contrast AA, visible focus states, keyboard-navigable nav + accordion,
  `aria` on the mobile menu + FAQ, alt text on imagery.

### Monetisation & trust
- Buy links route through `/go/<key>` (cloaked + logged), `rel="sponsored nofollow"`, new tab.
- **Affiliate disclosure** auto-renders at the top of every money page.
- Email capture (reminder calendar) on every guide. Vet-reviewed badge + author byline on health content.

---

## Shared: HEADER  (universal — every page)
```
MOBILE (<375px)                          DESKTOP (≥1024px)
┌─────────────────────────────┐  ┌───────────────────────────────────────────────┐
│ 🐾 Healthy Pets        ☰    │  │ 🐾 Healthy Pets   Cats Dogs Flea&Worming      │
└─────────────────────────────┘  │                   Supplements Food Guides  🔍 │
  ☰ opens full-screen drawer:    └───────────────────────────────────────────────┘
  Cats / Dogs / Flea&Worming     sticky on scroll · max-width container · 1 <h1>? no
  Supplements / Food / Guides    (header has logo only; page provides the h1)
  🔍 search
```

## Shared: FOOTER  (universal — every page)
```
┌─────────────────────────────────────────────┐
│ 🐾 Healthy Pets — honest NZ pet-health advice │
│                                               │
│ TERRITORIES        SITE          LEGAL        │
│ Flea & Worming     About         Affiliate    │
│ Supplements        Editorial      Disclosure  │
│ Food               Contact       Privacy      │
│ Dental / Skin      Reminders     Terms        │
│                                               │
│ [ email signup: reminder calendar ]           │
│ © Healthy Pets · NZ · socials   ⓘ disclosure  │
└─────────────────────────────────────────────┘
(mobile: columns stack vertically; links from lib/navigation.ts)
```

---

## HOMEPAGE
```
MOBILE                                   DESKTOP (lg)
┌─────────────────────────────┐  ┌───────────────────────────────────────────────┐
│ [ universal HEADER ]        │  │ [ universal HEADER ]                          │
├─────────────────────────────┤  ├───────────────────────────────────────────────┤
│  H1: Honest pet-health      │  │  H1 + subhead            │   hero image        │
│  advice for Kiwi cat &      │  │  [ search / CTA ]        │   (cat + dog)       │
│  dog owners                 │  ├──────────────────────────┴────────────────────┤
│  [ search ]                 │  │ TERRITORIES (3 cols)                          │
│  [ hero image ]             │  │ [Flea&Worm][Joint][Gut][Skin][Dental][Food]   │
├─────────────────────────────┤  ├───────────────────────────────────────────────┤
│ TERRITORIES (1 col cards)   │  │ POPULAR GUIDES (3–4 across)                    │
│ [Flea & Worming]            │  │ [card][card][card][card]                      │
│ [Joint & Mobility]          │  ├───────────────────────────────────────────────┤
│ [Gut Health] ...            │  │ TRUST STRIP: Vet-reviewed·NZ prices·Independent│
├─────────────────────────────┤  ├───────────────────────────────────────────────┤
│ POPULAR GUIDES (stacked)    │  │ EMAIL CAPTURE band (reminder calendar)        │
│ [guide card]                │  ├───────────────────────────────────────────────┤
│ [guide card]                │  │ Why Healthy Pets blurb                        │
├─────────────────────────────┤  ├───────────────────────────────────────────────┤
│ TRUST STRIP                 │  │ [ universal FOOTER ]                          │
│ EMAIL CAPTURE               │  └───────────────────────────────────────────────┘
│ [ universal FOOTER ]        │
└─────────────────────────────┘
```

## PILLAR (money page) — e.g. "Best Flea Treatments for Cats (NZ 2026)"
```
MOBILE                                   DESKTOP (lg)  — content + sticky aside
┌─────────────────────────────┐  ┌───────────────────────────────────────────────┐
│ [ HEADER ]                  │  │ [ HEADER ]                                    │
├─────────────────────────────┤  ├──────────────────────────────┬────────────────┤
│ Breadcrumb: Cats ›          │  │ Breadcrumb                   │  ON THIS PAGE  │
│ H1: Best Flea Treatments    │  │ H1                           │  · Top picks   │
│ for Cats (NZ 2026)          │  │ author · vet-reviewed badge  │  · Comparison  │
│ ⓘ affiliate disclosure      │  │ ⓘ disclosure                 │  · How-to      │
│ ANSWER-FIRST intro (verdict)│  │ ANSWER-FIRST intro           │  · FAQ         │
├─────────────────────────────┤  ├──────────────────────────────┤  (sticky)      │
│ TOP PICKS                   │  │ TOP PICKS: [Budget][Premium] │                │
│ [Budget pick card + CTA]    │  ├──────────────────────────────┤                │
│ [Premium pick card + CTA]   │  │ COMPARISON TABLE (real table)│                │
├─────────────────────────────┤  │ Product│Best for│Protects│$ │CTA            │
│ COMPARISON (stacked cards)  │  ├──────────────────────────────┤                │
│ ▸ Revolution Plus  [CTA]    │  │ How to get rid of fleas      │                │
│ ▸ Advantage        [CTA]    │  │ COMPLETE PROTOCOL cross-sell │                │
│ ▸ Bravecto Plus    [CTA]    │  │ FAQ (accordion → schema)     │                │
├─────────────────────────────┤  │ EMAIL CAPTURE                │                │
│ How to get rid of fleas     │  │ Related spokes               │                │
│ COMPLETE PROTOCOL cross-sell│  ├──────────────────────────────┴────────────────┤
│ FAQ (accordion)             │  │ [ FOOTER ]                                    │
│ EMAIL CAPTURE               │  └───────────────────────────────────────────────┘
│ Related spokes              │
│ [ FOOTER ]                  │   CTA buttons = coral "Check price at Pet Direct →"
└─────────────────────────────┘
```

## SPOKE (article) — e.g. "How to get rid of fleas on cats"
```
MOBILE
┌─────────────────────────────┐
│ [ HEADER ]                  │
│ Breadcrumb: Cats › Fleas    │
│ H1 (the question)           │
│ author · vet-reviewed · date│
│ ⓘ disclosure                │
│ ANSWER-FIRST intro          │
│ H2 section + product mention│
│ H2 section ...              │
│ ➜ "See our full guide:      │
│    Best Cat Flea Treatments"│  ← link UP to pillar
│ FAQ (accordion)             │
│ EMAIL CAPTURE               │
│ Related articles            │
│ [ FOOTER ]                  │
└─────────────────────────────┘
```

## CATEGORY HUB — e.g. /flea-and-worming/
```
MOBILE
┌─────────────────────────────┐
│ [ HEADER ]                  │
│ H1: Flea & Worming (NZ)     │
│ short intro + email capture │
│ PILLARS in this territory:  │
│ [Best Cat Flea Treatments]  │
│ [Best Dog Flea Treatments]  │
│ [Cat Worming][Dog Worming]  │
│ ALL ARTICLES (list)         │
│ [ FOOTER ]                  │
└─────────────────────────────┘
```

## Breakpoints (Tailwind)
| Token | Width | Layout |
|---|---|---|
| base | <640 | mobile — single column, drawer nav, stacked cards |
| `md` | ≥768 | tablet — 2-col grids, real comparison table |
| `lg` | ≥1024 | desktop — full nav, content + sticky "on this page" aside, 3-col grids |
| `xl` | ≥1280 | wider container, more whitespace |
