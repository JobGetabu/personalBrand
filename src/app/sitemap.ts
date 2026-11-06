import type { MetadataRoute } from "next";
import { getAllWork } from "@/lib/work";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    ...getAllWork().map((w) => ({
      url: `${site.url}/work/${w.slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    { url: `${site.url}/uses`, lastModified: now, priority: 0.4 },
    { url: `${site.url}/now`, lastModified: now, priority: 0.5 },
  ];
}
