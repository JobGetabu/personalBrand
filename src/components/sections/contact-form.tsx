"use client";
import Script from "next/script";
import { useRef, useState } from "react";
import { budgets } from "@/lib/budgets";
import { contactPresets } from "@/lib/site";

type Status = { kind: "idle" | "sending" | "sent" | "error"; message?: string; mailHref?: string };
const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => string; reset: (id?: string) => void };
  }
}

export function ContactForm({ initial }: { initial?: "sent" | "error" }) {
  const [status, setStatus] = useState<Status>(
    initial === "sent"
      ? { kind: "sent" }
      : initial === "error"
        ? { kind: "error", message: "Something went wrong. Please try again." }
        : { kind: "idle" },
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [startedAt, setStartedAt] = useState<number>(0);
  const tsRef = useRef<HTMLDivElement>(null);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const tsId = useRef<string | undefined>(undefined);

  const renderTurnstile = () => {
    if (!siteKey || !tsRef.current || !window.turnstile || tsId.current) return;
    tsId.current = window.turnstile.render(tsRef.current, { sitekey: siteKey, appearance: "interaction-only", theme: "auto" });
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ kind: "sending" });
    setErrors({});
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json()) as { ok: boolean; error?: string; fieldErrors?: Record<string, string>; mailHref?: string };
      if (json.ok) {
        setStatus({ kind: "sent" });
        form.reset();
      } else {
        setErrors(json.fieldErrors ?? {});
        setStatus({ kind: "error", message: json.error, mailHref: json.mailHref });
        // Delivery is down: open the visitor's mail app with the message already written.
        if (json.mailHref) window.location.href = json.mailHref;
        window.turnstile?.reset(tsId.current);
        const first = json.fieldErrors && Object.keys(json.fieldErrors)[0];
        if (first) (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      }
    } catch {
      setStatus({ kind: "error", message: "Network error. Please try again." });
    }
  }

  const field =
    "w-full rounded-xl border hairline bg-surface px-4 py-3 text-base text-text placeholder:text-muted/70 focus:border-accent focus:outline-none aria-[invalid=true]:border-red-400";
  const err = (name: string) =>
    errors[name] ? (
      <span id={`${name}-error`} className="text-sm text-red-300">
        {errors[name]}
      </span>
    ) : null;
  const a11y = (name: string) => ({ "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `${name}-error` : undefined });

  if (status.kind === "sent")
    return (
      <div role="status" className="rounded-[var(--radius)] border border-accent/40 bg-accent/10 p-8">
        <p className="text-2xl font-semibold tracking-tight">Thanks, message received.</p>
        <p className="mt-2 text-muted">I usually reply within two working days.</p>
      </div>
    );

  return (
    <form
      action="/api/contact"
      method="post"
      onSubmit={onSubmit}
      onFocus={() => startedAt || setStartedAt(Date.now())}
      noValidate
      className="grid gap-5"
    >
      {siteKey && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
          strategy="lazyOnload"
          onReady={renderTurnstile}
        />
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm">Name</span>
          <input name="name" required autoComplete="name" maxLength={100} className={field} {...a11y("name")} />
          {err("name")}
        </label>
        <label className="grid gap-2">
          <span className="text-sm">
            Company <span className="text-muted">(optional)</span>
          </span>
          <input name="company" autoComplete="organization" maxLength={120} className={field} />
        </label>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2">
          <span className="text-sm">Email</span>
          <input name="email" type="email" required autoComplete="email" maxLength={200} className={field} {...a11y("email")} />
          {err("email")}
        </label>
        <label className="grid gap-2">
          <span className="text-sm">Budget or role</span>
          <select name="budget" className={field} defaultValue="Not sure yet">
            {budgets.map((b) => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </label>
      </div>
      <fieldset className="grid gap-2">
        <legend className="mb-2 text-sm">Start with one sentence, or pick one</legend>
        <div className="flex flex-wrap gap-2">
          {contactPresets.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                const el = msgRef.current;
                if (!el) return;
                el.value = `${p.replace(" · ", ": ")}. `;
                el.focus();
                el.setSelectionRange(el.value.length, el.value.length);
              }}
              className="min-h-11 rounded-full border hairline px-4 text-sm text-muted transition-colors hover:border-accent hover:text-text"
            >
              {p}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="grid gap-2">
        <span className="text-sm">What are you building?</span>
        <textarea ref={msgRef} name="message" required rows={5} minLength={20} maxLength={4000} className={field} {...a11y("message")} />
        {err("message")}
      </label>
      {/* Honeypot: hidden from people and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <input type="hidden" name="startedAt" value={startedAt || ""} />
      <div ref={tsRef} />
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          data-magnetic
          disabled={status.kind === "sending"}
          className="inline-flex min-h-12 items-center gap-3 rounded-full bg-accent px-7 font-medium text-accent-ink transition-colors hover:bg-text hover:text-bg disabled:opacity-60"
        >
          {status.kind === "sending" ? "Sending…" : "Send message"} <span aria-hidden="true">→</span>
        </button>
        <p className="text-sm text-muted">No spam, no tracking. Your details are only used to reply.</p>
      </div>
      <p aria-live="assertive" className="text-sm text-red-300">
        {status.kind === "error" ? status.message : ""}
      </p>
      {status.kind === "error" && status.mailHref && (
        <a
          href={status.mailHref}
          className="inline-flex min-h-12 items-center gap-3 rounded-full border hairline px-7 font-medium hover:border-text"
        >
          Send it from your email app instead <span aria-hidden="true">→</span>
        </a>
      )}
    </form>
  );
}
