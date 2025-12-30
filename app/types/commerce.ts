export type CartItemInput = {
    productId: number;
    quantity: number;
};

export type WooProduct = {
    id: number;
    name: string;
    slug: string;
    price: string;
    images?: { src: string }[];
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

