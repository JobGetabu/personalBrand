import { site, heroStats, companies } from "@/lib/site";
import { Button } from "../ui/button";
import { HeroPhoneLoader } from "./hero-phone-loader";

const lines = [
  ["Apps", "that"],
  ["*feel*", "native."],
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-clip pt-[72px]">
      <div className="glow pointer-events-none absolute right-[-10%] top-[10%] size-[70vmin]" aria-hidden="true" />
      <div className="container-x grid-12 relative min-h-[calc(100svh-72px)] content-center gap-y-6 pb-10 pt-8 lg:py-0">
        <div className="col-span-full flex flex-col justify-center lg:col-span-7">
          <p className="label-mono hero-fade mb-6" style={{ ["--i" as string]: 0 }}>
            <span className="text-accent">00</span> — {site.name} · {site.title}
          </p>
          <h1 id="hero-title" className="display text-[clamp(3.25rem,10vw,9rem)]">
            {lines.map((words, li) => (
              <span key={li} className="line-mask hero-line" style={{ ["--i" as string]: li }}>
                <span>
                  {words.map((w, wi) =>
                    w.startsWith("*") ? (
                      <em key={wi} className="em pr-[0.06em]">
                        {w.slice(1, -1)}{" "}
                      </em>
                    ) : (
                      <span key={wi}>{w} </span>
                    ),
                  )}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-fade mt-8 max-w-xl text-lg text-muted md:text-xl" style={{ ["--i" as string]: 2 }}>
            {site.heroSummary}
          </p>
          <div className="hero-fade mt-10 flex flex-wrap gap-3" style={{ ["--i" as string]: 3 }}>
            <Button href="/#work">View work</Button>
            <Button href="/#contact" variant="ghost">
              Start a project
            </Button>
          </div>
        </div>
        <div className="relative col-span-full lg:col-span-5">
          <HeroPhoneLoader />
        </div>
        <a href="#work" className="label-mono absolute bottom-6 left-[var(--gutter)] hidden items-center gap-3 hover:text-text lg:flex">
          <span className="relative block h-8 w-px overflow-hidden bg-line" aria-hidden="true">
            <span className="absolute inset-x-0 top-0 h-1/2 bg-accent motion-safe:animate-[scrollcue_1.6s_ease-in-out_infinite]" />
          </span>
          Scroll
        </a>
      </div>

      {/* Credibility strip */}
      <div className="border-y hairline">
        <div className="container-x grid gap-6 py-6 md:grid-cols-[auto_auto_1fr] md:items-center md:gap-12">
          <p className="label-mono flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-accent motion-safe:animate-pulse" aria-hidden="true" />
            Live · in production
          </p>
          <dl className="grid grid-cols-2 gap-4 sm:flex sm:gap-8">
            {heroStats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-2">
                  <span className="text-3xl font-semibold tracking-tight tabular-nums">
                    <span data-count={s.value}>{s.value}</span>
                    {s.suffix}
                  </span>
                  <span className="label-mono" aria-hidden="true">
                    {s.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
            <ul className="marquee-track gap-12" aria-label="Companies I have built for">
              {[...companies, ...companies].map((c, i) => (
                <li
                  key={i}
                  aria-hidden={i >= companies.length || undefined}
                  className="flex items-center whitespace-nowrap text-xl font-semibold tracking-tight text-muted transition-colors hover:text-text"
                >
                  {c.logo ? (
                    <>
                      <span
                        aria-hidden="true"
                        className="block h-10 w-16 bg-current"
                        style={{
                          maskImage: `url(/images/logos/${c.logo})`,
                          WebkitMaskImage: `url(/images/logos/${c.logo})`,
                          maskRepeat: "no-repeat",
                          maskPosition: "center",
                          maskSize: "contain",
                        }}
                      />
                      <span className="sr-only">{c.name}</span>
                    </>
                  ) : (
                    c.name
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
