import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.title}`,
    short_name: site.shortName,
    start_url: "/",
    display: "standalone",
    background_color: "#07080A",
    theme_color: "#07080A",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
