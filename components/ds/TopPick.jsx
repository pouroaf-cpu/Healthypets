// @ts-nocheck
import { Badge } from "./Badge.jsx";
import { CTAButton } from "./CTAButton.jsx";

// Top-pick product card. Use two side by side: a Budget pick and a Premium pick.
export function TopPick({ kind = "budget", product, tagline, price, rating, retailer, linkKey, href, image, style = {} }) {
  const isPremium = kind === "premium";
  const label = isPremium ? "Premium pick" : "Budget pick";
  return (
    <div style={{ display: "flex", flexDirection: "column", background: "var(--white)", border: isPremium ? "2px solid var(--green-primary)" : "1px solid var(--border-soft)", borderRadius: "var(--radius-lg)", boxShadow: "var(--shadow-sm)", overflow: "hidden", ...style }}>
      <div style={{ position: "relative", aspectRatio: "16 / 10", background: isPremium ? "var(--green-light)" : "var(--section)", display: "grid", placeItems: "center" }}>
        <div style={{ position: "absolute", top: "14px", left: "14px", zIndex: 1 }}><Badge tone={isPremium ? "green" : "light"}>{label}</Badge></div>
        {image ? <img src={image} alt={product} style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <span style={{ fontSize: "13px", color: "var(--ink-muted)", fontFamily: "var(--font-heading)", fontWeight: 600 }}>Product image</span>}
      </div>
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px", flex: 1 }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "10px" }}>
          <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "18px", color: "var(--ink)" }}>{product}</h3>
          {rating != null && <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}><span style={{ color: "var(--rating-star)" }}>★</span>{Number(rating).toFixed(1)}</span>}
        </div>
        <p style={{ margin: 0, fontSize: "14.5px", lineHeight: 1.55, color: "var(--ink-soft)" }}>{tagline}</p>
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", paddingTop: "8px" }}>
          {price && <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "20px", color: "var(--ink)" }}>{price}</span>}
          <CTAButton retailer={retailer} linkKey={linkKey} href={href} size="sm" />
        </div>
      </div>
    </div>
  );
}
