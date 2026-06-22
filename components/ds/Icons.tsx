import type { CSSProperties, ReactNode } from "react";

// Lucide-derived icon set (ISC).
export function HPIcon({
  name,
  size = 24,
  color = "currentColor",
  stroke = 2,
}: {
  name: string;
  size?: number;
  color?: string;
  stroke?: number;
}) {
  const P: Record<string, ReactNode> = {
    search: <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>,
    bug: <><path d="m8 2 1.88 1.88M14.12 3.88 16 2M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" /><path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6M12 20v-9M6.53 9C4.6 8.8 3 7.1 3 5M6 13H2M3 21c0-2.1 1.7-3.9 3.8-4M20.97 5c0 2.1-1.6 3.8-3.5 4M22 13h-4M17.2 17c2.1.1 3.8 1.9 3.8 4" /></>,
    bone: <path d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z" />,
    leaf: <><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" /><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" /></>,
    smile: <><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></>,
    sparkles: <path d="M9.94 14.34A2 2 0 0 0 8.66 13.06L3.5 11.4l5.16-1.66A2 2 0 0 0 9.94 8.46L11.6 3.3l1.66 5.16a2 2 0 0 0 1.28 1.28l5.16 1.66-5.16 1.66a2 2 0 0 0-1.28 1.28L11.6 19.5ZM19 4v3M5 17v2M19 17v2" />,
    droplet: <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />,
    apple: <><path d="M12 6.5C12 4 14 2 17 2c0 2.5-2 4.5-5 4.5M12 8c-1.5-2-3-2.5-4.5-2.5C5 5.5 3 7.7 3 11c0 4 2.5 9 5 9 1.2 0 1.8-.5 3-.5s1.8.5 3 .5c2.5 0 5-5 5-9 0-2.2-1-4-2.5-4.8" /></>,
    tooth: <path d="M12 5.5c-1.5-1.5-3-2-4.5-2C5 3.5 3.5 5.5 3.5 8c0 1.5.5 3 1 5s.5 4 1.5 5 1.5-2 2-3.5.5-2 2.5-2 2 .5 2.5 2 .5 4.5 1.5 3.5 1-3 1.5-5 1-3.5 1-5c0-2.5-1.5-4.5-4-4.5-1.5 0-3 .5-4.5 2Z" />,
    mail: <><rect x="2" y="4" width="20" height="16" rx="2" fill="none" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
    arrowRight: <path d="M5 12h14M12 5l7 7-7 7" />,
    star: <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01z" />,
    check: <path d="M20 6 9 17l-5-5" />,
    comb: <path d="M3 8h18M5 8v10M9 8v6M12 8v10M15 8v6M18 8v10M3 8V5h18v3" />,
    shield: <><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /><path d="m9 12 2 2 4-4" /></>,
    home: <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" />,
  };
  const filled = name === "star";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={filled ? color : "none"}
      stroke={filled ? "none" : color}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {P[name]}
    </svg>
  );
}

const TONES: Record<string, string> = {
  green: "linear-gradient(135deg, #E8F5EF 0%, #D4ECE0 100%)",
  sky: "linear-gradient(135deg, #EAF2FB 0%, #DCEBF7 100%)",
  sand: "linear-gradient(135deg, #FBF1E6 0%, #F6E4CE 100%)",
  blush: "linear-gradient(135deg, #FCEDEB 0%, #FBDDD8 100%)",
};

// Warm tinted image placeholder (stand-in for real pet photography).
export function PetImage({
  label = "Pet photo",
  tone = "green",
  icon = "smile",
  radius = "var(--radius-lg)",
  style = {},
}: {
  label?: string;
  tone?: string;
  icon?: string;
  radius?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: 0,
        background: TONES[tone] || TONES.green,
        borderRadius: radius,
        display: "grid",
        placeItems: "center",
        overflow: "hidden",
        ...style,
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "var(--green-dark)", opacity: 0.7 }}>
        <HPIcon name={icon} size={40} stroke={1.6} />
        <span style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: 12, letterSpacing: ".02em" }}>{label}</span>
      </div>
    </div>
  );
}
