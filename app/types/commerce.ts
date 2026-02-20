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
        id?: number;
        name: string;
        slug?: string;
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

export type WooProductCategory = {
    id: number;
    name: string;
    slug?: string;
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
    categories: string[];
    tags: string[];
    level?: string;
    gallery: { src: string; label: string }[];
    highlights?: string[];
    includes?: string[];
};

export type ProductPageData = ShopProduct;

export type ShopProductsResponseDTO = {
    source: "mock" | "woo";
    items: ShopProduct[];
    categories?: string[];
};

