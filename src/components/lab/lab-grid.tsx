"use client";
import dynamic from "next/dynamic";
import Image from "next/image";
import { media, type MediaKey } from "@/lib/media";
import { WhenVisible } from "../ui/when-visible";

type Exp = { active: boolean };
const load = {
  offline: dynamic<Exp>(() => import("./offline-first"), { ssr: false }),
  droidnet: dynamic<Exp>(() => import("./droidnet"), { ssr: false }),
  coldstart: dynamic<Exp>(() => import("./cold-start"), { ssr: false }),
  waveform: dynamic<Exp>(() => import("./waveform"), { ssr: false }),
  morph: dynamic<Exp>(() => import("./morph"), { ssr: false }),
  physics: dynamic<Exp>(() => import("./physics-stack"), { ssr: false }),
};

const experiments: { key: keyof typeof load; title: string; technique: string; text: string; poster: MediaKey }[] = [
  {
    key: "offline",
    title: "Offline-first",
    technique: "Queue + spring sync",
    text: "Drag the signal down. Requests queue locally, then sync with springs when the network returns.",
    poster: "labOffline",
  },
  {
    key: "droidnet",
    title: "DroidNet",
    technique: "Connectivity graph · Canvas",
    text: "My open-source Kotlin library, visualised: switch network states and watch the graph react.",
    poster: "labDroidnet",
  },
  {
    key: "coldstart",
    title: "Cold start",
    technique: "Scrubbable timeline",
    text: "Scrub from before to after to see the kind of work cut to make an app start 40% faster.",
    poster: "labColdstart",
  },
  {
    key: "waveform",
    title: "Waveform",
    technique: "Web Audio API",
    text: "A live audio visualiser, a nod to the WeR1 player. Sound is synthesised and only plays on tap.",
    poster: "labWaveform",
  },
  {
    key: "morph",
    title: "Morph",
    technique: "Flubber shape morph",
    text: "Abstract glyphs morphing between platform-ish shapes. One codebase, many shapes.",
    poster: "labMorph",
  },
  {
    key: "physics",
    title: "Physics stack",
    technique: "cannon-es rigid bodies",
    text: "A tower of app-icon tiles. Tap the canvas or the button to knock it over.",
    poster: "labPhysics",
  },
];

export function LabGrid() {
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {experiments.map((e, i) => {
        const Comp = load[e.key];
        const poster = media[e.poster];
        return (
          <li key={e.key} data-reveal className="flex flex-col overflow-hidden rounded-[var(--radius)] border hairline bg-surface">
            <WhenVisible
              className="relative aspect-square"
              fallback={
                <Image
                  src={poster.src}
                  alt={poster.alt}
                  fill
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                  className="object-cover opacity-70"
                  unoptimized={poster.placeholder}
                />
              }
            >
              {(visible) => <Comp active={visible} />}
            </WhenVisible>
            <div className="border-t hairline p-5">
              <p className="label-mono">
                <span className="text-accent">E{String(i + 1).padStart(2, "0")}</span> · {e.technique}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{e.title}</h3>
              <p className="mt-1 text-sm text-muted">{e.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
