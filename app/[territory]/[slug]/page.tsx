import Link from "next/link";
import type { Metadata } from "next";
import { getAllSlugParams, getDoc } from "@/lib/content";
import { SITE } from "@/lib/navigation";
import { Schema } from "@/components/Schema";
import { PillarTemplate } from "@/components/ds/PillarTemplate";
import { ArticleTemplate } from "@/components/ds/ArticleTemplate";
import { EmailCapture } from "@/components/ds/EmailCapture";

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
  if (!doc) return { title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()) };
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

  // Every link has a home: an article we haven't written yet shows a friendly,
  // on-brand "coming soon" instead of a 404.
  if (!doc) {
    const title = slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return (
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "clamp(48px,8vw,96px) 20px", textAlign: "center" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: "var(--green-dark)", marginBottom: 12 }}>
          {territory.replace(/-/g, " ")}
        </div>
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.8rem,1.4rem+2vw,2.6rem)", color: "var(--ink)", margin: "0 0 12px" }}>{title}</h1>
        <p style={{ color: "var(--ink-soft)", fontSize: 17, lineHeight: 1.6, maxWidth: 520, margin: "0 auto 24px" }}>
          We&apos;re still writing this guide. Want a nudge when it&apos;s live? Grab the reminder calendar below — or browse what we&apos;ve published so far.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
          <Link href={`/${territory}`} style={{ background: "var(--green-primary)", color: "#fff", padding: "12px 22px", borderRadius: "var(--radius-pill)", fontFamily: "var(--font-heading)", fontWeight: 600, textDecoration: "none" }}>Browse {territory.replace(/-/g, " ")}</Link>
          <Link href="/guides" style={{ border: "1.5px solid var(--green-primary)", color: "var(--green-dark)", padding: "12px 22px", borderRadius: "var(--radius-pill)", fontFamily: "var(--font-heading)", fontWeight: 600, textDecoration: "none" }}>All guides</Link>
        </div>
        <div style={{ maxWidth: 560, margin: "0 auto" }}><EmailCapture source={`coming-soon:${slug}`} /></div>
      </div>
    );
  }

  const url = `${SITE.url}/${territory}/${slug}`;
  return (
    <>
      {doc.type === "pillar" ? <PillarTemplate doc={doc} /> : <ArticleTemplate doc={doc} />}
      <Schema title={doc.title} description={doc.description} url={url} updated={doc.updated} faq={doc.faq} />
    </>
  );
}
