// Keyword audit — steps 1,2,4 of keyword-audit-prompt.md (NZ, content+affiliate).
// Parses content/**/*.mdx, extracts + qualifies candidate keywords per page, scores
// answer-depth, and writes scratchpad/kw-candidates.json (per-page + global unique set).
// Hubs/tools added as known entries. Run: node scripts/keyword-extract.mjs
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const OUT = "C:/Users/PFrew/AppData/Local/Temp/claude/C--Users-PFrew-Projects-Healthypets/45472aec-64cb-486e-b7e4-e7e8457cf953/scratchpad/kw-candidates.json";

const STOP = new Set("the a an of for and or to in on with your you our we is are best how why what can should guide nz new zealand buy online".split(" "));
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9 .+-]/g, " ").replace(/\s+/g, " ").trim();
const ok = (k) => { const w = k.split(" ").filter(Boolean); return w.length >= 1 && w.length <= 10 && k.length <= 80; };

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? walk(p) : e.name.endsWith(".mdx") ? [p] : [];
  });
}

// short noun-phrase H2s only (<=4 words, not a question/sentence)
function h2s(body) {
  return [...body.matchAll(/^##\s+(.+)$/gm)].map((m) => m[1].trim())
    .filter((h) => { const w = h.split(/\s+/); return w.length <= 4 && !/[?.!:]/.test(h) && !/^(how|why|what|can|should|is|do|does|when|where)\b/i.test(h); });
}
// answer-depth: words of body before the first prose paragraph
function answerDepth(body) {
  const lines = body.split("\n");
  let before = 0;
  for (const ln of lines) {
    const t = ln.trim();
    if (!t || t.startsWith("#") || t.startsWith("<") || t.startsWith("import") || t.startsWith("|")) { before += t.split(/\s+/).filter(Boolean).length; continue; }
    break; // first prose paragraph
  }
  return { words: before, score: Math.round(100 * Math.exp(-before / 220)) };
}

const pages = [];
const add = (set, kw, src) => { kw = norm(kw); if (ok(kw)) set.push({ kw, src }); };

for (const file of walk(path.join(ROOT, "content"))) {
  const { data, content } = matter(fs.readFileSync(file, "utf8"));
  if (data.draft) continue;
  const slug = path.basename(file, ".mdx");
  const url = `/${data.territory}/${slug}`;
  const species = data.species === "cat" ? ["cats", "kittens"] : data.species === "dog" ? ["dogs", "puppies"] : ["dogs", "cats"];
  const cand = [];
  add(cand, slug.replace(/-/g, " "), "slug");
  if (data.title) add(cand, data.title.replace(/\s*[·|].*$/, "").replace(/\(.*?\)/g, ""), "title");
  if (data.primaryKeyword) add(cand, data.primaryKeyword, "primaryKeyword");
  for (const h of h2s(content)) add(cand, h, "h2");
  for (const f of data.faq || []) if (f.q) add(cand, f.q, "faq");
  for (const p of data.products || []) {
    if (!p.name) continue;
    add(cand, p.name, "product");
    const brand = p.name.split(/\s+/)[0];
    for (const sp of species) { add(cand, `${p.name} for ${sp}`, "product-variant"); }
    add(cand, `is ${p.name} safe for ${species[0]}`, "product-variant");
    add(cand, `${p.name} dosage for ${species[0]}`, "product-variant");
    add(cand, `${p.name} side effects`, "product-variant");
    add(cand, `${brand} alternative`, "commercial");
  }
  // qualified variants from the primary keyword head
  const head = (data.primaryKeyword || data.title || slug.replace(/-/g, " ")).toLowerCase().replace(/\s*for\s+(dogs|cats|puppies|kittens).*$/, "").replace(/\bnz\b/g, "").trim();
  for (const sp of species) add(cand, `${head} for ${sp}`, "qualified");
  add(cand, `best ${head} for ${species[0]}`, "qualified");
  if (data.type === "pillar") { // money pages → commercial intent
    add(cand, `${head} price nz`, "commercial");
    add(cand, `buy ${head} nz`, "commercial");
  }
  // dedupe per page
  const seen = new Set();
  const candidates = cand.filter((c) => !seen.has(c.kw) && seen.add(c.kw));
  pages.push({ url, type: data.type, title: data.title, primaryKeyword: data.primaryKeyword || null, answerDepth: answerDepth(content), candidates });
}

// Hubs + tools (non-MDX) — known key terms
const HUBS = [
  { url: "/flea-and-worming", type: "hub", kws: ["flea and worming nz", "dog flea treatment nz", "cat flea treatment nz", "worming tablets nz"] },
  { url: "/joint-and-mobility", type: "hub", kws: ["dog joint supplements nz", "arthritis in dogs nz", "joint supplements for dogs"] },
  { url: "/gut-health", type: "hub", kws: ["probiotics for dogs nz", "dog gut health", "probiotics for cats nz"] },
  { url: "/skin-and-coat", type: "hub", kws: ["dog itchy skin nz", "dog allergies nz", "medicated dog shampoo nz"] },
  { url: "/dental", type: "hub", kws: ["dog dental care nz", "dental chews for dogs nz", "cat dental treats nz"] },
  { url: "/food", type: "hub", kws: ["best dog food nz", "best cat food nz", "pet food nz"] },
  { url: "/calming", type: "hub", kws: ["calming products for dogs nz", "dog anxiety nz", "calming spray for cats nz"] },
  { url: "/supplements", type: "hub", kws: ["dog supplements nz", "supplements for senior dogs nz"] },
  { url: "/cats", type: "hub", kws: ["cat health nz", "cat care nz"] },
  { url: "/dogs", type: "hub", kws: ["dog health nz", "dog care nz"] },
  { url: "/tools/dog-registration-fees", type: "tool", kws: ["dog registration fees nz", "dog registration cost nz", "dog rego nz", "how much is dog registration nz"] },
];
for (const h of HUBS) pages.push({ url: h.url, type: h.type, title: null, primaryKeyword: h.kws[0], answerDepth: null, candidates: h.kws.map((k) => ({ kw: norm(k), src: "hub" })) });

const allKw = [...new Set(pages.flatMap((p) => p.candidates.map((c) => c.kw)))].sort();
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({ generated: "kw-extract", pages, uniqueKeywords: allKw }, null, 2));
const counts = pages.reduce((a, p) => ((a[p.type] = (a[p.type] || 0) + 1), a), {});
console.log("pages by type:", JSON.stringify(counts));
console.log("total pages:", pages.length, "| unique candidate keywords:", allKw.length);
console.log("answer-depth flags (<90):", pages.filter((p) => p.answerDepth && p.answerDepth.score < 90).map((p) => `${p.url}(${p.answerDepth.score})`).join(", ") || "none");
