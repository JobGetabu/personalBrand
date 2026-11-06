import { openSource, recognition } from "@/lib/site";
import { getStars } from "@/lib/github";
import { SectionHeading } from "../ui/section-heading";

export async function Recognition() {
  const stars = await Promise.all(openSource.map((r) => getStars(r.repo, r.fallbackStars)));
  return (
    <section id="recognition" aria-labelledby="rec-title" className="border-t hairline">
      <div className="container-x py-24 md:py-36">
        <SectionHeading id="rec-title" index="06" label="Recognition & community" title="Awards, *and* giving back." />
        <div className="grid gap-12 lg:grid-cols-2">
          <ul className="divide-y divide-line border-y hairline">
            {recognition.map((r) => (
              <li key={r.title} data-reveal className="grid grid-cols-[auto_1fr] gap-x-6 py-6">
                <span className="label-mono w-20 pt-1 text-accent">{r.year || "—"}</span>
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {r.by} · {r.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <div>
            <h3 className="label-mono mb-4">Open source</h3>
            <ul className="grid gap-3">
              {openSource.map((r, i) => (
                <li key={r.repo} data-reveal>
                  <a
                    href={`https://github.com/JobGetabu/${r.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-6 rounded-[var(--radius)] border hairline bg-surface p-5 transition-colors hover:border-accent/50"
                  >
                    <span>
                      <span className="block font-mono text-lg">{r.repo}</span>
                      <span className="text-sm text-muted">{r.description}</span>
                    </span>
                    <span className="shrink-0 font-mono text-sm text-muted group-hover:text-text">
                      ★ {stars[i]}
                      <span className="sr-only"> stars on GitHub (opens in a new tab)</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
