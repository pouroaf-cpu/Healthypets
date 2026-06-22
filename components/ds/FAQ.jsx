// @ts-nocheck
"use client";

import { useState } from "react";

// FAQ accordion. Pass items=[{q, a}]. Single-open by default.
export function FAQ({ items = [], allowMultiple = false, defaultOpen = 0, style = {} }) {
  const [open, setOpen] = useState(allowMultiple ? (defaultOpen === null ? [] : [defaultOpen]) : defaultOpen);
  const isOpen = (i) => (allowMultiple ? open.includes(i) : open === i);
  const toggle = (i) => {
    if (allowMultiple) setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));
    else setOpen((o) => (o === i ? -1 : i));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", ...style }}>
      {items.map((item, i) => {
        const o = isOpen(i);
        return (
          <div key={i} style={{ background: "var(--white)", border: "1px solid var(--border-soft)", borderRadius: "var(--radius-md)", boxShadow: o ? "var(--shadow-sm)" : "none", overflow: "hidden", transition: "box-shadow 160ms ease" }}>
            <button onClick={() => toggle(i)} aria-expanded={o} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", textAlign: "left", padding: "18px 20px", background: "transparent", border: "none", cursor: "pointer", fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "16px", color: "var(--ink)" }}>
              {item.q}
              <span aria-hidden="true" style={{ flex: "none", width: "26px", height: "26px", display: "grid", placeItems: "center", borderRadius: "50%", background: o ? "var(--green-primary)" : "var(--green-light)", color: o ? "#fff" : "var(--green-dark)", fontSize: "18px", lineHeight: 1, transition: "transform 200ms ease, background 160ms ease", transform: o ? "rotate(45deg)" : "rotate(0deg)" }}>+</span>
            </button>
            <div style={{ display: "grid", gridTemplateRows: o ? "1fr" : "0fr", transition: "grid-template-rows 220ms ease" }}>
              <div style={{ overflow: "hidden" }}>
                <div style={{ padding: "0 20px 20px", color: "var(--ink-soft)", fontSize: "15px", lineHeight: 1.65 }}>{item.a}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
