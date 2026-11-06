import { shipLayers } from "@/lib/site";
import { SectionHeading } from "../ui/section-heading";

export function Ship() {
  return (
    <section id="how-i-ship" aria-labelledby="ship-title" className="border-t hairline">
      <div className="container-x py-20 md:py-36">
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
                className="grid gap-4 rounded-[var(--radius)] border hairline bg-surface p-6 [transform-style:preserve-3d] md:grid-cols-[220px_1fr_auto] md:items-center md:gap-8 md:p-7"
                style={{ boxShadow: `inset 0 1px 0 color-mix(in oklab, var(--accent) ${8 + i * 4}%, transparent)` }}
              >
                <div>
                  <p className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-xl font-semibold tracking-tight">{layer.name}</span>
                  </p>
                  <p className="label-mono mt-1 normal-case tracking-normal">{layer.keywords}</p>
                </div>
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
            <li
              data-ship-layer
              className="flex items-center justify-between gap-4 rounded-[var(--radius)] border border-accent/40 bg-accent/10 p-6 md:p-7"
            >
              <p className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-accent">→</span>
                <span className="text-xl font-semibold tracking-tight">Shipped</span>
              </p>
              <p className="label-mono text-right normal-case tracking-normal">Store release · staged rollout · on-call</p>
            </li>
          </ol>
        </div>
      </div>
    </section>
  );
}
