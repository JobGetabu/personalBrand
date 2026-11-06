import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Now",
  description: "What Job Getabu is working on right now.",
  alternates: { canonical: "/now" },
};

// TODO(verify): Job to update. Keep it professional: no travel plans or live location.
const updated = "November 2026";
const items = [
  "Looking for my next senior or lead mobile role, remote.",
  "Building this portfolio in public, with a 3D phone and a Lab of interactive experiments.",
  "Going deeper on the React Native New Architecture and Kotlin Multiplatform.",
  "Growing 360Score AI, my own Android app.",
];

export default function NowPage() {
  return (
    <div className="container-x max-w-4xl pb-24 pt-40">
      <p className="label-mono mb-6">
        <span className="text-accent">/now</span> — Updated {updated}
      </p>
      <h1 className="display text-[clamp(3rem,9vw,7rem)]">
        Right <em className="em">now</em>.
      </h1>
      <ul className="mt-14 space-y-6 text-xl text-muted">
        {items.map((i) => (
          <li key={i} className="flex gap-4">
            <span className="mt-4 h-px w-6 shrink-0 bg-accent" aria-hidden="true" />
            {i}
          </li>
        ))}
      </ul>
      <p className="label-mono mt-16">{site.availability}</p>
    </div>
  );
}
