// Converts generated PNG/JPG exports in assets/raw/ into web-ready AVIF + WebP in
// public/images/, stripping ALL metadata (EXIF/GPS/XMP) on the way (privacy guard).
// Usage: npm run images            (all files)
//        npm run images -- hero-phone.png
import { mkdirSync, readdirSync } from "node:fs";
import { basename, extname, join } from "node:path";
import sharp from "sharp";

const RAW = "assets/raw";
const OUT = "public/images";
mkdirSync(OUT, { recursive: true });
const only = process.argv.slice(2);
const files = readdirSync(RAW).filter((f) => /\.(png|jpe?g|webp)$/i.test(f) && (!only.length || only.includes(f)));

for (const file of files) {
  const name = basename(file, extname(file))
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, "-");
  const img = sharp(join(RAW, file)).rotate(); // apply orientation, then metadata is dropped
  const { width } = await img.metadata();
  const max = Math.min(width ?? 2400, 2400);
  // sharp drops metadata unless .withMetadata() is called — never call it here.
  await img
    .clone()
    .resize({ width: max, withoutEnlargement: true })
    .avif({ quality: 55, effort: 6 })
    .toFile(join(OUT, `${name}.avif`));
  await img
    .clone()
    .resize({ width: max, withoutEnlargement: true })
    .webp({ quality: 78 })
    .toFile(join(OUT, `${name}.webp`));
  console.log(`✓ ${file} → ${OUT}/${name}.{avif,webp} (metadata stripped)`);
}
if (!files.length) console.log(`No images found in ${RAW}/. Put the GPT exports there first.`);
