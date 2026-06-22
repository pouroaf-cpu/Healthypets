# Claude Design Prompt — Healthy Pets (healthypets.co.nz)

> Paste the block below into Claude (or a design/build agent). It's self-contained.

---

Build the front-end for **Healthy Pets** (`healthypets.co.nz`) — a New Zealand pet-health
& nutrition **affiliate content hub**. I want a clean, warm, trustworthy, mobile-first design,
implemented as a **Next.js (App Router, TypeScript) + Tailwind CSS + shadcn/ui** site.

## What to deliver (in priority order)
1. **Homepage**
2. **Pillar page template**, populated with a real example: *"Best Flea Treatments for Cats (NZ 2026)"*
3. **Article (spoke) template**
4. Shared **header, footer, and core components**

Use realistic NZ content (below) — no lorem ipsum. Make it production-quality React/Tailwind.

## Brand & audience
- **Brand:** Healthy Pets — honest, practical NZ pet-health advice that helps owners pick the
  right products and buy them at NZ retailers. We're a trusted guide, not a vet or a shop.
- **Reader:** "Megan", 41, suburban NZ, busy mum, owns a cat and/or dog she adores. Phone-first.
  Value-conscious but will pay for quality if convinced. Wants to be *told* the best pick,
  reassured it's safe, and shown where to buy it in NZ. Plain English, warm, never preachy.

## Design system (use exactly)
- Colours: primary **#2E9E6B** (fresh green), primary-dark #247A53, primary-light #E8F5EF;
  CTA **#FF6B5C** (warm coral), cta-dark #E85546; text **#1F2A37**; section bg **#F4F7F5**; white.
- Fonts: **Poppins** (headings) + **Inter** (body) via `next/font/google`.
- Tone of UI: generous whitespace, rounded cards, soft shadows, big scannable comparison
  tables, **obvious coral CTAs**, friendly icons. Accessible (WCAG AA), fast, mobile-first.
- Logo: "Healthy Pets" wordmark + a simple paw-in-leaf mark (make a clean SVG).

## Core components (build these)
- **Header:** logo, nav (Cats, Dogs, Flea & Worming, Supplements, Food, Guides), search, sticky on scroll.
- **CTAButton:** coral, label like **"Check price at Pet Direct →"**; `target="_blank" rel="sponsored nofollow"`.
- **ComparisonTable:** responsive (cards on mobile, table on desktop) — columns: Product, Best for,
  Protects against, Price (NZ$), Rating, CTA. Highlight a "Top pick" row.
- **TopPick cards:** a **Budget pick** and a **Premium pick** side by side, each with image, one-liner, CTA.
- **FAQ:** shadcn accordion.
- **EmailCapture:** friendly inline + exit-intent style block — headline "Never forget a flea
  treatment again", offer the **free NZ Flea & Worming Reminder Calendar**, email field + button.
- **AffiliateDisclosure:** subtle banner at top of money pages ("We may earn a commission… at no
  extra cost to you").
- **VetReviewed badge** + **author byline** (E-E-A-T trust signals).
- **Footer:** territories, About, Editorial policy, Affiliate disclosure, Privacy, Contact, socials.

## Homepage sections
1. Hero: warm headline (e.g. *"Honest pet-health advice for Kiwi cat & dog owners"*), subhead,
   primary search/CTA, friendly hero image of a NZ cat + dog.
2. Featured territories grid (Flea & Worming, Joint & Mobility, Gut Health, Skin & Coat, Dental, Food)
   — icon cards linking to category hubs.
3. "Most popular guides" — 3–4 pillar cards (with thumbnail, title, read-time).
4. Trust strip: "Vet-reviewed · NZ products & prices · Independent & honest".
5. Email-capture band (reminder calendar).
6. Short "Why Healthy Pets" blurb + footer.

## Pillar template — example content to render
Title: **Best Flea Treatments for Cats (NZ 2026)**
- Answer-first intro (2–3 sentences): the quick verdict + that fleas live mostly in the home.
- Affiliate disclosure.
- ComparisonTable with these real NZ cat flea products (use plausible NZ$ prices):
  - **Revolution Plus** — flea + worms + ticks + mites (premium all-in-one) — Top pick
  - **Advantage** — flea only, fast, affordable (budget pick)
  - **Bravecto Plus** — long-lasting (3-month) spot-on
  - **Frontline Plus** — widely available flea + tick
- Budget pick (Advantage) + Premium pick (Revolution Plus) cards.
- "How to actually get rid of fleas" mini-guide (treat the cat + treat the home + comb).
- **Complete flea protocol** cross-sell module (treatment + home spray + flea comb + skin relief).
- FAQ: "How often should I treat my cat?", "Is it safe for kittens?", "Spot-on vs tablet?",
  "Why do fleas keep coming back?".
- Email capture (reminder calendar).
- Related articles (spokes): flea+worm combos, natural flea treatment, fleas in the house.

## Article (spoke) template
H1, answer-first intro, scannable H2 sections, inline product mentions with CTAs, a "link up to
pillar" callout, email capture, disclosure, author + vet-reviewed byline.

## Rules
- Mobile-first; perfect Core Web Vitals; `next/image`; self-hosted fonts; no layout shift.
- Every money page: answer the reader's question first, give a clear recommendation (budget +
  premium), NZ retailers & NZ$ pricing, vet-informed reassurance, disclosure, email capture.
- YMYL-aware: no human-medication dosing, no unsupported medical claims; "talk to your vet" where
  appropriate; cite reputable sources.
- Output clean, componentised code I can drop into a Next.js App Router project, with the Tailwind
  theme tokens configured and shadcn/ui set up. Show the homepage and the cat-flea pillar fully built.
