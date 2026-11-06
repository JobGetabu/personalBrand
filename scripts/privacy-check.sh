#!/usr/bin/env bash
# Privacy guard (see .claude/skills/portfolio-privacy-guard). Fails on PII in publishable code,
# content, public assets and the production build. docs/ and .claude/ describe the rules and
# are excluded on purpose.
set -uo pipefail
TARGETS=(src content public)
[ -d .next/server ] && TARGETS+=(.next/server/app)
fail=0
check() {
  local label="$1" pattern="$2"
  if grep -rInE "$pattern" "${TARGETS[@]}" --exclude-dir=node_modules 2>/dev/null; then
    echo "✗ $label found"; fail=1
  else
    echo "✓ no $label"
  fi
}
check "phone numbers" '(\+?254|\b0)7[0-9]{2}[ -]?[0-9]{3}[ -]?[0-9]{3}'
check "personal email addresses" '[A-Za-z0-9._%+-]+@(gmail|yahoo|outlook|hotmail|icloud|proton)\.(com|me)'
check "birthDate fields" '"?birthDate"?\s*:'
check "telephone/address in JSON-LD" '"(telephone|streetAddress|postalCode|addressLocality)"'
check "mailto links" 'mailto:'
# Personal terms (home area, schools, family names) live in a gitignored file, one regex per line.
if [ -f .privacy-patterns.local ]; then
  if grep -rInEf .privacy-patterns.local "${TARGETS[@]}" 2>/dev/null; then echo "✗ personal term found"; fail=1; else echo "✓ no personal terms"; fi
fi
# Secrets that must never reach the client
if grep -rInE '(RESEND_API_KEY|TURNSTILE_SECRET_KEY|UPSTASH_REDIS_REST_TOKEN|GITHUB_TOKEN)\s*=\s*\S' src content public 2>/dev/null; then echo "✗ hard-coded secret"; fail=1; else echo "✓ no hard-coded secrets"; fi
if [ -d .next/static ] && grep -rlE 're_[A-Za-z0-9]{20,}|CONTACT_TO' .next/static 2>/dev/null; then echo "✗ secret in client bundle"; fail=1; else echo "✓ client bundle clean"; fi
# Image metadata: raster images must carry no EXIF/GPS (needs exiftool)
if command -v exiftool >/dev/null; then
  if exiftool -q -r -if '$GPSLatitude or $Make or $Model or $Artist' -p '$FileName' public 2>/dev/null | grep .; then echo "✗ image metadata found"; fail=1; else echo "✓ image metadata clean"; fi
else
  echo "• exiftool not installed: skipped EXIF check (images are stripped by npm run images)"
fi
exit $fail
