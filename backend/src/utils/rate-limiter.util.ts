interface RateLimiterOptions {
  windowMs: number;
  maxRequests: number;
}

interface RateLimitBucket {
  count: number;
  expiresAt: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetInMs: number;
}

/**
 * Creates an in-memory rate limiter that can be used anywhere in the codebase.
 */
export const createRateLimiter = (options: RateLimiterOptions) => {
  const { windowMs, maxRequests } = options;
  const buckets = new Map<string, RateLimitBucket>();

  return (key: string): RateLimitResult => {
    const now = Date.now();
    const existing = buckets.get(key);

    if (!existing || existing.expiresAt <= now) {
      const bucket: RateLimitBucket = {
        count: 1,
        expiresAt: now + windowMs,
      };
      buckets.set(key, bucket);
      return {
        allowed: true,
        remaining: maxRequests - 1,
        resetInMs: windowMs,
      };
    }

    if (existing.count >= maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetInMs: existing.expiresAt - now,
      };
    }

    existing.count += 1;
    buckets.set(key, existing);

    return {
      allowed: true,
      remaining: maxRequests - existing.count,
      resetInMs: existing.expiresAt - now,
    };
  };
};
