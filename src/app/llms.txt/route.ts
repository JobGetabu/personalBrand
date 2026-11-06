import { getAllWork } from "@/lib/work";
import { site, socials, services } from "@/lib/site";
import { plain } from "@/components/ui/rich";

export const dynamic = "force-static";

export function GET() {
  const work = getAllWork();
  const body = `# ${site.name} — ${site.title}

> ${site.description}

${site.region}. ${site.availability}.

## Case studies
${work.map((w) => `- [${w.title}](${site.url}/work/${w.slug}): ${plain(w.tagline)} ${w.summary}`).join("\n")}

## Services
${services.map((s) => `- ${s.title}: ${s.outcome}`).join("\n")}

## Profiles
${socials.map((s) => `- [${s.label}](${s.href})`).join("\n")}

## Contact
Use the contact form at ${site.url}/#contact.
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
