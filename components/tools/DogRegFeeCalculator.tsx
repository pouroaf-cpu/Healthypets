"use client";

import { useEffect, useMemo, useState } from "react";
import {
  listCouncils, getCouncil, matchCategory, tierForDate, amountForTier,
  fmt, TIER_LABEL, META, type Selection, type Tier,
} from "@/lib/dog-reg-fees";

const TOGGLES: { key: keyof Selection; label: string; hint: string }[] = [
  { key: "desexed", label: "Desexed (neutered/spayed)", hint: "Most councils discount desexed dogs" },
  { key: "workingDog", label: "Working dog", hint: "Farm/stock/working — usually much cheaper" },
  { key: "responsibleOwner", label: "Responsible/Accredited dog owner", hint: "Council good-owner scheme (if you qualify)" },
  { key: "disabilityAssist", label: "Disability assist dog", hint: "Guide/hearing/assist — free by law" },
];

const card: React.CSSProperties = {
  background: "var(--white)", border: "1px solid var(--border)", borderRadius: "var(--radius-lg)",
  boxShadow: "var(--shadow-sm)", padding: "clamp(18px,3vw,28px)",
};
const label: React.CSSProperties = {
  fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, letterSpacing: ".04em",
  textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: 8, display: "block",
};

export function DogRegFeeCalculator() {
  const councils = useMemo(() => listCouncils(), []);
  const [slug, setSlug] = useState("");
  const [sel, setSel] = useState<Selection>({});
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);

  const council = slug ? getCouncil(slug) : undefined;
  const cat = council ? matchCategory(council, sel) : undefined;
  const tier: Tier | null = council && today ? tierForDate(council, today) : null;

  return (
    <div style={{ display: "grid", gap: 20 }}>
      {/* INPUTS */}
      <div style={card}>
        <label style={label} htmlFor="council">Your council</label>
        <select
          id="council" value={slug} onChange={(e) => setSlug(e.target.value)}
          style={{
            width: "100%", padding: "12px 14px", fontSize: 16, fontFamily: "var(--font-body)",
            color: "var(--ink)", background: "var(--white)", border: "1.5px solid var(--border-strong)",
            borderRadius: "var(--radius-md)", cursor: "pointer",
          }}
        >
          <option value="">Select your council…</option>
          {councils.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
        <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--ink-muted)" }}>
          {councils.length} of 67 councils live — more added regularly. (Address search coming soon.)
        </p>

        <div style={{ marginTop: 20 }}>
          <span style={label}>Your dog</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }} className="hp-toggle-grid">
            {TOGGLES.map((t) => {
              const on = !!sel[t.key];
              return (
                <button
                  key={t.key} type="button" onClick={() => setSel((s) => ({ ...s, [t.key]: !s[t.key] }))}
                  style={{
                    textAlign: "left", padding: "12px 14px", borderRadius: "var(--radius-md)", cursor: "pointer",
                    border: on ? "1.5px solid var(--green-primary)" : "1.5px solid var(--border)",
                    background: on ? "var(--green-light)" : "var(--white)", transition: "all 120ms ease",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{
                      width: 18, height: 18, borderRadius: 5, flex: "none", display: "grid", placeItems: "center",
                      border: on ? "none" : "1.5px solid var(--border-strong)", background: on ? "var(--green-primary)" : "transparent",
                      color: "#fff", fontSize: 12, fontWeight: 700,
                    }}>{on ? "✓" : ""}</span>
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 14.5, color: "var(--ink)" }}>{t.label}</span>
                  </div>
                  <div style={{ fontSize: 12.5, color: "var(--ink-muted)", marginTop: 4, paddingLeft: 26 }}>{t.hint}</div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* RESULT */}
      {council && cat && (
        <div style={{ ...card, borderColor: "var(--green-primary)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8 }}>
            <h2 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 22, color: "var(--ink)" }}>{council.name}</h2>
            <span style={{ fontSize: 13, color: "var(--ink-muted)" }}>{cat.label}</span>
          </div>

          {/* today's applicable fee (post-mount to avoid hydration mismatch) */}
          {tier && (
            <div style={{
              margin: "16px 0", padding: "16px 18px", borderRadius: "var(--radius-md)",
              background: "var(--section)", border: "1px solid var(--border)",
            }}>
              <div style={{ fontSize: 13, color: "var(--ink-muted)" }}>
                Payable today ({today!.toLocaleDateString("en-NZ", { day: "numeric", month: "long", year: "numeric" })}) — {TIER_LABEL[tier]}
              </div>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 38, lineHeight: 1.1, color: tier === "late" ? "var(--coral-dark)" : "var(--ink)" }}>
                {fmt(amountForTier(cat, tier))}
              </div>
              {tier === "late" && (
                <div style={{ fontSize: 13, color: "var(--coral-dark)", marginTop: 2 }}>
                  Past the {council.dueDate} due date — penalty applies. The new registration year opens 1 July.
                </div>
              )}
            </div>
          )}

          {/* full structure */}
          <div style={{ display: "grid", gridTemplateColumns: cat.afterDue != null ? "1fr 1fr 1fr" : "1fr 1fr", gap: 10 }}>
            <FeeBox label="On-time fee" value={fmt(cat.onTime)} sub={`pay by ${council.dueDate}`} />
            {cat.afterDue != null && <FeeBox label="After due date" value={fmt(cat.afterDue)} sub="before 1 Aug" />}
            <FeeBox label="Late / penalty" value={fmt(cat.late)} sub="after 1 Aug" />
          </div>
          {cat.note && <p style={{ margin: "10px 0 0", fontSize: 13, color: "var(--ink-muted)" }}>{cat.note}</p>}

          <div style={{ marginTop: 16, fontSize: 14, color: "var(--ink-soft)" }}>
            <strong style={{ color: "var(--ink)" }}>Due date:</strong> {council.dueDate} each year (registration year {META.yearRuns}).
          </div>

          {council.extras.length > 0 && (
            <div style={{ marginTop: 14 }}>
              <span style={label}>Other fees this council may charge</span>
              <ul style={{ margin: 0, paddingLeft: 18, fontSize: 14, color: "var(--ink-soft)", lineHeight: 1.7 }}>
                {council.extras.map((x, i) => (
                  <li key={i}>{x.label}{x.amount != null ? ` — ${fmt(x.amount)}` : ""}{x.note ? ` (${x.note})` : ""}</li>
                ))}
              </ul>
            </div>
          )}

          {council.notes && <p style={{ margin: "14px 0 0", fontSize: 13.5, color: "var(--ink-muted)", fontStyle: "italic" }}>{council.notes}</p>}

          <div style={{ marginTop: 18, paddingTop: 14, borderTop: "1px solid var(--border-soft)", fontSize: 12.5, color: "var(--ink-muted)" }}>
            Fees for the {council.year} year · last verified {council.lastVerified} ·{" "}
            <a href={council.sourceUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--green-dark)", textDecoration: "underline" }}>
              source: {council.name} ↗
            </a>
            <br />Always confirm the current amount on your council's website before paying — fees change each 1 July.
          </div>
        </div>
      )}

      <style>{`@media (max-width: 520px) { .hp-toggle-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function FeeBox({ label: l, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div style={{ padding: "12px 14px", borderRadius: "var(--radius-md)", border: "1px solid var(--border)", background: "var(--white)" }}>
      <div style={{ fontSize: 12, color: "var(--ink-muted)" }}>{l}</div>
      <div style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 20, color: "var(--ink)" }}>{value}</div>
      <div style={{ fontSize: 11.5, color: "var(--ink-muted)" }}>{sub}</div>
    </div>
  );
}
