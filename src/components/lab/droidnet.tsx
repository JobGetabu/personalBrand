"use client";
import { useEffect, useRef, useState } from "react";
import { useLatest } from "@/lib/hooks";

const STATES = ["Connected", "Metered", "Disconnected"] as const;
type S = (typeof STATES)[number];

export default function DroidNet({ active }: { active: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [state, setState] = useState<S>("Connected");
  const stateRef = useLatest(state);
  const activeRef = useLatest(active);

  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio, 2);
    const resize = () => {
      c.width = c.clientWidth * dpr;
      c.height = c.clientHeight * dpr;
    };
    resize();
    const N = 18;
    const nodes = Array.from({ length: N }, (_, i) => ({
      a: (i / N) * Math.PI * 2,
      r: 0.25 + Math.random() * 0.2,
      s: 0.2 + Math.random() * 0.4,
      on: 1,
    }));
    const css = getComputedStyle(document.documentElement);
    const accent = css.getPropertyValue("--accent").trim() || "#3DFFA2";
    const violet = css.getPropertyValue("--violet").trim() || "#7C5CFF";
    const muted = css.getPropertyValue("--muted").trim() || "#8A8F98";
    let raf = 0;
    const draw = (t: number) => {
      raf = requestAnimationFrame(draw);
      if (!activeRef.current) return;
      const W = c.width,
        H = c.height,
        cx = W / 2,
        cy = H / 2,
        R = Math.min(W, H);
      ctx.clearRect(0, 0, W, H);
      const st = stateRef.current;
      const target = st === "Connected" ? 1 : st === "Metered" ? 0.6 : 0;
      const pts = nodes.map((n, i) => {
        n.on += ((Math.random() < (st === "Metered" ? 0.03 : 0) ? 0 : target) - n.on) * 0.06;
        const a = n.a + t * 0.0001 * n.s * (target > 0 ? 1 : 0.2);
        const wob = Math.sin(t * 0.001 + i) * 0.02;
        return { x: cx + Math.cos(a) * (n.r + wob) * R, y: cy + Math.sin(a) * (n.r + wob) * R, on: n.on };
      });
      // hub
      ctx.lineWidth = 1 * dpr;
      pts.forEach((p) => {
        ctx.strokeStyle = p.on > 0.5 ? accent : muted;
        ctx.globalAlpha = 0.15 + p.on * 0.5;
        ctx.setLineDash(p.on > 0.5 ? [] : [3 * dpr, 4 * dpr]);
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      });
      ctx.setLineDash([]);
      pts.forEach((p) => {
        ctx.globalAlpha = 1;
        ctx.fillStyle = p.on > 0.5 ? (st === "Metered" ? violet : accent) : muted;
        ctx.beginPath();
        ctx.arc(p.x, p.y, (3 + p.on * 2) * dpr, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.fillStyle = target ? accent : muted;
      ctx.beginPath();
      ctx.arc(cx, cy, 9 * dpr + Math.sin(t * 0.004) * 2 * dpr * target, 0, Math.PI * 2);
      ctx.fill();
    };
    raf = requestAnimationFrame(draw);
    addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", resize);
    };
  }, [activeRef, stateRef]);

  return (
    <div className="flex h-full flex-col gap-3 p-5">
      <canvas ref={canvas} className="min-h-0 w-full flex-1" aria-hidden="true" />
      <div role="radiogroup" aria-label="Connectivity state" className="grid grid-cols-3 gap-1 rounded-full border hairline p-1">
        {STATES.map((s) => (
          <button
            key={s}
            type="button"
            role="radio"
            aria-checked={state === s}
            onClick={() => setState(s)}
            className={`min-h-11 rounded-full font-mono text-[11px] transition-colors ${state === s ? "bg-accent text-accent-ink" : "text-muted hover:text-text"}`}
          >
            {s}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Network state: {state}
      </p>
    </div>
  );
}
