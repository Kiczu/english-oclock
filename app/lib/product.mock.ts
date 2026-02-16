import { toShopProduct } from "@/app/helpers/shopProduct";
import type { ShopProduct, WooProduct } from "@/app/types/commerce";

const defaultImages = [
  { src: "/images/file.svg", alt: "Podglad 1" },
  { src: "/images/file.svg", alt: "Podglad 2" },
  { src: "/images/file.svg", alt: "Podglad 3" },
];

const withMetaList = (key: string, values: string[]) => ({
  key,
  value: JSON.stringify(values),
});

export const productsMock: WooProduct[] = [
  {
    id: 101,
    name: "Verb Cheat Sheet",
    slug: "free-verb-cheat-sheet-a2",
    short_description: "Szybka sciaga do czasownikow",
    description:
      "Zbior najwazniejszych czasownikow do szybkiego wgladu. Idealne jako sciaga przed lekcja lub sprawdzianem.",
    price: "0",
    images: defaultImages,
    categories: [{ name: "Samodzielna nauka" }],
    tags: [{ name: "verbs" }, { name: "basics" }],
    attributes: [
      { name: "Poziom", options: ["A2"] },
      { name: "Format", options: ["Cheatsheet"] },
    ],
    meta_data: [
      withMetaList("_highlights", ["Szybka sciaga", "Poziom A2", "Gotowe do druku"]),
      withMetaList("_includes", ["PDF do druku", "Wersja czarno-biala", "Podsumowanie czasownikow"]),
    ],
  },
  {
    id: 102,
    name: "Speaking Prompts",
    slug: "free-speaking-prompts-b1",
    short_description: "Karty do mowienia - szybkie rozgrzewki",
    description:
      "Zestaw kart do rozgrzewki mowienia. Krotkie pytania i sytuacje do pracy na lekcji lub samodzielnie.",
    price: "0",
    images: defaultImages,
    categories: [{ name: "Dla ucznia" }],
    tags: [{ name: "speaking" }],
    attributes: [
      { name: "Poziom", options: ["B1"] },
      { name: "Format", options: ["Worksheet"] },
    ],
    meta_data: [
      withMetaList("_highlights", ["Rozgrzewki speaking", "Poziom B1", "Do pracy w parach"]),
      withMetaList("_includes", ["PDF do druku", "Instrukcja pracy", "Pytania i sytuacje"]),
    ],
  },
  {
    id: 103,
    name: "Mini Test - Present Simple",
    slug: "free-mini-test-present-simple",
    short_description: "Krotki test + odpowiedzi",
    description:
      "Krotki test z Present Simple + odpowiedzi. Dobry do szybkiego sprawdzenia podstaw.",
    price: "0",
    images: defaultImages,
    categories: [{ name: "Dla ucznia" }],
    tags: [{ name: "present-simple" }, { name: "grammar" }],
    attributes: [
      { name: "Poziom", options: ["A2"] },
      { name: "Format", options: ["Test"] },
    ],
    meta_data: [
      withMetaList("_highlights", ["Szybka diagnoza", "Present Simple", "Klucz odpowiedzi"]),
      withMetaList("_includes", ["Test", "Odpowiedzi", "Instrukcja dla ucznia"]),
    ],
  },
  {
    id: 104,
    name: "Phrasal Verbs Pack",
    slug: "phrasal-verbs-pack",
    short_description: "Zadania + przyklady w kontekscie",
    description:
      "Phrasal verbs w praktycznych kontekstach. Zestaw do nauki i szybkiego powtorkowego przegladu.",
    price: "29",
    images: defaultImages,
    categories: [{ name: "Samodzielna nauka" }],
    tags: [{ name: "phrasal-verbs" }, { name: "vocabulary" }],
    attributes: [
      { name: "Poziom", options: ["B1"] },
      { name: "Format", options: ["Worksheet"] },
    ],
    meta_data: [
      withMetaList("_highlights", ["Kontekstowe przyklady", "Poziom B1", "Slownictwo w uzyciu"]),
      withMetaList("_includes", ["PDF do druku", "Przyklady w kontekscie", "Cwiczenia utrwalajace"]),
    ],
  },
  {
    id: 105,
    name: "Worksheet Bundle (A2-B1)",
    slug: "worksheet-bundle-a2-b1",
    short_description: "Zestaw kart pracy do regularnej nauki",
    description:
      "Zestaw kart pracy na A2-B1. Regularne powtorki bez ukladania nowych zadan.",
    price: "39",
    images: defaultImages,
    categories: [{ name: "Dla ucznia" }],
    tags: [{ name: "mixed" }, { name: "revision" }],
    attributes: [
      { name: "Poziom", options: ["B1"] },
      { name: "Format", options: ["Bundle"] },
    ],
    meta_data: [
      withMetaList("_highlights", ["Pakiet do regularnej nauki", "Poziom A2-B1", "Rozne typy zadan"]),
      withMetaList("_includes", ["PDF do druku", "Roznorodne zadania", "Instrukcje"]),
    ],
  },
  {
    id: 106,
    name: "Teacher Lesson Starter Kit",
    slug: "teacher-lesson-starter-kit",
    short_description: "Gotowy start lekcji + materialy",
    description:
      "Szybki start lekcji: krotkie aktywatory, mini zadania i pomysly na pierwsze 15 minut.",
    price: "49",
    images: defaultImages,
    categories: [{ name: "Dla nauczyciela" }],
    tags: [{ name: "lesson" }, { name: "classroom" }, { name: "bestseller" }],
    attributes: [
      { name: "Poziom", options: ["B1"] },
      { name: "Format", options: ["Bundle"] },
    ],
    meta_data: [
      { key: "_custom_badge", value: "bestseller" },
      withMetaList("_highlights", ["Oszczedz czas", "Poziom B1", "Gotowe do lekcji"]),
      withMetaList("_includes", ["PDF do druku", "Pomysly na warm-up", "Krotkie zadania"]),
    ],
  },
  {
    id: 107,
    name: "Exam Words - B2 Topics",
    slug: "exam-words-b2-topics",
    short_description: "Slownictwo pod tematy egzaminacyjne",
    description:
      "Slownictwo egzaminacyjne pod B2. Tematyczne listy, cwiczenia i szybkie powtorki.",
    price: "35",
    images: defaultImages,
    categories: [{ name: "Egzamin" }],
    tags: [{ name: "exam" }, { name: "vocabulary" }, { name: "bestseller" }],
    attributes: [
      { name: "Poziom", options: ["B2"] },
      { name: "Format", options: ["Worksheet"] },
    ],
    meta_data: [
      { key: "_custom_badge", value: "bestseller" },
      withMetaList("_highlights", ["Pod egzamin", "Poziom B2", "Tematyczne zbiory"]),
      withMetaList("_includes", ["PDF do druku", "Listy tematyczne", "Cwiczenia utrwalajace"]),
    ],
  },
  {
    id: 108,
    name: "Listening Pack (A2)",
    slug: "listening-pack-a2",
    short_description: "Sluchanki + zadania sprawdzajace",
    description:
      "Krotkie sluchanki na A2 z zadaniami sprawdzajacymi. Idealne na lekcje i prace domowa.",
    price: "25",
    images: defaultImages,
    categories: [{ name: "Dla ucznia" }],
    tags: [{ name: "listening" }, { name: "bestseller" }],
    attributes: [
      { name: "Poziom", options: ["A2"] },
      { name: "Format", options: ["Worksheet"] },
    ],
    meta_data: [
      { key: "_custom_badge", value: "bestseller" },
      withMetaList("_highlights", ["Sluchanie ze zrozumieniem", "Poziom A2", "Zadania sprawdzajace"]),
      withMetaList("_includes", ["PDF do druku", "Zadania do sluchania", "Klucz odpowiedzi"]),
    ],
  },
  {
    id: 109,
    name: "Classroom Games - Teacher Pack",
    slug: "classroom-games-teacher-pack",
    short_description: "Gry jezykowe na lekcje",
    description:
      "Pakiet gier na lekcje angielskiego. Szybkie, proste zasady i material gotowy do uzycia.",
    price: "45",
    images: defaultImages,
    categories: [{ name: "Dla nauczyciela" }],
    tags: [{ name: "games" }, { name: "classroom" }],
    attributes: [
      { name: "Poziom", options: ["B1"] },
      { name: "Format", options: ["Game"] },
    ],
    meta_data: [
      withMetaList("_highlights", ["Gry na lekcje", "Poziom B1", "Integracja grupy"]),
      withMetaList("_includes", ["PDF do druku", "Instrukcje gier", "Karty do wyciecia"]),
    ],
  },
];

export const shopProductsMock: ShopProduct[] = productsMock.map(toShopProduct);
export const freeProductsMock = shopProductsMock.filter((product) => product.isFree);
export const bestsellersMock = shopProductsMock.filter((product) => product.isBestseller);
