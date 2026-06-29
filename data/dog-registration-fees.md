# NZ Dog Registration Fees — data source & verification tracker

Backs the **Dog Registration Fee Calculator** (`/tools/dog-registration-fees`).
Machine-readable data lives in `data/dog-registration-fees.json`; this file tracks
**where each number came from and when it was last checked**.

## ⚠️ Verification protocol — RE-CHECK EVERY 1 JULY
NZ dog registration runs **1 July → 30 June**. Each council sets its own fees under the
**Dog Control Act 1996** and republishes them around **1 July**. So:

- The figures captured below are the **2025/26** year (valid to **30 Jun 2026**).
- **On/after 1 July 2026**, re-run the scraper for **2026/27** figures and update both this
  file (`Verified` date + `Year`) and the JSON (`lastVerified`, `year`, amounts).
- The calculator must show a **"fees verified for the 20xx/yy year — last checked <date>"**
  line + source link, and a soft warning if `lastVerified` is older than the current 1 July.

> Today is **2026-06-29** — the 2025/26 figures below expire in 2 days. First maintenance
> pass is due **2026-07-01** (and annually thereafter).

## How the data is pulled
1. `node scripts/fetch-council-fees.mjs <slug>` — Firecrawl-scrapes the council's fees page.
   - Default: `--format markdown` (works for static fee tables — most councils).
   - Fallback: `--format rawHtml` + table-parse for **JS-rendered** sites (e.g. Auckland).
   - Dumps the raw fee table to `scratchpad/` for **human review**.
2. A person maps each council's table into `data/dog-registration-fees.json` using the flexible
   schema (categories differ per council — see notes), filling `sourceUrl` + `lastVerified`.
   *Auto-extraction is assist-only: councils structure fees too differently to trust blindly
   (Hamilton uses Category 1/2, Christchurch pro-rates by month, Tauranga is a flat fee, etc.).*

## Schema notes (why it's flexible, not fixed columns)
Per-council categories vary. Common axes captured: `onTime` vs `late` fee, `desexed` vs
`entire`, responsible-owner scheme (named differently per council), working/rural rate,
disability-assist (usually free), plus `extras` (microchip, multi-dog permit, dangerous dog),
`cutoffDate`, `penaltyRule`, optional `proRataByMonth`.

**Also collect (added 2026-06-30):**
- `responsibleOwnerScheme: { name, applicationFee, url }` — the council's good-owner discount
  scheme. Powers the info box that pops up when the "responsible owner" toggle is on. Capture the
  scheme's own page URL + any per-council qualifying criteria where available (generic criteria
  live in `lib/dog-reg-fees.ts RESPONSIBLE_OWNER_CRITERIA` for now).
- `dangerousDog: { onTime, late }` — the dangerous-dog registration fee (varies per council; the
  menacing *breed* list is national, see `MENACING_BREEDS`, so it is NOT per-council data).

---

## Councils (67 territorial authorities)
Status: ✅ verified · ⬜ to do · ⚠️ needs attention (JS page / unusual structure)

| # | Council | Fees page | Verified | Yr | Status |
|---|---------|-----------|----------|----|--------|
| 1 | Far North District | | | | ⬜ |
| 2 | Whangārei District | | | | ⬜ |
| 3 | Kaipara District | | | | ⬜ |
| 4 | Auckland (unitary) | https://www.aucklandcouncil.govt.nz/en/dogs-animals/register-your-dog/dog-registration-discounts.html | 2026-06-29 | 25/26 | ✅ ⚠️ JS — needs rawHtml parse |
| 5 | Thames-Coromandel District | | | | ⬜ |
| 6 | Hauraki District | | | | ⬜ |
| 7 | Waikato District | | | | ⬜ |
| 8 | Matamata-Piako District | | | | ⬜ |
| 9 | Hamilton City | https://hamilton.govt.nz/do-it-online/pay-it/renew-a-dog-registration | 2026-06-29 | 25/26 | ✅ (Category 1/2 scheme) |
| 10 | Waipā District | | | | ⬜ |
| 11 | Ōtorohanga District | | | | ⬜ |
| 12 | Waitomo District | | | | ⬜ |
| 13 | South Waikato District | | | | ⬜ |
| 14 | Taupō District | | | | ⬜ |
| 15 | Western Bay of Plenty District | | | | ⬜ |
| 16 | Tauranga City | https://www.tauranga.govt.nz/Council/Fees-and-charges/Animal-service-fees | 2026-06-29 | 25/26 | ✅ (flat fee, no desexed split) |
| 17 | Rotorua Lakes (District) | | | | ⬜ |
| 18 | Whakatāne District | | | | ⬜ |
| 19 | Kawerau District | | | | ⬜ |
| 20 | Ōpōtiki District | | | | ⬜ |
| 21 | Gisborne (unitary) | | | | ⬜ |
| 22 | Wairoa District | | | | ⬜ |
| 23 | Hastings District | | | | ⬜ |
| 24 | Napier City | | | | ⬜ |
| 25 | Central Hawke's Bay District | | | | ⬜ |
| 26 | New Plymouth District | | | | ⬜ |
| 27 | Stratford District | | | | ⬜ |
| 28 | South Taranaki District | | | | ⬜ |
| 29 | Ruapehu District | | | | ⬜ |
| 30 | Whanganui District | | | | ⬜ |
| 31 | Rangitīkei District | | | | ⬜ |
| 32 | Manawatū District | | | | ⬜ |
| 33 | Palmerston North City | | | | ⬜ |
| 34 | Tararua District | | | | ⬜ |
| 35 | Horowhenua District | | | | ⬜ |
| 36 | Kāpiti Coast District | | | | ⬜ |
| 37 | Porirua City | | | | ⬜ |
| 38 | Upper Hutt City | | | | ⬜ |
| 39 | Lower Hutt / Hutt City | | | | ⬜ |
| 40 | Wellington City | https://wellington.govt.nz/dogs-and-other-animals/dogs/register-your-dog/fees | 2026-06-29 | 25/26 | ✅ |
| 41 | Masterton District | | | | ⬜ |
| 42 | Carterton District | | | | ⬜ |
| 43 | South Wairarapa District | | | | ⬜ |
| 44 | Tasman (unitary) | | | | ⬜ |
| 45 | Nelson City (unitary) | | | | ⬜ |
| 46 | Marlborough (unitary) | | | | ⬜ |
| 47 | Kaikōura District | | | | ⬜ |
| 48 | Buller District | | | | ⬜ |
| 49 | Grey District | | | | ⬜ |
| 50 | Westland District | | | | ⬜ |
| 51 | Hurunui District | | | | ⬜ |
| 52 | Waimakariri District | | | | ⬜ |
| 53 | Christchurch City | https://ccc.govt.nz/the-council/plans-strategies-policies-and-bylaws/plans/long-term-plan-and-annual-plans/fees-and-charges/fees-animal-management | 2026-06-29 | 25/26 | ✅ (pro-rata by month) |
| 54 | Selwyn District | | | | ⬜ |
| 55 | Ashburton District | | | | ⬜ |
| 56 | Timaru District | | | | ⬜ |
| 57 | Mackenzie District | | | | ⬜ |
| 58 | Waimate District | | | | ⬜ |
| 59 | Waitaki District | | | | ⬜ |
| 60 | Central Otago District | | | | ⬜ |
| 61 | Queenstown-Lakes District | | | | ⬜ |
| 62 | Dunedin City | | | | ⬜ |
| 63 | Clutha District | | | | ⬜ |
| 64 | Southland District | | | | ⬜ |
| 65 | Gore District | | | | ⬜ |
| 66 | Invercargill City | | | | ⬜ |
| 67 | Chatham Islands (territory) | | | | ⬜ |

**Progress: 13 / 67 verified.** 2026-06-29: Auckland, Wellington, Christchurch, Hamilton, Tauranga.
2026-06-30: Palmerston North, Lower Hutt, Nelson, Whangārei, Hastings (2025/26 — re-check 1 Jul);
Taupō, Selwyn, Rotorua (already on **2026/27**, no re-check needed).
Remaining 54 + the five 2025/26 ones → bulk pass on/after **1 July 2026** (TASK 2).
Still need re-targeting (wrong page / JS / PDF): Dunedin, Queenstown, Kāpiti, Porirua, Marlborough,
Waimakariri, Gisborne, Invercargill, New Plymouth, Napier, Western Bay of Plenty, Waikato District.
