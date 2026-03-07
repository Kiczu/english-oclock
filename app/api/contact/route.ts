import { NextResponse } from "next/server";
import { validateContactValues } from "@/app/components/home/contact/contactForm.validation";

export const runtime = "nodejs";

const EMAILJS_SERVICE_ID =
  process.env.EMAILJS_SERVICE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "";
const EMAILJS_TEMPLATE_ID =
  process.env.EMAILJS_TEMPLATE_ID ?? process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "";
const EMAILJS_PUBLIC_KEY =
  process.env.EMAILJS_PUBLIC_KEY ?? process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "";
const EMAILJS_PRIVATE_KEY = process.env.EMAILJS_PRIVATE_KEY ?? "";

const TURNSTILE_SECRET_KEY =
  process.env.TURNSTILE_SECRET_KEY ??
  process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ??
  "";

const EMAILJS_SEND_URL = "https://api.emailjs.com/api/v1.0/email/send";
const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";

const CONTACT_ERRORS = {
  invalidPayload: "Nieprawidlowe dane formularza.",
  invalidFields: "Formularz zawiera bledy.",
  formTooFast: "Wyslij formularz po chwili od jego otwarcia.",
  antiSpamFailed: "Nie udalo sie potwierdzic zabezpieczenia antyspamowego.",
  sendTooFast: "Wysylasz za szybko. Sprobuj ponownie za chwile.",
  tooManyAttempts: "Za duzo prob. Sprobuj ponownie pozniej.",
  serviceUnavailable:
    "Kontakt chwilowo niedostepny. Sprobuj ponownie pozniej.",
  sendFailed: "Nie udalo sie wyslac formularza. Sprobuj ponownie.",
} as const;

const MIN_FORM_FILL_TIME_MS = 2_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const RATE_LIMIT_MIN_INTERVAL_MS = 10_000;

type ContactApiBody = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  honeyPot?: unknown;
  formStartedAt?: unknown;
  turnstileToken?: unknown;
  pageUrl?: unknown;
};

type RateLimitRecord = {
  attempts: number[];
  lastAttemptAt: number;
};

type TurnstileVerifyPayload = {
  success?: boolean;
  "error-codes"?: string[];
};

class ContactRequestError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.status = status;
  }
}

const rateLimitStore = (() => {
  const globalWithStore = globalThis as typeof globalThis & {
    __contactRateLimitStore?: Map<string, RateLimitRecord>;
  };

  if (!globalWithStore.__contactRateLimitStore) {
    globalWithStore.__contactRateLimitStore = new Map<string, RateLimitRecord>();
  }

  return globalWithStore.__contactRateLimitStore;
})();

const asString = (value: unknown) =>
  typeof value === "string" ? value.trim() : "";

const asTimestamp = (value: unknown) => {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
};

const getClientIp = (req: Request) => {
  const headers = req.headers;
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwardedFor = headers.get("x-forwarded-for");
  if (!forwardedFor) return "unknown";

  return forwardedFor.split(",")[0]?.trim() || "unknown";
};

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

const assertRateLimit = (ip: string) => {
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

const assertFormTiming = (formStartedAt: unknown) => {
  const timestamp = asTimestamp(formStartedAt);
  if (timestamp === null) return;

  const elapsed = Date.now() - timestamp;
  if (elapsed < MIN_FORM_FILL_TIME_MS) {
    throw new ContactRequestError(CONTACT_ERRORS.formTooFast, 400);
  }
};

const verifyTurnstile = async (token: string, ip: string) => {
  if (!TURNSTILE_SECRET_KEY) return;

  if (!token) {
    throw new ContactRequestError(CONTACT_ERRORS.antiSpamFailed, 400);
  }

  const form = new URLSearchParams();
  form.set("secret", TURNSTILE_SECRET_KEY);
  form.set("response", token);
  if (ip && ip !== "unknown") {
    form.set("remoteip", ip);
  }

  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: form.toString(),
    cache: "no-store",
  });

  const rawPayload = await response.text().catch(() => "");
  let payload: TurnstileVerifyPayload | null = null;
  if (rawPayload.length > 0) {
    try {
      payload = JSON.parse(rawPayload) as TurnstileVerifyPayload;
    } catch {
      payload = null;
    }
  }

  if (!response.ok) {
    console.warn("[api/contact] turnstile verify non-2xx response", {
      status: response.status,
      body: rawPayload,
    });
    throw new ContactRequestError(CONTACT_ERRORS.antiSpamFailed, 400);
  }

  if (!payload?.success) {
    console.warn("[api/contact] turnstile rejected token", {
      errorCodes: payload?.["error-codes"] ?? [],
    });
    throw new ContactRequestError(CONTACT_ERRORS.antiSpamFailed, 400);
  }
};

const sendEmailWithEmailJs = async (params: {
  name: string;
  email: string;
  message: string;
  pageUrl: string;
}) => {
  if (
    !EMAILJS_SERVICE_ID ||
    !EMAILJS_TEMPLATE_ID ||
    !EMAILJS_PUBLIC_KEY ||
    !EMAILJS_PRIVATE_KEY
  ) {
    console.error("[api/contact] emailjs config missing", {
      hasServiceId: Boolean(EMAILJS_SERVICE_ID),
      hasTemplateId: Boolean(EMAILJS_TEMPLATE_ID),
      hasPublicKey: Boolean(EMAILJS_PUBLIC_KEY),
      hasPrivateKey: Boolean(EMAILJS_PRIVATE_KEY),
    });
    throw new ContactRequestError(CONTACT_ERRORS.serviceUnavailable, 503);
  }

  const payload = {
    service_id: EMAILJS_SERVICE_ID,
    template_id: EMAILJS_TEMPLATE_ID,
    user_id: EMAILJS_PUBLIC_KEY,
    accessToken: EMAILJS_PRIVATE_KEY,
    template_params: {
      from_name: params.name,
      reply_to: params.email,
      message: params.message,
      page_url: params.pageUrl,
      source: "website-contact-form",
    },
  };

  const response = await fetch(EMAILJS_SEND_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => "");
    console.error("[api/contact] emailjs send failed", {
      status: response.status,
      body: errorText,
    });

    if (response.status === 429) {
      throw new ContactRequestError(CONTACT_ERRORS.sendTooFast, 429);
    }

    if (response.status === 401 || response.status === 403) {
      throw new ContactRequestError(CONTACT_ERRORS.serviceUnavailable, 503);
    }

    throw new ContactRequestError(CONTACT_ERRORS.sendFailed, 502);
  }
};

const parseBody = async (req: Request) => {
  let body: ContactApiBody;
  try {
    body = (await req.json()) as ContactApiBody;
  } catch {
    throw new ContactRequestError(CONTACT_ERRORS.invalidPayload, 400);
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const message = asString(body.message);
  const honeyPot = asString(body.honeyPot);
  const turnstileToken = asString(body.turnstileToken);
  const pageUrl = asString(body.pageUrl);
  const formStartedAt = body.formStartedAt;

  const validationErrors = validateContactValues({ name, email, message });
  if (Object.keys(validationErrors).length > 0) {
    throw new ContactRequestError(CONTACT_ERRORS.invalidFields, 400);
  }

  return {
    name,
    email,
    message,
    honeyPot,
    turnstileToken,
    pageUrl,
    formStartedAt,
  };
};

export async function POST(req: Request) {
  const ip = getClientIp(req);

  try {
    const body = await parseBody(req);
    assertFormTiming(body.formStartedAt);

    // Silent success for bots that fill honeypot.
    if (body.honeyPot.length > 0) {
      return NextResponse.json({ ok: true });
    }

    assertRateLimit(ip);
    await verifyTurnstile(body.turnstileToken, ip);

    await sendEmailWithEmailJs({
      name: body.name,
      email: body.email,
      message: body.message,
      pageUrl: body.pageUrl,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof ContactRequestError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    console.error("[api/contact] unexpected failure", error);
    return NextResponse.json({ error: CONTACT_ERRORS.sendFailed }, { status: 502 });
  }
}
