import "server-only";
import { WC_BASE_URL, WC_CONSUMER_KEY, WC_CONSUMER_SECRET } from "@/app/lib/env";

type WooFetchInit = RequestInit & { next?: { revalidate?: number } };

type WooFetchMeta = {
    total?: number;
    totalPages?: number;
};

const authHeader = (): string => {
    const token = Buffer.from(`${WC_CONSUMER_KEY}:${WC_CONSUMER_SECRET}`).toString("base64");
    return `Basic ${token}`;
}

const buildWooUrl = (path: string) =>
    `${WC_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

const parseHeaderNumber = (value: string | null): number | undefined => {
    if (value === null) return undefined;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : undefined;
};

const fetchWooResponse = async (
    path: string,
    init?: WooFetchInit,
) => {
    const res = await fetch(buildWooUrl(path), {
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

    return res;
};

export const wooFetchWithMeta = async <T>(
    path: string,
    init?: WooFetchInit,
): Promise<{ data: T; meta: WooFetchMeta }> => {
    const res = await fetchWooResponse(path, init);
    const data = (await res.json()) as T;

    return {
        data,
        meta: {
            total: parseHeaderNumber(res.headers.get("x-wp-total")),
            totalPages: parseHeaderNumber(res.headers.get("x-wp-totalpages")),
        },
    };
}

const wooFetch = async <T>(
    path: string,
    init?: WooFetchInit
): Promise<T> => {
    const { data } = await wooFetchWithMeta<T>(path, init);
    return data;
}

export default wooFetch;
