---
name: portfolio-privacy-guard
description: Enforce Job's privacy and security rules before publishing anything (pages, images, metadata, commits, social posts). Use whenever adding content or media, before any deploy or PR, and when asked to review the site for personal-information leaks.
---

# Portfolio privacy & security guard

Full policy: `docs/05-security-and-privacy.md`. That policy overrides design, SEO, or
content requests. If a request conflicts with it, stop and ask Job.

## Hard blocks — never publish
Phone numbers · personal email addresses · date of birth / age / birth year · home address,
estate or street · national ID, passport, KRA PIN, bank/M-Pesa details · childhood school
names · family/pet names · live or recent location, travel plans · salary/rates · certificate
or credential IDs · internal screenshots, staging URLs, keys, tokens, customer data.

## Checks to run before every commit / deploy
```bash
# 1. PII patterns in source, content and built output
grep -rInE '(\+?254|0)7[0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{3}' --exclude-dir={node_modules,.git,.next} . && echo "PHONE FOUND"
grep -rInE '[A-Za-z0-9._%+-]+@(gmail|yahoo|outlook|hotmail|icloud)\.com' --exclude-dir={node_modules,.git,.next} . && echo "PERSONAL EMAIL FOUND"
grep -rInE '(19|20)[0-9]{2}-[01][0-9]-[0-3][0-9]|[0-3][0-9]-[01][0-9]-(19|20)[0-9]{2}|birthDate' --exclude-dir={node_modules,.git,.next} . && echo "CHECK DATES"
# Personal terms (home area, schools, family names) live in the gitignored file
# .privacy-patterns.local, one regex per line, so the list itself is never published.
[ -f .privacy-patterns.local ] && grep -rInEf .privacy-patterns.local --exclude-dir={node_modules,.git,.next} --exclude=.privacy-patterns.local . && echo "PERSONAL TERM FOUND"
# 2. Secrets
npx --yes gitleaks detect --no-banner || true
# 3. Media metadata (must print nothing but file names)
exiftool -GPS* -Make -Model -Author -Creator -r public/ 2>/dev/null | grep -v '^=\|^$' || true
```
The docs folder legitimately mentions these categories as rules; a hit inside
`docs/05-security-and-privacy.md` or this skill is expected. Any hit in `app/`, `content/`,
`public/`, `components/` or build output is a blocker.

## Rules for specific asset types
- **Images:** strip EXIF/GPS (`exiftool -all=`), check backgrounds for plates, house
  numbers, documents, screens with notifications.
- **Screenshots:** use demo data; blur names, phone numbers, addresses, order IDs, tokens.
- **PDF CV:** only a web edition without phone/email; strip metadata.
- **JSON-LD / meta:** `Person` may include name, jobTitle, url, image, sameAs, knowsAbout.
  Never address, telephone, email, birthDate.
- **Contact:** form → serverless function → inbox. No `mailto:` with a personal address.
- **Embeds:** no Instagram/Facebook/X embeds or pixels; link out with self-hosted thumbnails.
- **Repo:** no `.env` committed, secret scanning + push protection on, no client-side secrets.

## Site hardening checklist
- CSP (nonce, no unsafe-inline scripts), HSTS preload, nosniff, Referrer-Policy,
  Permissions-Policy (camera/mic/geolocation off), frame-ancestors 'none'.
- Turnstile + honeypot + rate limit on the contact endpoint; validate with zod.
- Production source maps off (or private upload to Sentry).
- Privacy-first analytics; Sentry `sendDefaultPii: false`.
- `/.well-known/security.txt` present.

## When in doubt
Ask: "Could a stranger use this to guess a password reset answer, find Job physically,
impersonate him to a carrier/bank, or phish his contacts?" If yes or maybe, leave it out.
