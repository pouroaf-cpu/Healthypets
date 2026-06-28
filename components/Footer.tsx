import Link from "next/link";
import { FOOTER, SITE } from "@/lib/navigation";
import { Logo } from "./Logo";
import { EmailCapture } from "./EmailCapture";

// Universal footer — rendered once from app/layout.tsx. Links from lib/navigation.ts.
export function Footer() {
  const col = (title: string, items: { label: string; href: string }[]) => (
    <div>
      <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wide text-ink/60">
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((i) => (
          <li key={i.href}>
            <Link href={i.href} className="text-sm text-ink/80 hover:text-brand">
              {i.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <footer className="mt-20 border-t border-gray-100 bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-ink/70">{SITE.tagline}</p>
          </div>
          {col("Territories", FOOTER.territories)}
          {col("Site", FOOTER.site)}
          {col("Legal", FOOTER.legal)}
        </div>

        <div className="mt-10 max-w-md">
          <EmailCapture
            source="footer"
            heading="Never forget a flea treatment again"
            blurb="Get the free NZ Flea & Worming Reminder Calendar."
          />
        </div>

        <p className="mt-10 border-t border-gray-200 pt-6 text-xs text-ink/60">
          © {SITE.name} · New Zealand
        </p>
      </div>
    </footer>
  );
}
