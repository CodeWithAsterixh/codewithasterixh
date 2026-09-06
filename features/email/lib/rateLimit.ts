const rateLimitMap = new Map<string, { windowStart: number; count: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 3;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  const elapsed = now - entry.windowStart;
  if (elapsed > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count += 1;
  rateLimitMap.set(ip, entry);
  return entry.count > MAX_REQUESTS;
}
