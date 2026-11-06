import { getAllWork } from "@/lib/work";
import { site } from "@/lib/site";
import { plain } from "@/components/ui/rich";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

/** RSS for case studies now; ready for a future blog. */
export function GET() {
  const items = getAllWork()
    .map(
      (w) =>
        `<item><title>${esc(`${w.title}: ${plain(w.tagline)}`)}</title><link>${site.url}/work/${w.slug}</link><guid>${site.url}/work/${w.slug}</guid><description>${esc(w.summary)}</description></item>`,
    )
    .join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${esc(site.name)}</title><link>${site.url}</link><description>${esc(site.description)}</description>${items}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
