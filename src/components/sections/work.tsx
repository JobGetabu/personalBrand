import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { getAllWork } from "@/lib/work";
import { media } from "@/lib/media";
import { SectionHeading } from "../ui/section-heading";
import { Rich, plain } from "../ui/rich";

export function Work() {
  const work = getAllWork();
  return (
    <section id="work" aria-labelledby="work-title" className="container-x py-24 md:py-36">
      <SectionHeading
        id="work-title"
        index="01"
        label="Selected work"
        title="Shipped to *millions*."
        intro="Six products, from a custom audio engine to an award-winning platform I founded. Each one solved a hard mobile problem for real users."
      />
      <ol className="grid gap-6 md:grid-cols-2 md:gap-8">
        {work.map((w, i) => {
          const img = media[w.cover];
          return (
            <li key={w.slug} data-reveal className={i % 3 === 0 ? "md:col-span-2" : ""}>
              <Link
                href={`/work/${w.slug}`}
                data-cursor="View case"
                className="group block overflow-hidden rounded-[var(--radius)] border hairline bg-surface"
              >
                <div className={`relative overflow-hidden ${i % 3 === 0 ? "aspect-[16/10] md:aspect-[21/9]" : "aspect-[16/10]"}`}>
                  <ViewTransition name={`cover-${w.slug}`} share="morph" default="none">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes={i % 3 === 0 ? "(min-width: 768px) 90vw, 100vw" : "(min-width: 768px) 45vw, 100vw"}
                      className="object-cover transition-[transform,filter] duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.04] group-hover:saturate-150 motion-reduce:transition-none"
                      unoptimized={img.placeholder}
                    />
                  </ViewTransition>
                  <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
                  <span className="label-mono absolute left-5 top-5 rounded-full border hairline bg-bg/60 px-3 py-1 backdrop-blur">
                    {String(i + 1).padStart(2, "0")} · {w.client}
                  </span>
                </div>
                <div className="grid gap-6 p-6 md:grid-cols-[1fr_auto] md:items-end md:p-8">
                  <div>
                    <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">
                      {w.title}
                      <span className="sr-only">: {plain(w.tagline)}</span>
                    </h3>
                    <p className="mt-2 text-lg text-muted" aria-hidden="true">
                      <Rich text={w.tagline} />
                    </p>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Stack">
                      {w.stack.slice(0, 4).map((s) => (
                        <li key={s} className="rounded-full border hairline px-3 py-1 text-xs text-muted">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <dl className="flex gap-6 md:flex-col md:gap-3 md:text-right">
                    {w.metrics.slice(0, 2).map((m) => (
                      <div key={m.label}>
                        <dt className="sr-only">{m.label}</dt>
                        <dd>
                          <span className="block text-2xl font-semibold tracking-tight text-accent">{m.value}</span>
                          <span className="label-mono block max-w-[16ch] normal-case tracking-normal">{m.label}</span>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
