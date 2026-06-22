// @ts-nocheck
"use client";

// Coral affiliate CTA. Routes through /go/<linkKey> (cloaked + click-logged) when linkKey
// is given; falls back to href. rel=sponsored nofollow, opens in a new tab.
export function CTAButton({
  children = "Check price",
  retailer,
  linkKey,
  href,
  size = "md",
  fullWidth = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: "9px 16px", fontSize: "14px" },
    md: { padding: "13px 22px", fontSize: "15px" },
    lg: { padding: "16px 28px", fontSize: "16px" },
  };
  const label = retailer ? `Check price at ${retailer}` : children;
  const target = linkKey ? `/go/${linkKey}` : href || "#";

  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
    fontFamily: "var(--font-heading)", fontWeight: 600, lineHeight: 1, color: "#fff",
    background: "var(--coral)", border: "none", borderRadius: "var(--radius-pill)",
    boxShadow: "var(--shadow-cta)", cursor: "pointer", textDecoration: "none",
    width: fullWidth ? "100%" : "auto", boxSizing: "border-box",
    transition: "background 140ms ease, transform 120ms ease",
    ...sizes[size], ...style,
  };

  return (
    <a
      href={target}
      target="_blank"
      rel="sponsored nofollow noopener"
      style={base}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--coral-dark)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--coral)")}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      {...rest}
    >
      <span>{label}</span>
      <span aria-hidden="true" style={{ fontSize: "1.05em" }}>→</span>
    </a>
  );
}
