export type ProductCategory = "student" | "teacher" | "self" | "exam";

export type ProductGalleryItem = {
    src: string;
    label: string;
};

export type ProductUI = {
    id: string;
    slug: string;
    title: string;
    subtitle?: string;
    description?: string;
    priceLabel: string;
    isFree?: boolean;
    isBestseller?: boolean;
    wooId?: number;
    category: ProductCategory;
    topics?: string[];
    level?: "A1" | "A2" | "B1" | "B2" | "C1";
    format?: "worksheet" | "bundle" | "game" | "test" | "cheatsheet";
    gallery?: ProductGalleryItem[];
    highlights?: string[];
    includes?: string[];
};

const defaultGallery: ProductGalleryItem[] = [
    { src: "/images/file.svg", label: "Podglad 1" },
    { src: "/images/file.svg", label: "Podglad 2" },
    { src: "/images/file.svg", label: "Podglad 3" },
];

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
        description:
            "Zbior najwazniejszych czasownikow do szybkiego wgladu. Idealne jako sciaga przed lekcja lub sprawdzianem.",
        gallery: defaultGallery,
        highlights: ["Szybka sciaga", "Poziom A2", "Gotowe do druku"],
        includes: ["PDF do druku", "Wersja czarno-biala", "Podsumowanie czasownikow"],
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
        description:
            "Zestaw kart do rozgrzewki mowienia. Krotkie pytania i sytuacje do pracy na lekcji lub samodzielnie.",
        gallery: defaultGallery,
        highlights: ["Rozgrzewki speaking", "Poziom B1", "Do pracy w parach"],
        includes: ["PDF do druku", "Instrukcja pracy", "Pytania i sytuacje"],
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
        description:
            "Krotki test z Present Simple + odpowiedzi. Dobry do szybkiego sprawdzenia podstaw.",
        gallery: defaultGallery,
        highlights: ["Szybka diagnoza", "Present Simple", "Klucz odpowiedzi"],
        includes: ["Test", "Odpowiedzi", "Instrukcja dla ucznia"],
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
        description:
            "Phrasal verbs w praktycznych kontekstach. Zestaw do nauki i szybkiego powtorkowego przegladu.",
        gallery: defaultGallery,
        highlights: ["Kontekstowe przyklady", "Poziom B1", "Slownictwo w uzyciu"],
        includes: ["PDF do druku", "Przyklady w kontekscie", "Cwiczenia utrwalajace"],
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
        description:
            "Zestaw kart pracy na A2-B1. Regularne powtorki bez ukladania nowych zadan.",
        gallery: defaultGallery,
        highlights: ["Pakiet do regularnej nauki", "Poziom A2-B1", "Rozne typy zadan"],
        includes: ["PDF do druku", "Roznorodne zadania", "Instrukcje"],
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
        description:
            "Szybki start lekcji: krotkie aktywatory, mini zadania i pomysly na pierwsze 15 minut.",
        gallery: defaultGallery,
        highlights: ["Oszczedz czas", "Poziom B1", "Gotowe do lekcji"],
        includes: ["PDF do druku", "Pomysly na warm-up", "Krotkie zadania"],
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
        description:
            "Slownictwo egzaminacyjne pod B2. Tematyczne listy, cwiczenia i szybkie powtorki.",
        gallery: defaultGallery,
        highlights: ["Pod egzamin", "Poziom B2", "Tematyczne zbiory"],
        includes: ["PDF do druku", "Listy tematyczne", "Cwiczenia utrwalajace"],
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
        description:
            "Krotkie sluchanki na A2 z zadaniami sprawdzajacymi. Idealne na lekcje i prace domowa.",
        gallery: defaultGallery,
        highlights: ["Sluchanie ze zrozumieniem", "Poziom A2", "Zadania sprawdzajace"],
        includes: ["PDF do druku", "Zadania do sluchania", "Klucz odpowiedzi"],
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
        description:
            "Pakiet gier na lekcje angielskiego. Szybkie, proste zasady i material gotowy do uzycia.",
        gallery: defaultGallery,
        highlights: ["Gry na lekcje", "Poziom B1", "Integracja grupy"],
        includes: ["PDF do druku", "Instrukcje gier", "Karty do wyciecia"],
    },
];

export const freeProductsMock = productsMock.filter((p) => p.isFree);
export const bestsellersMock = productsMock.filter((p) => p.isBestseller);

export const categoryTilesMock = [
    {
        key: "student" as const,
        title: "Dla uczniów",
        subtitle: "Karty pracy, testy, słownictwo",
        href: "/sklep?category=student&sort=popular",
        sticker: "🎓",
    },
    {
        key: "teacher" as const,
        title: "Dla nauczycieli",
        subtitle: "Lekcje, gry, gotowe scenariusze",
        href: "/sklep?category=teacher&sort=popular",
        sticker: "🧑‍🏫",
    },
    {
        key: "self" as const,
        title: "Do nauki solo",
        subtitle: "Powtórki, gramatyka, speaking",
        href: "/sklep?category=self&sort=popular",
        sticker: "🧠",
    },
] as const;
