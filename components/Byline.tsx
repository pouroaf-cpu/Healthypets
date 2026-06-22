import { ShieldCheck } from "lucide-react";

// E-E-A-T trust signals: author + vet-reviewed badge + last-updated date.
export function Byline({
  author = "The Healthy Pets Team",
  updated,
  vetReviewed = false,
}: {
  author?: string;
  updated?: string;
  vetReviewed?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink/65">
      <span>By {author}</span>
      {updated && <span>· Updated {updated}</span>}
      {vetReviewed && (
        <span className="inline-flex items-center gap-1 rounded-full bg-brand-light px-2 py-0.5 font-medium text-brand-dark">
          <ShieldCheck size={14} /> Vet-reviewed
        </span>
      )}
    </div>
  );
}
