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
          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-muted hover:text-text">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/uses" className="text-muted hover:text-text">
                Uses
              </Link>
            </li>
            <li>
              <Link href="/now" className="text-muted hover:text-text">
                Now
              </Link>
            </li>
          </ul>
        </nav>
        <ul className="space-y-2 text-sm">
          {socials.map((s) => (
            <li key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer me" className="text-muted hover:text-text">
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
