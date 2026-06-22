import type { QA } from "./FAQ";

// JSON-LD structured data. Renders Article + (optional) FAQ schema.
export function Schema({
  title,
  description,
  url,
  updated,
  faq,
}: {
  title: string;
  description: string;
  url: string;
  updated?: string;
  faq?: QA[];
}) {
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Article",
      headline: title,
      description,
      url,
      ...(updated ? { dateModified: updated } : {}),
      publisher: { "@type": "Organization", name: "Healthy Pets" },
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
