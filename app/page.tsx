import Link from "next/link";
import { TERRITORIES } from "@/lib/navigation";
import { getAllDocs } from "@/lib/content";
import { EmailCapture } from "@/components/EmailCapture";

export default function Home() {
  const guides = getAllDocs().slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-light">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:py-24">
          <h1 className="max-w-3xl font-heading text-4xl font-bold leading-tight lg:text-5xl">
            Honest pet-health advice for Kiwi cat &amp; dog owners
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink/75">
            Independent, vet-informed guides and product comparisons — flea &amp; worming,
            supplements, food and more — with the best NZ buys.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/flea-and-worming" className="rounded-lg bg-brand px-5 py-3 font-semibold text-white hover:bg-brand-dark">
              Flea &amp; worming guides
            </Link>
            <Link href="/guides" className="rounded-lg border border-brand px-5 py-3 font-semibold text-brand-dark hover:bg-white">
              Browse all guides
            </Link>
          </div>
        </div>
      </section>

      {/* Territories */}
      <section className="mx-auto max-w-6xl px-4 py-14">
        <h2 className="mb-6 font-heading text-2xl font-bold">What can we help with?</h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {TERRITORIES.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="rounded-xl border border-gray-200 bg-white p-5 transition-colors hover:border-brand hover:bg-brand-light"
            >
              <span className="font-heading font-semibold text-ink">{t.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular guides */}
      {guides.length > 0 && (
        <section className="bg-surface">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <h2 className="mb-6 font-heading text-2xl font-bold">Popular guides</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/${g.territory}/${g.slug}`}
                  className="rounded-xl border border-gray-200 bg-white p-5 hover:border-brand"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-brand">
                    {g.type}
                  </span>
                  <h3 className="mt-1 font-heading text-lg font-bold">{g.title}</h3>
                  <p className="mt-1 line-clamp-2 text-sm text-ink/70">{g.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Trust strip */}
      <section className="mx-auto max-w-6xl px-4 py-10 text-center">
        <p className="font-heading text-lg font-semibold text-ink/80">
          Vet-reviewed · NZ products &amp; prices · Independent &amp; honest
        </p>
      </section>

      {/* Email capture */}
      <section className="mx-auto max-w-2xl px-4 pb-16">
        <EmailCapture source="homepage" />
      </section>
    </>
  );
}
