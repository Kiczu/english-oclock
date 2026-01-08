export type ProductCategory = "student" | "teacher" | "self" | "exam";

export type ProductUI = {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    priceLabel: string;
    isFree?: boolean;
    isBestseller?: boolean;
    wooId?: number;
    category: ProductCategory;
    topics?: string[];
    level?: "A1" | "A2" | "B1" | "B2" | "C1";
    format?: "worksheet" | "bundle" | "game" | "test" | "cheatsheet";
};

export const productsMock: ProductUI[] = [
    {
        id: "free-verb-cheat-sheet-a2",
        slug: "free-verb-cheat-sheet-a2",
        title: "Verb Cheat Sheet",
        subtitle: "Szybka ściąga do czasowników",
        priceLabel: "0 zł",
        isFree: true,
        category: "self",
        level: "A2",
        format: "cheatsheet",
        topics: ["verbs", "basics"],
    },
    {
        id: "free-speaking-prompts-b1",
        slug: "free-speaking-prompts-b1",
        title: "Speaking Prompts",
        subtitle: "Karty do mówienia – szybkie rozgrzewki",
        priceLabel: "0 zł",
        isFree: true,
        category: "student",
        level: "B1",
        format: "worksheet",
        topics: ["speaking"],
    },
    {
        id: "free-mini-test-present-simple",
        slug: "free-mini-test-present-simple",
        title: "Mini Test – Present Simple",
        subtitle: "Krótki test + odpowiedzi",
        priceLabel: "0 zł",
        isFree: true,
        category: "student",
        level: "A2",
        format: "test",
        topics: ["present-simple", "grammar"],
    },
    {
        id: "phrasal-verbs-pack",
        slug: "phrasal-verbs-pack",
        title: "Phrasal Verbs Pack",
        subtitle: "Zadania + przykłady w kontekście",
        priceLabel: "29 zł",
        isBestseller: true,
        category: "self",
        level: "B1",
        format: "worksheet",
        topics: ["phrasal-verbs", "vocabulary"],
    },
    {
        id: "worksheet-bundle-a2-b1",
        slug: "worksheet-bundle-a2-b1",
        title: "Worksheet Bundle (A2–B1)",
        subtitle: "Zestaw kart pracy do regularnej nauki",
        priceLabel: "39 zł",
        isBestseller: true,
        category: "student",
        level: "B1",
        format: "bundle",
        topics: ["mixed", "revision"],
    },
    {
        id: "teacher-lesson-starter-kit",
        slug: "teacher-lesson-starter-kit",
        title: "Teacher Lesson Starter Kit",
        subtitle: "Gotowy start lekcji + materiały",
        priceLabel: "49 zł",
        isBestseller: true,
        category: "teacher",
        level: "B1",
        format: "bundle",
        topics: ["lesson", "classroom"],
    },
    {
        id: "exam-words-b2-topics",
        slug: "exam-words-b2-topics",
        title: "Exam Words – B2 Topics",
        subtitle: "Słownictwo pod tematy egzaminacyjne",
        priceLabel: "35 zł",
        category: "exam",
        level: "B2",
        format: "worksheet",
        topics: ["exam", "vocabulary"],
    },
    {
        id: "listening-pack-a2",
        slug: "listening-pack-a2",
        title: "Listening Pack (A2)",
        subtitle: "Słuchanki + zadania sprawdzające",
        priceLabel: "25 zł",
        category: "student",
        level: "A2",
        format: "worksheet",
        topics: ["listening"],
    },
    {
        id: "classroom-games-teacher-pack",
        slug: "classroom-games-teacher-pack",
        title: "Classroom Games – Teacher Pack",
        subtitle: "Gry językowe na lekcje",
        priceLabel: "45 zł",
        category: "teacher",
        level: "B1",
        format: "game",
        topics: ["games", "classroom"],
    },
];

export const freeProductsMock = productsMock.filter((p) => p.isFree);
export const bestsellersMock = productsMock.filter((p) => p.isBestseller);

export const categoryTilesMock = [
    {
        key: "student" as const,
        title: "Dla uczniów",
        subtitle: "Karty pracy, testy, słownictwo",
        href: "/shop?category=student&sort=popular",
        sticker: "🎓",
    },
    {
        key: "teacher" as const,
        title: "Dla nauczycieli",
        subtitle: "Lekcje, gry, gotowe scenariusze",
        href: "/shop?category=teacher&sort=popular",
        sticker: "🧑‍🏫",
    },
    {
        key: "self" as const,
        title: "Do nauki solo",
        subtitle: "Powtórki, gramatyka, speaking",
        href: "/shop?category=self&sort=popular",
        sticker: "🧠",
    },
] as const;
