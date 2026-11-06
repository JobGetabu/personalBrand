# Build prompt — Job Getabu portfolio (copy everything below the line into Claude Code)

> How to use: open this repo in Claude Code and paste the prompt. The skills in
> `.claude/skills/` load automatically and back it up. Build in the phases listed in §13 and
> review each phase before moving on.

---

You are a senior creative developer and product designer. Build the personal brand and
portfolio website for **Job Getabu, Senior Mobile Engineer** (10+ years; Android/Kotlin/
Compose, React Native/Expo, Flutter, KMM, SwiftUI). The site must be award-grade in 2026:
physical, motion-rich, fast, accessible, and secure. Read `docs/01-research.md`,
`docs/04-content-and-media.md` and `docs/05-security-and-privacy.md` first and follow the
skills in `.claude/skills/`. **Security rules in `05-security-and-privacy.md` override
everything else in this prompt.**

## 1. Goals and audiences
- Recruiters/hiring managers: in 10 seconds know *who, level, stack, proof, how to contact*.
- Companies/founders: understand services and book a call.
- Engineers/friends: be impressed by the craft; explore the Lab; share it.
- Success metrics: contact-form submissions, CV-web downloads, Cal.com bookings,
  time on Lab, Lighthouse ≥ 95 on all four categories on mobile.

## 2. Creative concept — "Built to be held."
Job builds things people hold in their hands. The site treats every section as something
you can *touch*: it has weight, inertia and response, like a great native app.
- **Signature object:** a stylised 3D phone (no real brand, rounded slab, glass edges)
  floating in the hero. Its screen runs a live, pointer-reactive fluid/particle simulation
  in the brand colours. Pointer (desktop) or optional gyroscope (mobile, behind an "enable
  motion" tap for iOS permission) tilts it with spring physics. Scrolling makes the phone
  rotate and its screen transition into the first case study (shared camera move).
- **Voice:** confident, plain, specific. One italic serif word per headline, à la synt.ax:
  "Apps that *feel* native.", "Shipped to *millions*.", "Let's build *yours*."
- **Taste references:** synt.ax (near-black, numbered mono labels, live clock, lab grid),
  dennissnellenberg.com (magnetic buttons, page wipes), lusion.co (particles),
  rauno.me (micro-interactions). Adapt; never clone layouts, copy or assets.

## 3. Information architecture
Single long home page with deep-linkable sections + dedicated case-study pages.

1. **Header** — wordmark "JG", nav (Work, Lab, About, Services, Contact), live Nairobi
   time `EAT 14:32:05` in mono, availability pill ("Open to senior/lead roles · Remote").
   Collapses to a full-screen menu on mobile with staggered link reveal.
2. **Hero `00`** — headline, one-line summary ("Senior mobile engineer. 10+ years shipping
   Android, React Native and Flutter apps used by millions."), two CTAs (View work / Start a
   project), the 3D phone, a small "scroll" indicator. Credibility strip beneath: logos of
   past companies (monochrome, hover to colour) and "10+ apps · 5M+ users · 2 awards".
3. **`01 — Selected work`** — 5–6 case studies as large cards with WebGL hover distortion
   and a cursor label "View case". Order: WeR1 (custom audio engine), GetMyBoat (cold start
   −40%, 4.9★), Sendy (fulfilment app, 4 countries), Kazi (founder, MTN award), Shackle
   (identity + localisation, Arabic/RTL), 360Score AI (own product).
4. **`02 — How I ship`** — synt.ax-style layered cross-section that assembles on scroll:
   Architecture → Interface → Performance → Quality → Release → Observability, each layer with
   2–3 concrete practices and tools (Clean Architecture, Compose/Fabric, Baseline Profiles,
   Detox/Maestro/Mockito, Fastlane/GitHub Actions, Crashlytics/Sentry).
5. **`03 — Lab`** — grid of 6 interactive experiments as poster cards, each naming the
   technique. Each is lazy-loaded and only runs while visible:
   - *Offline-first* — drag a "signal" slider; queued requests pile up and sync with springs.
   - *DroidNet* — visualises connectivity states (your open-source lib) as a live graph.
   - *Cold start* — a scrubbable timeline showing what was cut to get −40%.
   - *Waveform* — Web Audio visualiser recalling the WeR1 audio player (royalty-free loop).
   - *Morph* — Flubber shape morph between Android, Apple and Flutter-ish abstract glyphs
     (not trademark logos).
   - *Physics stack* — cannon-es/Rapier tower of app-icon tiles you can knock over.
6. **`04 — Experience`** — expandable timeline (arthour-style) with role, dates, 3 outcome
   bullets each, tech chips. Scroll-linked progress line.
7. **`05 — Services`** — Mobile app builds (MVP → scale), Architecture & migration (RN New
   Architecture, KMM, Compose), Performance & reliability audits, Team leadership/mentoring.
   Each card: what you get, typical timeline, "Book a call".
8. **`06 — Recognition & community`** — MTN App of the Year 2021, IEEEmadC Best Team 2018,
   Google/Andela scholarship, DSC community lead (200+ developers upskilled), open source
   (DroidNet, DroidLocation) with live GitHub star counts fetched at build time.
9. **`07 — About`** — short story (first "hello world" in 2014, from Windows apps to
   millions of mobile users, hiking/community). Professional portrait. No personal details.
10. **`08 — Contact`** — huge headline "Let's build *yours*.", magnetic CTA, contact form
    (name, company, email, budget range, message), Cal.com link, socials (LinkedIn, GitHub,
    X, Play Store). **No phone, no raw email address.**
11. **Footer** — mini nav, "Designed & built by Job Getabu", year, source link, back-to-top
    with spring scroll.
12. **Case-study page template** — hero still/video, Role · Team · Timeline · Stack,
    Problem → Approach → Outcome, 2–3 annotated screenshots (public store screenshots only),
    "Next project" with View Transition into the next case.
13. **/uses** (gear & tools) and **/now** (what I'm working on) — optional, cheap SEO wins.
14. **404** — the phone "drops" with physics and you can pick it back up.

## 4. Visual system
- **Theme:** dark-first (`--bg #07080A`, `--surface #0E1014`, `--line #1C1F26`,
  `--text #EDEEF0`, `--muted #8A8F98`), light theme toggle (`--bg #F5F4F0`, `--text #0B0C0E`).
- **Accent:** electric "signal green" `#3DFFA2` (Android nod, readable on black) with a
  secondary violet `#7C5CFF` for gradients/glows. Check contrast: accent text only ≥ 18px
  or on dark bg; body text ≥ 4.5:1.
- **Type:** Display — a variable grotesk (e.g. "Inter Tight" or "Space Grotesk") at
  clamp(3rem, 9vw, 9rem), tight tracking; italic accent word in a serif (e.g. "Instrument
  Serif" italic); mono labels "JetBrains Mono". Self-host via `next/font`, `font-display: swap`,
  subset Latin.
- **Grid:** 12 columns desktop, 6 tablet, 4 mobile; 16px mobile gutter; generous whitespace.
- **Texture:** subtle film grain (CSS/SVG noise, 3–4% opacity), hairline borders, soft
  radial glows behind key objects. No stock photos.
- **Iconography:** Lucide or custom 1.5px stroke icons.

## 5. Motion and physics system
Principles: purposeful, physical, interruptible, ≤ 1 hero effect per viewport.
- **Smooth scroll:** Lenis (lerp ≈ 0.1) synced to GSAP ticker; disabled when
  `prefers-reduced-motion` or on touch devices if it fights native momentum (test iOS).
- **Choreography:** GSAP + ScrollTrigger for pinned sections and the hero→case camera move;
  SplitText for line/char headline reveals (mask-up, 0.9s, `expo.out`, 0.04 stagger).
- **Component springs:** Motion (`motion/react`) for hover, layout and presence animations;
  spring defaults `stiffness 260, damping 24, mass 0.8`.
- **Native CSS first:** reveal-on-enter with `animation-timeline: view()`, reading progress
  with `scroll()`, page/case transitions with View Transitions API (cross-document fallback
  to fade).
- **3D:** React Three Fiber + drei for the phone and project-card shaders; custom GLSL for
  the screen fluid (stable-fluids / curl-noise particles). `dpr={[1, 2]}`, `frameloop="demand"`
  when idle, pause off-screen, single WebGL canvas shared via `<View>` portals.
- **Physics:** cannon-es or Rapier (WASM) only inside the Lab and 404; start on interaction.
- **Morphing:** Flubber/GSAP MorphSVG for glyph morphs.
- **Micro-interactions:** magnetic buttons (max 12px pull), cursor follower that changes
  label over cards (desktop only, hidden for coarse pointers), marquee of tech stack that
  speeds up with scroll velocity, number counters that tick once in view, hover sound
  OFF by default (opt-in toggle only).
- **Loader:** ≤ 1.2s, shows real progress of hero assets; skipped on repeat visits.
- **Reduced motion:** replace all transforms with opacity fades, stop the simulation (show
  a static poster frame), no parallax, no smooth scroll, no autoplay video.

## 6. Mobile (design mobile-first, then enhance)
- Every section designed at 375px first. Touch targets ≥ 44px, thumb-reachable CTAs.
- Hero phone becomes a lighter version (fewer particles, 30fps cap) or a looping
  AV1/H.264 video poster on low-end devices (`navigator.hardwareConcurrency ≤ 4` or
  `saveData`).
- Horizontal galleries use native scroll-snap, not hijacked scroll.
- Gyroscope tilt only after an explicit tap ("Enable motion").
- Test on real iPhone Safari and a mid-range Android Chrome; no horizontal page scroll.

## 7. Performance budget
- LCP < 2.0s on 4G mid-range Android, INP < 200ms, CLS < 0.05.
- Initial JS ≤ 170KB gzipped on home; three.js/R3F/physics code-split and loaded after
  first paint or on interaction; Lab experiments load on visibility.
- Images: AVIF/WebP via `next/image`, explicit sizes, `priority` only on LCP image,
  blur placeholders. Video: AV1 + H.264 fallback, `preload="none"`, poster frame.
- Fonts: ≤ 3 files, preloaded, subset.
- Lighthouse CI in GitHub Actions with budgets that fail the build.

## 8. Accessibility (WCAG 2.2 AA)
- Semantic landmarks, one `h1`, logical heading order, skip link.
- Every interactive canvas has a text alternative and a non-pointer way to interact or a
  "skip experiment" link; canvases are `aria-hidden` when decorative.
- Visible focus rings (accent outline 2px offset), full keyboard nav for menu, cards, form.
- Colour contrast checked; never convey state by colour alone.
- Form: labels, inline errors announced with `aria-live`, no CAPTCHA puzzles (Turnstile
  invisible).
- Respect `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`.
- axe-core + Playwright a11y tests in CI.

## 9. SEO and sharing
- Next.js Metadata API: unique titles/descriptions, canonical URLs, Open Graph + Twitter
  cards (1200×630, generated per page with `next/og`).
- JSON-LD: `Person` (name, jobTitle, sameAs: LinkedIn/GitHub/X/Play developer page,
  knowsAbout), `ProfilePage`, `CreativeWork` per case study, `BreadcrumbList`.
  **No address, phone, email or birthDate in JSON-LD.**
- `sitemap.xml`, `robots.txt`, `llms.txt` summary for AI crawlers, RSS for a future blog.
- Fast, crawlable HTML: all content server-rendered; motion is enhancement.
- Target queries: "senior mobile engineer Kenya", "React Native engineer remote",
  "Flutter developer Nairobi", "Android Kotlin Compose consultant".

## 10. Tech stack
- Next.js (App Router, latest stable) + TypeScript strict, React Server Components.
- Tailwind CSS v4 with CSS variables for tokens; shadcn/ui primitives where useful.
- GSAP (+ ScrollTrigger, SplitText, Flip), Lenis, Motion, React Three Fiber + drei,
  three.js, cannon-es or @react-three/rapier, flubber.
- Content in MDX (`/content/work/*.mdx`) with typed frontmatter (zod).
- Contact: Route Handler → Resend; Turnstile; rate limiting (Upstash).
- Analytics: Plausible or Vercel Analytics. Errors: Sentry (no PII, `sendDefaultPii: false`).
- Hosting: Vercel or Cloudflare Pages, custom domain, preview deploys per PR.
- Quality: ESLint, Prettier, Vitest, Playwright (+ axe), Lighthouse CI, Renovate.

## 11. Security (summary — full rules in `05-security-and-privacy.md`)
Publish only the allow-list. Never publish phone, personal email, DOB, address, IDs,
childhood schools, family, live location. Strip EXIF from all media. Strict CSP and
security headers, no secrets client-side, privacy-first analytics, no third-party embeds
that track. Run the `portfolio-privacy-guard` checklist before every deploy.

## 12. Content
Use `docs/04-content-and-media.md` for verified copy, metrics and links. Where a metric is
not public, mark it `TODO(verify)` instead of inventing one. Images come from
`docs/03-image-prompts.md` (generated) or public store screenshots.

## 13. Delivery phases (stop for review after each)
1. Scaffold, tokens, typography, layout grid, header/footer, dark/light, CI, security headers.
2. Static content for all sections (no motion) — must score ≥ 95 Lighthouse mobile.
3. Motion layer: Lenis + GSAP reveals, View Transitions, magnetic UI, cursor.
4. 3D hero phone + screen shader with reduced-motion and low-power fallbacks.
5. Case-study pages (MDX) + OG images + JSON-LD.
6. Lab experiments (one at a time, each lazy and paused off-screen).
7. Contact form backend, Turnstile, rate limit, email delivery.
8. Polish: 404 physics, loader, sound toggle, final perf/a11y/privacy audit, launch.

## 14. Definition of done
- All pages pass Lighthouse ≥ 95 (mobile) and axe with 0 serious issues.
- Works with JS disabled (content readable, links work).
- Privacy guard checklist passes (grep for phone patterns, emails, DOB; EXIF clean).
- Tested: iOS Safari, Android Chrome, desktop Chrome/Firefox/Safari, keyboard-only, VoiceOver.
- README documents how to add a case study and regenerate OG images.
