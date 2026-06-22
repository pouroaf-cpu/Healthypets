// @ts-nocheck
"use client";

// Rounded white card with soft shadow — the core surface for guides, picks, tables.
export function Card({
  children,
  as = "div",
  padding = "lg",
  elevation = "sm",
  highlight = false,
  hoverLift = false,
  style = {},
  ...rest
}) {
  const pads = { none: "0", sm: "16px", md: "20px", lg: "24px", xl: "32px" };
  const shadows = { none: "none", xs: "var(--shadow-xs)", sm: "var(--shadow-sm)", md: "var(--shadow-md)", lg: "var(--shadow-lg)" };
  const Tag = as;
  const base = {
    background: "var(--surface-card)",
    borderRadius: "var(--radius-lg)",
    border: highlight ? "2px solid var(--green-primary)" : "1px solid var(--border-soft)",
    boxShadow: shadows[elevation],
    padding: pads[padding],
    boxSizing: "border-box",
    transition: "transform 160ms ease, box-shadow 160ms ease",
    ...style,
  };
  return (
    <Tag
      style={base}
      onMouseEnter={hoverLift ? (e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-md)"; } : undefined}
      onMouseLeave={hoverLift ? (e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = shadows[elevation]; } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
