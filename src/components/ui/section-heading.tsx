import { Rich } from "./rich";

export function SectionHeading({
  index,
  label,
  title,
  intro,
  id,
}: {
  index: string;
  label: string;
  title: string;
  intro?: string;
  id: string;
}) {
  return (
    <div className="grid-12 mb-12 gap-y-6 md:mb-16">
      <p className="label-mono col-span-full lg:col-span-3">
        <span className="text-accent">{index}</span> — {label}
      </p>
      <div className="col-span-full lg:col-span-9">
        <h2 id={id} data-split className="display text-[clamp(2.5rem,6.5vw,6rem)]">
          <Rich text={title} />
        </h2>
        {intro && <p className="mt-6 max-w-2xl text-lg text-muted">{intro}</p>}
      </div>
    </div>
  );
}
