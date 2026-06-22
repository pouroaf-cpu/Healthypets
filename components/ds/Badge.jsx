// @ts-nocheck
// Small status pill. Tones: green (default), coral, light, neutral, gold, dark.
export function Badge({ children, tone = "green", size = "md", icon = null, style = {}, ...rest }) {
  const tones = {
    green: { background: "var(--green-primary)", color: "#fff" },
    coral: { background: "var(--coral)", color: "#fff" },
    light: { background: "var(--green-light)", color: "var(--green-dark)" },
    neutral: { background: "var(--section)", color: "var(--ink-soft)" },
    gold: { background: "#FDF1DC", color: "#9A6B16" },
    dark: { background: "var(--ink)", color: "#fff" },
  };
  const sizes = { sm: { fontSize: "11px", padding: "3px 9px" }, md: { fontSize: "12px", padding: "5px 12px" } };
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", gap: "5px",
        fontFamily: "var(--font-heading)", fontWeight: 600, letterSpacing: "0.02em",
        borderRadius: "var(--radius-pill)", lineHeight: 1.2, whiteSpace: "nowrap",
        ...sizes[size], ...tones[tone], ...style,
      }}
      {...rest}
    >
      {icon}
      {children}
    </span>
  );
}
