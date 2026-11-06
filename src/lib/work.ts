import "server-only";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { media, type MediaKey } from "./media";

const WORK_DIR = path.join(process.cwd(), "content", "work");

const Frontmatter = z.object({
  title: z.string(),
  tagline: z.string(),
  client: z.string(),
  role: z.string(),
  period: z.string(),
  team: z.string(),
  stack: z.array(z.string()).max(6),
  owned: z.string().max(140),
  summary: z.string().max(220),
  metrics: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .min(1)
    .max(4),
  cover: z.string().refine((k): k is MediaKey => k in media, "unknown media key"),
  order: z.number(),
  links: z.array(z.object({ label: z.string(), href: z.url() })).default([]),
  verify: z.array(z.string()).default([]),
});

export type CaseStudy = z.infer<typeof Frontmatter> & { slug: string; body: string; cover: MediaKey };

let cache: CaseStudy[] | null = null;

export function getAllWork(): CaseStudy[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const files = readdirSync(WORK_DIR).filter((f) => f.endsWith(".mdx"));
  const items = files.map((file) => {
    const raw = readFileSync(path.join(WORK_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const parsed = Frontmatter.safeParse(data);
    if (!parsed.success) throw new Error(`Invalid frontmatter in content/work/${file}: ${parsed.error.message}`);
    return { ...parsed.data, cover: parsed.data.cover as MediaKey, slug: file.replace(/\.mdx$/, ""), body: content };
  });
  cache = items.sort((a, b) => a.order - b.order);
  return cache;
}

export function getWork(slug: string) {
  return getAllWork().find((w) => w.slug === slug) ?? null;
}

export function getNextWork(slug: string) {
  const all = getAllWork();
  const i = all.findIndex((w) => w.slug === slug);
  return all[(i + 1) % all.length];
}
