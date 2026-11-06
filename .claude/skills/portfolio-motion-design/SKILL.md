---
name: portfolio-motion-design
description: Implement award-grade motion, physics and 3D for the portfolio (Lenis, GSAP/ScrollTrigger, Motion, CSS scroll-driven animations, View Transitions, React Three Fiber, shaders, cannon-es/Rapier, Flubber, anime.js) with performance and reduced-motion fallbacks. Use when building or reviewing any animation, interaction, WebGL or physics on the site.
---

# Motion, physics & 3D for the portfolio

## Principles
1. Motion explains or delights; it never blocks reading. One hero effect per viewport.
2. Physical: springs and inertia over linear tweens; interruptible on new input.
3. Fast: animate `transform`, `opacity`, `filter` (sparingly), CSS variables, shader
   uniforms. Never animate layout properties (top/left/width/height) in loops.
4. Inclusive: everything has a `prefers-reduced-motion` path and works without a pointer.

## Pick the right tool
| Need | Tool |
|---|---|
| Reveal on enter, progress bars, simple parallax | CSS `animation-timeline: view()` / `scroll()` (Baseline 2026) |
| Page / case-study transitions | View Transitions API (`document.startViewTransition`, `@view-transition { navigation: auto }`) |
| Component hover, layout, presence, springs | Motion (`motion/react`) |
| Pinned scroll scenes, timelines, text splitting | GSAP + ScrollTrigger + SplitText (all free) |
| Smooth/inertial scroll | Lenis, driven by GSAP ticker |
| Lightweight timelines/easing outside React | anime.js v4 |
| SVG shape morphing | Flubber or GSAP MorphSVG |
| 3D objects, cameras, lighting | three.js via React Three Fiber + drei |
| Rigid-body physics | cannon-es (simple) or @react-three/rapier (WASM, faster) |
| Live shader sketches → GIF loops for posters | twigl (prototype), then port GLSL to R3F |

## Canonical setup (Next.js App Router, client component)
```ts
'use client';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export function initMotion() {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return () => {};
  const lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (t: number) => lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => { gsap.ticker.remove(tick); lenis.destroy(); };
}
```
Use `gsap.context()` / `useGSAP()` for cleanup in React. Use `gsap.matchMedia()` to give
mobile and reduced-motion their own timelines.

## House motion tokens
- Ease: `expo.out` for entrances, `power3.inOut` for transitions, springs
  `{ stiffness: 260, damping: 24, mass: 0.8 }` for UI.
- Durations: micro 150–250ms, UI 300–500ms, headline reveals 800–1000ms, page 600–900ms.
- Stagger: 0.04s chars, 0.08s lines, 0.1s cards.
- Magnetic pull ≤ 12px; cursor follower lerp 0.15; desktop (`pointer: fine`) only.

## 3D / WebGL rules
- One shared `<Canvas>` with drei `<View>` for multiple scenes; never one context per card.
- `dpr={[1, 2]}`, `frameloop="demand"` when idle, pause when off-screen
  (IntersectionObserver) or tab hidden.
- Load three.js chunks after first paint (`next/dynamic`, `ssr: false`) with a static
  poster image as the LCP element.
- Low-power path: `navigator.hardwareConcurrency <= 4 || connection.saveData` → video loop
  or static image; cap 30fps on mobile; halve particle counts.
- Compress models with glTF + Draco/Meshopt, textures KTX2. Keep hero scene < 1.5MB.
- Gyroscope only after an explicit user tap (iOS `DeviceOrientationEvent.requestPermission`).

## Physics rules
- Start the world on interaction, sleep bodies at rest, fixed timestep 1/60, max 3 substeps.
- Clamp body counts on mobile; dispose worlds on unmount.

## Reduced motion & a11y
- Reduced motion: no smooth scroll, no parallax, simulations show a still frame, reveals
  become 200ms opacity fades, autoplay video off.
- Decorative canvases `aria-hidden="true"`; interactive ones get a label, instructions,
  keyboard controls, and a "skip" link.
- Never trap scroll; horizontal galleries use native scroll-snap.

## Performance verification
- Chrome Performance panel: no long tasks > 50ms during scroll; 60fps on a mid-range
  Android (or 30fps cap holds steady).
- Lighthouse mobile ≥ 95; INP < 200ms; CLS < 0.05 (reserve space for canvases).
