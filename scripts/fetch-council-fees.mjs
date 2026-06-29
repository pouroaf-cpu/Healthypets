// Scrape-assist for NZ council dog registration fees.
// For each council name passed (or a built-in batch), Firecrawl-searches its fees page,
// scrapes it (markdown, with a rawHtml table-parse fallback for JS sites), and prints the
// fee lines for human review. Dumps full markdown to scratchpad for mapping into
// data/dog-registration-fees.json. Does NOT write the dataset — mapping is by hand
// (councils differ too much to trust auto-extraction).
//
// Usage: node scripts/fetch-council-fees.mjs "Napier City" "Dunedin City" ...
//        node scripts/fetch-council-fees.mjs            (runs the built-in batch)
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const OUT = "C:/Users/PFrew/AppData/Local/Temp/claude/C--Users-PFrew-Projects-Healthypets/45472aec-64cb-486e-b7e4-e7e8457cf953/scratchpad/councils";
fs.mkdirSync(OUT, { recursive: true });

const BATCH = [
  "Whangarei District", "Waikato District", "Hamilton-adjacent Waipa District", "Tauranga-adjacent Western Bay of Plenty District",
  "Rotorua Lakes", "Taupo District", "Hastings District", "Napier City", "New Plymouth District",
  "Palmerston North City", "Kapiti Coast District", "Porirua City", "Hutt City Lower Hutt", "Upper Hutt City",
  "Nelson City", "Marlborough District", "Selwyn District", "Waimakariri District", "Queenstown-Lakes District",
  "Dunedin City", "Invercargill City",
];

const fc = (cmd) => execSync(`firecrawl ${cmd}`, { encoding: "utf8", maxBuffer: 1 << 28 });
const safeJSON = (s) => { try { return JSON.parse(s); } catch { return null; } };
const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

function findFeesUrl(name) {
  const web = safeJSON(fc(`search ${JSON.stringify(name + " dog registration fees")} --limit 6 --json`))?.data?.web || [];
  // prefer a council .govt.nz/.nz page whose path looks like dog/animal fees
  const gov = web.filter((r) => /\.govt\.nz|council\.nz|\.co\.nz/.test(r.url || "") && !/wikipedia|facebook|reddit|petmall|rnz/.test(r.url));
  const feeish = gov.find((r) => /dog|animal|registration|fee/i.test(r.url));
  return (feeish || gov[0] || web[0] || {}).url || "";
}
function feeLines(md) {
  return md.split("\n").filter((l) => /\$[0-9]/.test(l) && !/\$[0-9].{0,3}(million|m\b|,000,000)/i.test(l)).map((l) => l.trim()).slice(0, 22);
}

const names = process.argv.slice(2).length ? process.argv.slice(2) : BATCH;
for (const name of names) {
  console.log("\n========== " + name + " ==========");
  let url = "";
  try {
    url = findFeesUrl(name);
    if (!url) { console.log("  (no fees page found)"); continue; }
    console.log("  URL: " + url.split("?")[0]);
    let md = fc(`scrape ${JSON.stringify(url.split("?")[0])} --format markdown --only-main-content`);
    let lines = feeLines(md);
    if (!lines.length) {
      // JS page fallback: parse table rows from rawHtml
      const raw = fc(`scrape ${JSON.stringify(url.split("?")[0])} --format rawHtml --wait-for 3500`);
      const strip = (s) => s.replace(/<[^>]+>/g, " ").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
      lines = [...raw.matchAll(/<tr[\s\S]*?<\/tr>/gi)].map((m) => [...m[0].matchAll(/<t[dh][\s\S]*?<\/t[dh]>/gi)].map((c) => strip(c[0])).filter(Boolean).join(" | ")).filter((l) => /\$[0-9]|desex|entire|working|registration/i.test(l)).slice(0, 22);
      md = raw;
    }
    fs.writeFileSync(path.join(OUT, slug(name) + ".txt"), "URL: " + url + "\n\n" + md.slice(0, 12000));
    console.log(lines.length ? lines.map((l) => "  " + l).join("\n") : "  (no fee lines extracted — check scratchpad dump)");
  } catch (e) {
    console.log("  ERROR: " + String(e.message || e).slice(0, 100));
  }
}
