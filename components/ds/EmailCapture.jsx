// @ts-nocheck
"use client";

import { useState } from "react";
import { Input } from "./Input.jsx";
import { Button } from "./Button.jsx";

// Email-capture band. Lead magnet: the free NZ Flea & Worming Reminder Calendar.
// Wired to POST /api/subscribe (Supabase hp_subscribers + MailerLite).
export function EmailCapture({
  title = "Never forget a flea treatment again",
  subtitle = "Get our free NZ Flea & Worming Reminder Calendar — a simple month-by-month plan for your cat or dog.",
  cta = "Send me the calendar",
  placeholder = "you@email.co.nz",
  variant = "band",
  source = "inline",
  style = {},
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | loading | done | error
  const onTinted = variant === "band";

  async function submit(e) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  return (
    <div style={{ background: onTinted ? "var(--green-light)" : "var(--white)", border: onTinted ? "none" : "1px solid var(--border-soft)", borderRadius: "var(--radius-xl)", padding: "clamp(24px, 4vw, 40px)", textAlign: "center", ...style }}>
      <div style={{ maxWidth: "560px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
        <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, fontSize: "12px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--green-dark)" }}>
          Free download
        </div>
        <h3 style={{ margin: 0, fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: "clamp(22px, 3vw, 28px)", color: "var(--ink)", lineHeight: 1.15 }}>{title}</h3>
        <p style={{ margin: "2px 0 14px", fontSize: "15.5px", lineHeight: 1.6, color: "var(--ink-soft)" }}>{subtitle}</p>
        {state === "done" ? (
          <div style={{ fontFamily: "var(--font-heading)", fontWeight: 600, color: "var(--green-dark)", fontSize: "16px" }}>
            ✓ Done! Check your inbox for the calendar.
          </div>
        ) : (
          <form onSubmit={submit} style={{ display: "flex", gap: "10px", width: "100%", flexWrap: "wrap", justifyContent: "center" }}>
            <div style={{ flex: "1 1 240px", minWidth: 0 }}>
              <Input type="email" required placeholder={placeholder} aria-label="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <Button type="submit" variant="primary" size="lg" style={{ flex: "0 0 auto" }} disabled={state === "loading"}>
              {state === "loading" ? "Sending…" : cta}
            </Button>
          </form>
        )}
        {state === "error" && <p style={{ margin: "8px 0 0", fontSize: "13px", color: "var(--coral-cta)" }}>Something went wrong — please try again.</p>}
        <p style={{ margin: "12px 0 0", fontSize: "12.5px", color: "var(--ink-muted)" }}>
          No spam. Unsubscribe anytime. We&apos;ll email you the calendar and occasional NZ pet-health tips.
        </p>
      </div>
    </div>
  );
}
