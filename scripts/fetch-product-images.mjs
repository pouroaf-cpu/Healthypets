// Fetches accurate product packshots for the comparison tables.
//
// For each product in scripts/product-image-spec.json it:
//   1. firecrawl search  "<name> <species> site:<retailer>"  -> best product URL
//   2. firecrawl scrape  <url> --format images               -> og:image (the packshot)
//   3. downloads the image into public/product-images/<linkKey>.<ext> (ext sniffed from bytes)
//   4. records it in lib/product-images.generated.json: { linkKey: { src, alt, sourceUrl } }
//
// Isolated from the editorial image system (lib/images.*, public/images/**) on purpose.
// Idempotent: already-fetched keys are skipped unless --force.
//
// Usage:
//   node scripts/fetch-product-images.mjs                       # all missing
//   node scripts/fetch-product-images.mjs revolution,seresto    # only matching linkKeys
//   node scripts/fetch-product-images.mjs --force <filter>      # refetch matches
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SPEC = path.join(ROOT, "scripts", "product-image-spec.json");
const OUTDIR = path.join(ROOT, "public", "product-images");
const MANIFEST = path.join(ROOT, "lib", "product-images.generated.json");
const DOMAINS = { petdirect: "petdirect.co.nz", petstock: "petstock.co.nz", animates: "animates.co.nz", vetpost: "vetpost.co.nz" };

const argv = process.argv.slice(2);
const force = argv.includes("--force");
// --relax: soften the brand-token penalty and lower the accept thresholds to fill gaps where
// the retailer URL omits the brand name. The species guard stays on. Relaxed results are more
// likely to mis-match, so always eyeball them afterwards (and prune) before shipping.
const RELAX = argv.includes("--relax");
const filterArg = argv.find((a) => !a.startsWith("--"));
const tokens = filterArg ? filterArg.split(",").map((s) => s.trim()).filter(Boolean) : null;

fs.mkdirSync(OUTDIR, { recursive: true });
const spec = JSON.parse(fs.readFileSync(SPEC, "utf8"));
const manifest = fs.existsSync(MANIFEST) ? JSON.parse(fs.readFileSync(MANIFEST, "utf8")) : {};

const RETAILER_NAMES = { petdirect: "Pet Direct", petstock: "Petstock", animates: "Animates", vetpost: "Vetpost" };
const fc = (cmd) => execSync(`firecrawl ${cmd}`, { encoding: "utf8", maxBuffer: 1 << 28 });
const safeJSON = (s) => { try { return JSON.parse(s); } catch { return null; } };
const species = (k) => (k.endsWith("-cat") ? "cat" : k.endsWith("-dog") ? "dog" : "");
const stripQS = (u) => (u || "").split("?")[0];
const nameToks = (name) => name.toLowerCase().split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w));

function search(q) {
  return safeJSON(fc(`search ${JSON.stringify(q)} --limit 5 --json`))?.data?.web || [];
}
// Find the best product page: site-scoped first, then a looser fallback if that's empty.
function findUrl(item, domain) {
  let web = search(`${item.name} ${species(item.linkKey)} site:${domain}`.replace(/\s+/g, " ").trim());
  if (!web.length) web = search(`${item.name} ${species(item.linkKey)} ${RETAILER_NAMES[item.retailer]} NZ`.replace(/\s+/g, " ").trim());
  if (!web.length) return "";
  const toks = nameToks(item.name);
  const brand = toks[0]; // primary identifier — must be present, else it's a different product
  const onDomain = web.filter((r) => (r.url || "").includes(domain));
  const pool = onDomain.length ? onDomain : web;
  const scored = pool
    .map((r) => {
      const u = (r.url || "").toLowerCase();
      const t = (r.title || "").toLowerCase();
      let s = toks.filter((tk) => u.includes(tk) || t.includes(tk)).length;
      if (brand && !(u.includes(brand) || t.includes(brand))) s -= RELAX ? 1 : 3; // brand mismatch
      if (/\/(p|product|products)\//.test(u) || /\.html(\?|$)/.test(u)) s += 2; // product-page shapes
      if (/\/(brands?|category|categories|collections|health|search|c)\//.test(u)) s -= 2; // hub/category pages
      return { r, s };
    })
    .sort((a, b) => b.s - a.s);
  const best = scored[0];
  if (!best || best.s < (RELAX ? 0.5 : 1)) return "";
  try { if (!new URL(best.r.url).pathname.replace(/\/+$/, "")) return ""; } catch { return ""; } // reject homepage
  return best.r.url;
}
const unwrapNext = (u) => {
  const m = (u || "").match(/\/_next\/image\?url=([^&]+)/);
  return m ? decodeURIComponent(m[1]) : u;
};
// Pick the most likely product packshot from a scrape result.
// og:image is the product on most sites; where it's absent (Shopify/Next pages) we score
// each gallery image against the very specific product-page slug and hard-reject the wrong
// species, so a related-products carousel can't slip a dog packshot onto a cat page.
const STOP = new Set(["the", "for", "and", "spot", "spoton", "treatment", "pack", "size", "with", "solution", "flea", "tick", "worm"]);
const GENERIC_OG = /(share|placeholder|default|og-?image|social|logo)\.(jpe?g|png|webp)/i;
function pickProductImage(meta, item, pageUrl) {
  const md = meta.metadata || meta.data?.metadata || {};
  const abs = (u) => { try { return new URL(u, pageUrl).href; } catch { return ""; } };
  const og = md.ogImage || md["og:image"];
  if (og && !GENERIC_OG.test(og)) return abs(og);
  const imgs = (meta.images || meta.data?.images || []).map(unwrapNext);
  const slug = (pageUrl.split("/").pop() || "").toLowerCase();
  const slugToks = slug.split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w));
  const wantCat = /(^|-)cats?(-|$)/.test(slug);
  const wantDog = /(^|-)dogs?(-|$)/.test(slug);
  const bad = /(logo|badge|icon|sprite|how_to|blog|placeholder|google.?play|app.?store|favicon|\.svg)/i;
  const scored = imgs
    .filter((u) => !bad.test(u) && /\.(jpe?g|png|webp)/i.test(u))
    .map((u) => {
      const lu = u.toLowerCase();
      if (wantCat && /dog/.test(lu) && !/cat/.test(lu)) return { u, s: -100 };
      if (wantDog && /cat/.test(lu) && !/dog/.test(lu)) return { u, s: -100 };
      let s = slugToks.filter((t) => lu.includes(t)).length;
      if (/cdn\.shopify\.com\/.*\/files\/|bigcommerce|scene7|\/media\/|\/cache\//.test(lu)) s += 1;
      if (/-0?1[._-]/.test(lu)) s += 0.5;
      return { u, s };
    })
    .sort((a, b) => b.s - a.s);
  return scored.length && scored[0].s >= (RELAX ? 1 : 2) ? abs(scored[0].u) : "";
}
function sniff(b) {
  if (b.length > 12 && b.toString("ascii", 0, 4) === "RIFF" && b.toString("ascii", 8, 12) === "WEBP") return "webp";
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return "png";
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpg";
  if (b.length > 12 && b.toString("ascii", 4, 8) === "ftyp" && b.toString("ascii", 8, 12).includes("avif")) return "avif";
  return null;
}

const results = [];
for (const item of spec) {
  if (tokens && !tokens.some((t) => item.linkKey.includes(t))) continue;
  if (manifest[item.linkKey] && !force) { results.push(["skip(cached)", item.linkKey, manifest[item.linkKey].sourceUrl]); continue; }
  const domain = DOMAINS[item.retailer];
  // Under --force, a refetch that can't confidently resolve must REMOVE the old entry,
  // so a previously-wrong photo never lingers.
  const drop = () => { delete manifest[item.linkKey]; for (const e of ["webp", "png", "jpg", "avif"]) fs.rmSync(path.join(OUTDIR, `${item.linkKey}.${e}`), { force: true }); };
  let url = "", img = "";
  try {
    url = stripQS(findUrl(item, domain));
    if (!url) { if (force) drop(); results.push(["no-search-result", item.linkKey, item.name]); continue; }
    const meta = JSON.parse(fc(`scrape ${JSON.stringify(url)} --format images --json`));
    img = pickProductImage(meta, item, url);
    if (!img) { if (force) drop(); results.push(["no-image-found", item.linkKey, url]); continue; }
    const tmp = path.join(OUTDIR, `${item.linkKey}.tmp`);
    execSync(`curl -sL ${JSON.stringify(img)} -o ${JSON.stringify(tmp)}`, { stdio: "ignore" });
    const ext = sniff(fs.readFileSync(tmp));
    if (!ext) { fs.rmSync(tmp, { force: true }); if (force) drop(); results.push(["not-an-image", item.linkKey, img.slice(0, 70)]); continue; }
    // clear any stale ext for this key, then place the file
    for (const e of ["webp", "png", "jpg", "avif"]) fs.rmSync(path.join(OUTDIR, `${item.linkKey}.${e}`), { force: true });
    fs.renameSync(tmp, path.join(OUTDIR, `${item.linkKey}.${ext}`));
    manifest[item.linkKey] = { src: `/product-images/${item.linkKey}.${ext}`, alt: `${item.name} — product photo`, sourceUrl: url };
    results.push(["ok", item.linkKey, url]);
  } catch (e) {
    if (force) drop();
    results.push(["error", item.linkKey, String(e.message || e).slice(0, 90)]);
  }
}

const sorted = Object.fromEntries(Object.keys(manifest).sort().map((k) => [k, manifest[k]]));
fs.writeFileSync(MANIFEST, JSON.stringify(sorted, null, 2) + "\n");
console.log(results.map((r) => `${r[0].padEnd(16)} ${r[1].padEnd(34)} ${r[2] || ""}`).join("\n"));
const ok = results.filter((r) => r[0] === "ok").length;
console.log(`\n${ok}/${results.length} fetched this run · manifest now has ${Object.keys(sorted).length} products.`);
