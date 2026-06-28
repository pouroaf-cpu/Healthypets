// @ts-nocheck
"use client";

const COLS = [
  { h: "Pet health", links: [["Flea & Worming", "/flea-and-worming"], ["Joint & Mobility", "/joint-and-mobility"], ["Gut Health", "/gut-health"], ["Skin & Coat", "/skin-and-coat"], ["Dental Care", "/dental"]] },
  { h: "By pet", links: [["Cats", "/cats"], ["Dogs", "/dogs"], ["Kittens", "/cats"], ["Puppies", "/dogs"], ["Senior pets", "/guides"]] },
  { h: "Company", links: [["About us", "/about"], ["Editorial policy", "/editorial-policy"], ["How we review", "/editorial-policy"], ["Contact", "/contact"]] },
];
const LEGAL = [["Privacy", "/privacy"], ["Terms", "/privacy"], ["Contact", "/contact"]];

function Social({ d, label, href = "/" }) {
  return (
    <a href={href} aria-label={label} style={{ width: "38px", height: "38px", borderRadius: "50%", display: "grid", placeItems: "center", background: "rgba(255,255,255,0.10)", color: "#fff", textDecoration: "none" }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">{d}</svg>
    </a>
  );
}

// Site footer — link columns, NZ territory note, socials, legal row.
export function Footer({ logoSrc = "/logo-mark.svg", style = {} }) {
  return (
    <footer style={{ background: "var(--ink)", color: "#fff", ...style }}>
      <div style={{ maxWidth: "var(--container)", margin: "0 auto", padding: "56px 20px 28px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "minmax(220px, 1.3fr) repeat(3, 1fr)", gap: "40px 32px" }} className="hp-foot-grid">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
              <img src={logoSrc} width="34" height="34" alt="" style={{ background: "#fff", borderRadius: "9px", padding: "2px" }} />
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "19px" }}>Healthy Pets</span>
            </div>
            <p style={{ margin: "0 0 16px", fontSize: "14px", lineHeight: 1.6, color: "rgba(255,255,255,0.72)", maxWidth: "300px" }}>
              Honest, practical pet-health advice for Kiwi cat &amp; dog owners. NZ products, NZ prices.
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <Social label="Facebook" d={<path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.5l.5-3H14V9z" />} />
              <Social label="Instagram" d={<><rect x="4" y="4" width="16" height="16" rx="5" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="3.4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17" cy="7" r="1.2" /></>} />
              <Social label="TikTok" d={<path d="M16 4c.3 2 1.6 3.4 3.5 3.7v2.6c-1.3 0-2.6-.4-3.5-1.1v5.2c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.4-5.2 5.3-4.9v2.7c-.3-.1-.6-.2-1-.2-1.3 0-2.3 1-2.3 2.4 0 1.3 1 2.4 2.3 2.4 1.4 0 2.4-1.1 2.4-2.6V4H16z" />} />
            </div>
          </div>
          {COLS.map((c) => (
            <div key={c.h}>
              <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "13px", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "14px" }}>{c.h}</div>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
                {c.links.map(([l, href]) => (
                  <li key={l}>
                    <a href={href} style={{ color: "rgba(255,255,255,0.82)", textDecoration: "none", fontSize: "14px" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.82)")}>{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "40px", paddingTop: "22px", borderTop: "1px solid rgba(255,255,255,0.14)", display: "flex", flexWrap: "wrap", gap: "10px 20px", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ margin: 0, fontSize: "13px", color: "rgba(255,255,255,0.6)" }}>
            © 2026 Healthy Pets · Made in Aotearoa New Zealand 🇳🇿 · Prices in NZ$
          </p>
          <div style={{ display: "flex", gap: "18px", flexWrap: "wrap" }}>
            {LEGAL.map(([l, href]) => (
              <a key={l} href={href} style={{ color: "rgba(255,255,255,0.6)", textDecoration: "none", fontSize: "13px" }}>{l}</a>
            ))}
          </div>
        </div>
        <p style={{ margin: "20px 0 0", fontSize: "12px", color: "rgba(255,255,255,0.45)", lineHeight: 1.6, maxWidth: "720px" }}>
          Healthy Pets provides general information only and is not a substitute for veterinary advice. Always consult your vet about your pet&apos;s health.
        </p>
      </div>

      <style>{`
        @media (max-width: 760px) { .hp-foot-grid { grid-template-columns: 1fr 1fr !important; } }
        @media (max-width: 460px) { .hp-foot-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  );
}
