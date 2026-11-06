import { NextResponse, type NextRequest } from "next/server";
import { ContactSchema } from "@/lib/contact-schema";
import { rateLimit } from "@/lib/server/rate-limit";
import { verifyTurnstile } from "@/lib/server/turnstile";

const MAX_BYTES = 16 * 1024;

const escape = (s: string) => s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * Contact form → Resend. The destination inbox (CONTACT_TO) lives only in server env and is
 * never sent to the client. Works with JSON (JS form) and form-encoded posts (no-JS fallback).
 */
export async function POST(req: NextRequest) {
  const isJson = req.headers.get("content-type")?.includes("application/json");
  const reply = (status: number, body: Record<string, unknown>) => {
    if (isJson) return NextResponse.json(body, { status });
    const url = new URL("/", req.url);
    url.searchParams.set("contact", body.ok ? "sent" : "error");
    url.hash = "contact";
    return NextResponse.redirect(url, 303);
  };

  const len = Number(req.headers.get("content-length") ?? 0);
  if (len > MAX_BYTES) return reply(413, { ok: false, error: "Message too large." });

  // Same-origin check (CSRF hardening for the form-encoded path).
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.nextUrl.host) return reply(403, { ok: false, error: "Forbidden." });

  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (!(await rateLimit(ip))) return reply(429, { ok: false, error: "Too many messages. Please try again later." });

  let raw: Record<string, unknown>;
  try {
    const text = await req.text();
    if (text.length > MAX_BYTES) return reply(413, { ok: false, error: "Message too large." });
    raw = isJson ? JSON.parse(text) : Object.fromEntries(new URLSearchParams(text));
  } catch {
    return reply(400, { ok: false, error: "Invalid request." });
  }

  const parsed = ContactSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors = Object.fromEntries(parsed.error.issues.map((i) => [String(i.path[0]), i.message]));
    // Honeypot hit: pretend success so bots learn nothing.
    if (fieldErrors.website) return reply(200, { ok: true });
    return reply(422, { ok: false, error: "Please check the highlighted fields.", fieldErrors });
  }
  const data = parsed.data;
  if (data.startedAt && Date.now() - data.startedAt < 2500) return reply(200, { ok: true }); // too fast = bot

  if (!(await verifyTurnstile(data["cf-turnstile-response"], ip))) {
    return reply(400, { ok: false, error: "Spam check failed. Please try again." });
  }

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  // Until a domain is verified in Resend, its shared sender works for mail to your own account.
  const from = process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>";
  if (!key || !to) {
    console.warn("[contact] email delivery is not configured");
    return reply(503, { ok: false, error: "The form is not connected yet. Please reach out on LinkedIn." });
  }

  const html = `
    <h2>New portfolio enquiry</h2>
    <p><strong>Name:</strong> ${escape(data.name)}</p>
    <p><strong>Company:</strong> ${escape(data.company || "—")}</p>
    <p><strong>Email:</strong> ${escape(data.email)}</p>
    <p><strong>Budget:</strong> ${escape(data.budget)}</p>
    <p style="white-space:pre-wrap">${escape(data.message)}</p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `Portfolio enquiry from ${data.name.slice(0, 60)}`,
        html,
      }),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Resend ${res.status}`);
  } catch (e) {
    console.error("[contact] send failed", e instanceof Error ? e.message : "unknown");
    return reply(502, { ok: false, error: "Something went wrong sending your message. Please try LinkedIn." });
  }
  return reply(200, { ok: true });
}
