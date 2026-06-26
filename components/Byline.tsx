// E-E-A-T trust signals: author + last-updated date.
export function Byline({
  author = "The Healthy Pets Team",
  updated,
}: {
  author?: string;
  updated?: string;
}) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink/65">
      <span>By {author}</span>
      {updated && <span>· Updated {updated}</span>}
    </div>
  );
}
