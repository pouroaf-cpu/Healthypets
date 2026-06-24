// Fetches free, commercial-use, CC/public-domain photos from Openverse for every id in
// scripts/image-spec.json, downloads them into public/images, and writes the manifest
// lib/images.generated.json (consumed by lib/images.ts -> <Figure>).
//
// Run:  node scripts/fetch-images.mjs          (skips ids already downloaded)
//       node scripts/fetch-images.mjs --force   (re-fetch everything)
//
// No API key required. Openverse: https://api.openverse.org/v1/images/
// We only request license_type=commercial and licenses cc0,pdm,by (attribution shown).

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SPEC = path.join(ROOT, "scripts", "image-spec.json");
const OUT_DIR = path.join(ROOT, "public", "images");
const MANIFEST = path.join(ROOT, "lib", "images.generated.json");
const UA = "HealthyPetsNZ/1.0 (https://healthypets.co.nz; pouroaf@gmail.com)";
const FORCE = process.argv.includes("--force");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function fmtLicense(lic, ver) {
  const L = (lic || "").toLowerCase();
  if (L === "cc0") return { label: "CC0", url: "https://creativecommons.org/publicdomain/zero/1.0/" };
  if (L === "pdm") return { label: "Public Domain", url: "https://creativecommons.org/publicdomain/mark/1.0/" };
  if (L === "by") return { label: `CC BY ${ver || ""}`.trim(), url: `https://creativecommons.org/licenses/by/${ver || "4.0"}/` };
  return { label: (lic || "").toUpperCase(), url: undefined };
}

async function searchOpenverse(query, aspect) {
  const params = new URLSearchParams({
    q: query,
    license: "cc0,pdm,by",
    license_type: "commercial",
    mature: "false",
    page_size: "12",
    size: "large",
  });
  if (aspect) params.set("aspect_ratio", aspect); // wide | tall | square
  const url = `https://api.openverse.org/v1/images/?${params.toString()}`;
  const res = await fetch(url, { headers: { "User-Agent": UA, Accept: "application/json" } });
  if (!res.ok) throw new Error(`search ${res.status} for "${query}"`);
  const json = await res.json();
  return json.results || [];
}

async function downloadTo(file, url) {
  const res = await fetch(url, { headers: { "User-Agent": UA }, redirect: "follow" });
  if (!res.ok) return false;
  const type = res.headers.get("content-type") || "";
  if (!type.startsWith("image/")) return false;
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 6000) return false; // too small / broken
  fs.writeFileSync(file, buf);
  return true;
}

async function main() {
  if (!fs.existsSync(SPEC)) {
    console.error(`Missing ${SPEC}`);
    process.exit(1);
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const spec = JSON.parse(fs.readFileSync(SPEC, "utf-8"));
  const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf-8")) : {};
  const usedUrls = new Set(Object.values(manifest).map((m) => m._foreign).filter(Boolean));

  let done = 0, skipped = 0, failed = 0;
  for (const item of spec) {
    const { id, query, aspect, alt } = item;
    const file = path.join(OUT_DIR, `${id}.jpg`);
    if (!FORCE && manifest[id] && fs.existsSync(file)) {
      skipped++;
      continue;
    }
    try {
      const results = await searchOpenverse(query, aspect);
      let saved = null;
      for (const r of results) {
        const candidate = r.url || r.thumbnail;
        if (!candidate || usedUrls.has(r.foreign_landing_url || candidate)) continue;
        const ok = await downloadTo(file, candidate);
        if (ok) {
          const lic = fmtLicense(r.license, r.license_version);
          saved = {
            src: `/images/${id}.jpg`,
            alt: alt || query,
            credit: {
              author: r.creator || undefined,
              sourceUrl: r.foreign_landing_url || r.url || undefined,
              license: lic.label || undefined,
              licenseUrl: lic.url || undefined,
            },
            _foreign: r.foreign_landing_url || candidate,
          };
          usedUrls.add(saved._foreign);
          break;
        }
      }
      if (saved) {
        manifest[id] = saved;
        done++;
        console.log(`✓ ${id}  (${query})`);
      } else {
        failed++;
        console.log(`✗ ${id}  no usable result for "${query}"`);
      }
    } catch (e) {
      failed++;
      console.log(`✗ ${id}  ${e.message}`);
    }
    fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
    await sleep(1200); // be polite to the API (anonymous rate limit is low)
  }
  console.log(`\nDone. fetched=${done} skipped=${skipped} failed=${failed} total=${spec.length}`);
}

main();
