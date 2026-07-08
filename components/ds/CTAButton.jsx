// @ts-nocheck
"use client";

import { track, retailerFromKey, pagePath } from "@/lib/analytics";

// Coral affiliate CTA. Routes through /go/<linkKey> (cloaked + click-logged) when linkKey
// is given; falls back to href. rel=sponsored nofollow, opens in a new tab.
// `position` records WHERE the click came from (inline / comparison_table / top_pick /
// pillar_premium) so PostHog can break affiliate clicks down by placement.
export function CTAButton({
  children = "Check price",
  retailer,
  linkKey,
  href,
  size = "md",
  fullWidth = false,
  position = "inline",
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

  // Fire the affiliate-click event before the browser opens the new tab. The /go route
  // still logs server-side to Supabase as a redundant backup.
  const handleClick = () => {
    track("affiliate_click", {
      link_key: linkKey ?? null,
      retailer: retailerFromKey(linkKey) ?? retailer ?? null,
      href: linkKey ? null : href ?? null,
      position,
      page_path: pagePath(),
    });
  };

  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "8px",
    fontFamily: "var(--font-heading)", fontWeight: 600, lineHeight: 1, color: "#fff",
    background: "var(--coral-cta)", border: "none", borderRadius: "var(--radius-pill)",
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
      onClick={handleClick}
      onMouseEnter={(e) => (e.currentTarget.style.background = "var(--coral-cta-hover)")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "var(--coral-cta)")}
      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.97)")}
      onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
      {...rest}
    >
      <span>{label}</span>
      <span aria-hidden="true" style={{ fontSize: "1.05em" }}>→</span>
    </a>
  );
}
