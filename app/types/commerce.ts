export type CartItemInput = {
    productId: number;
    quantity: number;
};

export type WooImage = {
    src: string;
    alt?: string;
    name?: string;
};

export type WooAttribute = {
    name: string;
    options: string[];
};

export type WooMeta = {
    key: string;
    value: string;
};

export type WooCategory = {
    name: string;
};

export type WooTag = {
    name: string;
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
    images?: WooImage[];
    categories?: WooCategory[];
    tags?: WooTag[];
    attributes?: WooAttribute[];
    meta_data?: WooMeta[];
};

export type ProductPageData = {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    description?: string;
    priceLabel: string;
    isFree?: boolean;
    isBestseller?: boolean;
    categoryLabel?: string;
    tags: string[];
    level?: string;
    formatLabel?: string;
    gallery: { src: string; label: string }[];
    highlights?: string[];
    includes?: string[];
};

export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type ProductDTO = {
    id: number;
    slug: string;
    title: string;
    price: number;
    level: Level;
    type: string;
    pages: number;
    format: "PDF" | "PDF+online";
    imageUrl?: string;
};

export type ProductListItemDTO = {
    id: number;
    slug: string;
    title: string;
    price: number;
    imageUrl?: string;
};

