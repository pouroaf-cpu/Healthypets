# Healthy Pets (healthypets.co.nz) — Project File

> **Brand: Healthy Pets · domain: healthypets.co.nz** (confirmed available, June 2026 — register before building).
> NZ pet health & nutrition **affiliate content hub**. Planning phase.
> Created June 2026. Companion research lives in `/research`. Strategy detail in the
> Niche Detector build plan (`niche-detector/docs/pet-health-hub-plan.md`).

## Background

This project came out of the Niche Detector pipeline, which scanned ~10,000 NZ keyword
candidates and — after filtering for recurring-use behaviour, low competition, non-YMYL
suitability, and **confirmed affiliate availability** — surfaced pet health as the
strongest NZ-only opportunity.

The thesis: New Zealand's single niches are too thin to carry a site alone, but the
**recurring pet-health categories bundle into a real market (~65,000+ NZ searches/month)**,
they have **near-zero SEO difficulty**, and the monetisation path is **verified** — NZ
affiliate programs exist (Pet Direct via Linkshop, Petstock via Commission Factory, plus
Amazon Associates). Pet owners re-buy flea/worming/supplements every 1–3 months, so the
audience returns.

## What we're building

A content + affiliate **authority hub** (NOT a retailer). We partner with NZ pet
retailers and earn commission on the baskets we send them. Four content territories:

1. **Parasite control** (money core) — cat/dog flea, flea+worm combos, worming, tick.
2. **Supplements & health products** (money) — joint, gut, skin, dental, calming.
3. **Food** (traffic + light money) — best food, life-stage, grain-free.
4. **Pet health Q&A** (traffic feeder) — "can I give my pet X", safety, symptoms.

**Pillar (first build):** Cat flea treatment — biggest category (28.5k/mo) and
under-served vs dogs.

## How we make money

Affiliate commission (~3–7% of cart) on referred sales. Key mechanics:
- Whole-cart commission → build multi-item baskets ("complete flea protocol").
- 30-day cookie → recurring sales need **email capture + re-treat reminders** and
  **subscription/auto-ship products** (recurring commission where available).

## Status & next steps

- [x] Market validated (Niche Detector wide run + Tier-2 deep dive)
- [x] Affiliate availability confirmed (Pet Direct, Petstock, Commission Factory)
- [x] Build plan drafted (`niche-detector/docs/pet-health-hub-plan.md`)
- [x] Brand name chosen: **Healthy Pets / healthypets.co.nz** (available — needs registering)
- [ ] Register healthypets.co.nz (+ .nz) at a NZ registrar
- [x] Competitor + long-tail keyword research (`research/competitor-keywords.xlsx`)
- [x] Content map: 13 pillars + 18 spokes across 9 territories (`content-map.md`, `research/content-queue.xlsx`)
- [ ] Build site (CMS, email capture, affiliate applications)
- [ ] Write Phase-1 articles (parasite core)

## Folder

```
pet-health-hub/
  PROJECT.md      ← this file
  NAMES.md        ← brand name shortlist
  audience-persona.md ← THE brief: who we write for + non-negotiable content rules for AI
  audience-interests.md ← what they search + what else they're into (behaviour/interests)
  content-map.md  ← site architecture: pillars + spokes per territory, linking, build order
  site-spec.md    ← tech stack + theme + design system + launch checklist
  wireframes.md   ← page wireframes (mobile-first) + build rules (SEO, shared layout, a11y)
  design-prompt.md ← copy-paste brief for Claude Design
  research/
    competitor-keywords.xlsx   ← top-5 NZ competitors, keywords, 108 long-tail + NZ volume
    content-queue.xlsx         ← trackable article queue (phase, type, title, keyword, status)
```
