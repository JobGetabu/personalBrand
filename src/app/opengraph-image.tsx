import { ogImage, ogSize } from "@/lib/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.title}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Senior Mobile Engineer · 10+ years", title: "Apps that *feel* native." });
}
