import { ogImage, ogSize } from "@/lib/og";
import { getAllWork, getWork } from "@/lib/work";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllWork().map((w) => ({ slug: w.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const w = getWork(slug);
  return ogImage({
    eyebrow: `Case study · ${w?.client ?? ""}`,
    title: w?.tagline ?? "Case study",
    footer: w?.metrics[0] ? `${w.metrics[0].value} ${w.metrics[0].label}` : undefined,
  });
}
