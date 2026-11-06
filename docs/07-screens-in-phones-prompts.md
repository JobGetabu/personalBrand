# Put the real app screens inside the existing covers

The current case-study covers (`assets/cases/case-<app>-cover@2x.webp`) look right and stay.
These prompts only change the phone in each one: its screen shows a real screenshot of
the app instead of an empty glow. This replaces §P4 of `06-personal-image-prompts.md`.

**How to run each one in ChatGPT (one chat per app):**
1. Upload **two images**: the existing cover, then **one** clean screenshot of the app.
   Use the raw screen only, not a store graphic with marketing text around it.
2. Paste the shared prompt, then the app-specific line under it.
3. If the screen comes out redrawn, blurry or with made-up text, reply with the fix-up line
   at the bottom.
4. Save as `case-<app>-cover.png` (1920×1200), drop it in `assets/raw/` and tell me.
   I'll run `npm run images` and wire it in.

Privacy: use screens that show demo or empty data only. No real customer names, phone
numbers, balances, addresses or chats. Crop out the status bar if it shows a carrier or time.

---

## Shared prompt (paste every time)

> Image 1 is a finished cover illustration. Image 2 is a real screenshot of a mobile app.
> Edit image 1 so the phone in it displays image 2 on its screen.
> **Keep image 1 exactly as it is:** same composition, camera angle, lighting, colours,
> glow, background and every other object. Only the phone's screen area changes.
> Place image 2 inside the phone's screen edges, following the screen's perspective and
> rounded corners exactly, as if the phone is switched on.
> **Do not redraw, restyle, translate or invent anything in the screenshot.** Keep its
> layout, colours, icons and text as given, sharp and legible.
> Make the screen look real: slight glass reflection across it, a soft glow from the
> screen onto nearby surfaces, and the screen a little brighter than the scene so it reads
> as the focus. Add the same subtle film grain as the rest of the image.
> Output 1920×1200 (16:10), same framing as image 1. No new text, logos or watermarks.

## Per-app line (add one under the shared prompt)

**WeR1** (screen: the music player / now-playing screen)
> The phone lies almost flat under the waveform. Tilt it up toward the camera by about
> 25 degrees so the screen is readable, keeping it on the glass rings and under the wave.

**GetMyBoat** (screen: boat search results or a boat listing)
> The phone floats flat on the water. Tilt its top edge up toward the camera by about
> 25 degrees so the screen is readable. Keep the ripple rings, and let the screen's light
> reflect in the water around it.

**Sendy** (screen: "Book a delivery" map screen)
> This image has no phone yet. Add one generic modern phone (thin bezels, no brand cues)
> standing upright in the centre of the four-hub route, slightly angled, glass edges lit
> green like the cubes. The glowing routes should run into its base, so deliveries flow
> through the app. Keep the cubes and paths as they are.

**Kazi** (screen: the "request a service" home screen)
> The phone faces the camera. Fill its screen; keep the orbiting tools and the light threads
> passing in front of and behind the phone as they are now.

**Shackle** (screen: the mobile room-key screen)
> Fill the tilted phone's screen with the room-key screen. Keep the keycard dissolving into
> the phone, the particle stream and the glass door handle exactly as they are.

**360Score AI** (screen: the AI predictions or live results list)
> The phone lies flat under the football. Tilt it up toward the camera by about 20 degrees
> so the screen is readable, while the hologram beam still rises from it into the ball.

## Optional: your phone in the "held" photo

Upload `hero-held.png` and one screenshot (WeR1 or Sendy work well), then:
> Image 1 is a portrait of a person holding a phone. Show image 2 on that phone's screen,
> following its angle and rounded corners exactly, with a soft glass reflection. Keep the
> person, face, hands, lighting and background exactly unchanged. Do not redraw the
> screenshot. Same size and framing as image 1.

For `hero-held-mobile.png` (phone held sideways in both hands), add:
> The phone is in landscape. Rotate the screenshot so it reads correctly, or centre it with
> dark #0B0B10 bars on each side if it can't fit without distortion. Both thumbs stay in
> front of the screen.

## Optional: the hero phone poster

Upload `hero-phone@2x` (then `hero-phone-mobile@2x` separately) and the Sendy "Book a
delivery" screenshot, with the shared prompt plus:
> Keep the glass phone outline, rim light and floor reflection exactly. Replace the smoke
> wallpaper inside it with the screenshot in correct perspective, edges softly tinted by
> the green and violet rim glow. Let the floor reflection faintly show the screen.

Leave the 404 phone, lab posters, textures and brand images as they are.

## Fix-up lines (if the first result is off)
- "The screenshot was redrawn. Use image 2 pixel-for-pixel on the screen; only warp it to
  fit the screen's perspective."
- "You changed the scene. Start again from image 1 and change only the phone screen."
- "The screen is too small to read. Tilt the phone more toward the camera and enlarge it
  slightly; keep everything else."
