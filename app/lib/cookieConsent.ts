export const COOKIE_CONSENT_COOKIE_NAME = "ieo_cookie_consent";
export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_CONSENT_MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // 180 dni

export type CookiePreferences = {
  analytics: boolean;
  marketing: boolean;
};

export type CookieConsentState = CookiePreferences & {
  necessary: true;
  version: number;
  updatedAt: string;
};

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const isBoolean = (value: unknown): value is boolean => typeof value === "boolean";

const isValidConsentState = (value: unknown): value is CookieConsentState => {
  if (!isObject(value)) return false;
  return (
    value.necessary === true &&
    value.version === COOKIE_CONSENT_VERSION &&
    typeof value.updatedAt === "string" &&
    isBoolean(value.analytics) &&
    isBoolean(value.marketing)
  );
};

const readCookie = (cookieName: string): string | null => {
  if (typeof document === "undefined") return null;
  const prefix = `${cookieName}=`;
  const cookie = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix));

  if (!cookie) return null;
  return cookie.slice(prefix.length);
};

export const readCookieConsent = (): CookieConsentState | null => {
  const raw = readCookie(COOKIE_CONSENT_COOKIE_NAME);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(decodeURIComponent(raw)) as unknown;
    if (!isValidConsentState(parsed)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
};

const buildConsentState = (preferences: CookiePreferences): CookieConsentState => ({
  necessary: true,
  analytics: preferences.analytics,
  marketing: preferences.marketing,
  version: COOKIE_CONSENT_VERSION,
  updatedAt: new Date().toISOString(),
});

export const saveCookieConsent = (preferences: CookiePreferences): CookieConsentState => {
  const nextState = buildConsentState(preferences);
  if (typeof document !== "undefined") {
    const encoded = encodeURIComponent(JSON.stringify(nextState));
    const secure =
      typeof window !== "undefined" && window.location.protocol === "https:"
        ? "; Secure"
        : "";
    document.cookie = `${COOKIE_CONSENT_COOKIE_NAME}=${encoded}; Path=/; Max-Age=${COOKIE_CONSENT_MAX_AGE_SECONDS}; SameSite=Lax${secure}`;
  }
  return nextState;
};

