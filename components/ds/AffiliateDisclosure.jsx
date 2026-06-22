// @ts-nocheck
// Affiliate disclosure banner for money pages. Honest, plain-English, never hidden.
export function AffiliateDisclosure({ variant = "inline", children, style = {} }) {
  const text = children ||
    "Healthy Pets is reader-supported. When you buy through links on our site we may earn a small commission — at no extra cost to you. It never changes our picks. Prices were checked at NZ retailers and can change.";

  if (variant === "compact") {
    return (
      <p style={{ margin: 0, fontSize: "12.5px", color: "var(--ink-muted)", lineHeight: 1.5, ...style }}>
        <strong style={{ color: "var(--ink-soft)", fontWeight: 600 }}>Affiliate disclosure:</strong> {text}
      </p>
    );
  }
  return (
    <div role="note" style={{ display: "flex", gap: "12px", alignItems: "flex-start", background: "var(--section)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "14px 16px", ...style }}>
      <span aria-hidden="true" style={{ flex: "none", width: "24px", height: "24px", borderRadius: "50%", background: "var(--green-light)", color: "var(--green-dark)", display: "grid", placeItems: "center", fontSize: "13px", fontWeight: 700, fontFamily: "var(--font-heading)" }}>i</span>
      <p style={{ margin: 0, fontSize: "13.5px", color: "var(--ink-soft)", lineHeight: 1.55 }}>
        <strong style={{ color: "var(--ink)", fontWeight: 600 }}>Affiliate disclosure.</strong> {text}
      </p>
    </div>
  );
}
