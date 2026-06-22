// @ts-nocheck
"use client";

import { useState } from "react";

function Icon({ d, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {d}
    </svg>
  );
}
const search = <><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></>;
const menu = <><path d="M4 6h16M4 12h16M4 18h16" /></>;
const close = <><path d="M18 6 6 18M6 6l12 12" /></>;

const NAV = ["Cats", "Dogs", "Flea & Worming", "Supplements", "Food", "Guides"];
const ROUTES = {
  Cats: "/cats", Dogs: "/dogs", "Flea & Worming": "/flea-and-worming",
  Supplements: "/supplements", Food: "/food", Guides: "/guides",
};
const hrefFor = (label) => ROUTES[label] || "/";

// Sticky site header: paw-in-leaf logo, primary nav, search. Collapses to a menu on mobile.
export function Header({ active = "", logoSrc = "/logo-mark.svg", nav = NAV, onSearch = undefined, style = {} }) {
  const [open, setOpen] = useState(false);

  const link = (label) => (
    <a
      key={label}
      href={hrefFor(label)}
      style={{
        fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "14.5px", textDecoration: "none",
        color: active === label ? "var(--green-dark)" : "var(--ink-soft)", padding: "6px 2px",
        borderBottom: active === label ? "2px solid var(--green-primary)" : "2px solid transparent",
        whiteSpace: "nowrap", transition: "color 140ms ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.color = "var(--green-dark)")}
      onMouseLeave={(e) => (e.currentTarget.style.color = active === label ? "var(--green-dark)" : "var(--ink-soft)")}
    >
      {label}
    </a>
  );

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.92)", backdropFilter: "saturate(180%) blur(10px)", WebkitBackdropFilter: "saturate(180%) blur(10px)", borderBottom: "1px solid var(--border-soft)", ...style }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "0 20px", height: "var(--header-height)", display: "flex", alignItems: "center", gap: "20px" }}>
        <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", flex: "none" }}>
          <img src={logoSrc} width="36" height="36" alt="" />
          <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "20px", letterSpacing: "-0.02em" }}>
            <span style={{ color: "var(--ink)" }}>Healthy</span> <span style={{ color: "var(--green-primary)" }}>Pets</span>
          </span>
        </a>

        <nav className="hp-nav-desktop" style={{ display: "flex", alignItems: "center", gap: "22px", marginLeft: "8px" }}>
          {nav.map(link)}
        </nav>

        <div style={{ flex: 1 }} />

        <button className="hp-nav-desktop" onClick={onSearch} aria-label="Search" style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "var(--section)", border: "1px solid var(--border)", borderRadius: "var(--radius-pill)", padding: "9px 16px 9px 14px", color: "var(--ink-muted)", fontSize: "14px", cursor: "pointer", fontFamily: "var(--font-body)" }}>
          <Icon d={search} size={17} /> Search…
        </button>

        <button className="hp-menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open} style={{ display: "none", background: "transparent", border: "none", color: "var(--ink)", cursor: "pointer", padding: "6px" }}>
          <Icon d={open ? close : menu} size={24} />
        </button>
      </div>

      {open && (
        <div className="hp-nav-mobile" style={{ display: "none", borderTop: "1px solid var(--border-soft)", background: "#fff", padding: "12px 20px 18px" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {nav.map((l) => (
              <a key={l} href={hrefFor(l)} style={{ padding: "12px 0", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "16px", color: active === l ? "var(--green-dark)" : "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--border-soft)" }}>{l}</a>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .hp-menu-btn { display: none; }
        @media (max-width: 880px) {
          .hp-nav-desktop { display: none !important; }
          .hp-nav-mobile { display: block !important; }
          .hp-menu-btn { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
}
