"use client";
import { useState } from "react";

// Illustrative startup work (ms). Shows the kind of cuts behind a 40% faster cold start.
const tasks = [
  { name: "Process + Application.onCreate", before: 260, after: 230 },
  { name: "SDK init (analytics, ads, crash)", before: 420, after: 90, note: "lazy, off main thread" },
  { name: "DI graph", before: 220, after: 120, note: "split graph" },
  { name: "Class loading / JIT", before: 380, after: 210, note: "Baseline Profiles" },
  { name: "First screen data", before: 300, after: 160, note: "cache first" },
  { name: "First frame", before: 220, after: 200 },
];
const totalBefore = tasks.reduce((a, t) => a + t.before, 0);

export default function ColdStart() {
  const [p, setP] = useState(0);
  const val = (t: (typeof tasks)[number]) => t.before + (t.after - t.before) * (p / 100);
  const total = Math.round(tasks.reduce((a, t) => a + val(t), 0));
  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <div className="flex items-baseline justify-between font-mono text-xs text-muted">
        <span>cold start</span>
        <span>
          <span className="text-2xl font-semibold text-text tabular-nums">{total}</span> ms{" "}
          <span className="text-accent">{p > 0 ? `−${Math.round((1 - total / totalBefore) * 100)}%` : ""}</span>
        </span>
      </div>
      <ol className="flex flex-1 flex-col justify-center gap-1.5">
        {tasks.map((t) => (
          <li key={t.name} className="grid grid-cols-[1fr] gap-0.5">
            <span className="flex justify-between text-[11px] text-muted">
              <span>{t.name}</span>
              {t.note && p > 50 && <span className="text-accent">{t.note}</span>}
            </span>
            <span className="h-2 overflow-hidden rounded-full bg-surface-2">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-accent to-violet"
                style={{ width: `${(val(t) / 420) * 100}%` }}
              />
            </span>
          </li>
        ))}
      </ol>
      <label className="grid gap-1 font-mono text-xs text-muted">
        <span className="flex justify-between">
          <span>before</span>
          <span>after</span>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={p}
          onChange={(e) => setP(+e.target.value)}
          className="w-full accent-[var(--accent)]"
          aria-label="Scrub from before to after optimisation"
        />
      </label>
    </div>
  );
}
