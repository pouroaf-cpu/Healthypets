import Link from "next/link";
import type { Metadata } from "next";
import { TERRITORIES } from "@/lib/navigation";
import { getAllDocs, getDocsByTerritory } from "@/lib/content";
import { EmailCapture } from "@/components/EmailCapture";

const EXTRA = ["guides", "cats", "dogs"];

export function generateStaticParams() {
  return [...TERRITORIES.map((t) => t.href.replace("/", "")), ...EXTRA].map((territory) => ({
    territory,
  }));
}

function label(territory: string) {
  return (
    TERRITORIES.find((t) => t.href === `/${territory}`)?.label ??
    territory.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ territory: string }>;
}): Promise<Metadata> {
  const { territory } = await params;
  const name = label(territory);
  return {
    title: `${name} (NZ)`,
    description: `Honest NZ guides and product comparisons for ${name.toLowerCase()}.`,
  };
}

export default async function TerritoryPage({
  params,
}: {
  params: Promise<{ territory: string }>;
}) {
  const { territory } = await params;
  const docs = territory === "guides" ? getAllDocs() : getDocsByTerritory(territory);
  const name = label(territory);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-heading text-3xl font-bold lg:text-4xl">{name}</h1>
      <p className="mt-2 max-w-2xl text-ink/75">
        Independent, vet-informed NZ advice and the best buys.
      </p>

      {docs.length === 0 ? (
        <div className="mt-8 rounded-xl border border-dashed border-gray-300 bg-surface p-8 text-center text-ink/60">
          Guides for {name.toLowerCase()} are coming soon.
        </div>
      ) : (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {docs.map((d) => (
            <Link
              key={d.slug}
              href={`/${d.territory}/${d.slug}`}
              className="rounded-xl border border-gray-200 p-5 hover:border-brand"
            >
              <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                {d.type}
              </span>
              <h2 className="mt-1 font-heading text-lg font-bold">{d.title}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-ink/70">{d.description}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-12">
        <EmailCapture source={`territory:${territory}`} />
      </div>
    </div>
  );
}
