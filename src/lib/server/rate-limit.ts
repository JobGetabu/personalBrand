import "server-only";

const memory = new Map<string, { count: number; reset: number }>();

/**
 * Fixed-window rate limit. Uses Upstash Redis REST when configured (works across serverless
 * instances); otherwise a per-instance in-memory window.
 */
export async function rateLimit(key: string, limit = 5, windowSec = 600): Promise<boolean> {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (url && token) {
    try {
      const res = await fetch(`${url}/pipeline`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify([
          ["INCR", `rl:contact:${key}`],
          ["EXPIRE", `rl:contact:${key}`, String(windowSec), "NX"],
        ]),
        cache: "no-store",
      });
      const json = (await res.json()) as Array<{ result: number }>;
      return (json[0]?.result ?? 0) <= limit;
    } catch {
      // fall through to memory
    }
  }
  const now = Date.now();
  const entry = memory.get(key);
  if (!entry || entry.reset < now) {
    memory.set(key, { count: 1, reset: now + windowSec * 1000 });
    return true;
  }
  entry.count += 1;
  return entry.count <= limit;
}
