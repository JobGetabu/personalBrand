"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { nav, site, socials } from "@/lib/site";
import { Clock } from "./clock";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // Move focus out of the menu before it turns inert/aria-hidden, so focus never sits in hidden content.
  const close = () => {
    (document.activeElement as HTMLElement | null)?.blur();
    setOpen(false);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
          scrolled || open ? "border-b hairline bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="progress-bar absolute inset-x-0 bottom-0 h-px bg-accent opacity-60" aria-hidden="true" />
        <div className="container-x flex h-[72px] items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3" onClick={close}>
            <span className="sr-only">{site.name}, home</span>
            <span
              aria-hidden="true"
              className="grid size-10 place-items-center rounded-xl border hairline bg-surface text-sm font-semibold tracking-tight"
            >
              {site.shortName}
            </span>
          </Link>
          <Clock className="mr-auto" />

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item, i) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-1.5 rounded-full px-3 py-2 text-sm text-muted transition-colors hover:text-text"
                  >
                    <span className="font-mono text-[10px] text-accent/80">{String(i + 1).padStart(2, "0")}</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-2 rounded-full border hairline px-3 py-2 text-xs text-muted md:flex">
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60 motion-reduce:animate-none" />
                <span className="relative inline-flex size-2 rounded-full bg-accent" />
              </span>
              {site.availability}
            </span>
            <ThemeToggle />
            <button
              type="button"
              className="grid size-11 place-items-center rounded-full border hairline lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
                />
                <span
                  className={`absolute left-0 h-px w-5 bg-current transition-transform duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would otherwise trap this fixed panel inside the 72px bar. */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-40 overflow-y-auto bg-bg pt-[72px] transition-opacity duration-300 lg:hidden ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        aria-hidden={!open}
        inert={!open}
      >
        <nav aria-label="Mobile" className="container-x flex min-h-full flex-col justify-between gap-10 pb-10 pt-6">
          <ul className="space-y-2">
            {nav.map((item, i) => (
              <li
                key={item.href}
                className={`transition-[opacity,transform] duration-500 ease-[var(--ease-out)] motion-reduce:transition-none ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${80 + i * 60}ms` : "0ms" }}
              >
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex items-baseline gap-3 py-1.5 text-[clamp(2.5rem,12vw,3.5rem)] font-semibold tracking-tight"
                >
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="space-y-6">
            <Link
              href="/#contact"
              onClick={close}
              className="flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-accent font-medium text-accent-ink"
            >
              Start a project <span aria-hidden="true">→</span>
            </Link>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
              {socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer me" className="inline-flex min-h-11 items-center">
                    {s.label} ↗<span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Clock />
              <span className="label-mono">{site.availability}</span>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
