import { experience } from "@/lib/site";
import { SectionHeading } from "../ui/section-heading";

/** <details> keeps the timeline fully usable with keyboard and without JS. */
export function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-title" className="border-t hairline">
      <div className="container-x py-24 md:py-36">
        <SectionHeading id="exp-title" index="04" label="Experience" title="Ten years, *shipping*." />
        <div className="relative">
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-line md:left-[calc(25%-1px)]" aria-hidden="true">
            <div className="progress-line h-full w-full origin-top bg-accent" />
          </div>
          <ol className="space-y-2">
            {experience.map((job, i) => (
              <li key={job.company + job.period} data-reveal className="relative pl-8 md:grid md:grid-cols-4 md:gap-8 md:pl-0">
                <span
                  className="absolute left-0 top-7 size-[15px] rounded-full border-2 border-bg bg-accent md:left-[calc(25%-8px)]"
                  aria-hidden="true"
                />
                <p className="label-mono pt-6 md:pr-10 md:text-right">{job.period}</p>
                <details
                  className="group col-span-3 rounded-[var(--radius)] border border-transparent transition-colors open:border-line open:bg-surface md:ml-6"
                  open={i === 0}
                >
                  <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 rounded-[var(--radius)] p-5 [&::-webkit-details-marker]:hidden">
                    <span>
                      <span className="block text-2xl font-semibold tracking-tight">{job.company}</span>
                      <span className="text-muted">{job.role}</span>
                    </span>
                    <span
                      className="grid size-9 shrink-0 place-items-center rounded-full border hairline transition-transform duration-300 group-open:rotate-45"
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </summary>
                  <div className="px-5 pb-6">
                    <ul className="space-y-2 text-muted">
                      {job.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-3 h-px w-3 shrink-0 bg-accent" aria-hidden="true" />
                          {b}
                        </li>
                      ))}
                    </ul>
                    <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
                      {job.tech.map((t) => (
                        <li key={t} className="rounded-full border hairline px-3 py-1 text-xs text-muted">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </div>
                </details>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
