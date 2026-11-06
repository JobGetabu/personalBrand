import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllWork, getNextWork, getWork } from "@/lib/work";
import { media } from "@/lib/media";
import { site } from "@/lib/site";
import { Rich, plain } from "@/components/ui/rich";
import { JsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return getAllWork().map((w) => ({ slug: w.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) return {};
  return {
    title: `${w.title} case study`,
    description: w.summary,
    alternates: { canonical: `/work/${w.slug}` },
    openGraph: { type: "article", title: `${w.title} — ${plain(w.tagline)}`, description: w.summary, url: `/work/${w.slug}` },
  };
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();
  const next = getNextWork(slug);
  const cover = media[w.cover];
  const nextCover = media[next.cover];

  return (
    <article className="pt-[72px]">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CreativeWork",
              name: w.title,
              headline: plain(w.tagline),
              description: w.summary,
              url: `${site.url}/work/${w.slug}`,
              creator: { "@id": `${site.url}/#person` },
              keywords: w.stack.join(", "),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: site.url },
                { "@type": "ListItem", position: 2, name: "Work", item: `${site.url}/#work` },
                { "@type": "ListItem", position: 3, name: w.title, item: `${site.url}/work/${w.slug}` },
              ],
            },
          ],
        }}
      />
      <header className="container-x pb-12 pt-16 md:pt-24">
        <nav aria-label="Breadcrumb" className="label-mono mb-10">
          <ol className="flex gap-2">
            <li>
              <Link href="/" className="hover:text-text">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/#work" className="hover:text-text">
                Work
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-text">
              {w.title}
            </li>
          </ol>
        </nav>
        <p className="label-mono mb-6">
          <span className="text-accent">Case study</span> — {w.client}
        </p>
        <h1 className="display text-[clamp(3rem,9vw,8rem)]">{w.title}</h1>
        <p className="mt-6 max-w-3xl text-2xl text-muted md:text-3xl">
          <Rich text={w.tagline} />
        </p>
      </header>

      <div className="container-x">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[var(--radius)] border hairline md:aspect-[21/9]">
          <ViewTransition name={`cover-${w.slug}`} share="morph" default="none">
            <Image src={cover.src} alt={cover.alt} fill priority sizes="100vw" className="object-cover" unoptimized={cover.placeholder} />
          </ViewTransition>
        </div>

        <p className="mt-10 flex flex-col gap-2 rounded-[var(--radius)] border border-accent/30 bg-accent/5 p-5 sm:flex-row sm:items-baseline sm:gap-6">
          <span className="label-mono shrink-0 text-accent">What I owned</span>
          <span className="text-lg">{w.owned}</span>
        </p>
        <dl className="grid grid-cols-2 gap-6 border-b hairline py-10 md:grid-cols-4">
          {[
            ["Role", w.role],
            ["Team", w.team],
            ["Timeline", w.period],
            ["Stack", w.stack.slice(0, 3).join(", ")],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="label-mono">{k}</dt>
              <dd className="mt-2">{v}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-16 py-16 lg:grid-cols-[1fr_2fr]">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <h2 className="label-mono mb-6">Outcomes</h2>
            <dl className="grid gap-6">
              {w.metrics.map((m) => (
                <div key={m.label} className="border-t hairline pt-4">
                  <dt className="sr-only">{m.label}</dt>
                  <dd>
                    <span className="block text-5xl font-semibold tracking-tight text-accent">{m.value}</span>
                    <span className="mt-1 block text-muted">{m.label}</span>
                  </dd>
                </div>
              ))}
            </dl>
            {w.links.length > 0 && (
              <ul className="mt-8 space-y-2">
                {w.links.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="underline decoration-accent underline-offset-4">
                      {l.label} ↗<span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </aside>
          <div className="prose-case max-w-2xl">
            <MDXRemote source={w.body} />
          </div>
        </div>
      </div>

      <Link href={`/work/${next.slug}`} data-cursor="Next" className="group block border-t hairline">
        <div className="container-x grid items-center gap-8 py-16 md:grid-cols-[1fr_auto] md:py-24">
          <div>
            <p className="label-mono mb-4">Next project</p>
            <p className="display text-[clamp(2.5rem,8vw,7rem)] transition-colors group-hover:text-accent">{next.title}</p>
          </div>
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius)] border hairline md:w-[420px]">
            <ViewTransition name={`cover-${next.slug}`} share="morph" default="none">
              <Image
                src={nextCover.src}
                alt=""
                fill
                sizes="420px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized={nextCover.placeholder}
              />
            </ViewTransition>
          </div>
        </div>
      </Link>
    </article>
  );
}
