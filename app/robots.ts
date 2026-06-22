import type { MetadataRoute } from "next";
import { SITE } from "@/lib/navigation";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/go/" },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
