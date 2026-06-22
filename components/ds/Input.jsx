// @ts-nocheck
"use client";

// Text input with optional leading icon. Used in search and email capture.
export function Input({ icon, type = "text", fullWidth = true, style = {}, wrapStyle = {}, ...rest }) {
  return (
    <div
      style={{
        display: "flex", alignItems: "center", gap: "10px",
        background: "var(--white)", border: "1.5px solid var(--border-strong)",
        borderRadius: "var(--radius-pill)", padding: "0 18px", height: "52px",
        width: fullWidth ? "100%" : "auto", boxSizing: "border-box",
        transition: "border-color 140ms ease, box-shadow 140ms ease",
        ...wrapStyle,
      }}
      onFocusCapture={(e) => { e.currentTarget.style.borderColor = "var(--green-primary)"; e.currentTarget.style.boxShadow = "var(--shadow-focus)"; }}
      onBlurCapture={(e) => { e.currentTarget.style.borderColor = "var(--border-strong)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {icon && <span style={{ display: "flex", color: "var(--ink-muted)", flex: "none" }}>{icon}</span>}
      <input
        type={type}
        style={{ flex: 1, border: "none", outline: "none", background: "transparent", fontFamily: "var(--font-body)", fontSize: "15px", color: "var(--ink)", minWidth: 0, ...style }}
        {...rest}
      />
    </div>
  );
}
