import {
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_MIN_INTERVAL_MS,
  RATE_LIMIT_WINDOW_MS,
} from "./contact.config";
import { CONTACT_ERRORS, ContactRequestError } from "./contact.errors";
import type { RateLimitRecord } from "./contact.types";

const rateLimitStore = (() => {
  const globalWithStore = globalThis as typeof globalThis & {
    __contactRateLimitStore?: Map<string, RateLimitRecord>;
  };

  if (!globalWithStore.__contactRateLimitStore) {
    globalWithStore.__contactRateLimitStore = new Map<string, RateLimitRecord>();
  }

  return globalWithStore.__contactRateLimitStore;
})();

const pruneRateLimitStore = (now: number) => {
  for (const [ip, record] of rateLimitStore.entries()) {
    const recent = record.attempts.filter(
      (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
    );

    if (recent.length === 0) {
      rateLimitStore.delete(ip);
      continue;
    }

    record.attempts = recent;
  }
};

export const assertRateLimit = (ip: string) => {
  const now = Date.now();
  pruneRateLimitStore(now);

  const record =
    rateLimitStore.get(ip) ?? {
      attempts: [],
      lastAttemptAt: 0,
    };

  if (
    record.lastAttemptAt > 0 &&
    now - record.lastAttemptAt < RATE_LIMIT_MIN_INTERVAL_MS
  ) {
    throw new ContactRequestError(CONTACT_ERRORS.sendTooFast, 429);
  }

  if (record.attempts.length >= RATE_LIMIT_MAX_REQUESTS) {
    throw new ContactRequestError(CONTACT_ERRORS.tooManyAttempts, 429);
  }

  record.attempts.push(now);
  record.lastAttemptAt = now;
  rateLimitStore.set(ip, record);
};
