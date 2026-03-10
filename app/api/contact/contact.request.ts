import { validateContactValues } from "@/app/components/home/contact/contactForm.validation";
import { MIN_FORM_FILL_TIME_MS } from "./contact.config";
import { CONTACT_ERRORS, ContactRequestError } from "./contact.errors";
import type { ContactApiBody, ParsedContactBody } from "./contact.types";

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

export const getClientIp = (req: Request) => {
  const headers = req.headers;
  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const forwardedFor = headers.get("x-forwarded-for");
  if (!forwardedFor) return "unknown";

  return forwardedFor.split(",")[0]?.trim() || "unknown";
};

export const assertFormTiming = (formStartedAt: unknown) => {
  const timestamp = asTimestamp(formStartedAt);
  if (timestamp === null) {
    throw new ContactRequestError(CONTACT_ERRORS.invalidPayload, 400);
  }

  const elapsed = Date.now() - timestamp;
  if (elapsed < MIN_FORM_FILL_TIME_MS) {
    throw new ContactRequestError(CONTACT_ERRORS.formTooFast, 400);
  }
};

export const parseContactBody = async (
  req: Request,
): Promise<ParsedContactBody> => {
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
