# Security & privacy rules for the portfolio

These rules are **non-negotiable**. Every page, image, video, metadata field and commit
must pass them before it ships. The `portfolio-privacy-guard` skill enforces them.

## 1. What may be published (allow-list)

Publish only what is already professional, public, and useless to an attacker on its own:

| Allowed | Notes |
|---|---|
| Name "Job Getabu" | Display name only. |
| Professional title | "Senior Mobile Engineer" etc. |
| Region, not location | "Nairobi, Kenya · works remotely (EAT, UTC+3)". Never an estate, street, building, or coordinates. |
| Employers, roles, month/year ranges | As already public on LinkedIn. |
| Outcomes and metrics | Only numbers already public or approved by the employer (see "Employer NDA" below). |
| Public app store links | Play / App Store listings. |
| Public profiles | LinkedIn, GitHub, X, Instagram (only if the account is kept professional). |
| Awards & certifications | Name, issuer, year. **No certificate IDs, credential numbers, or scans.** |
| Professional headshot | Fresh photo, EXIF stripped, no house/car/plates/landmarks behind you. |

## 2. Never publish (block-list)

- **Phone number** (the CV and the 2019 site both contain one).
- **Personal email address** (use a contact form + a dedicated alias, see §4).
- **Date of birth**, age, or birth year (the 2019 site showed a full DOB).
- **Home address**, estate, school names from childhood (the 2019 site listed primary and
  secondary schools — these are classic security-question answers).
- National ID, passport, KRA PIN, NHIF/NSSF, bank or M-Pesa details, tax info.
- Family members' names, pet names, hometown, church/club membership with location.
- Live/recent location, travel plans, "currently in…" widgets, check-ins.
- Exact salary, rates history, client contract values.
- Screenshots containing internal tools, staging URLs, API keys, tokens, Firebase configs,
  customer data, emails, phone numbers, or internal dashboards.
- Employer-confidential info (unreleased features, security architecture of a client,
  e.g. hotel lock providers or UAE identity integration details beyond one line).
- Photo EXIF/GPS data, document metadata (author, path), source maps that leak paths.
- `.env`, secrets, analytics keys with write scope, in the repo or client bundle.

## 3. Audit findings

The personal audit findings (which old pages and accounts leaked what, and the clean-up
steps) are kept **privately in the project files, not in this public repository**, because
listing where personal data once leaked would point attackers to it. Rules that follow from
them and are safe to state publicly:

- Never upload the original CV PDF. Offer only a *web edition* without phone or email, with
  metadata stripped (`exiftool -all= cv-web.pdf`).
- Do not link personal (non-professional) social profiles.

## 4. Contact without exposing yourself

- Contact form posting to a serverless function (e.g. Vercel/Netlify function → Resend/Postmark)
  that forwards to your inbox. Your real address never appears in HTML or JS.
- Spam/abuse protection: Cloudflare Turnstile (privacy-friendly), honeypot field, rate limit
  per IP, server-side validation with zod, max body size.
- Optional: a public alias like `hello@<your-domain>` via Cloudflare Email Routing — it can be
  rotated if it gets spammed. Booking via Cal.com link instead of a phone number.

## 5. Site hardening (build requirements)

- Static-first deployment (Next.js static/ISR on Vercel or Cloudflare Pages). No CMS admin
  panel exposed publicly; if a CMS is used, it is headless and behind SSO.
- HTTP headers: strict `Content-Security-Policy` (nonce-based, no `unsafe-inline` scripts),
  `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy` denying camera/mic/geolocation, `frame-ancestors 'none'`.
- Domain: registrar lock, 2FA on registrar and DNS, WHOIS privacy, DNSSEC, CAA records.
- Dependencies: lockfile committed, Dependabot/Renovate, `npm audit` in CI, GitHub secret
  scanning + push protection on, no secrets in client bundles (`NEXT_PUBLIC_` audit).
- Analytics: privacy-first (Plausible/Umami/Vercel Analytics), no cross-site trackers,
  no session recordings.
- Images: run every asset through `exiftool -all=` (or sharp with metadata stripped) in the
  build pipeline. Blur/redact any screenshot before commit.
- Disable production source maps or upload them privately to Sentry only.
- `security.txt` at `/.well-known/security.txt` pointing to the contact form.
- No embedded third-party widgets that fingerprint visitors (Instagram embeds, Facebook
  pixels). Link out instead; show static, self-hosted thumbnails.

## 6. Employer NDA check

Before publishing any metric or screenshot from WeR1, Shackle, GetMyBoat, Sendy, Kazi,
Presta, Minet, Pacific Group, Syntax, etc.:
- Prefer public store screenshots and public press over internal captures.
- Phrase sensitive metrics as approved ranges ("1M+ installs" from the store listing).
- Keep descriptions of security-related work (identity verification, smart locks) at a
  high level: what problem, what outcome, not how it is secured.
