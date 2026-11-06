import { SectionHeading } from "../ui/section-heading";
import { LabGrid } from "../lab/lab-grid";

export function Lab() {
  return (
    <section id="lab" aria-labelledby="lab-title" className="border-t hairline">
      <div className="container-x py-20 md:py-36">
        <SectionHeading
          id="lab-title"
          index="08"
          label="Lab"
          title="Things you can *touch*."
          intro="Small interactive experiments about the problems I solve in mobile apps. Each one loads only when you scroll to it and pauses when you leave."
        />
        <a
          href="#experience"
          className="skip-link !static mb-6 inline-block !bg-transparent !p-0 !text-muted underline sr-only focus:not-sr-only"
        >
          Skip the experiments
        </a>
        <LabGrid />
      </div>
    </section>
  );
}
