# GPT image-generation prompts

Paste each prompt into ChatGPT (image generation) one at a time. Shared rules for every
asset are at the top; repeat them if the model drifts.

## Shared style block (append to every prompt)

> Style: premium, minimal, dark tech aesthetic. Background near-black #07080A with subtle
> film grain. Accent colours: signal green #3DFFA2 and violet #7C5CFF used sparingly as
> light, glow or rim light. Soft volumetric lighting, physically based materials, shallow
> depth of field, crisp edges, high dynamic range, 8-bit-free smooth gradients.
> No text, no letters, no numbers, no logos, no brand marks, no watermarks, no UI copy,
> no real people unless stated, no recognisable phone brands (no Apple/Samsung/Google design
> cues, no notch shape copied from a real device, no camera bump copied from a real device).

**Privacy rule for all assets:** never upload photos that show your home, car plates,
documents, ID cards, family, or location landmarks. Strip EXIF from every exported file
(`exiftool -all= file.png`) before adding it to the repo.

---

## 1. Hero — floating abstract phone (reference for the 3D model / fallback poster)
Size: 2400×1600 (3:2) and a 1080×1920 (9:16) mobile crop.

> A single abstract smartphone slab floating in empty dark space, tilted 18° to the left
> and 10° towards the camera, rounded rectangle with soft 48px-equivalent corner radius,
> ultra-thin bezels, frosted glass edges catching a thin green rim light on the right and a
> violet rim light on the left. The screen glows with a swirling fluid simulation of green
> and violet ink in black water, like stirred smoke, sharp detail in the centre. A faint
> reflection of the screen light on an invisible floor below. Generous negative space on
> the left third for a headline. Camera: 85mm, f/2.8, eye level. Mood: calm, precise,
> futuristic. [Shared style block]

## 2. Hero fallback video poster frames (optional, for low-end mobiles)
Generate 3 variations of prompt 1 with the fluid in different phases: "fluid forming a
loose spiral", "fluid splitting into two currents", "fluid settling into soft waves".
Keep camera and phone identical between them (say "identical composition to previous
image, only the screen content changes").

## 3. Open Graph / social share card base
Size: 1200×630. Text will be added in code, so leave space.

> Wide composition, dark near-black background with a soft violet radial glow on the
> right. On the right third, the abstract floating smartphone from the hero, smaller,
> angled 25°, screen showing green fluid swirls. The left 60% of the canvas is empty,
> smooth dark gradient with very faint grid lines (1px, 4% opacity) for typography to be
> placed later. [Shared style block]

## 4. Case-study cover art (one per project, consistent series)
Size: 1920×1200 (16:10). Same lighting and camera for all six so they read as a set. Each
uses an abstract metaphor, never the company's real logo or UI.

- **4a WeR1 — audio engine**
  > An abstract sculpture of sound: concentric translucent rings and a flowing 3D waveform
  > ribbon made of glass, emerging from a dark floating phone slab, green light pulsing
  > along the ribbon like an equaliser, tiny particles drifting off the peaks.
  > [Shared style block]
- **4b GetMyBoat — marine marketplace, offline-first**
  > A minimalist dark ocean surface at night rendered as a smooth glossy plane, a floating
  > phone slab resting on the water like a boat, a soft green signal ring rippling outward,
  > faint violet stars reflected in the water, calm and premium. [Shared style block]
- **4c Sendy — logistics across 4 countries**
  > An abstract top-down night map made of thin glowing lines and nodes on black, packages
  > as small glowing cubes travelling along curved green routes between four bright hubs,
  > subtle tilt-shift depth of field. No real geography or country shapes. [Shared style block]
- **4d Kazi — gig-worker platform (MTN award)**
  > Dozens of small glowing tool icons (wrench, brush, scissors, broom) rendered as
  > minimal 3D glass objects orbiting a central phone slab, connected to it by thin green
  > light threads, conveying people finding work through an app. [Shared style block]
- **4e Shackle — mobile identity & smart access**
  > A sleek abstract keycard of light dissolving into a phone slab next to a minimal
  > glass door handle, thin violet scanning arc, sense of secure seamless entry, hotel
  > corridor implied only by soft bokeh lights. No real lock hardware, no Arabic or other
  > text. [Shared style block]
- **4f 360Score AI — sports predictions**
  > A football rendered as a wireframe sphere of glowing green data points, orbiting
  > probability arcs in violet, hovering above a phone slab, stadium lights as distant
  > bokeh. [Shared style block]

## 5. Lab poster cards (6, square, series)
Size: 1200×1200. Keep identical framing: object centred, 30% padding.

> A square poster-style render of [SUBJECT] as a minimal glowing 3D object centred on a
> near-black background, thin hairline frame inset 40px, generous empty space at the bottom
> for a title added in code. [Shared style block]

Subjects:
1. "a queue of small glass cubes waiting behind a broken signal wave, then reconnecting" (Offline-first)
2. "a network graph whose nodes flicker between green online and grey offline" (DroidNet)
3. "a horizontal timeline of glowing bars being sliced shorter by a beam of light" (Cold start)
4. "a 3D audio waveform ribbon frozen mid-motion" (Waveform)
5. "three abstract glyph shapes, a rounded robot-like shape, a leaf-like curve and a chevron, morphing into each other in a motion-blur sequence" (Morph)
6. "a tumbling tower of rounded app-icon tiles mid-collapse" (Physics stack)

## 6. Professional portrait (photo edit, not generation from scratch)
Upload **one** recent, well-lit headshot you are happy to publish (plain wall, nothing
identifying in the background). Then:

> Edit this photo into a premium editorial portrait for a software engineer's portfolio.
> Keep the person's face, features, skin tone, hair and expression exactly as they are, do
> not beautify or change identity. Replace the background with a smooth dark charcoal
> #0E1014 studio backdrop with a soft green rim light from the right and subtle violet fill
> from the left. Chest-up framing, centred, 4:5 aspect, 2000×2500, natural skin texture,
> sharp eyes, gentle film grain. Remove any visible text, logos or badges on clothing.

Also export a 1:1 crop for avatars.

## 7. Favicon / app icon mark
Size: 1024×1024.

> A minimal monogram mark of the letters "J" and "G" fused into one continuous geometric
> stroke, like a single bent wire of light, signal green #3DFFA2 on near-black #07080A
> rounded-square tile, flat vector style, perfectly centred, no gradients except a very
> subtle inner glow, crisp at 16px.

(Image models often garble letters; if so, ask for "vector-style, clean geometry", or
recreate it in Figma from the best output.)

## 8. Background textures
- **Grain tile** (512×512, seamless): "Seamless tileable fine film grain noise texture,
  neutral grey on transparent, very subtle, no pattern repetition visible."
- **Gradient glow** (2400×2400): "Soft blurred radial glow, violet #7C5CFF fading into green
  #3DFFA2 at the edge, on pure black, extremely smooth, no banding."

## 9. 404 illustration (fallback if 3D 404 is skipped)
> The abstract phone slab lying face-down on an invisible floor at a slight angle, a soft
> green glow leaking from under it, a few tiny particles floating up, playful but premium.
> [Shared style block]

## Export checklist
- PNG from GPT → convert to AVIF/WebP at 1x and 2x in the build pipeline.
- Strip metadata: `exiftool -all= *.png`.
- Name files `kebab-case` by section: `hero-phone@2x.avif`, `case-wer1-cover.avif`.
- Keep the source prompts with the assets (`/assets/source/prompts.md`) for re-generation.
