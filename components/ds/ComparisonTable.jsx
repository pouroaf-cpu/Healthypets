// @ts-nocheck
"use client";

import { useState, useEffect } from "react";
import { Badge } from "./Badge.jsx";
import { CTAButton } from "./CTAButton.jsx";
import { getProductImage } from "@/lib/product-images";
import { track, pagePath } from "@/lib/analytics";

// Square product packshot chip. White-padded so transparent PNGs and white-bg JPEGs
// both read as a tidy product thumbnail. Renders nothing if we have no photo yet.
function Packshot({ linkKey, size = 56 }) {
  const img = getProductImage(linkKey);
  if (!img) return null;
  return (
    <img
      src={img.src}
      alt={img.alt}
      width={size}
      height={size}
      loading="lazy"
      style={{ width: size, height: size, flex: "none", objectFit: "contain", background: "#fff", borderRadius: "var(--radius-md)", border: "1px solid var(--border-soft)", padding: 4, boxSizing: "border-box" }}
    />
  );
}

function Stars({ value }) {
  const full = Math.round(value || 0);
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "6px", whiteSpace: "nowrap" }}>
      <span aria-hidden="true" style={{ color: "var(--rating-star)", letterSpacing: "1px", fontSize: "14px" }}>
        {"★".repeat(full)}<span style={{ color: "var(--border-strong)" }}>{"★".repeat(5 - full)}</span>
      </span>
      {value != null && <span style={{ fontWeight: 600, fontSize: "13px", color: "var(--ink)" }}>{Number(value).toFixed(1)}</span>}
    </span>
  );
}

function useIsNarrow(bp = 760) {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const check = () => setNarrow(window.innerWidth < bp);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, [bp]);
  return narrow;
}

// Responsive product comparison. rows: [{ product, bestFor, protects, price, rating, retailer, linkKey, topPick, note }]
export function ComparisonTable({ rows = [], style = {} }) {
  const narrow = useIsNarrow();

  // Top of the affiliate funnel: a reader has seen the comparison table on this page.
  useEffect(() => {
    track("comparison_table_viewed", {
      product_count: rows.length,
      products: rows.map((r) => r.linkKey).filter(Boolean),
      page_path: pagePath(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const th = { textAlign: "left", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--ink-muted)", padding: "0 16px 12px", whiteSpace: "nowrap" };
  const td = { padding: "18px 16px", verticalAlign: "middle", fontSize: "15px", color: "var(--ink-soft)" };

  if (narrow) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "14px", ...style }}>
        {rows.map((r, i) => (
          <div key={i} style={{ background: "var(--white)", border: r.topPick ? "2px solid var(--green-primary)" : "1px solid var(--border-soft)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", padding: "18px", position: "relative" }}>
            {r.topPick && <div style={{ position: "absolute", top: "-11px", left: "18px" }}><Badge tone="coral">★ Top pick</Badge></div>}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: r.topPick ? "6px" : 0 }}>
              <Packshot linkKey={r.linkKey} size={52} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", flex: 1 }}>
                <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "17px", color: "var(--ink)" }}>{r.product}</div>
                <Stars value={r.rating} />
              </div>
            </div>
            <dl style={{ margin: "12px 0 16px", display: "grid", gridTemplateColumns: "auto 1fr", gap: "7px 14px", fontSize: "14px" }}>
              <dt style={{ color: "var(--ink-muted)" }}>Best for</dt><dd style={{ margin: 0, color: "var(--ink)" }}>{r.bestFor}</dd>
              <dt style={{ color: "var(--ink-muted)" }}>Protects</dt><dd style={{ margin: 0, color: "var(--ink)" }}>{r.protects}</dd>
              {r.price && <><dt style={{ color: "var(--ink-muted)" }}>Price</dt><dd style={{ margin: 0, color: "var(--ink)", fontWeight: 600 }}>{r.price}</dd></>}
            </dl>
            <CTAButton retailer={r.retailer} linkKey={r.linkKey} href={r.href} position="comparison_table" fullWidth size="sm" />
          </div>
        ))}
      </div>
    );
  }

  // Desktop: the table sits inside a narrow ~720px reading column, which cramps the six
  // columns. Widen it with SYMMETRIC NEGATIVE margins — this sizes the box correctly and
  // centres it on the column's centre (= the page centre) with no transform and, crucially,
  // no layout overflow (the old 50%/translateX trick pushed a huge margin box off-screen and
  // clipped the first column). Capped to the site width and the viewport minus gutters so it
  // can never run off-screen; minWidth + overflowX let very wide tables scroll, not squash.
  const breakout = "min(1040px, calc(100vw - 40px))";
  return (
    <div style={{ width: breakout, marginLeft: `calc((100% - ${breakout}) / 2)`, marginRight: `calc((100% - ${breakout}) / 2)`, overflowX: "auto", ...style }}>
      <table style={{ width: "100%", borderCollapse: "separate", borderSpacing: 0, minWidth: "720px" }}>
        <thead>
          <tr>
            <th style={th}>Product</th><th style={th}>Best for</th><th style={th}>Protects against</th><th style={th}>Price (NZ$)</th><th style={th}>Rating</th><th style={{ ...th, textAlign: "right" }}></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: r.topPick ? "var(--green-light)" : "var(--white)", boxShadow: r.topPick ? "inset 0 0 0 2px var(--green-primary)" : "inset 0 0 0 1px var(--border-soft)", borderRadius: "var(--radius-md)" }}>
              <td style={{ ...td, borderRadius: "var(--radius-md) 0 0 var(--radius-md)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <Packshot linkKey={r.linkKey} size={56} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {r.topPick && <Badge tone="coral" size="sm">★ Top pick</Badge>}
                    <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "16px", color: "var(--ink)" }}>{r.product}</span>
                    {r.note && <span style={{ fontSize: "13px", color: "var(--ink-muted)" }}>{r.note}</span>}
                  </div>
                </div>
              </td>
              <td style={td}>{r.bestFor}</td>
              <td style={td}>{r.protects}</td>
              <td style={{ ...td, fontWeight: 600, color: "var(--ink)", whiteSpace: "nowrap" }}>{r.price || "—"}</td>
              <td style={td}><Stars value={r.rating} /></td>
              <td style={{ ...td, textAlign: "right", borderRadius: "0 var(--radius-md) var(--radius-md) 0" }}>
                <CTAButton retailer={r.retailer} linkKey={r.linkKey} href={r.href} position="comparison_table" size="sm" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
