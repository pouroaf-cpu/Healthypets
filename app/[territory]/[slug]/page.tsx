import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugParams, getDoc } from "@/lib/content";
import { SITE } from "@/lib/navigation";
import { Byline } from "@/components/Byline";
import { Disclosure } from "@/components/Disclosure";
import { ComparisonTable } from "@/components/ComparisonTable";
import { FAQ } from "@/components/FAQ";
import { Mdx } from "@/components/Mdx";
import { Schema } from "@/components/Schema";
import { EmailCapture } from "@/components/EmailCapture";

export function generateStaticParams() {
  return getAllSlugParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ territory: string; slug: string }>;
}): Promise<Metadata> {
  const { territory, slug } = await params;
  const doc = getDoc(territory, slug);
  if (!doc) return {};
  return {
    title: doc.title,
    description: doc.description,
    alternates: { canonical: `/${territory}/${slug}` },
    openGraph: { title: doc.title, description: doc.description, type: "article" },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ territory: string; slug: string }>;
}) {
  const { territory, slug } = await params;
  const doc = getDoc(territory, slug);
  if (!doc) notFound();

  const isPillar = doc.type === "pillar";
  const url = `${SITE.url}/${territory}/${slug}`;

  return (
    <article className="mx-auto max-w-3xl px-4 py-10">
      <nav className="mb-3 text-sm text-ink/60">
        <Link href={`/${territory}`} className="hover:text-brand">
          {territory.replace(/-/g, " ")}
        </Link>{" "}
        ›
      </nav>

      <h1 className="font-heading text-3xl font-bold leading-tight lg:text-4xl">{doc.title}</h1>
      <div className="mt-3">
        <Byline author={doc.author} updated={doc.updated} vetReviewed={doc.vetReviewed} />
      </div>

      {isPillar && <Disclosure />}

      {/* answer-first intro lives at the top of the MDX body */}
      <Mdx source={doc.body} />

      {isPillar && doc.products && doc.products.length > 0 && (
        <ComparisonTable products={doc.products} />
      )}

      {doc.faq && <FAQ items={doc.faq} />}

      <div className="my-10">
        <EmailCapture source={`article:${slug}`} />
      </div>

      {doc.related && doc.related.length > 0 && (
        <div className="mt-8 border-t border-gray-100 pt-6">
          <h2 className="mb-3 font-heading text-lg font-bold">Related guides</h2>
          <ul className="space-y-1">
            {doc.related.map((r) => (
              <li key={r}>
                <Link href={`/${territory}/${r}`} className="text-brand-dark underline">
                  {r.replace(/-/g, " ")}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Schema
        title={doc.title}
        description={doc.description}
        url={url}
        updated={doc.updated}
        faq={doc.faq}
      />
    </article>
  );
}
