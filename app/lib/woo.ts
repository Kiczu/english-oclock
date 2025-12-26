import "server-only";
import { WC_BASE_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET } from "@/app/lib/env";

const authHeader = (): string => {
    const token = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString("base64");
    return `Basic ${token}`;
}

const wooFetch = async <T>(
    path: string,
    init?: RequestInit & { next?: { revalidate?: number } }
): Promise<T> => {
    const url = `${WC_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

    const res = await fetch(url, {
        ...init,
        headers: {
            ...(init?.headers ?? {}),
            Authorization: authHeader(),
            "Content-Type": "application/json",
        },
    });

    if (!res.ok) {
        const text = await res.text().catch(() => "");
        throw new Error(`Woo API error ${res.status}: ${text || res.statusText}`);
    }

    return (await res.json()) as T;
}

export default wooFetch;