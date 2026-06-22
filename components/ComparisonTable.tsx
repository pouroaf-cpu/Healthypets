import { CTAButton } from "./CTAButton";
import { cn } from "@/lib/utils";

export type Product = {
  name: string;
  bestFor: string;
  protects: string; // e.g. "Fleas, worms, ticks"
  rating?: string; // e.g. "4.7"
  linkKey: string; // key in affiliate-links map
  topPick?: boolean;
};

// Comparison table: real table at md+, stacked cards on mobile. No hard-coded prices —
// the CTA sends to the retailer where the live price lives.
export function ComparisonTable({ products }: { products: Product[] }) {
  if (!products?.length) return null;
  return (
    <div className="my-6">
      {/* mobile: cards */}
      <div className="space-y-3 md:hidden">
        {products.map((p) => (
          <div
            key={p.name}
            className={cn(
              "rounded-xl border p-4",
              p.topPick ? "border-brand bg-brand-light" : "border-gray-200"
            )}
          >
            {p.topPick && (
              <span className="mb-1 inline-block rounded bg-brand px-2 py-0.5 text-xs font-bold text-white">
                Top pick
              </span>
            )}
            <h3 className="font-heading text-lg font-bold">{p.name}</h3>
            <p className="text-sm text-ink/75">Best for: {p.bestFor}</p>
            <p className="text-sm text-ink/75">Protects against: {p.protects}</p>
            {p.rating && <p className="text-sm text-ink/75">Rating: {p.rating}★</p>}
            <CTAButton linkKey={p.linkKey} className="mt-3 w-full" />
          </div>
        ))}
      </div>

      {/* desktop: table */}
      <table className="hidden w-full border-collapse overflow-hidden rounded-xl border border-gray-200 md:table">
        <thead>
          <tr className="bg-ink text-left text-sm text-white">
            <th className="p-3">Product</th>
            <th className="p-3">Best for</th>
            <th className="p-3">Protects against</th>
            <th className="p-3">Rating</th>
            <th className="p-3"></th>
          </tr>
        </thead>
        <tbody>
          {products.map((p, i) => (
            <tr
              key={p.name}
              className={cn(
                p.topPick ? "bg-brand-light" : i % 2 ? "bg-surface" : "bg-white"
              )}
            >
              <td className="p-3 font-semibold">
                {p.name}
                {p.topPick && (
                  <span className="ml-2 rounded bg-brand px-2 py-0.5 text-xs font-bold text-white">
                    Top pick
                  </span>
                )}
              </td>
              <td className="p-3 text-sm">{p.bestFor}</td>
              <td className="p-3 text-sm">{p.protects}</td>
              <td className="p-3 text-sm">{p.rating ? `${p.rating}★` : "—"}</td>
              <td className="p-3">
                <CTAButton linkKey={p.linkKey} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
