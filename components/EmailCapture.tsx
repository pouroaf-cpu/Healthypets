"use client";

import { useState } from "react";

export function EmailCapture({
  source = "inline",
  heading = "Never forget a flea treatment again",
  blurb = "Get the free NZ Flea & Worming Reminder Calendar — straight to your inbox.",
}: {
  source?: string;
  heading?: string;
  blurb?: string;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
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
    <div className="rounded-2xl bg-brand-light p-6">
      <h3 className="font-heading text-lg font-bold text-ink">{heading}</h3>
      <p className="mt-1 text-sm text-ink/75">{blurb}</p>
      {state === "done" ? (
        <p className="mt-3 font-medium text-brand-dark">✓ You&apos;re in — check your inbox.</p>
      ) : (
        <form onSubmit={submit} className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.co.nz"
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-brand"
          />
          <button
            type="submit"
            disabled={state === "loading"}
            className="rounded-lg bg-cta px-5 py-2.5 text-sm font-semibold text-white hover:bg-cta-dark disabled:opacity-60"
          >
            {state === "loading" ? "…" : "Send it"}
          </button>
        </form>
      )}
      {state === "error" && (
        <p className="mt-2 text-sm text-cta-dark">Something went wrong — try again.</p>
      )}
    </div>
  );
}
