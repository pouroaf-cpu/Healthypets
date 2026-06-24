import type { QA } from "./FAQ";
import type { Source } from "./ds/SourcesList";
import { SITE } from "@/lib/navigation";

// JSON-LD structured data. Renders Article + (optional) FAQ schema.
export function Schema({
  title,
  description,
  url,
  updated,
  author,
  image,
  faq,
  sources,
}: {
  title: string;
  description: string;
  url: string;
  updated?: string;
  author?: string;
  image?: string; // absolute or root-relative image URL
  faq?: QA[];
  sources?: Source[];
}) {
  const imageUrl = image ? (image.startsWith("http") ? image : `${SITE.url}${image}`) : undefined;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: title,
      description,
      url,
      ...(imageUrl ? { image: imageUrl } : {}),
      ...(updated ? { dateModified: updated } : {}),
      author: { "@type": "Organization", name: author || "The Healthy Pets Team" },
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        url: SITE.url,
      },
      ...(sources?.length
        ? {
            citation: sources.map((s) => ({
              "@type": "CreativeWork",
              name: s.title,
              url: s.url,
              ...(s.publisher ? { publisher: { "@type": "Organization", name: s.publisher } } : {}),
            })),
          }
        : {}),
    },
  ];
  if (faq?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
  }
  const json = { "@context": "https://schema.org", "@graph": graph };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
