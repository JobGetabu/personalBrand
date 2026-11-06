"use client";
import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/hooks";

/**
 * Cursor follower with contextual label ("View case", "Play"). Desktop fine pointers only,
 * hidden for coarse pointers and reduced motion. Purely decorative (aria-hidden).
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState<string | null>(null);
  const enabled = useMediaQuery("(pointer: fine) and (prefers-reduced-motion: no-preference)");

  useEffect(() => {
    if (!enabled) return;
    const el = ref.current!;
    let x = innerWidth / 2,
      y = innerHeight / 2,
      tx = x,
      ty = y,
      raf = 0,
      visible = false;
    const loop = () => {
      x += (tx - x) * 0.15;
      y += (ty - y) * 0.15;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    const move = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) {
        visible = true;
        el.style.opacity = "1";
      }
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor]");
      setLabel(target?.dataset.cursor ?? null);
    };
    const leave = () => {
      visible = false;
      el.style.opacity = "0";
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none fixed left-0 top-0 z-[70] opacity-0 transition-opacity duration-200">
      <div
        className={`grid place-items-center rounded-full bg-accent text-accent-ink transition-[width,height] duration-300 ease-[var(--ease-out)] ${
          label ? "size-24" : "size-3"
        }`}
      >
        {label && <span className="font-mono text-[11px] font-medium uppercase tracking-wider">{label}</span>}
      </div>
    </div>
  );
}
