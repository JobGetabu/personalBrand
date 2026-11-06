# Research: motion-led portfolios in 2026 and your inspirations

_Researched 2026-11-06. Sites listed under "Reference sites" are well-known benchmarks;
open each before borrowing, since sites change._

## 1. What "best in 2026" means

Award juries (Awwwards weights: Design 40%, Usability 30%, Creativity 20%, Content 10% —
per Awwwards jury member Hon Tran, hontran.dev, June 2026) reward sites that:

1. **Have one memorable idea** carried through the whole site, not a pile of effects.
2. **Feel physical**: inertia scrolling, spring-based hover, magnetic cursors, objects that
   respond to drag/velocity, shaders that react to the pointer.
3. **Load fast anyway**: LCP < 2.5 s, motion only on `transform`/`opacity`, WebGL lazily
   initialised, DPR capped at 2.
4. **Respect the user**: `prefers-reduced-motion` honoured, keyboard and screen readers work,
   content readable without JS.

### Platform state (2026)
- **CSS scroll-driven animations** (`animation-timeline: scroll()/view()`) and **View
  Transitions** (same-document and cross-document `@view-transition { navigation: auto }`)
  are Baseline across Chrome, Firefox and Safari. Use them for reveals, progress bars and
  page transitions; keep JS for physics and choreography. (codercops.com, May 2026)
- Safari still has edge cases with `animation-range` timing: test on iOS.
- **GSAP is free** (including SplitText, ScrollTrigger, MorphSVG, Flip, Inertia) since the
  Webflow acquisition, so premium-plugin cost is no longer a reason to avoid it.
- The common award stack: **Next.js App Router + Lenis + GSAP/ScrollTrigger + React Three
  Fiber/three.js (+ GLSL)**, one shared RAF loop:
  `gsap.ticker.add(t => lenis.raf(t * 1000)); gsap.ticker.lagSmoothing(0); lenis.on('scroll', ScrollTrigger.update)`.
- **Motion (formerly Framer Motion)** for React component springs/layout animations.

## 2. Reference sites (study list)

| Site | Why study it | Borrow |
|---|---|---|
| bruno-simon.com | The canonical playful 3D developer portfolio (drivable world, cannon/physics). | Physics as personality; a hidden "play" mode. Don't copy the car world. |
| lusion.co | Studio site with best-in-class WebGL particles and transitions. | Pointer-reactive particle field, smooth scene-to-scene transitions. |
| activetheory.net | Long-running WebGL showcase. | Immersive loader that is short and meaningful. |
| igloo.inc | Awwwards Site of the Year 2024; scroll-through 3D ice world. | Narrative scroll where camera moves through a scene. |
| dennissnellenberg.com | Award-winning freelance dev portfolio; restraint + magnetic buttons. | Magnetic CTA, marquee, page wipe transitions, clean type. |
| robin-noguier.com | Designer portfolio with WebGL image distortion on project cards. | Shader hover distortions on project thumbnails. |
| olivierlarose.com | Developer who publishes tutorials for each effect. | Practical source for sticky-scroll, text reveal, curved menu. |
| rauno.me | Engineer-designer site; micro-interactions done with taste. | Tiny, precise interactions; "craft" credibility. |
| linear.app / vercel.com | Product sites engineers admire. | Grid discipline, gradient glows, typographic hierarchy, dark UI. |
| **synt.ax** (your former employer) | See teardown below. | Live simulations, lab grid, numbered sections, clock. |
| arthour-portfolio.vercel.app | Same profile as you (senior Flutter/mobile lead). | Information architecture. |

## 3. Teardown: synt.ax (Syntax — "it has my taste")

Structure: sticky header with **live local clock** and nav → hero "Every system has a
*syntax.*" with a **live Navier–Stokes fluid you stir with the cursor** and geo-coordinates
→ numbered sections `01 — Thesis`, `02 — The foundry` (stat counters), `03 — The engine`
(six-layer cross-section diagram), `04 — Industries` (sticky scroll "six worlds"), `05 — The lab`
(14 interactive experiments shown as poster cards naming the algorithm: stable fluids,
flocking, Verlet cloth, Gray–Scott…), `06 — Stryke` (module board), `07` CTA with a live
"Sketch my system" tool. Near-black theme (`#050506`), italic emphasis on one word per heading,
monospace micro-labels.

**Copy into Job's site (adapted, not cloned):**
- Near-black canvas + one italic serif word per headline.
- Numbered section labels in mono (`01 — Work`).
- Live local time in the header (Nairobi, EAT) — region-level only, no coordinates.
- A pointer-reactive **hero simulation** — ours is a *mobile-themed* one (see brief).
- A **"Lab" grid** of small interactive experiments, each card naming the technique.
- A layered cross-section diagram → reimagined as "How I ship an app" (Architecture →
  UI → Performance → Quality → Release → Observability).

**Avoid:** unsourced marketing numbers, dense small tables, many simultaneous WebGL contexts
(mobile heat/battery).

## 4. Teardown: arthour-portfolio.vercel.app

Good: skip link, sticky nav, light/dark toggle, EN/ES toggle, conference-talk embed,
expandable experience timeline ("open any role"), copy-email button, per-project
"problem → what I used" framing.
Weak: long text wall, no visuals, generic hero, no motion.
**Borrow:** expandable timeline, problem→solution→impact project cards, talks section,
theme toggle. **Do not borrow** the public email address (see security rules).

## 5. Teardown: the 2019 site

Template-based (jQuery, PHP mailer), sections: Home, About, Services, Experience, Portfolio,
Blog, Contact. Worth keeping as story material: first "hello world" in 2014, hiking/
pathfinder/community side, Hacela (founder/CTO), Eschool and Smart Discipline systems,
UpLabs UI work. It exposed personal details that must never carry over (see
`05-security-and-privacy.md`).

## 6. Your public footprint (seed content)

- GitHub `JobGetabu`: 270+ repos, ~625 stars, orgs DSC-kimathi and nairobi-gophers,
  Arctic Code Vault Contributor. Pinned: **DroidNet** (Kotlin, 64★ — network state
  library), Darasa-IEEEMadC (IEEE award app), DroidLocation, Eschool-public,
  Kimathi_Construction_System.
- Google Play (developer "Job Getabu"): **360Score AI Predictions** (4.5★), **Stories
  Downloader** (4.9★).
- Awards: MTN App of the Year — Best African Solution (2021, Kazi); IEEEmadC Best Team (2018,
  Darasa).
- Work timeline from CV: WeR1, Shackle, GetMyBoat, Sendy, Kazi (founder), TheBhub, Presta,
  Syntax, DSC Kimathi, Kedevelopers.

## Sources
- https://synt.ax/ · https://arthour-portfolio.vercel.app/ · https://github.com/JobGetabu
- https://play.google.com/store/apps/developer?id=Job+Getabu
- https://www.hontran.dev/blog/how-to-build-an-award-winning-portfolio-site
- https://blog.codercops.com/blog/css-view-transitions-scroll-animations-2026
- https://www.awwwards.com/inspiration/scroll-triggered-animation-prmo-portfolio
- https://www.awwwards.com/websites/framer-motion/
