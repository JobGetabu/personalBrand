import Link from "next/link";
import { nav, site, socials } from "@/lib/site";
import { BackToTop } from "./back-to-top";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t hairline">
      <div className="container-x grid gap-10 py-12 md:grid-cols-[1fr_auto_auto] md:items-start">
        <div className="space-y-3">
          <p className="text-2xl font-semibold tracking-tight">
            {site.name}
            <span className="text-muted"> — {site.title}</span>
          </p>
          <p className="max-w-sm text-sm text-muted">{site.region}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-10 text-sm md:gap-y-2">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="inline-flex min-h-11 items-center text-muted hover:text-text md:min-h-0">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/uses" className="inline-flex min-h-11 items-center text-muted hover:text-text md:min-h-0">
                Uses
              </Link>
            </li>
            <li>
              <Link href="/now" className="inline-flex min-h-11 items-center text-muted hover:text-text md:min-h-0">
                Now
              </Link>
            </li>
          </ul>
        </nav>
        <ul className="text-sm md:space-y-2">
          {socials.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex min-h-11 items-center text-muted hover:text-text md:min-h-0"
              >
                {s.label} <span aria-hidden="true">↗</span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="container-x flex flex-wrap items-center justify-between gap-4 border-t hairline py-6">
        <p className="label-mono">
          © {year} · Designed &amp; built by {site.name} ·{" "}
          <a
            href={site.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-accent underline-offset-4 hover:text-text"
          >
            Source
          </a>
        </p>
        <BackToTop />
      </div>
    </footer>
  );
}
