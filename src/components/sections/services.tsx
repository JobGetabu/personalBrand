import { services, site } from "@/lib/site";
import { SectionHeading } from "../ui/section-heading";
import { Button } from "../ui/button";

export function Services() {
  const bookHref = site.calUrl || "/#contact";
  return (
    <section id="services" aria-labelledby="services-title" className="border-t hairline">
      <div className="container-x py-20 md:py-36">
        <SectionHeading
          id="services-title"
          index="04"
          label="Services"
          title="What I can *do* for you."
          intro="Hire me full-time as a senior or lead engineer, or bring me in for a focused engagement."
        />
        <ul className="grid gap-4 md:grid-cols-2">
          {services.map((s, i) => (
            <li key={s.title} data-reveal className="flex flex-col rounded-[var(--radius)] border hairline bg-surface p-7 md:p-9">
              <p className="label-mono">
                <span className="text-accent">S{i + 1}</span> · For {s.who.toLowerCase()}
              </p>
              <h3 className="mt-4 text-3xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 text-muted">{s.outcome}</p>
              <ul className="mt-6 space-y-2 text-sm">
                {s.includes.map((x) => (
                  <li key={x} className="flex gap-3">
                    <span className="text-accent" aria-hidden="true">
                      ✓
                    </span>
                    {x}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-8">
                <p className="label-mono">Typical timeline · {s.timeline}</p>
                <Button href={bookHref} external={!!site.calUrl} variant="ghost">
                  Book a call
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
