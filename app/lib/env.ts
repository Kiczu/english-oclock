const optEnv = (name: string): string | undefined => {
    const v = process.env[name];
    return v && v.trim().length ? v : undefined;
};

const firstDefined = (...values: Array<string | undefined>) =>
    values.find((value) => Boolean(value)) ?? "";

const normalizePath = (value: string) => {
    const trimmed = value.trim();
    const withLeadingSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
    return withLeadingSlash.replace(/\/+$/, "");
};

const parsePositiveInt = (value: string | undefined, fallback: number) => {
    if (!value) return fallback;
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) return fallback;
    const int = Math.floor(parsed);
    return int > 0 ? int : fallback;
};

export const WC_BASE_URL = firstDefined(
    optEnv("WC_BASE_URL"),
    optEnv("WP_URL"),
    optEnv("NEXT_PUBLIC_WP_URL")
).replace(/\/$/, "");

export const WC_CONSUMER_KEY = firstDefined(
    optEnv("WC_CONSUMER_KEY"),
    optEnv("WC_KEY")
);

export const WC_CONSUMER_SECRET = firstDefined(
    optEnv("WC_CONSUMER_SECRET"),
    optEnv("WC_SECRET")
);

export const WC_CHECKOUT_BASE_PATH = normalizePath(
    firstDefined(
        optEnv("WC_CHECKOUT_BASE_PATH"),
        optEnv("WC_CHECKOUT_PATH"),
        "/checkout"
    )
);

export const HEADLESS_SHARED_SECRET = firstDefined(
    optEnv("HEADLESS_SHARED_SECRET"),
    optEnv("KNK_HEADLESS_SHARED_SECRET")
);

export const HEADLESS_CHECKOUT_MAX_AGE_SECONDS = parsePositiveInt(
    optEnv("HEADLESS_CHECKOUT_MAX_AGE_SECONDS"),
    600
);

export const WC_ENABLED =
    Boolean(WC_BASE_URL && WC_CONSUMER_KEY && WC_CONSUMER_SECRET);
