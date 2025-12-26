export type CartItemInput = {
    productId: number;
    quantity: number;
};

export type WooProduct = {
    id: number;
    name: string;
    slug: string;
    price: string; // Woo zwraca string
    images?: { src: string }[];
};

export type ProductCardDTO = {
    id: number;
    name: string;
    slug: string;
    price: number;
    imageUrl?: string;
};
