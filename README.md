# Job Getabu — portfolio

Personal brand and portfolio site for **Job Getabu, Senior Mobile Engineer**.
Concept: **"Built to be held."** A dark, physical, motion-rich site with a 3D phone hero,
case studies, a Lab of interactive experiments, and a privacy-first contact form.

Planning docs live in [`docs/`](docs) and the Claude Code skills that guide the work in
[`.claude/skills/`](.claude/skills). **Privacy rules in
[`docs/05-security-and-privacy.md`](docs/05-security-and-privacy.md) override everything else.**

## Stack

Next.js 16 (App Router, TypeScript strict) · Tailwind CSS v4 · GSAP + ScrollTrigger + SplitText ·
Lenis · Motion · React Three Fiber + three.js · cannon-es · Flubber · MDX case studies with zod
frontmatter · Resend + Turnstile + Upstash rate limiting · Vitest · Playwright + axe · Lighthouse CI.

## Run it

```bash
npm install
cp .env.example .env.local   # fill in what you need; the site runs without any of it
npm run dev                  # http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` / `npm run typecheck` | ESLint / TypeScript |
| `npm test` | Unit tests (content, privacy allow-list, contact schema) |
| `npm run test:e2e` | Playwright: axe a11y, security headers, no-JS, privacy, reduced motion |
| `npm run privacy:check` | PII / secret / EXIF scan of `src`, `content`, `public` and the build |
| `npm run images` | Convert GPT exports in `assets/raw/` to AVIF + WebP with metadata stripped |
| `npm run verify:todos` | List every fact still marked `TODO(verify)` |

## Project map

```
content/work/*.mdx          case studies (frontmatter validated by zod in src/lib/work.ts)
src/lib/site.ts             identity, links, experience, services, recognition (allow-listed facts only)
src/lib/media.ts            every image in one place (placeholders until real assets land)
src/app/                    routes: home, /work/[slug], /uses, /now, 404, OG images, sitemap, robots,
                            llms.txt, rss.xml, .well-known/security.txt, api/contact
src/proxy.ts                per-request nonce CSP
src/components/hero/        hero + WebGL phone (R3F, custom GLSL "ink" screen, spring tilt, gyro opt-in)
src/components/lab/         six lazy, pause-off-screen experiments
src/components/motion/      Lenis + GSAP layer, cursor follower, scroll helpers
```

## Add a case study

1. Create `content/work/<slug>.mdx`. Copy the frontmatter from an existing file; required keys are
   checked by zod at build time (`title`, `tagline` with one `*italic*` word, `client`, `role`,
   `period`, `team`, `stack` ≤ 6, `summary`, `metrics`, `cover`, `order`).
2. Write the body as **Context → Problem → Approach → Outcome**, under ~350 words. Use only facts
   from `docs/04-content-and-media.md`; anything unconfirmed goes in `verify:` and a
   `TODO(verify)` comment. Never invent metrics.
3. Add a cover to `src/lib/media.ts` (placeholder first via `npm run placeholders`, then the real
   image) and set `cover:` to its key.
4. The page, OG image, sitemap entry, RSS item and JSON-LD are generated automatically.

## Swap in the generated images (docs/03-image-prompts.md)

Every placeholder in `public/images/placeholders/` is labelled with its file name, size and the
prompt section that produces it.

1. Save the GPT exports to `assets/raw/` (gitignored) using the placeholder names, e.g.
   `hero-phone.png`, `case-wer1-cover.png`, `lab-physics.png`, `portrait.png`.
2. `npm run images` → writes `public/images/<name>.avif` and `.webp` with all metadata stripped.
3. In `src/lib/media.ts`, change that entry's `src` to `/images/<name>.webp` (or `.avif`) and set
   `placeholder: false`.
4. `npm run privacy:check` before committing.

## OG images

Open Graph cards are rendered in code by `src/lib/og.tsx` (home: `src/app/opengraph-image.tsx`,
case studies: `src/app/work/[slug]/opengraph-image.tsx`). Change the copy or layout there; they
regenerate on the next build. No image files to manage.

## Contact form

`/api/contact` validates with zod, rejects honeypot and too-fast submissions, rate-limits per IP
(Upstash if configured, in-memory otherwise), verifies Cloudflare Turnstile when keys are set, and
sends through Resend to `CONTACT_TO`. That address lives only in server env and never reaches the
browser. Without JS the form still posts and redirects back with a status.

## Security

Nonce-based CSP with `strict-dynamic`, HSTS preload, `nosniff`, strict referrer, a restrictive
Permissions-Policy, `frame-ancestors 'none'`, no production source maps, no third-party trackers
or embeds, `security.txt`, and CI that runs the privacy guard, gitleaks, `npm audit`, axe and
Lighthouse budgets on every PR.

## Deploy

Vercel (recommended): import the repo, set the env vars from `.env.example`, add the custom domain
(registrar lock, 2FA, WHOIS privacy, DNSSEC). Every PR gets a preview deploy.
