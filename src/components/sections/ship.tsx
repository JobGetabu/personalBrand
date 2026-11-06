import { shipLayers } from "@/lib/site";
import { SectionHeading } from "../ui/section-heading";

export function Ship() {
  return (
    <section id="how-i-ship" aria-labelledby="ship-title" className="border-t hairline">
      <div className="container-x py-24 md:py-36">
        <SectionHeading
          id="ship-title"
          index="02"
          label="How I ship"
          title="Six layers, *one* app."
          intro="Every app I build is a stack of decisions. This is the cross-section, from architecture at the bottom to observability on top."
        />
        <div data-ship-stack className="[perspective:1400px]">
          <ol className="grid gap-3">
            {shipLayers.map((layer, i) => (
              <li
                key={layer.name}
                data-ship-layer
                className="grid gap-4 rounded-[var(--radius)] border hairline bg-surface p-6 [transform-style:preserve-3d] md:grid-cols-[180px_1fr_auto] md:items-center md:gap-8 md:p-7"
                style={{ boxShadow: `inset 0 1px 0 color-mix(in oklab, var(--accent) ${8 + i * 4}%, transparent)` }}
              >
                <p className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-accent">L{i + 1}</span>
                  <span className="text-xl font-semibold tracking-tight">{layer.name}</span>
                </p>
                <ul className="grid gap-1 text-sm text-muted md:grid-cols-3 md:gap-6">
                  {layer.practices.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
                <ul className="flex flex-wrap gap-2 md:justify-end" aria-label={`${layer.name} tools`}>
                  {layer.tools.map((t) => (
                    <li key={t} className="rounded-full bg-surface-2 px-3 py-1 font-mono text-[11px] text-text/80">
                      {t}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
