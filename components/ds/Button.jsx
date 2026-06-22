// @ts-nocheck
"use client";

// Healthy Pets primary button. Green by default; use CTAButton for coral affiliate CTAs.
export function Button({
  children,
  variant = "primary",
  size = "md",
  as = "button",
  iconRight = null,
  iconLeft = null,
  fullWidth = false,
  disabled = false,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: "8px 16px", fontSize: "14px" },
    md: { padding: "12px 22px", fontSize: "15px" },
    lg: { padding: "15px 28px", fontSize: "16px" },
  };
  const variants = {
    primary: { background: "var(--green-primary)", color: "#fff", border: "1px solid transparent", "--hover-bg": "var(--green-dark)" },
    secondary: { background: "var(--white)", color: "var(--green-dark)", border: "1.5px solid var(--green-primary)", "--hover-bg": "var(--green-light)" },
    ghost: { background: "transparent", color: "var(--green-dark)", border: "1px solid transparent", "--hover-bg": "var(--green-light)" },
  };
  const v = variants[variant] || variants.primary;
  const Tag = as;

  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
    fontFamily: "var(--font-heading)", fontWeight: 600, lineHeight: 1,
    borderRadius: "var(--radius-pill)", cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1, width: fullWidth ? "100%" : "auto",
    transition: "background 140ms ease, transform 120ms ease, box-shadow 140ms ease",
    textDecoration: "none", boxSizing: "border-box",
    ...sizes[size], ...v, ...style,
  };

  return (
    <Tag
      style={base}
      disabled={as === "button" ? disabled : undefined}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = v["--hover-bg"]; }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = v.background; }}
      onMouseDown={(e) => { if (!disabled) e.currentTarget.style.transform = "scale(0.97)"; }}
      onMouseUp={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </Tag>
  );
}
