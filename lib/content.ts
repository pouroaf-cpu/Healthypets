import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Product } from "@/components/ComparisonTable";
import type { QA } from "@/components/FAQ";

const CONTENT_DIR = path.join(process.cwd(), "content");

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
  vetReviewed?: boolean;
  faq?: QA[];
  products?: Product[];
  related?: string[]; // slugs
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

export function getAllSlugParams(): { territory: string; slug: string }[] {
  return getAllDocs().map((d) => ({ territory: d.territory, slug: d.slug }));
}
