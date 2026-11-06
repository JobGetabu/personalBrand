"use client";
import { interpolate } from "flubber";
import { useEffect, useMemo, useRef, useState } from "react";

// Abstract glyphs (not trademark logos): a rounded "robot", a leaf curve, a chevron.
const shapes = [
  { name: "Robot-ish", d: "M30 70 Q30 40 60 40 L140 40 Q170 40 170 70 L170 150 Q170 170 150 170 L50 170 Q30 170 30 150 Z" },
  { name: "Leaf-ish", d: "M100 20 C160 40 180 110 140 160 C120 185 80 185 60 160 C20 110 40 40 100 20 Z" },
  { name: "Chevron-ish", d: "M40 30 L110 30 L170 100 L110 170 L40 170 L100 100 Z" },
];

export default function Morph({ active }: { active: boolean }) {
  const [i, setI] = useState(0);
  const [d, setD] = useState(shapes[0].d);
  const from = useRef(0);
  const fns = useMemo(() => shapes.map((s, k) => interpolate(s.d, shapes[(k + 1) % shapes.length].d, { maxSegmentLength: 4 })), []);

  const go = (next: number) => {
    const start = performance.now();
    const k = from.current;
    const fn = next === (k + 1) % shapes.length ? fns[k] : interpolate(shapes[k].d, shapes[next].d, { maxSegmentLength: 4 });
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduce ? 1 : 900;
    const step = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
      setD(fn(e));
      if (p < 1) requestAnimationFrame(step);
      else from.current = next;
    };
    requestAnimationFrame(step);
    setI(next);
  };

  useEffect(() => {
    if (!active) return;
    const t = window.setInterval(() => go((from.current + 1) % shapes.length), 2400);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <svg viewBox="0 0 200 200" className="min-h-0 w-full flex-1" role="img" aria-label={`Shape: ${shapes[i].name}`}>
        <defs>
          <linearGradient id="mg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="var(--accent)" />
            <stop offset="1" stopColor="var(--violet)" />
          </linearGradient>
        </defs>
        <path d={d} fill="url(#mg)" opacity="0.9" />
      </svg>
      <div className="grid grid-cols-3 gap-1">
        {shapes.map((s, k) => (
          <button
            key={s.name}
            type="button"
            onClick={() => go(k)}
            aria-pressed={i === k}
            className={`min-h-11 rounded-full font-mono text-[11px] ${i === k ? "bg-accent text-accent-ink" : "border hairline text-muted"}`}
          >
            {s.name}
          </button>
        ))}
      </div>
    </div>
  );
}
