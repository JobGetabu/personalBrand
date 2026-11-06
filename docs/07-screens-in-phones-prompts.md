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

---

## Round 2 (Job, 2026-11-06): hero screens

### H1. Screen image for the rotating 3D hero phone
Upload the six app icons from `assets/cases/app-icons/` (WeR1, GetMyBoat, Sendy, Kazi,
Shackle, 360Score AI), then:
> Create a phone screen image, portrait, 1170×2532 (exactly 9:19.5), to be used as the
> screen texture of a 3D phone. It is a flat, front-on screen with no phone body, no
> bezel, no perspective and no shadow around it.
> Background: near-black #07080A with a slow, soft fluid glow of signal green #3DFFA2 and
> violet #7C5CFF rising from the bottom third, like light under glass.
> In the upper-middle, arrange the uploaded app icons as a neat 3×2 grid of rounded-square
> icons, evenly spaced and centred, each with a faint green glow under it. Keep every icon
> exactly as uploaded: do not redraw, recolour or invent logos.
> Leave the top 6% clear (status bar area) and the bottom 15% clear apart from the glow.
> No text, no clock, no status bar, no app names, no watermarks. Crisp, premium, minimal.

Save as `hero-screen.png`. I'll load it onto the 3D phone's screen and keep the live ink
effect as a soft layer on top, so it still reacts when you move the mouse.

*Alternative (one app, full screen):* upload one clean screenshot instead of the icons and
ask for "this screenshot, unchanged, at 1170×2532, with a soft green glow fading in from
the bottom edge". The WeR1 player or the Sendy booking screen work best.

### H2. `hero-held-mobile` with a real app on the phone
Upload `hero-held-mobile.png` and one app screenshot (or one app icon), then paste the
shared prompt from the top of this file, plus:
> The phone is held sideways (landscape) in both hands, screen facing the camera. Show the
> uploaded app on it, reading correctly for the viewer: if it's a portrait screenshot,
> centre it on the landscape screen with dark #0B0B10 bars on both sides. If it's an app
> icon, centre the icon on a near-black screen with a soft green glow behind it. Both
> thumbs stay in front of the screen. Keep the person, face, hands, clothes, lighting and
> background exactly unchanged.

Save as `hero-held-mobile.png` (1200×1500) and `hero-held.png` (2400×1600) if you also
redo the wide one.

### H3. Add more apps to the 3D hero screen
Upload `assets/raw/hero-screen.png` first, then each extra app icon (square PNG from the
app's store listing): Discovery, Vitality, Visa, Safaricom My OneApp, and Nybble
Technologies' main app, if it has one. Then:
> Image 1 is a phone screen with six app icons in a 3×2 grid on a dark glow background.
> The other images are app icons. Edit image 1 so the grid holds **all** the icons: keep
> the six existing icons exactly as they are, and add each uploaded icon. Arrange them as a
> neat grid of 3 columns (4 rows if needed), centred, same icon size, same spacing, same
> rounded-square shape and the same faint green glow under each one.
> Do not redraw, recolour or simplify any icon or logo; copy them exactly as uploaded.
> Keep the background glow, colours and the empty top and bottom areas unchanged.
> Same size as image 1: 1170×2532. No text, no app names, no status bar.

Save it over `assets/raw/hero-screen.png` and tell me. The 3D phone picks it up as is.
If an icon looks dim, ask: "Make each icon slightly brighter with a soft white rim, keep the
artwork unchanged."

### Logos for the company strip
Monochrome logos read best in the strip. For each company, save an SVG (preferred) or a
transparent PNG of the official logo into `assets/logos/<name>.svg`, e.g. `discovery.svg`,
`vitality.svg`, `safaricom.svg`, `nybble.svg`, `sendy.svg`. Use the company's media or
brand page. Visa and Andela are already in.
