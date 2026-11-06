import "server-only";

/** Public star counts for open-source cards. Cached for a day; falls back to the known count. */
export async function getStars(repo: string, fallback: number): Promise<number> {
  try {
    const res = await fetch(`https://api.github.com/repos/JobGetabu/${repo}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
      next: { revalidate: 86400 },
      signal: AbortSignal.timeout(2500),
    });
    if (!res.ok) return fallback;
    const json = (await res.json()) as { stargazers_count?: number };
    return json.stargazers_count ?? fallback;
  } catch {
    return fallback;
  }
}
