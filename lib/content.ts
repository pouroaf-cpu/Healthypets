import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Source } from "@/components/ds/SourcesList";

const CONTENT_DIR = path.join(process.cwd(), "content");

// Content shapes. These live here, with the frontmatter that declares them, rather than in a
// component — the shipped renderers are the untyped `components/ds/*.jsx` pair, so hanging the
// types off a component meant keeping unused legacy twins alive purely as type carriers.

export type Product = {
  name: string;
  bestFor: string;
  protects: string; // e.g. "Fleas, worms, ticks"
  rating?: string; // e.g. "4.7"
  linkKey: string; // key in affiliate-links map
  topPick?: boolean;
};

export type QA = { q: string; a: string };

export type DocType = "pillar" | "spoke";

export type DocFrontmatter = {
  title: string;
  description: string;
  territory: string; // matches a slug in lib/navigation TERRITORIES (e.g. "flea-and-worming")
  type: DocType;
  primaryKeyword?: string;
  nzVolume?: number;
  updated?: string;
  author?: string;
  faq?: QA[];
  products?: Product[];
  related?: string[]; // slugs
  image?: string; // hero image id (lib/images.ts manifest)
  sources?: Source[]; // citation list rendered + emitted to JSON-LD
  species?: "cat" | "dog" | "both"; // for the /cats and /dogs hubs
  draft?: boolean;
};

export type Doc = DocFrontmatter & { slug: string; body: string };

function walk(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) return walk(p);
    return e.name.endsWith(".mdx") ? [p] : [];
  });
}

export function getAllDocs(): Doc[] {
  return walk(CONTENT_DIR)
    .map((file) => {
      const raw = fs.readFileSync(file, "utf-8");
      const { data, content } = matter(raw);
      const slug = path.basename(file, ".mdx");
      return { ...(data as DocFrontmatter), slug, body: content };
    })
    .filter((d) => !d.draft)
    .sort((a, b) => (b.nzVolume ?? 0) - (a.nzVolume ?? 0));
}

export function getDoc(territory: string, slug: string): Doc | undefined {
  return getAllDocs().find((d) => d.territory === territory && d.slug === slug);
}

export function getDocsByTerritory(territory: string): Doc[] {
  return getAllDocs().filter((d) => d.territory === territory);
}

export function getDocsBySpecies(species: "cat" | "dog"): Doc[] {
  return getAllDocs().filter((d) => d.species === species || d.species === "both");
}

export function getAllSlugParams(): { territory: string; slug: string }[] {
  return getAllDocs().map((d) => ({ territory: d.territory, slug: d.slug }));
}
