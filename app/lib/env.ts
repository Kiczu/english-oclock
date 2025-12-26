export const requiredEnv = (name: string): string => {
    const v = process.env[name];
    if (!v) throw new Error(`Missing env: ${name}`);
    return v;
}

export const WC_BASE_URL = requiredEnv("WC_BASE_URL").replace(/\/$/, "");
export const WC_CONSUMER_KEY = requiredEnv("WC_CONSUMER_KEY");
export const WC_CONSUMER_SECRET = requiredEnv("WC_CONSUMER_SECRET");
