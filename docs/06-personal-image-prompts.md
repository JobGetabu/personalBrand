# Personal image prompts (round 2)

The first image set is abstract, so the site does not yet show *you* or *your* real apps.
This set fixes that. Every prompt below **edits a real photo or screenshot you upload**; none
of them invents a face or a fake app screen.

Append the shared style block from `03-image-prompts.md` to each prompt, **except** delete the
line "no real people unless stated" (these prompts state it).

**Before you upload anything**
- Use photos you are happy to publish. Plain backgrounds only: no home interiors, windows
  with a view, street signs, car plates, ID badges, lanyards, documents or family.
- Other people's faces only with their permission; otherwise ask the model to blur them.
- App screenshots must come from public store listings or builds your employer or client
  has approved for your portfolio. Hide real user names, balances, phone numbers or chats.
- Drop finished files in `assets/raw/` and run `npm run images` (it resizes and strips EXIF).

## What I need from you
1. **1–3 headshots** (phone camera is fine): face the window, plain wall, chest up.
2. **One "at work" photo**: you holding a phone or at a desk, background plain or blurrable.
3. **Optional: 1–2 community photos** (a talk, workshop or meetup) you are allowed to share.
4. **2–4 public screenshots per project** (Play Store / App Store listing images are ideal).

| # | Slot on the site | File name in `assets/raw/` | Source you upload |
|---|---|---|---|
| P1 | About portrait (4:5) + avatar (1:1) | `portrait.png`, `avatar.png` | Headshot |
| P2 | Hero "held" photo, shown on mobile and as poster | `hero-held.png` | At-work photo |
| P3 | About journey · Community chapter | `about-community.png` | Community photo |
| P4 | Case-study covers (×6) | `case-<slug>-cover.png` | Store screenshots |
| P5 | Social share card with your face | `og-portrait.png` | P1 result |

---

## P1. Editorial portrait (About section + avatar)
> Edit this photo into a premium editorial portrait for a senior mobile engineer's portfolio.
> Keep the person's face, features, skin tone, hair, glasses and expression exactly as they
> are. Do not beautify, slim, lighten skin or change identity. Replace the background with a
> smooth dark charcoal #0E1014 studio backdrop. Add a soft signal-green #3DFFA2 rim light
> from the right and a faint violet #7C5CFF fill from the left. Chest-up, centred, 4:5,
> 2000×2500, natural skin texture, sharp eyes, gentle film grain. Remove any text, logos or
> badges on clothing.

Then: "Crop the same image to a 1:1 square, face centred, 1200×1200."

## P2. "Built to be held" (hero, the site's concept)
> Edit this photo so the person is holding a smartphone in one hand at chest height, screen
> facing the camera, glowing with a soft green and violet fluid gradient (no UI, no text).
> Keep the person's face and identity exactly as in the photo. The screen light falls on
> their hand and face as a green rim. Background: near-black #07080A, shallow depth of
> field, the person on the right third and empty dark space on the left for a headline.
> 3:2, 2400×1600, cinematic, calm, confident. Generic phone with no brand design cues.

Also ask for a 4:5 crop (1200×1500) with the phone in the lower half for mobile.

## P3. Community chapter
> Colour-grade this photo to match a dark, premium tech portfolio: deep shadows, cool
> neutral midtones, a subtle green #3DFFA2 tint in highlights, gentle film grain. Keep
> everyone's appearance unchanged. Blur any faces other than the main speaker, and remove
> any readable text, banners, logos, room numbers or signs. 3:2, 1800×1200.

## P4. Case-study covers from real screenshots (superseded: use 07-screens-in-phones-prompts.md)
Upload 2–3 screenshots of one app, then:
> Compose these app screenshots into a case-study cover. Place them on two or three generic
> modern phones (no brand design cues, thin bezels) floating at slight angles, the front one
> largest. Keep the screenshots' content exactly as given: do not redraw, translate or add
> any UI or text. Background near-black #07080A with a soft glow in the app's primary
> brand colour behind the phones, plus a faint green #3DFFA2 rim light. 16:10, 1920×1200,
> phones in the right two-thirds, empty dark space on the left.

Projects: wer1, getmyboat, sendy, kazi, shackle, 360score (`case-360score-ai-cover.png`).
If a client has not approved screenshots, skip it: the current abstract cover stays.

## P5. Social share card
> Using this portrait, create a 1200×630 social card background: the person on the right
> third, cut out cleanly, on a near-black #07080A backdrop with a soft green #3DFFA2 glow
> behind their shoulder. Leave the left 60% empty for text added later. No text.

---

**Checklist once images are in:** `npm run images`, check `npm run privacy:check`, then the
mapping in `src/lib/media.ts` swaps the placeholders (I will wire P2 and P3 when the files land).
