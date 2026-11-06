import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

/** Spring-ish scroll via Lenis when active, native otherwise (reduced motion / touch). */
export function scrollToTarget(target: number | string | HTMLElement) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.4, easing: (t) => 1 - Math.pow(1 - t, 4) });
    return;
  }
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const behavior: ScrollBehavior = reduce ? "auto" : "smooth";
  if (typeof target === "number") window.scrollTo({ top: target, behavior });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior });
  }
}

export const prefersReducedMotion = () => typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

export const isFinePointer = () => typeof window !== "undefined" && matchMedia("(pointer: fine)").matches;

/** Low-power heuristic from docs/02-build-prompt.md §6. */
export function isLowPower() {
  if (typeof navigator === "undefined") return true;
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  return (navigator.hardwareConcurrency ?? 4) <= 4 || !!nav.connection?.saveData || (nav.deviceMemory ?? 8) <= 2;
}

/**
 * Runs `cb` on the first user interaction, or after `timeout` ms of the page being loaded and
 * idle. Keeps heavy enhancement code (GSAP, three.js) off the critical path.
 */
export function afterInteraction(cb: () => void, timeout = 4000) {
  let done = false;
  const events = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart", "scroll"] as const;
  const run = () => {
    if (done) return;
    done = true;
    events.forEach((e) => window.removeEventListener(e, run));
    window.clearTimeout(timer);
    cb();
  };
  events.forEach((e) => window.addEventListener(e, run, { once: true, passive: true }));
  let timer = 0;
  const arm = () => {
    timer = window.setTimeout(() => {
      const ric = (window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number }).requestIdleCallback;
      if (ric) ric(run, { timeout: 2000 });
      else run();
    }, timeout);
  };
  if (document.readyState === "complete") arm();
  else window.addEventListener("load", arm, { once: true });
  return () => {
    done = true;
    events.forEach((e) => window.removeEventListener(e, run));
    window.clearTimeout(timer);
  };
}
