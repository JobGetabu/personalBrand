// Generates labelled SVG placeholders for every asset in src/lib/media.ts.
// Run: node scripts/make-placeholders.mjs
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const src = readFileSync(new URL("../src/lib/media.ts", import.meta.url), "utf8");
const re = /ph\("([\w-]+)",\s*(\d+),\s*(\d+),\s*"[^"]*",\s*"([^"]+)"\)/g;
const out = new URL("../public/images/placeholders/", import.meta.url);
mkdirSync(out, { recursive: true });

for (const [, name, w, h, prompt] of src.matchAll(re)) {
  const W = +w,
    H = +h,
    s = Math.min(W, H);
  const fs = Math.round(s * 0.028);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
<defs>
<radialGradient id="g" cx="62%" cy="45%" r="55%"><stop offset="0" stop-color="#7C5CFF" stop-opacity=".45"/><stop offset=".55" stop-color="#3DFFA2" stop-opacity=".10"/><stop offset="1" stop-color="#07080A" stop-opacity="0"/></radialGradient>
<linearGradient id="p" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3DFFA2" stop-opacity=".55"/><stop offset="1" stop-color="#7C5CFF" stop-opacity=".55"/></linearGradient>
<pattern id="grid" width="${s / 12}" height="${s / 12}" patternUnits="userSpaceOnUse"><path d="M ${s / 12} 0 L 0 0 0 ${s / 12}" fill="none" stroke="#EDEEF0" stroke-opacity=".05" stroke-width="1"/></pattern>
</defs>
<rect width="${W}" height="${H}" fill="#07080A"/>
<rect width="${W}" height="${H}" fill="url(#grid)"/>
<rect width="${W}" height="${H}" fill="url(#g)"/>
<g transform="translate(${W * 0.62} ${H * 0.48}) rotate(-14)">
<rect x="${-s * 0.13}" y="${-s * 0.26}" width="${s * 0.26}" height="${s * 0.52}" rx="${s * 0.04}" fill="#0E1014" stroke="url(#p)" stroke-width="${Math.max(2, s * 0.004)}"/>
<rect x="${-s * 0.115}" y="${-s * 0.24}" width="${s * 0.23}" height="${s * 0.48}" rx="${s * 0.03}" fill="url(#p)" opacity=".18"/>
</g>
<rect x="${s * 0.03}" y="${s * 0.03}" width="${W - s * 0.06}" height="${H - s * 0.06}" fill="none" stroke="#EDEEF0" stroke-opacity=".12"/>
<g font-family="ui-monospace, Menlo, monospace" fill="#8A8F98" font-size="${fs}">
<text x="${s * 0.06}" y="${H - s * 0.13}" fill="#3DFFA2">PLACEHOLDER</text>
<text x="${s * 0.06}" y="${H - s * 0.09}">${name} · ${W}×${H}</text>
<text x="${s * 0.06}" y="${H - s * 0.055}">docs/03-image-prompts.md ${prompt}</text>
</g>
</svg>
`;
  writeFileSync(new URL(`${name}.svg`, out), svg);
  console.log("wrote", name);
}
