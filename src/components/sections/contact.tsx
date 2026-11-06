import { site, socials } from "@/lib/site";
import { Rich } from "../ui/rich";
import { Button } from "../ui/button";
import { ContactForm } from "./contact-form";
import { Overlap } from "./overlap";

export function Contact({ status }: { status?: "sent" | "error" }) {
  return (
    <section id="contact" aria-labelledby="contact-title" className="relative overflow-clip border-t hairline">
      <div className="glow pointer-events-none absolute -left-[20%] bottom-0 size-[80vmin]" aria-hidden="true" />
      <div className="container-x relative py-20 md:py-36">
        <p className="label-mono mb-8">
          <span className="text-accent">07</span> — Contact
        </p>
        <h2 id="contact-title" data-split className="display text-[clamp(3.25rem,12vw,11rem)]">
          <Rich text="Let's build *yours*." />
        </h2>
        <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-8">
            <p className="max-w-md text-lg text-muted">
              Hiring for a senior or lead mobile role, or need an app built, rescued or sped up? Tell me a little about it and I will get
              back to you.
            </p>
            {site.calUrl && (
              <Button href={site.calUrl} external>
                Book a 30-minute call
              </Button>
            )}
            <ul className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex min-h-11 items-center rounded-full border hairline px-4 text-sm hover:border-text"
                  >
                    {s.label} <span aria-hidden="true">&nbsp;↗</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="label-mono">{site.region}</p>
            <Overlap />
          </div>
          <ContactForm initial={status} />
        </div>
      </div>
    </section>
  );
}
