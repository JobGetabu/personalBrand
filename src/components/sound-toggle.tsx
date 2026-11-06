"use client";
import { useEffect } from "react";
import { usePref } from "@/lib/hooks";

/** Interface sounds are OFF by default; opt-in only. Synthesised ticks, no audio files. */
export function SoundToggle() {
  const [pref, setPref] = usePref("sound", "off");
  const on = pref === "on";
  useEffect(() => {
    if (!on) return;
    const ctx = new AudioContext();
    const tick = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t?.closest?.("a, button")) return;
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.value = 1800;
      g.gain.setValueAtTime(0.03, ctx.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
      o.connect(g).connect(ctx.destination);
      o.start();
      o.stop(ctx.currentTime + 0.05);
    };
    document.addEventListener("pointerover", tick);
    return () => {
      document.removeEventListener("pointerover", tick);
      ctx.close();
    };
  }, [on]);
  const toggle = () => setPref(on ? "off" : "on");
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      className="label-mono fixed bottom-4 right-4 z-40 hidden min-h-11 items-center gap-2 rounded-full border hairline bg-bg/70 px-4 backdrop-blur hover:text-text md:inline-flex"
    >
      <span className={`inline-block size-1.5 rounded-full ${on ? "bg-accent" : "bg-muted"}`} aria-hidden="true" />
      Sound {on ? "on" : "off"}
    </button>
  );
}
