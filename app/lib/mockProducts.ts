import { Level, ProductDTO } from "../types/commerce";


const levels: Level[] = ["A1", "A2", "B1", "B2", "C1", "C2"];
const types = ["Gramatyka", "Słownictwo", "Reading", "Listening", "Speaking", "Egzaminy"];
const formats: ProductDTO["format"][] = ["PDF", "PDF+online"];

const kebab = (s: string) => {
    return s
        .toLowerCase()
        .replace(/[ąćęłńóśźż]/g, (m) => ({ ą: "a", ć: "c", ę: "e", ł: "l", ń: "n", ó: "o", ś: "s", ź: "z", ż: "z" }[m] as string))
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

const makeMockProducts = (count = 48): ProductDTO[] => {
    const out: ProductDTO[] = [];

    for (let i = 1; i <= count; i++) {
        const level = levels[i % levels.length];
        const type = types[i % types.length];
        const pages = 6 + (i % 18);
        const format = formats[i % formats.length];
        const price = 19 + ((i * 7) % 40);

        const title = `${type} • ${level} • Zestaw ${i}`;
        out.push({
            id: i,
            slug: kebab(`${type}-${level}-zestaw-${i}`),
            title,
            price,
            level,
            type,
            pages,
            format,
        });
    }

    return out;
}

export default makeMockProducts;
