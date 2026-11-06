/**
 * Every visual asset in one place. Until Job supplies the generated images from
 * docs/03-image-prompts.md, each entry points at a clearly labelled SVG placeholder in
 * public/images/placeholders/. To swap one in: run `npm run images` with the PNG in
 * assets/raw/ (strips EXIF, makes AVIF/WebP), then change `src` below. See README.
 */
export type MediaItem = {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Section of docs/03-image-prompts.md that produces the final asset. */
  prompt: string;
  placeholder: boolean;
};

const ph = (name: string, width: number, height: number, alt: string, prompt: string): MediaItem => ({
  src: `/images/placeholders/${name}.svg`,
  width,
  height,
  alt,
  prompt,
  placeholder: true,
});

export const media = {
  heroPhone: ph("hero-phone", 2400, 1600, "An abstract floating phone whose screen glows with green and violet fluid.", "§1"),
  heroPhoneMobile: ph(
    "hero-phone-mobile",
    1080,
    1920,
    "An abstract floating phone whose screen glows with green and violet fluid.",
    "§1 (9:16 crop)",
  ),
  ogBase: ph("og-base", 1200, 630, "", "§3"),
  caseWer1: ph("case-wer1-cover", 1920, 1200, "Abstract glass waveform ribbon rising from a phone, lit in green.", "§4a"),
  caseGetmyboat: ph("case-getmyboat-cover", 1920, 1200, "A phone floating on a calm night ocean with a green signal ring.", "§4b"),
  caseSendy: ph("case-sendy-cover", 1920, 1200, "Glowing parcels travelling along green routes between four hubs.", "§4c"),
  caseKazi: ph("case-kazi-cover", 1920, 1200, "Glass tool icons orbiting a phone, tied to it by threads of light.", "§4d"),
  caseShackle: ph("case-shackle-cover", 1920, 1200, "A keycard of light dissolving into a phone beside a glass door handle.", "§4e"),
  case360score: ph("case-360score-cover", 1920, 1200, "A wireframe football of green data points above a phone.", "§4f"),
  labOffline: ph("lab-offline", 1200, 1200, "Glass cubes queued behind a broken signal wave.", "§5.1"),
  labDroidnet: ph("lab-droidnet", 1200, 1200, "A network graph with nodes flickering online and offline.", "§5.2"),
  labColdstart: ph("lab-coldstart", 1200, 1200, "Timeline bars sliced shorter by a beam of light.", "§5.3"),
  labWaveform: ph("lab-waveform", 1200, 1200, "A 3D audio waveform ribbon frozen mid-motion.", "§5.4"),
  labMorph: ph("lab-morph", 1200, 1200, "Three abstract glyphs morphing into each other.", "§5.5"),
  labPhysics: ph("lab-physics", 1200, 1200, "A tower of app-icon tiles mid-collapse.", "§5.6"),
  portrait: ph("portrait", 2000, 2500, "Portrait of Job Getabu.", "§6"),
} satisfies Record<string, MediaItem>;

export type MediaKey = keyof typeof media;
