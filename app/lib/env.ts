const optEnv = (name: string): string | undefined => {
    const v = process.env[name];
    return v && v.trim().length ? v : undefined;
};

export const WC_BASE_URL = (optEnv("WC_BASE_URL") ?? "").replace(/\/$/, "");
export const WC_CONSUMER_KEY = optEnv("WC_CONSUMER_KEY") ?? "";
export const WC_CONSUMER_SECRET = optEnv("WC_CONSUMER_SECRET") ?? "";

export const WC_ENABLED =
    Boolean(WC_BASE_URL && WC_CONSUMER_KEY && WC_CONSUMER_SECRET);
