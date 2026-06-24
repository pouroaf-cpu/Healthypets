import { HPIcon } from "./Icons";

export type Source = { title: string; url: string; publisher?: string };

// Renders the article's reference list. Pet health is YMYL-adjacent, so every health
// claim is backed by a reputable source the reader can check.
export function SourcesList({ sources }: { sources?: Source[] }) {
  if (!sources?.length) return null;
  return (
    <section style={{ margin: "8px 0 40px" }}>
      <h2 style={{ margin: "0 0 14px", fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(1.3rem,1.1rem+0.9vw,1.7rem)", color: "var(--ink)", letterSpacing: "-0.02em" }}>
        Sources
      </h2>
      <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
        {sources.map((s, i) => (
          <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 14.5, lineHeight: 1.55, color: "var(--ink-soft)" }}>
            <span style={{ flex: "none", marginTop: 2, color: "var(--green-primary)" }}>
              <HPIcon name="check" size={15} stroke={2.4} />
            </span>
            <span>
              <a href={s.url} target="_blank" rel="noopener nofollow" style={{ color: "var(--green-dark)", textDecoration: "underline", fontWeight: 600 }}>
                {s.title}
              </a>
              {s.publisher ? <span style={{ color: "var(--ink-muted)" }}> — {s.publisher}</span> : null}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
