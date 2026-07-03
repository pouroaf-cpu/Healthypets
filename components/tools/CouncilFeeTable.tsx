"use client";

import { useMemo, useState } from "react";
import { fmt, foldDiacritics, type CouncilFeeRow } from "@/lib/dog-reg-fees";

type SortKey = "name" | "type" | "entire" | "desexed" | "working";
type Dir = "asc" | "desc";

const money = (n: number | null): string => (n == null ? "—" : fmt(n));

// null fees sort to the bottom regardless of direction
function cmp(a: CouncilFeeRow, b: CouncilFeeRow, key: SortKey, dir: Dir): number {
  const s = dir === "asc" ? 1 : -1;
  if (key === "name") return a.name.localeCompare(b.name) * s;
  if (key === "type") return (a.typeLabel.localeCompare(b.typeLabel) || a.name.localeCompare(b.name)) * s;
  const av = a[key], bv = b[key];
  if (av == null && bv == null) return a.name.localeCompare(b.name);
  if (av == null) return 1;
  if (bv == null) return -1;
  return (av - bv) * s || a.name.localeCompare(b.name);
}

const th: React.CSSProperties = {
  position: "sticky", top: 0, background: "var(--section)", textAlign: "left",
  fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 13, color: "var(--ink)",
  padding: "10px 12px", borderBottom: "2px solid var(--border-strong)", whiteSpace: "nowrap",
};
const td: React.CSSProperties = {
  padding: "10px 12px", fontSize: 14.5, color: "var(--ink-soft)", borderBottom: "1px solid var(--border-soft)",
};
const numTd: React.CSSProperties = { ...td, textAlign: "right", fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" };

function SortButton({ label, col, sortKey, dir, onSort, align }: {
  label: string; col: SortKey; sortKey: SortKey; dir: Dir; onSort: (k: SortKey) => void; align?: "right";
}) {
  const active = sortKey === col;
  return (
    <button
      type="button" onClick={() => onSort(col)}
      aria-label={`Sort by ${label}`}
      style={{
        display: "inline-flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer",
        font: "inherit", color: active ? "var(--green-dark)" : "var(--ink)", padding: 0,
        width: align === "right" ? "100%" : "auto", justifyContent: align === "right" ? "flex-end" : "flex-start",
      }}
    >
      {label}
      <span aria-hidden="true" style={{ fontSize: 10, opacity: active ? 1 : 0.35 }}>
        {active ? (dir === "asc" ? "▲" : "▼") : "▲▼"}
      </span>
    </button>
  );
}

export function CouncilFeeTable({ rows }: { rows: CouncilFeeRow[] }) {
  const [query, setQuery] = useState("");
  const [type, setType] = useState<string>("all");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [dir, setDir] = useState<Dir>("asc");

  const types = useMemo(
    () => ["all", ...Array.from(new Set(rows.map((r) => r.type)))],
    [rows],
  );

  const onSort = (k: SortKey) => {
    if (k === sortKey) setDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(k); setDir(k === "name" || k === "type" ? "asc" : "asc"); }
  };

  const filtered = useMemo(() => {
    const q = foldDiacritics(query.trim());
    return rows
      .filter((r) => (type === "all" || r.type === type) && (q === "" || foldDiacritics(r.name).includes(q)))
      .sort((a, b) => cmp(a, b, sortKey, dir));
  }, [rows, query, type, sortKey, dir]);

  const ariaSort = (k: SortKey): "ascending" | "descending" | "none" =>
    sortKey === k ? (dir === "asc" ? "ascending" : "descending") : "none";

  return (
    <div>
      {/* controls */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", marginBottom: 14 }}>
        <input
          type="search" value={query} onChange={(e) => setQuery(e.target.value)}
          placeholder="Search council…" aria-label="Search councils"
          style={{
            flex: "1 1 220px", minWidth: 0, padding: "10px 14px", fontSize: 15, fontFamily: "var(--font-body)",
            color: "var(--ink)", background: "var(--white)", border: "1.5px solid var(--border-strong)",
            borderRadius: "var(--radius-md)",
          }}
        />
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {types.map((t) => {
            const on = type === t;
            const label = t === "all" ? "All" : (rows.find((r) => r.type === t)?.typeLabel ?? t);
            return (
              <button
                key={t} type="button" onClick={() => setType(t)} aria-pressed={on}
                style={{
                  padding: "8px 14px", fontSize: 14, fontFamily: "var(--font-heading)", fontWeight: 600, cursor: "pointer",
                  borderRadius: "var(--radius-pill)", border: on ? "1.5px solid var(--green-primary)" : "1.5px solid var(--border)",
                  background: on ? "var(--green-light)" : "var(--white)", color: on ? "var(--green-dark)" : "var(--ink-soft)",
                }}
              >{label}</button>
            );
          })}
        </div>
      </div>

      <p style={{ margin: "0 0 10px", fontSize: 13, color: "var(--ink-muted)" }}>
        Showing <strong style={{ color: "var(--ink)" }}>{filtered.length}</strong> of {rows.length} councils.
        Fees are the <strong>on-time / early-payment</strong> rate; “Standard” is an entire (un-desexed) pet dog. Use the calculator above for late fees and your exact situation.
      </p>

      {/* table — scrolls horizontally on small screens; full data server-rendered for crawlers */}
      <div style={{ overflowX: "auto", border: "1px solid var(--border)", borderRadius: "var(--radius-md)" }}>
        <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 640 }}>
          <caption style={{ captionSide: "top", textAlign: "left", padding: "0 0 10px", fontSize: 13, color: "var(--ink-muted)" }}>
            New Zealand dog registration fees by council, 2026/27 registration year (NZD, GST incl.)
          </caption>
          <thead>
            <tr>
              <th scope="col" style={th} aria-sort={ariaSort("name")}>
                <SortButton label="Council" col="name" sortKey={sortKey} dir={dir} onSort={onSort} />
              </th>
              <th scope="col" style={th} aria-sort={ariaSort("type")}>
                <SortButton label="Type" col="type" sortKey={sortKey} dir={dir} onSort={onSort} />
              </th>
              <th scope="col" style={{ ...th, textAlign: "right" }} aria-sort={ariaSort("entire")}>
                <SortButton label="Standard" col="entire" sortKey={sortKey} dir={dir} onSort={onSort} align="right" />
              </th>
              <th scope="col" style={{ ...th, textAlign: "right" }} aria-sort={ariaSort("desexed")}>
                <SortButton label="Desexed" col="desexed" sortKey={sortKey} dir={dir} onSort={onSort} align="right" />
              </th>
              <th scope="col" style={{ ...th, textAlign: "right" }} aria-sort={ariaSort("working")}>
                <SortButton label="Working" col="working" sortKey={sortKey} dir={dir} onSort={onSort} align="right" />
              </th>
              <th scope="col" style={{ ...th, textAlign: "left" }}>Due by</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.slug}>
                <th scope="row" style={{ ...td, fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap" }}>
                  <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer"
                    style={{ color: "var(--ink)", textDecoration: "none" }}>
                    {r.name} <span aria-hidden="true" style={{ color: "var(--green-primary)", fontSize: 12 }}>↗</span>
                  </a>
                </th>
                <td style={td}>{r.typeLabel}</td>
                <td style={numTd}>{money(r.entire)}</td>
                <td style={numTd}>{money(r.desexed)}</td>
                <td style={numTd}>{money(r.working)}</td>
                <td style={{ ...td, whiteSpace: "nowrap" }}>{r.dueDate}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={6} style={{ ...td, textAlign: "center", color: "var(--ink-muted)" }}>
                No council matches “{query}”.
              </td></tr>
            )}
          </tbody>
        </table>
      </div>
      <p style={{ margin: "10px 0 0", fontSize: 12.5, color: "var(--ink-muted)" }}>
        “—” = the council doesn’t publish a separate rate for that category. Tap a council to open its official fees page. Always confirm the current amount with your council before paying.
      </p>
    </div>
  );
}
