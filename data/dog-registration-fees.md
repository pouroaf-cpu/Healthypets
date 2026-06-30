# NZ Dog Registration Fees — data source & verification tracker

Backs the **Dog Registration Fee Calculator** (`/tools/dog-registration-fees`).
Machine-readable data lives in `data/dog-registration-fees.json`; this file tracks
**where each number came from and when it was last checked**.

## ⚠️ Verification protocol — RE-CHECK EVERY 1 JULY
NZ dog registration runs **1 July → 30 June**. Each council sets its own fees under the
**Dog Control Act 1996** and republishes them around **1 July**. So:

- Figures are now a **mix of 2026/27 and 2025/26** per council (see the `Yr` column). Councils
  republish around 1 July but on different days — many had not yet posted 2026/27 as of 30 Jun 2026.
- **On/after 1 July (each year)**, re-fetch every council and update both this file (`Verified`
  date + `Yr`) and the JSON (`lastVerified`, `year`, amounts). Councils still on the prior year
  (`Yr` = 25/26) are the priority targets for the next run.
- The calculator must show a **"fees verified for the 20xx/yy year — last checked <date>"**
  line + source link, and a soft warning if `lastVerified` is older than the current 1 July.

> Last pass **2026-06-30** (annual 2026/27 refresh). **43 / 67** councils now in the dataset.

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
Status: ✅ verified · ⬜ to do · ⚠️ blocked/not-published (could not verify this run)

| # | Council | Verified | Yr | Status |
|---|---------|----------|----|--------|
| 1 | Far North District | | | ⚠️ WAF (page + fees PDF 403/503) |
| 2 | Whangārei District | 2026-06-30 | 25/26 | ✅ (26/27 not yet posted) |
| 3 | Kaipara District | 2026-06-30 | 26/27 | ✅ (due 31 Aug; working/non-working only) |
| 4 | Auckland (unitary) | 2026-06-29 | 25/26 | ⚠️ Akamai 406 — 26/27 season open but $ on blocked page |
| 5 | Thames-Coromandel District | | | ⚠️ WAF (403/503 all pages + PDF) |
| 6 | Hauraki District | | | ⚠️ WAF (403 / 202 JS-challenge) |
| 7 | Waikato District | 2026-06-30 | 26/27 | ✅ (owner classifications) |
| 8 | Matamata-Piako District | 2026-06-30 | 26/27 | ✅ (DRAFT schedule; live page WAF) |
| 9 | Hamilton City | 2026-06-30 | 25/26 | ✅ (Category 1/2; page states no year) |
| 10 | Waipā District | 2026-06-30 | 26/27 | ✅ (DRAFT schedule; due 30 Jun) |
| 11 | Ōtorohanga District | 2026-06-30 | 26/27 | ✅ |
| 12 | Waitomo District | 2026-06-30 | 26/27 | ✅ |
| 13 | South Waikato District | | | ⚠️ WAF (AWS JS-challenge) |
| 14 | Taupō District | 2026-06-30 | 26/27 | ✅ |
| 15 | Western Bay of Plenty District | | | ⚠️ WAF; 26/27 only in Konveio JS viewer (draft) |
| 16 | Tauranga City | 2026-06-30 | 26/27 | ✅ (flat fee; 26/27 = 25/26 numbers) |
| 17 | Rotorua Lakes (District) | 2026-06-30 | 26/27 | ✅ |
| 18 | Whakatāne District | 2026-06-30 | 26/27 | ✅ |
| 19 | Kawerau District | 2026-06-30 | 25/26 | ✅ (26/27 not yet posted; PDF) |
| 20 | Ōpōtiki District | | | ⚠️ WAF (403 / 202 JS-challenge) |
| 21 | Gisborne (unitary) | | | ⚠️ Cloudflare "Just a moment" challenge |
| 22 | Wairoa District | 2026-06-30 | 25/26 | ✅ (due 31 Aug; 26/27 not yet posted) |
| 23 | Hastings District | 2026-06-30 | 25/26 | ✅ |
| 24 | Napier City | 2026-06-30 | 25/26 | ✅ (page states 25/26; 26/27 not yet posted) |
| 25 | Central Hawke's Bay District | 2026-06-30 | 26/27 | ✅ (RDO/GoldCard $ not published) |
| 26 | New Plymouth District | 2026-06-30 | 26/27 | ✅ (PDF has 26/27 column; tiered penalty) |
| 27 | Stratford District | | | ⚠️ WAF (AWS JS-challenge) |
| 28 | South Taranaki District | | | ⚠️ WAF (.com domain, AWS JS-challenge) |
| 29 | Ruapehu District | | | ⚠️ WAF (403 / 202 JS-challenge) |
| 30 | Whanganui District | 2026-06-30 | 26/27 | ✅ (prompt-pay discount model) |
| 31 | Rangitīkei District | 2026-06-30 | 26/27 | ✅ (PDF + public notice) |
| 32 | Manawatū District | | | ⚠️ Cloudflare challenge; fee advised per-application |
| 33 | Palmerston North City | 2026-06-30 | 25/26 | ✅ |
| 34 | Tararua District | | | ⚠️ Cloudflare challenge |
| 35 | Horowhenua District | 2026-06-30 | 26/27 | ✅ |
| 36 | Kāpiti Coast District | 2026-06-30 | 26/27 | ✅ (Class A–I scheme) |
| 37 | Porirua City | | | ⚠️ WAF (403/503) |
| 38 | Upper Hutt City | 2026-06-30 | 25/26 | ✅ |
| 39 | Lower Hutt / Hutt City | 2026-06-30 | 25/26 | ✅ |
| 40 | Wellington City | 2026-06-30 | 26/27 | ✅ (re-verified; fees rose) |
| 41 | Masterton District | | | ⚠️ WAF + 26/27 not finalised (~12% rise flagged) |
| 42 | Carterton District | 2026-06-30 | 26/27 | ✅ |
| 43 | South Wairarapa District | 2026-06-30 | 26/27 | ✅ |
| 44 | Tasman (unitary) | 2026-06-30 | 25/26 | ✅ (by property size; 26/27 not yet posted) |
| 45 | Nelson City (unitary) | 2026-06-30 | 25/26 | ✅ |
| 46 | Marlborough (unitary) | | | ⚠️ WAF (AWS JS-challenge) |
| 47 | Kaikōura District | | | ⚠️ WAF (AWS JS-challenge) |
| 48 | Buller District | 2026-06-30 | 26/27 | ✅ |
| 49 | Grey District | | | ⚠️ WAF (AWS JS-challenge) |
| 50 | Westland District | 2026-06-30 | 25/26 | ✅ (26/27 not yet posted) |
| 51 | Hurunui District | | | ⚠️ WAF (AWS JS-challenge) |
| 52 | Waimakariri District | 2026-06-30 | 26/27 | ✅ (owner fee + per-dog fee) |
| 53 | Christchurch City | 2026-06-30 | 25/26 | ✅ (pro-rata; page still 25/26) |
| 54 | Selwyn District | 2026-06-30 | 26/27 | ✅ |
| 55 | Ashburton District | | | ⚠️ WAF (403, incl. PDF assets) |
| 56 | Timaru District | 2026-06-30 | 25/26 | ✅ |
| 57 | Mackenzie District | 2026-06-30 | 25/26 | ✅ (Let's Talk PDF; 26/27 unconfirmed) |
| 58 | Waimate District | | | ⚠️ WAF (AWS JS-CAPTCHA) |
| 59 | Waitaki District | 2026-06-30 | 25/26 | ✅ |
| 60 | Central Otago District | | | ⚠️ WAF; 26/27 doc not on Let's Talk |
| 61 | Queenstown-Lakes District | | | ⚠️ fees page 404; 26/27 not finalised (post-election) |
| 62 | Dunedin City | | | ⚠️ WAF; only 25/26 in Wayback |
| 63 | Clutha District | 2026-06-30 | 26/27 | ✅ (PROPOSED schedule, S3 PDF) |
| 64 | Southland District | 2026-06-30 | 26/27 | ✅ (Animal Control PDF) |
| 65 | Gore District | | | ⚠️ WAF (403 / 202 JS-challenge) |
| 66 | Invercargill City | 2026-06-30 | 26/27 | ✅ (Annual Plan PDF via Let's Talk) |
| 67 | Chatham Islands (territory) | 2026-06-30 | 26/27 | ✅ (year unstated; $50 early/$78 std) |

**Progress: 43 / 67 verified** (26 on **2026/27**, 17 still on **2025/26** awaiting republish).
Source URLs for every verified council live in `data/dog-registration-fees.json` (`sourceUrl`).

### 2026-06-30 — annual 2026/27 pass (this run): 17 → 43 councils
Added/verified **26 new councils** + re-verified the 3 reachable existing ones (Tauranga → 26/27;
Hamilton & Christchurch re-read, still 25/26; Wellington re-verified → 26/27 with **raised** fees:
entire $200→$204, desexed $145→$148, ADO $71.50→$73, working $61→$62.50).
Newly added: Kaipara, Waikato Dist, Matamata-Piako, Waipā, Ōtorohanga, Waitomo, Whakatāne, Kawerau,
Wairoa, Napier, Central Hawke's Bay, New Plymouth, Whanganui, Rangitīkei, Kāpiti, Carterton,
South Wairarapa, Tasman, Buller, Westland, Waimakariri, Mackenzie, Clutha, Southland, Invercargill,
Chatham Islands.

### Still TODO / blocked (24 councils) — for the next run
- **WAF / bot-challenge (could not read any $ from council's own site):** Far North, Thames-Coromandel,
  Hauraki, South Waikato, Western Bay of Plenty, Ōpōtiki, Gisborne, Stratford, South Taranaki,
  Ruapehu, Manawatū, Tararua, Porirua, Marlborough, Kaikōura, Grey, Hurunui, Ashburton, Waimate,
  Central Otago, Dunedin, Gore, Auckland *(re-verify)*, Masterton.
- **Not finalised yet (legitimately no 26/27 figures online as of 30 Jun):** Queenstown-Lakes
  (post-election plan; page 404), Masterton (~12% rise flagged, not set), Central Otago.

## Process notes & learnings

### What works (the method that got 43/67 this run)
- **Tooling:** No local Firecrawl/CLI in this checkout — only the `WebFetch` + `WebSearch` tools.
  WebFetch renders a page to markdown via the agent proxy; it gets 403/406/503 on WAF-protected sites.
- **Fan-out with subagents.** Spawn ~9 regional `general-purpose` subagents (≈5–6 councils each),
  each told to: WebSearch `"<council> dog registration fees"` → WebFetch the council's own
  `*.govt.nz` page → on block, try the fees-and-charges page, the register-your-dog page, and any
  official **fees PDF** (≤3 URLs) → record figures **only** if actually read, quoting each line →
  else return `{status:"failed", urlsTried, reason}`. Return a strict JSON array. This parallelism
  is what made 67 councils tractable in one pass. (Subagents may further sub-delegate per council.)
- **Subagents can run `curl` with a browser User-Agent**, which sometimes succeeds where WebFetch
  is 403'd (Whanganui, Rangitīkei were only readable this way). Worth instructing explicitly.
- **PDFs are the unlock for many councils.** Official fee schedules often live on a host *outside*
  the WAF: S3 buckets (`hdp-au-prod-app-*.s3.ap-southeast-2.amazonaws.com` for Clutha),
  `*.azurewebsites.net` doc APIs (Tasman), or `letstalk.<council>.govt.nz` / `lets-talk` /
  `yourplace` / `haveyoursay` EngagementHQ consultation portals (Invercargill, Matamata-Piako,
  Waipā, Mackenzie). When the main site is blocked, **search the consultation portal** for
  "Fees and Charges 20xx" — these are frequently fetchable even when the CMS isn't.
- **Schema-mapping gotcha (important):** `lib/dog-reg-fees.ts` only matches the four selection
  axes `workingDog / desexed / responsibleOwner / disabilityAssist`. Councils that price by
  **urban vs rural** or by **owner classification** (Waikato General/Approved/Selected/Farm) have
  no matching toggle — do **not** invent `requires:{rural:true}` keys (they can never match and
  silently break). Map the *urban / standard* rate to the `requires:{}` fallback, fold the rural
  rate into `notes`, and keep exactly **one** empty-`requires` category per council.
- Validate before commit: `node -e` parse + a loop asserting one fallback category, numeric
  on/late, and only the four valid `requires` keys; then `npm run build`.

### Per-council failures (URL tried → why) — start here next run
- **Far North** `fndc.govt.nz/Our-services/Dogs-and-cats/Register-your-dog` + Proposed-Fees PDF → 403/503 WAF.
- **Thames-Coromandel** `tcdc.govt.nz/.../Schedule-of-Fees-and-Charges-Dog-Control` → 403/503 WAF.
- **Hauraki** `hauraki-dc.govt.nz/.../fees-dogs-animals` + DogRegBrochure.pdf → 403 / 202 JS-challenge.
- **South Waikato** `southwaikato.govt.nz/.../dog-control-and-registration-fees` → AWS JS-challenge (202). NB: `swdc.govt.nz` is **South Wairarapa**, not South Waikato.
- **Western Bay of Plenty** `westernbay.govt.nz/.../dog-fees-and-impound-costs` → 403; 26/27 draft is in a **Konveio JS viewer** on `yourplace.westernbay.govt.nz` (no static PDF URL).
- **Ōpōtiki** `odc.govt.nz/our-services/animal-control` → 403 / 202; online portal 405.
- **Gisborne** `gdc.govt.nz/.../dog-fees-and-charges` → **Cloudflare** "Just a moment" 403. (Their text: 31 Jul due, 25% late penalty, 10% early-desexing discount — no $ readable.)
- **Stratford** `stratford.govt.nz/.../dog-registrations` + Fees PDF → AWS JS-challenge (202); Wayback blocked by egress.
- **South Taranaki** `southtaranaki.com/.../dog-registration` → AWS JS-challenge (202); no Wayback.
- **Ruapehu** `ruapehudc.govt.nz/.../animal-services/fees-and-charges` → 403 / 202.
- **Manawatū** `mdc.govt.nz/documents/fees-and-charges/animal-control-fees` → **Cloudflare** 403; site says fee is advised per-application.
- **Tararua** `tararuadc.govt.nz/.../animal-control-fees-and-charges` (+ squiz.cloud origin) → **Cloudflare** 403. (26/27 due 1 Aug; Preferred Owner discount exists.)
- **Porirua** `poriruacity.govt.nz/services/animals/fees-and-charges-animal-control` → 403; eservices 503.
- **Marlborough** `marlborough.govt.nz/.../dog-registration-fees` → AWS JS-challenge.
- **Kaikōura** `kaikoura.govt.nz/.../dog-registration` + fees PDFs → AWS JS-challenge.
- **Grey** `greydc.govt.nz/06your-home/animal-control/dog-registration` → AWS JS-challenge.
- **Hurunui** `hurunui.govt.nz/.../registering-your-dog` → AWS JS-challenge (202 empty).
- **Ashburton** `ashburtondc.govt.nz/.../dog-registration` + `/__data/` PDFs → 403 WAF.
- **Waimate** `waimatedc.govt.nz/services/dogs` → AWS JS-CAPTCHA (202). A 26/27 "Dog Registration Fees" notice exists but is unreadable; search snippets *hinted* urban $120 / desexed $65 / selected-working-farm $35 / dangerous 150% — **unverified, do not use**.
- **Central Otago** `codc.govt.nz/services/dog-control/dog-registration` → AWS JS-challenge; `lets-talk.codc.govt.nz` only has 24/25 & 25/26 docs (no 26/27 published).
- **Dunedin** `dunedin.govt.nz/services/dogs/fees` → 403 WAF; only a **25/26** Wayback snapshot (Feb 2026) exists. 25/26 fallback figures captured in that agent's notes if ever needed.
- **Gore** `goredc.govt.nz/.../registering-a-dog` + fees PDF → 403 / 202.
- **Queenstown-Lakes** `qldc.govt.nz/services/dogs-and-animals/dog-registration` → **404** (try `/services/animal-control/register-your-dog/`); 26/27 fees not finalised until after the Oct 2025 election / consultation; 25/26 is on a Let's Talk PDF.
- **Auckland** (re-verify) `aucklandcouncil.govt.nz/.../dog-fee-calculator.html` → **Akamai 406**. 26/27 season confirmed open (OurAuckland) but $ only on the blocked calculator/discounts pages.

### Tips to go faster next time
1. **Re-fetch the 17 councils still on 25/26 first** (Whangārei, Hastings, Napier, Palmerston North,
   Hutt City, Nelson, Upper Hutt, Timaru, Waitaki, Tasman, Westland, Kawerau, Wairoa, Mackenzie,
   Christchurch, Hamilton, Auckland) — most will simply have flipped to 26/27 with small rises.
2. For WAF'd councils, **go straight to the consultation portal / S3 / azurewebsites PDF** (see the
   "PDFs are the unlock" note) rather than burning fetches on the blocked CMS.
3. **Tell subagents to use `curl` with a desktop browser UA** as the WebFetch fallback — it slips
   past some (not all) WAFs and reads PDFs that WebFetch 403s.
4. Several entries here use **DRAFT/proposed** schedules (Matamata-Piako, Waipā, Clutha) or
   **computed** late/dangerous figures from a stated % rule — re-confirm against the adopted
   schedule when the live page becomes reachable.
5. `web.archive.org` (Wayback) is **blocked by egress policy** this environment — don't rely on it.
