import { site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365).toISOString();
  const body = `Contact: ${site.url}/#contact
Expires: ${expires}
Preferred-Languages: en
Canonical: ${site.url}/.well-known/security.txt
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
