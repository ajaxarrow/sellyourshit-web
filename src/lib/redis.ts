import { Redis } from "@upstash/redis";

const DOWNLOAD_COUNT_KEY = "sellyoshit:download_count";

const hasUpstashConfig = Boolean(
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN,
);

// Upstash isn't provisioned yet in every environment — degrade to a
// no-op counter (hidden on the homepage, download still works) instead
// of throwing until UPSTASH_REDIS_REST_URL/TOKEN are set.
const redis = hasUpstashConfig ? Redis.fromEnv() : null;

export async function getDownloadCount(): Promise<number> {
  if (!redis) return 0;
  try {
    return (await redis.get<number>(DOWNLOAD_COUNT_KEY)) ?? 0;
  } catch {
    return 0;
  }
}

export async function incrementDownloadCount(): Promise<void> {
  if (!redis) return;
  try {
    await redis.incr(DOWNLOAD_COUNT_KEY);
  } catch {
    // Counting is best-effort — never block the actual download over it.
  }
}
