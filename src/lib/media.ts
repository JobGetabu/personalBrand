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
  caseWer1: img("cases/case-wer1-screen-cover@2x.webp", 1920, 1200, "A phone showing the WeR1 music player under a glowing glass waveform.", "§4a"),
  caseGetmyboat: img(
    "cases/case-getmyboat-screen-cover@2x.webp",
    1920,
    1200,
    "A phone showing GetMyBoat listings, floating on a calm night ocean.",
    "§4b",
  ),
  caseSendy: img("cases/case-sendy-screen-cover@2x.webp", 1920, 1200, "A phone showing the Sendy delivery booking screen at the centre of four glowing hubs.", "§4c"),
  caseKazi: img("cases/case-kazi-screen-cover@2x.webp", 1920, 1200, "A phone showing Kazi's service request screen, orbited by glass tools.", "§4d"),
  caseShackle: img(
    "cases/case-shackle-screen-cover@2x.webp",
    1920,
    1200,
    "A keycard dissolving into a phone showing Shackle's mobile key, beside a glass door.",
    "§4e",
  ),
  case360score: img("cases/case-360score-ai-screen-cover@2x.webp", 1920, 1200, "A wireframe football hovering above a phone showing 360Score live results.", "§4f"),
  labOffline: img("lab/lab-offline-first-poster@2x.webp", 1200, 1200, "Glass cubes queued behind a broken signal wave.", "§5.1"),
  labDroidnet: img("lab/lab-droidnet-poster@2x.webp", 1200, 1200, "A network graph with nodes flickering online and offline.", "§5.2"),
  labColdstart: img("lab/lab-cold-start-poster@2x.webp", 1200, 1200, "Timeline bars sliced shorter by a beam of light.", "§5.3"),
  labWaveform: img("lab/lab-waveform-poster@2x.webp", 1200, 1200, "A 3D audio waveform ribbon frozen mid-motion.", "§5.4"),
  labMorph: img("lab/lab-morph-poster@2x.webp", 1200, 1200, "Three abstract glyphs morphing into each other.", "§5.5"),
  labPhysics: img("lab/lab-physics-stack-poster@2x.webp", 1200, 1200, "A tower of app-icon tiles mid-collapse.", "§5.6"),
  error404: img("errors/404-phone@2x.webp", 1600, 1000, "An abstract phone lying face-down, glowing green.", "§9"),
  portrait: img("about/portrait@2x.webp", 2000, 2500, "Portrait of Job Getabu in a dark studio with a soft green rim light.", "06 §P1"),
  avatar: img("about/avatar.webp", 600, 600, "Job Getabu.", "06 §P1"),
  held: img("hero/hero-held-mobile-v2@2x.webp", 1200, 1500, "Job Getabu holding a phone sideways, showing the 360Score AI app.", "06 §P2"),
  heldWide: img("hero/hero-held@2x.webp", 2400, 1600, "Job Getabu holding a phone whose screen glows green and violet.", "06 §P2"),
} satisfies Record<string, MediaItem>;

export type MediaKey = keyof typeof media;
