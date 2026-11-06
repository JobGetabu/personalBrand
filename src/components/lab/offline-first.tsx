"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

type Req = { id: number; synced: boolean };
const spring = { type: "spring", stiffness: 260, damping: 24, mass: 0.8 } as const;

export default function OfflineFirst({ active }: { active: boolean }) {
  const [signal, setSignal] = useState(80);
  const [queue, setQueue] = useState<Req[]>([]);
  const [synced, setSynced] = useState(0);
  const id = useRef(0);
  const online = signal >= 30;

  // Users keep tapping: a request every 700ms while visible.
  useEffect(() => {
    if (!active) return;
    const t = window.setInterval(() => {
      setQueue((q) => (q.length >= 12 ? q : [...q, { id: ++id.current, synced: false }]));
    }, 700);
    return () => window.clearInterval(t);
  }, [active]);

  // When online, the queue drains one by one.
  useEffect(() => {
    if (!active || !online || queue.length === 0) return;
    const t = window.setTimeout(() => {
      setQueue((q) => q.slice(1));
      setSynced((s) => s + 1);
    }, 180);
    return () => window.clearTimeout(t);
  }, [active, online, queue]);

  return (
    <div className="flex h-full flex-col gap-4 p-5">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-muted">
          queue <span className="text-text">{queue.length}</span> · synced <span className="text-text">{synced}</span>
        </span>
        <span className={`rounded-full px-2 py-0.5 font-mono ${online ? "bg-accent/15 text-accent" : "bg-red-500/15 text-red-300"}`}>
          {online ? "online" : "offline"}
        </span>
      </div>
      <div className="relative flex flex-1 items-end gap-1.5 overflow-hidden rounded-xl border hairline bg-bg/60 p-3" aria-live="polite">
        <span className="sr-only">{online ? "Online, syncing queued requests" : `Offline, ${queue.length} requests queued`}</span>
        <AnimatePresence initial={false}>
          {queue.map((r, i) => (
            <motion.span
              key={r.id}
              layout
              initial={{ y: -80, opacity: 0, rotate: -8 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ x: 220, y: -120, opacity: 0, scale: 0.6 }}
              transition={spring}
              className="block size-6 rounded-md border border-accent/40 bg-accent/20"
              style={{ marginBottom: (i % 3) * 4 }}
              aria-hidden="true"
            />
          ))}
        </AnimatePresence>
        <span className="absolute right-3 top-3 font-mono text-[10px] text-muted">server ↗</span>
      </div>
      <label className="grid gap-2 text-xs text-muted">
        <span className="flex justify-between font-mono">
          <span>signal</span>
          <span>{signal}%</span>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          value={signal}
          onChange={(e) => setSignal(+e.target.value)}
          className="h-11 w-full cursor-pointer accent-[var(--accent)]"
          aria-label="Network signal strength"
        />
      </label>
    </div>
  );
}
