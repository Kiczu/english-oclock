const optEnv = (name: string): string | undefined => {
    const v = process.env[name];
    return v && v.trim().length ? v : undefined;
};

const firstDefined = (...values: Array<string | undefined>) =>
    values.find((value) => Boolean(value)) ?? "";

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

export const WC_ENABLED =
    Boolean(WC_BASE_URL && WC_CONSUMER_KEY && WC_CONSUMER_SECRET);
