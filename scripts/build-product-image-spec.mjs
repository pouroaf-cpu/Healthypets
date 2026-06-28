// Derives the product list to photograph from the MDX `products` frontmatter
// (i.e. exactly the products rendered in comparison tables) and writes
// scripts/product-image-spec.json: [{ linkKey, name, retailer }].
// Run: node scripts/build-product-image-spec.mjs
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const CONTENT = path.join(ROOT, "content");
const OUT = path.join(ROOT, "scripts", "product-image-spec.json");

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return e.name.endsWith(".mdx") ? [p] : [];
  });
}

const byKey = new Map();
for (const file of walk(CONTENT)) {
  const { data } = matter(fs.readFileSync(file, "utf-8"));
  for (const p of data.products || []) {
    if (!p.linkKey || !p.name) continue;
    if (byKey.has(p.linkKey)) continue; // first occurrence wins
    byKey.set(p.linkKey, { linkKey: p.linkKey, name: p.name, retailer: p.linkKey.split("-")[0] });
  }
}

const spec = [...byKey.values()].sort((a, b) => a.linkKey.localeCompare(b.linkKey));
fs.writeFileSync(OUT, JSON.stringify(spec, null, 2) + "\n");
console.log(`Wrote ${spec.length} products to ${path.relative(ROOT, OUT)}`);
console.log(spec.map((s) => `  ${s.linkKey}  ·  ${s.name}  ·  ${s.retailer}`).join("\n"));
