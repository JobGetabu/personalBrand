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

const experiments: {
  key: keyof typeof load;
  title: string;
  technique: string;
  text: string;
  poster: MediaKey;
  running: string;
  forClients: string;
}[] = [
  {
    key: "offline",
    title: "Offline-first",
    technique: "Queue + spring sync",
    text: "Drag the signal down. Requests queue locally, then sync with springs when the network returns.",
    poster: "labOffline",
    running: "Local queue · spring physics · 12 requests max",
    forClients: "Apps that keep working on a bad network.",
  },
  {
    key: "droidnet",
    title: "DroidNet",
    technique: "Connectivity graph · Canvas",
    text: "My open-source Kotlin library, visualised: switch network states and watch the graph react.",
    poster: "labDroidnet",
    running: "Canvas 2D · 18 nodes · 60fps while visible",
    forClients: "Connectivity-aware UX, the way DroidNet does it on Android.",
  },
  {
    key: "coldstart",
    title: "Cold start",
    technique: "Scrubbable timeline",
    text: "Scrub from before to after to see the kind of work cut to make an app start 40% faster.",
    poster: "labColdstart",
    running: "6 startup phases · before/after scrub",
    forClients: "Performance audits that start with measurement.",
  },
  {
    key: "waveform",
    title: "Waveform",
    technique: "Web Audio API",
    text: "A live audio visualiser, a nod to the WeR1 player. Sound is synthesised and only plays on tap.",
    poster: "labWaveform",
    running: "Web Audio API · 4 oscillators · analyser node",
    forClients: "Media and audio apps, like the WeR1 player.",
  },
  {
    key: "morph",
    title: "Morph",
    technique: "Flubber shape morph",
    text: "Abstract glyphs morphing between platform-ish shapes. One codebase, many shapes.",
    poster: "labMorph",
    running: "Flubber interpolation · 3 shapes · 900ms ease",
    forClients: "One codebase across Android, iOS and Flutter.",
  },
  {
    key: "physics",
    title: "Physics stack",
    technique: "cannon-es rigid bodies",
    text: "A tower of app-icon tiles. Tap the canvas or the button to knock it over.",
    poster: "labPhysics",
    running: "cannon-es · 21 rigid bodies · fixed 1/60 step",
    forClients: "Interfaces with weight, inertia and response.",
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
                <span className="text-accent">Exp.{String(i + 1).padStart(2, "0")}</span> — {e.technique}
              </p>
              <h3 className="mt-2 text-xl font-semibold tracking-tight">{e.title}</h3>
              <p className="mt-1 text-sm text-muted">{e.text}</p>
              <dl className="mt-4 grid gap-2 border-t hairline pt-4 text-xs">
                <div className="flex gap-3">
                  <dt className="label-mono w-20 shrink-0 text-accent">Running</dt>
                  <dd className="font-mono text-muted">{e.running}</dd>
                </div>
                <div className="flex gap-3">
                  <dt className="label-mono w-20 shrink-0">For you</dt>
                  <dd className="text-muted">{e.forClients}</dd>
                </div>
              </dl>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
