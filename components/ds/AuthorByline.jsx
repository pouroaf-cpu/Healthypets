// @ts-nocheck

// Author byline with avatar, name, role, and date.
export function AuthorByline({
  author = "Megan Clark",
  role = "Senior Editor, Healthy Pets",
  date = "Updated June 2026",
  avatar,
  readTime,
  style = {},
}) {
  const initials = (author || "HP").split(" ").map((w) => w[0]).slice(0, 2).join("");
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", ...style }}>
      <div style={{ display: "flex", alignItems: "center", gap: "11px" }}>
        {avatar ? (
          <img src={avatar} alt={author} style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }} />
        ) : (
          <span style={{ width: "44px", height: "44px", borderRadius: "50%", flex: "none", background: "var(--green-primary)", color: "#fff", display: "grid", placeItems: "center", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "16px" }}>{initials}</span>
        )}
        <div style={{ lineHeight: 1.35 }}>
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "15px", color: "var(--ink)" }}>By {author}</div>
          <div style={{ fontSize: "13px", color: "var(--ink-muted)" }}>{role}{date ? ` · ${date}` : ""}{readTime ? ` · ${readTime}` : ""}</div>
        </div>
      </div>
    </div>
  );
}
