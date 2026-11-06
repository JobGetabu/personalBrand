import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import { setLenis } from "./scroll";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * House motion (portfolio-motion-design skill): expo.out entrances, 0.04 char / 0.08 line
 * stagger, magnetic pull ≤ 12px, Lenis lerp 0.1 on the GSAP ticker. Everything is skipped for
 * prefers-reduced-motion, which keeps the CSS fades only.
 */
export function initMotion() {
  const mm = gsap.matchMedia();
  const cleanups: Array<() => void> = [];

  mm.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      fine: "(pointer: fine)",
    },
    (ctx) => {
      const { motion, fine } = ctx.conditions as { motion: boolean; fine: boolean };
      if (!motion) return;

      // Smooth scroll on fine pointers only; touch keeps native momentum (iOS).
      if (fine) {
        const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -80 } });
        setLenis(lenis);
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (t: number) => lenis.raf(t * 1000);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);
        cleanups.push(() => {
          gsap.ticker.remove(tick);
          lenis.destroy();
          setLenis(null);
        });
      }

      // Headline reveals: mask-up per line.
      document.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) return; // already seen: don't re-hide
        const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "split-line" });
        gsap.from(split.lines, {
          yPercent: 110,
          duration: 0.9,
          ease: "expo.out",
          stagger: 0.08,
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
        cleanups.push(() => split.revert());
      });

      // Generic reveals (cards, rows). Hidden only once JS runs, so no-JS stays readable.
      const vh = window.innerHeight;
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        if (el.getBoundingClientRect().top > vh) gsap.set(el, { y: 40, autoAlpha: 0 });
      });
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 88%",
        once: true,
        onEnter: (els) => gsap.to(els, { y: 0, autoAlpha: 1, duration: 0.8, ease: "expo.out", stagger: 0.1, overwrite: true }),
      });

      // Count-up numbers, once in view.
      document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const end = Number(el.dataset.count);
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
          onUpdate: () => {
            el.textContent = String(Math.round(obj.v));
          },
        });
      });

      // "How I ship" layered cross-section: layers assemble while the section is pinned.
      const stack = document.querySelector<HTMLElement>("[data-ship-stack]");
      if (stack && window.innerWidth >= 1024) {
        const layers = stack.querySelectorAll<HTMLElement>("[data-ship-layer]");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: stack, start: "top 20%", end: "+=900", scrub: 0.6, pin: true },
        });
        layers.forEach((layer, i) => {
          tl.from(layer, { yPercent: 60 + i * 30, rotateX: 50, autoAlpha: 0, ease: "power3.out", duration: 1 }, i * 0.35);
        });
      }

      // Tech marquee speeds up with scroll velocity.
      const track = document.querySelector<HTMLElement>(".marquee-track");
      if (track) {
        const st = ScrollTrigger.create({
          onUpdate: (self) => {
            const v = Math.min(Math.abs(self.getVelocity()) / 400, 4);
            track.getAnimations().forEach((a) => (a.playbackRate = 1 + v));
          },
        });
        cleanups.push(() => st.kill());
      }

      // Magnetic buttons (desktop only).
      if (fine) {
        document.querySelectorAll<HTMLElement>("[data-magnetic]").forEach((el) => {
          const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
          const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            xTo(gsap.utils.clamp(-12, 12, dx * 0.3));
            yTo(gsap.utils.clamp(-12, 12, dy * 0.3));
          };
          const leave = () => {
            xTo(0);
            yTo(0);
          };
          el.addEventListener("pointermove", move);
          el.addEventListener("pointerleave", leave);
          cleanups.push(() => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          });
        });
      }

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
  );

  return () => {
    cleanups.forEach((fn) => fn());
    mm.revert();
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}
