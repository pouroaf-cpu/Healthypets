// @ts-nocheck
// Horizontal trust strip: "NZ products & prices · Independent & honest".
const ICONS = {
  shield: <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />,
  pin: <><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></>,
  heart: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
};

function Ico({ name }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--green-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}

export function TrustStrip({ items = null, style = {} }) {
  const data = items || [
    { icon: "pin", label: "NZ products & prices", sub: "Real NZ$ at local retailers" },
    { icon: "heart", label: "Independent & honest", sub: "Our picks, never paid for" },
  ];
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 32px", justifyContent: "center", alignItems: "center", ...style }}>
      {data.map((it, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <span style={{ width: "44px", height: "44px", borderRadius: "var(--radius-md)", flex: "none", background: "var(--green-light)", display: "grid", placeItems: "center" }}>
            <Ico name={it.icon} />
          </span>
          <div style={{ lineHeight: 1.35 }}>
            <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "15px", color: "var(--ink)" }}>{it.label}</div>
            {it.sub && <div style={{ fontSize: "13px", color: "var(--ink-muted)" }}>{it.sub}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
