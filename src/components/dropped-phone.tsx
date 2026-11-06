"use client";
import { useEffect, useRef, useState } from "react";

/**
 * 404: a phone falls with gravity and bounces; drag (or press "Pick it up") to lift it again.
 * Tiny custom 2D physics, no library. Reduced motion shows it resting.
 */
export function DroppedPhone() {
  const box = useRef<HTMLDivElement>(null);
  const phone = useRef<HTMLDivElement>(null);
  const state = useRef({ x: 0, y: -400, vx: 0, vy: 0, a: -0.4, va: 0.02, drag: false, px: 0, py: 0 });
  const [, force] = useState(0);

  useEffect(() => {
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = state.current;
    const el = phone.current!;
    const B = box.current!;
    let raf = 0;
    const floorY = () => B.clientHeight - el.offsetHeight;
    if (reduce) {
      s.y = floorY();
      s.a = Math.PI / 2 - 0.08;
    }
    const loop = () => {
      raf = requestAnimationFrame(loop);
      if (!s.drag && !reduce) {
        s.vy += 0.9;
        s.x += s.vx;
        s.y += s.vy;
        s.a += s.va;
        const fy = floorY();
        if (s.y > fy) {
          s.y = fy;
          s.vy *= -0.38;
          s.vx *= 0.8;
          // settle face-down, flat
          const target = Math.PI / 2 - 0.08;
          s.va = (target - s.a) * 0.18;
          if (Math.abs(s.vy) < 1.2) s.vy = 0;
        }
        const maxX = B.clientWidth / 2 - 60;
        if (Math.abs(s.x) > maxX) {
          s.x = Math.sign(s.x) * maxX;
          s.vx *= -0.5;
        }
        s.va *= 0.96;
      }
      el.style.transform = `translate(${s.x}px, ${s.y}px) rotate(${s.a}rad)`;
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const pickUp = () => {
    const s = state.current;
    s.y = 0;
    s.vy = -6;
    s.vx = (Math.random() - 0.5) * 6;
    s.a = -0.3;
    s.va = 0.03 + Math.random() * 0.03;
    force((n) => n + 1);
  };

  return (
    <div className="relative">
      <div
        ref={box}
        className="relative h-[60svh] min-h-[360px] touch-none overflow-hidden rounded-[var(--radius)] border hairline bg-surface"
        onPointerDown={(e) => {
          const s = state.current;
          s.drag = true;
          s.px = e.clientX;
          s.py = e.clientY;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          const s = state.current;
          if (!s.drag) return;
          s.vx = e.clientX - s.px;
          s.vy = e.clientY - s.py;
          s.x += s.vx;
          s.y += s.vy;
          s.a += (0 - s.a) * 0.15;
          s.px = e.clientX;
          s.py = e.clientY;
        }}
        onPointerUp={() => {
          state.current.drag = false;
          state.current.va = state.current.vx * 0.004;
        }}
        aria-hidden="true"
      >
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-accent/10 to-transparent" />
        <div ref={phone} className="absolute left-1/2 top-0 -ml-[55px] h-[220px] w-[110px] cursor-grab active:cursor-grabbing">
          <div className="h-full w-full rounded-[22px] border border-white/10 bg-[#0E1014] p-1.5 shadow-[0_0_60px_-10px_var(--accent)]">
            <div className="h-full w-full rounded-[17px] bg-[radial-gradient(circle_at_30%_30%,var(--accent),transparent_60%),radial-gradient(circle_at_70%_70%,var(--violet),transparent_60%)] opacity-80" />
          </div>
        </div>
      </div>
      <button type="button" onClick={pickUp} className="label-mono mt-4 min-h-11 rounded-full border hairline px-4 hover:text-text">
        Pick it up
      </button>
    </div>
  );
}
