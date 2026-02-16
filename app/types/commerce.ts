export type CartItemInput = {
    productId: number;
    quantity: number;
};

export type WooProduct = {
    id: number;
    name: string;
    slug: string;
    short_description?: string;
    description?: string;
    price?: string;
    regular_price?: string;
    sale_price?: string;
    on_sale?: boolean;
    images?: Array<{
        src: string;
        alt?: string;
        name?: string;
    }>;
    categories?: Array<{
        name: string;
    }>;
    tags?: Array<{
        name: string;
    }>;
    attributes?: Array<{
        name: string;
        options: string[];
    }>;
    meta_data?: Array<{
        key: string;
        value: unknown;
    }>;
};

export type ShopProduct = {
    id: string;
    wooProductId: number;
    slug: string;
    title: string;
    subtitle?: string;
    description?: string;
    price: number;
    priceLabel: string;
    isFree: boolean;
    isBestseller?: boolean;
    category?: string;
    tags: string[];
    level?: string;
    format?: string;
    gallery: { src: string; label: string }[];
    highlights?: string[];
    includes?: string[];
};

export type ProductPageData = ShopProduct;

export type ShopProductsResponseDTO = {
    source: "mock" | "woo";
    items: ShopProduct[];
};

