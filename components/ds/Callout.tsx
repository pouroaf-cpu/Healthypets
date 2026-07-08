import { HPIcon } from "./Icons";

// Scannable highlight box for use inside MDX articles:
//   <Callout type="vet">Always check the label for your cat's weight band.</Callout>
//   <Callout type="safety" title="Never do this">...</Callout>
//   <Callout type="nz">In NZ, fleas don't die off over winter indoors.</Callout>
//   <Callout type="tip">...</Callout>
type CalloutType = "vet" | "safety" | "nz" | "tip" | "money";

const STYLES: Record<CalloutType, { bg: string; border: string; icon: string; iconColor: string; label: string }> = {
  vet: { bg: "var(--green-light)", border: "var(--green-primary)", icon: "shield", iconColor: "var(--green-dark)", label: "Vet-informed" },
  safety: { bg: "#FCEDEB", border: "var(--coral)", icon: "shield", iconColor: "var(--coral-dark)", label: "Safety first" },
  nz: { bg: "#EAF2FB", border: "#5B9BD5", icon: "leaf", iconColor: "#2F6FB0", label: "NZ note" },
  tip: { bg: "var(--surface)", border: "var(--border-strong)", icon: "sparkles", iconColor: "var(--green-dark)", label: "Tip" },
  money: { bg: "#FBF1E6", border: "#E0A75E", icon: "star", iconColor: "#B8801F", label: "Worth knowing" },
};

export function Callout({
  type = "tip",
  title,
  children,
}: {
  type?: CalloutType;
  title?: string;
  children: React.ReactNode;
}) {
  const s = STYLES[type] || STYLES.tip;
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        background: s.bg,
        border: `1px solid ${s.border}`,
        borderRadius: "var(--radius-md)",
        padding: "16px 18px",
        margin: "24px 0",
      }}
    >
      <span style={{ flex: "none", marginTop: 2, color: s.iconColor }}>
        <HPIcon name={s.icon} size={20} stroke={2} />
      </span>
      <div style={{ fontSize: 15.5, lineHeight: 1.65, color: "var(--ink)" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 13, letterSpacing: ".02em", color: s.iconColor, marginBottom: 4 }}>
          {title || s.label}
        </div>
        <div className="hp-callout-body">{children}</div>
      </div>
    </div>
  );
}
