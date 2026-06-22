// @ts-nocheck
function ShieldCheck({ size = 16, color = "currentColor" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

// Vet-reviewed trust badge (E-E-A-T). Pill or inline-line variants.
export function VetReviewed({ name = "Dr. Anna Whitfield BVSc", variant = "pill", style = {} }) {
  if (variant === "line") {
    return (
      <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", fontSize: "13.5px", color: "var(--green-dark)", fontWeight: 600, ...style }}>
        <ShieldCheck size={16} color="var(--green-primary)" />
        Vet-reviewed{name ? ` by ${name}` : ""}
      </span>
    );
  }
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "var(--green-light)", color: "var(--green-dark)", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "13px", padding: "6px 13px 6px 11px", borderRadius: "var(--radius-pill)", ...style }}>
      <ShieldCheck size={15} color="var(--green-primary)" />
      Vet-reviewed
    </span>
  );
}
