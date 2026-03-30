export type ContactApiBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  honeyPot?: unknown;
  formStartedAt?: unknown;
  turnstileToken?: unknown;
  pageUrl?: unknown;
};

export type ParsedContactBody = {
  name: string;
  email: string;
  message: string;
  honeyPot: string;
  turnstileToken: string;
  pageUrl: string;
  formStartedAt: unknown;
};

export type RateLimitRecord = {
  attempts: number[];
  lastAttemptAt: number;
};

export type TurnstileVerifyPayload = {
  success?: boolean;
  "error-codes"?: string[];
};

export type EmailSendParams = {
  name: string;
  email: string;
  message: string;
  pageUrl: string;
};
