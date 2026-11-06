---
name: brand-video-pipeline
description: Plan and produce short brand/portfolio videos (hero loops, case-study reels, launch trailers) with the open-source pipeline brief → storyboard → motion → sound → render → launch (Remotion, Storyboarder, anime.js, Flubber, Pixelorama, three.js, PlayCanvas, cannon-es, Sverchok, Effekseer, twigl, Bark, Pedalboard, OBS, Shotcut, FFmpeg). Use when asked for a video, animatic, reel, or animated asset for the site or socials.
---

# Brand video pipeline

Goal: produce web-ready motion assets (hero background loop, 30–60s case-study reels,
launch trailer, social cut-downs) that match the site's visual system and pass the privacy
guard.

## Stages and tools
| Stage | Tool | Use it for |
|---|---|---|
| 1. Brief | (this skill + `docs/02-build-prompt.md`) | Audience, message, length, aspect ratios, CTA |
| 2. Storyboard | **Storyboarder** (wonderunit/storyboarder) | Shot list, frames, timing → animatic export |
| 3a. Motion (code) | **Remotion** (remotion-dev/remotion) | React-based compositions; reuse site components, tokens, fonts |
| 3b. Timelines/easing | **anime.js** | Choreography inside Remotion or standalone pages |
| 3c. Shape morphs | **Flubber** | Glyph/logo-free morphs (Android ↔ Apple ↔ Flutter-ish abstract shapes) |
| 3d. Pixel sprites | **Pixelorama** | Retro sprite accents (e.g. 404, easter eggs) |
| 3e. 3D | **three.js** (via R3F in Remotion with `@remotion/three`) or **PlayCanvas** | Hero phone shots, camera moves |
| 3f. Physics | **cannon-es** | Deterministic physics shots (seeded, fixed timestep for frame-accurate renders) |
| 3g. Procedural geometry | **Sverchok** (Blender) | Generative backgrounds/sculptures rendered as image sequences |
| 3h. Particles | **Effekseer** | Stylised particle bursts exported as sequences/sprite sheets |
| 3i. Shaders | **twigl** | Live GLSL sketches; export GIF/WebM loops for Lab posters |
| 4a. Voice | **Bark** (suno-ai/bark) | Optional synthetic VO/sfx. Check the model licence; never clone a real person's voice without consent |
| 4b. Audio FX | **Pedalboard** (spotify/pedalboard) | Reverb, compression, limiting, loudness normalisation |
| 5a. Capture | **OBS Studio** | Screen recordings of real app demos (demo accounts only) |
| 5b. Edit | **Shotcut** | Timeline assembly, titles, colour |
| 6. Render & deliver | **FFmpeg** | Encode, compress, generate posters |

## Default deliverables and FFmpeg recipes
```bash
# Hero background loop: silent, 6–10s, seamless, ≤ 1.5MB
ffmpeg -i hero.mov -an -vf "scale=1920:-2,fps=30" -c:v libsvtav1 -crf 38 -preset 6 hero.av1.mp4
ffmpeg -i hero.mov -an -vf "scale=1920:-2,fps=30" -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p -movflags +faststart hero.h264.mp4
ffmpeg -i hero.mov -an -vf "scale=720:-2,fps=24" -c:v libx264 -crf 28 -pix_fmt yuv420p -movflags +faststart hero.mobile.mp4
ffmpeg -ss 0 -i hero.mov -frames:v 1 -vf scale=1920:-2 hero-poster.webp
# Strip metadata from any delivered file
ffmpeg -i in.mp4 -map_metadata -1 -c copy out.mp4
```
Social cuts: 9:16 1080×1920 (Reels/Shorts), 1:1 1080×1080, 16:9 1920×1080. Burned-in
captions for sound-off viewing. Audio −14 LUFS for social, −16 LUFS for web.

## Remotion notes
- Put compositions in `/video` (separate package) so the site bundle stays small.
- Import design tokens/fonts from the site to stay on-brand.
- Seed all randomness (`random(seed)`) and physics for deterministic frames.
- Render: `npx remotion render <Comp> out/<name>.mp4 --codec h264 --crf 20`, then FFmpeg
  for web variants.

## Web embedding rules
`<video muted playsinline loop autoplay preload="none" poster="...">` with AV1 source first,
H.264 fallback; pause when off-screen; no autoplay when `prefers-reduced-motion`;
provide captions (`<track kind="captions">`) for any video with speech.

## Privacy
Record only demo data. Hide notifications (Do Not Disturb), browser bookmarks, other tabs,
file paths, and the desktop. Run `portfolio-privacy-guard` on every exported frame set.
