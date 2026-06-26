// Fetches high-quality, commercial-use photos from Pexels for every id in
// scripts/image-spec.json, downloads them into public/images, and writes the
// manifest lib/images.generated.json (consumed by lib/images.ts -> <Figure>).
//
// Pexels License: free for commercial use, no attribution required. We still
// store the photographer + photo URL as a light credit.
//
// Key: PEXELS_API_KEY (from env or .env.local). Get one at https://www.pexels.com/api/
//
// Run:  node scripts/fetch-pexels.mjs            (fetch ids not already on Pexels)
//       node scripts/fetch-pexels.mjs --force     (re-fetch everything)
//       node scripts/fetch-pexels.mjs --only=id1,id2

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SPEC = path.join(ROOT, "scripts", "image-spec.json");
const OUT_DIR = path.join(ROOT, "public", "images");
const MANIFEST = path.join(ROOT, "lib", "images.generated.json");

let KEY = process.env.PEXELS_API_KEY;
if (!KEY) {
  try {
    const m = fs.readFileSync(path.join(ROOT, ".env.local"), "utf8").match(/^PEXELS_API_KEY=(.+)$/m);
    if (m) KEY = m[1].trim();
  } catch {}
}
if (!KEY) { console.error("No PEXELS_API_KEY in env or .env.local"); process.exit(1); }

const FORCE = process.argv.includes("--force");
const ONLY = process.argv.find((a) => a.startsWith("--only="));
const onlyIds = ONLY ? ONLY.split("=")[1].split(",") : null;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const orient = (a) => (a === "tall" ? "portrait" : a === "square" ? "square" : "landscape");

const spec = JSON.parse(fs.readFileSync(SPEC, "utf8"));
fs.mkdirSync(OUT_DIR, { recursive: true });
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};

async function searchPexels(query, aspect) {
  const params = new URLSearchParams({ query, orientation: orient(aspect), per_page: "12", size: "large" });
  const res = await fetch("https://api.pexels.com/v1/search?" + params, { headers: { Authorization: KEY } });
  if (!res.ok) throw new Error("Pexels " + res.status + " " + (await res.text()).slice(0, 120));
  return (await res.json()).photos || [];
}
async function download(url, dest) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("download " + res.status);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(dest, buf);
  return buf.length;
}

// Track photos already used so different guides never share the same image.
const usedPhotoIds = new Set();
for (const m of Object.values(manifest)) {
  const u = m && m.credit && m.credit.sourceUrl && m.credit.sourceUrl.match(/-(\d+)\/?$/);
  if (u) usedPhotoIds.add(u[1]);
}

let done = 0, failed = 0, skipped = 0;
for (const item of spec) {
  if (onlyIds && !onlyIds.includes(item.id)) continue;
  const dest = path.join(OUT_DIR, item.id + ".jpg");
  const cur = manifest[item.id];
  if (!FORCE && !onlyIds && cur && cur.credit && cur.credit.license === "Pexels" && fs.existsSync(dest)) { skipped++; continue; }
  try {
    const photos = await searchPexels(item.query, item.aspect);
    if (!photos.length) { console.log("NO RESULTS:", item.id, "(" + item.query + ")"); failed++; continue; }
    const p = photos.find((ph) => !usedPhotoIds.has(String(ph.id))) || photos[0];
    usedPhotoIds.add(String(p.id));
    const src = p.src.large2x || p.src.large || p.src.original;
    const kb = Math.round((await download(src, dest)) / 1024);
    manifest[item.id] = {
      src: "/images/" + item.id + ".jpg",
      alt: item.alt || p.alt || item.query,
      credit: { author: p.photographer, sourceUrl: p.url, license: "Pexels", licenseUrl: "https://www.pexels.com/license/" },
    };
    done++;
    console.log("OK  ", item.id, "<-", `"${item.query}"`, `(${p.photographer}, ${kb}kb)`);
    await sleep(250);
  } catch (e) {
    console.log("FAIL", item.id, e.message);
    failed++;
    await sleep(500);
  }
}
fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
console.log(`\nDone: ${done} fetched, ${skipped} skipped, ${failed} failed.`);
