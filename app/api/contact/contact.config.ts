export const EMAILJS_SERVICE_ID =
  process.env.EMAILJS_SERVICE_ID ??
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ??
  "";

export const EMAILJS_TEMPLATE_ID =
  process.env.EMAILJS_TEMPLATE_ID ??
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ??
  "";

export const EMAILJS_PUBLIC_KEY =
  process.env.EMAILJS_PUBLIC_KEY ?? process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";

export const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY ?? "";

export const TURNSTILE_SECRET_KEY =
  process.env.TURNSTILE_SECRET_KEY ??
  process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ??
  "";

export const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? process.env.TURNSTILE_SITE_KEY ?? "";

export const EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send";
export const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export const MIN_FORM_FILL_TIME_MS = 2_000;
export const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
export const RATE_LIMIT_MAX_REQUESTS = 5;
export const RATE_LIMIT_MIN_INTERVAL_MS = 10_000;
