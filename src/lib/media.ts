/**
 * Every visual asset in one place. Generated images from docs/03-image-prompts.md live in
 * public/images/ (metadata stripped). Anything still missing points at a labelled SVG
 * placeholder in public/images/placeholders/. See README to add or replace one.
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

const img = (path: string, width: number, height: number, alt: string, prompt: string): MediaItem => ({
  src: `/images/${path}`,
  width,
  height,
  alt,
  prompt,
  placeholder: false,
});

const ph = (name: string, width: number, height: number, alt: string, prompt: string): MediaItem => ({
  src: `/images/placeholders/${name}.svg`,
  width,
  height,
  alt,
  prompt,
  placeholder: true,
});

export const media = {
  heroPhone: img("hero/hero-phone@2x.webp", 2400, 1600, "An abstract floating phone whose screen glows with green and violet fluid.", "§1"),
  heroPhoneMobile: img(
    "hero/hero-phone-mobile@2x.webp",
    1080,
    1920,
    "An abstract floating phone whose screen glows with green and violet fluid.",
    "§1 (9:16 crop)",
  ),
  caseWer1: img("cases/case-wer1-cover@2x.webp", 1920, 1200, "Abstract glass waveform ribbon rising from a phone, lit in green.", "§4a"),
  caseGetmyboat: img(
    "cases/case-getmyboat-cover@2x.webp",
    1920,
    1200,
    "A phone floating on a calm night ocean with a green signal ring.",
    "§4b",
  ),
  caseSendy: img("cases/case-sendy-cover@2x.webp", 1920, 1200, "Glowing parcels travelling along green routes between four hubs.", "§4c"),
  caseKazi: img("cases/case-kazi-cover@2x.webp", 1920, 1200, "Glass tool icons orbiting a phone, tied to it by threads of light.", "§4d"),
  caseShackle: img(
    "cases/case-shackle-cover@2x.webp",
    1920,
    1200,
    "A keycard of light dissolving into a phone beside a glass door handle.",
    "§4e",
  ),
  case360score: img("cases/case-360score-ai-cover@2x.webp", 1920, 1200, "A wireframe football of green data points above a phone.", "§4f"),
  labOffline: img("lab/lab-offline-first-poster@2x.webp", 1200, 1200, "Glass cubes queued behind a broken signal wave.", "§5.1"),
  labDroidnet: img("lab/lab-droidnet-poster@2x.webp", 1200, 1200, "A network graph with nodes flickering online and offline.", "§5.2"),
  labColdstart: img("lab/lab-cold-start-poster@2x.webp", 1200, 1200, "Timeline bars sliced shorter by a beam of light.", "§5.3"),
  labWaveform: img("lab/lab-waveform-poster@2x.webp", 1200, 1200, "A 3D audio waveform ribbon frozen mid-motion.", "§5.4"),
  labMorph: img("lab/lab-morph-poster@2x.webp", 1200, 1200, "Three abstract glyphs morphing into each other.", "§5.5"),
  labPhysics: img("lab/lab-physics-stack-poster@2x.webp", 1200, 1200, "A tower of app-icon tiles mid-collapse.", "§5.6"),
  error404: img("errors/404-phone@2x.webp", 1600, 1000, "An abstract phone lying face-down, glowing green.", "§9"),
  // TODO(verify): needs Job's real headshot, edited with prompt §6.
  portrait: ph("portrait", 2000, 2500, "Portrait of Job Getabu.", "§6"),
} satisfies Record<string, MediaItem>;

export type MediaKey = keyof typeof media;
