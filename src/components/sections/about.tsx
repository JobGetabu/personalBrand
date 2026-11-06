import Image from "next/image";
import { media } from "@/lib/media";
import { journey, site, skills } from "@/lib/site";
import { SectionHeading } from "../ui/section-heading";

export function About() {
  const p = media.held;
  return (
    <section id="about" aria-labelledby="about-title" className="border-t hairline">
      <div className="container-x py-20 md:py-36">
        <SectionHeading id="about-title" index="07" label="About" title="Built to be *held*." />
        <div className="grid-12 gap-y-12">
          <div className="col-span-full sm:col-span-3 lg:col-span-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius)] border hairline bg-surface">
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                className="object-cover"
                unoptimized={p.placeholder}
              />
            </div>
          </div>
          <div className="col-span-full space-y-6 text-lg leading-relaxed text-muted sm:col-span-3 lg:col-span-7 lg:col-start-6">
            <p>
              <span className="text-text">I wrote my first &ldquo;hello world&rdquo; in 2014.</span> I started with Windows apps, moved to
              Android, and never looked back. Since then I have built apps that millions of people hold in their hands every day, across
              fintech, media, logistics and hospitality.
            </p>
            <p>
              I care about the details you feel but rarely notice: a cold start that is instant, a list that never stutters, an app that
              still works when the signal drops. I founded Kazi, which won MTN App of the Year, and I have led teams and mentored more than
              200 developers through community work.
            </p>
            <p>Away from the keyboard I hike, and I still show up for the developer community that helped me start.</p>
            <p className="label-mono pt-2">{site.region}</p>
            <ul className="flex flex-wrap gap-2 pt-2" aria-label="Skills">
              {skills.map((s) => (
                <li key={s} className="rounded-full border hairline px-3 py-1 text-sm text-text/80">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ol className="mt-20 grid gap-px overflow-hidden rounded-[var(--radius)] border hairline bg-line sm:grid-cols-2 lg:grid-cols-4">
          {journey.map((j, i) => (
            <li key={j.title} data-reveal className="bg-bg p-6">
              <p className="label-mono">
                <span className="text-accent">{String(i + 1).padStart(2, "0")}</span> / {String(journey.length).padStart(2, "0")} · {j.year}
              </p>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">{j.title}</h3>
              <p className="mt-2 text-sm text-muted">{j.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
