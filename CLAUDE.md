# Project rules

- This repo builds Job Getabu's public portfolio. **Privacy first:** follow
  `docs/05-security-and-privacy.md` and the `portfolio-privacy-guard` skill on every change.
  Never commit phone numbers, personal email, date of birth, home address, IDs or the raw CV.
- Build from `docs/02-build-prompt.md`; content facts come only from
  `docs/04-content-and-media.md`. Mark anything unverified `TODO(verify)`; never invent metrics.
- Motion work follows the `portfolio-motion-design` skill (reduced-motion and mobile fallbacks required).
- Performance/a11y gates: Lighthouse mobile ≥ 95, axe 0 serious issues.
- Next.js 16 (App Router) has breaking changes: read `AGENTS.md` and `node_modules/next/dist/docs/`
  before changing framework code. CSP is nonce-based (`src/proxy.ts`), so pages render per request
  and Cache Components/PPR stay off.
- Before committing: `npm run lint && npm run typecheck && npm test && npm run build && npm run privacy:check`.
