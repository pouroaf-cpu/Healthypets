import type { MetadataRoute } from "next";
import { SITE, TERRITORIES } from "@/lib/navigation";
import { getAllDocs } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url;
  const staticPaths = ["", "/guides", "/about", "/privacy", "/contact", "/editorial-policy", "/tools/dog-registration-fees"];
  const territoryPaths = TERRITORIES.map((t) => t.href);
  const docPaths = getAllDocs().map((d) => `/${d.territory}/${d.slug}`);

  return [...staticPaths, ...territoryPaths, ...docPaths].map((p) => ({
    url: `${base}${p}`,
    lastModified: new Date(),
  }));
}
