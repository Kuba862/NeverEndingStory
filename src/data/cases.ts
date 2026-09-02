export type CaseCategory = "gastro" | "hotel" | "beauty" | "brand";

export type Case = {
  id: string;
  name: string;
  cat: CaseCategory;
  catLabel: string;
  hero: string;
  tags: string[];
  challenge: string;
  solution: string;
  kpis: { num: string; lbl: string }[];
  gallery?: { src: string; sq?: boolean }[];
  reels?: string[];
  brand?: string[];
  quote?: string;
  quoteSrc?: string;
};

export const CASE_ORDER = [
  "salute",
  "franca",
  "szara",
  "campanile",
  "dermestic",
  "yasumi",
  "namnam",
] as const;

export type CaseId = (typeof CASE_ORDER)[number];

export const CASES: Record<CaseId, Case> = {
  salute: {
    id: "salute",
    name: "Salute Wine Bar",
    cat: "gastro",
    catLabel: "Gastronomia · Kraków",
    hero: "/images/cases/salute-hero.jpg",
    tags: [
      "Instagram + Facebook",
      "Sesje foto i wideo",
      "Kampanie",
      "Identyfikacja wizualna",
      "Profil Google",
    ],
    challenge:
      "Nowy wine bar w mieście pełnym winiarni. Zero rozpoznawalności, zero społeczności — a właścicielom zależało, żeby lokal od pierwszych tygodni żył nie tylko w weekendy.",
    solution:
      "Zbudowaliśmy markę od zera: identyfikacja wizualna, plakaty i koszulki, a w social mediach regularne sesje z lokalu i reelsy pokazujące ludzi, nie tylko kieliszki. Cykliczne czwartkowe wieczory dostały własną oprawę i stały się stałym punktem tygodnia.",
    kpis: [
      {
        num: "+1500",
        lbl: "obserwujących w 3 miesiące — w pełni organicznie",
      },
      {
        num: "1 wieczór / tydz.",
        lbl: "wypromowane wydarzenie cykliczne: czwartki w wine barze",
      },
      {
        num: "360°",
        lbl: "od strategii i feedu po logo, plakaty i koszulki",
      },
    ],
    gallery: [
      { src: "/images/cases/salute-g1.jpg", sq: true },
      { src: "/images/cases/salute-g2.jpg" },
      { src: "/images/cases/salute-g3.jpg" },
    ],
    reels: [
      "/images/cases/salute-r1.jpg",
      "/images/cases/salute-r2.jpg",
      "/images/cases/salute-r3.jpg",
    ],
    brand: ["/images/cases/salute-b1.jpg", "/images/cases/salute-b2.jpg"],
    quote:
      "„Czułem się, jakbyśmy byli prawdziwym partnerstwem, a nie tylko klientem. Efekty ich działań były widoczne niemal natychmiast.”",
    quoteSrc: "opinia Google o naszej pracy",
  },
  franca: {
    id: "franca",
    name: "Franca",
    cat: "gastro",
    catLabel: "Gastronomia · Kraków",
    hero: "/images/cases/franca-hero.jpg",
    tags: ["Instagram + Facebook", "Sesje foto i wideo", "Profil Google"],
    challenge:
      "Otwarcie nowej restauracji — trzeba było zbudować oczekiwanie jeszcze przed pierwszym otwarciem drzwi i pokazać kuchnię, zanim goście mogli jej spróbować.",
    solution:
      "Towarzyszyliśmy ekipie od przygotowań po otwarcie: kulisy z kuchni, zespół przy pracy, odliczanie do startu. Feed prowadzony jak reportaż — codzienność lokalu zamiast wyreżyserowanych kadrów.",
    kpis: [
      {
        num: "od kulis",
        lbl: "komunikacja budowana jeszcze przed otwarciem lokalu",
      },
      {
        num: "foto + wideo",
        lbl: "wszystkie materiały z sesji w restauracji",
      },
      { num: "3 kanały", lbl: "Instagram, Facebook i wizytówka Google" },
    ],
    gallery: [{ src: "/images/cases/franca-g1.jpg" }],
    reels: ["/images/cases/franca-r1.jpg", "/images/cases/franca-r2.jpg"],
    quote:
      "„Bardzo dobra współpraca. Cały zespół pracuje bez zarzutu — na wszelkie pytania dostawałam szybką odpowiedź.”",
    quoteSrc: "opinia Google o naszej pracy",
  },
  szara: {
    id: "szara",
    name: "Szara Gęś Le Prive",
    cat: "gastro",
    catLabel: "Gastronomia · Kraków",
    hero: "/images/cases/szara-hero.jpg",
    tags: ["Instagram + Facebook", "Sesje foto i wideo", "Kampanie reklamowe"],
    challenge:
      "Ekskluzywny klub przy legendarnej restauracji potrzebował komunikacji, która odda klimat miejsca: kameralnie, wieczorowo, „keep it privé”.",
    solution:
      "Sesje w duchu editorial — czerwień, aksamit, koktajle i goście bawiący się naprawdę. Spójny feed, który wygląda jak zaproszenie na wieczór, a nie folder reklamowy.",
    kpis: [
      { num: "editorial", lbl: "sesje wizerunkowe w klimacie miejsca" },
      { num: "feed + reels", lbl: "pełna produkcja treści do obu formatów" },
      { num: "ads", lbl: "kampanie wspierające wydarzenia klubowe" },
    ],
  },
  campanile: {
    id: "campanile",
    name: "Campanile Hotel",
    cat: "hotel",
    catLabel: "Hotele i noclegi · Kraków",
    hero: "/images/cases/campanile-hero.jpg",
    tags: ["Sesje foto i wideo", "Content do social mediów"],
    challenge:
      "Sieciowy hotel potrzebował materiałów, które pokażą wnętrza i obsługę tak, jak widzi je gość — naturalnie, z ludźmi w kadrze.",
    solution:
      "Sesje lifestyle w przestrzeniach hotelu: lobby, pokoje, śniadania, praca zespołu. Gotowa biblioteka zdjęć i wideo do feedu oraz kampanii.",
    kpis: [
      {
        num: "lifestyle",
        lbl: "goście i zespół w kadrze zamiast pustych wnętrz",
      },
      { num: "foto + wideo", lbl: "materiały do feedu, relacji i reklam" },
      {
        num: "1 sesja",
        lbl: "biblioteka treści na wiele tygodni komunikacji",
      },
    ],
  },
  dermestic: {
    id: "dermestic",
    name: "Dermestic",
    cat: "beauty",
    catLabel: "Beauty & wellness",
    hero: "/images/cases/dermestic-hero.jpg",
    tags: ["Instagram + Facebook", "Sesje foto i wideo", "Relacje"],
    challenge:
      "Medycyna estetyczna to branża, w której zaufanie buduje się twarzą i kompetencją — nie stockowymi grafikami.",
    solution:
      "Pokazujemy gabinet od środka: zabiegi, ekspertki, edukacyjne relacje i estetyczny, spójny feed, który wygląda profesjonalnie i nadal ludzko.",
    kpis: [
      {
        num: "edukacja",
        lbl: "treści eksperckie budujące zaufanie do gabinetu",
      },
      { num: "feed + story", lbl: "spójna oprawa wszystkich formatów" },
      { num: "na miejscu", lbl: "wszystkie materiały z sesji w klinice" },
    ],
  },
  yasumi: {
    id: "yasumi",
    name: "Yasumi Kraków Prądnik",
    cat: "beauty",
    catLabel: "Beauty & wellness",
    hero: "/images/cases/yasumi-hero.jpg",
    tags: ["Projekty do social mediów", "Projekty do druku", "Karta lojalnościowa"],
    challenge:
      "Nowy salon znanej marki — otwarcie wymagało spójnych materiałów do sieci i do druku, zgodnych z systemem identyfikacji Yasumi.",
    solution:
      "Zaprojektowaliśmy komplet: posty zapowiadające otwarcie, grafiki ofertowe i kartę lojalnościową — jeden styl od feedu po ladę recepcji.",
    kpis: [
      { num: "social + druk", lbl: "jeden spójny system materiałów" },
      { num: "otwarcie", lbl: "kampania zapowiadająca nowy salon" },
      {
        num: "lojalność",
        lbl: "karta stałego klienta zaprojektowana od zera",
      },
    ],
  },
  namnam: {
    id: "namnam",
    name: "ñam ñam vino",
    cat: "brand",
    catLabel: "Branding · identyfikacja wizualna",
    hero: "/images/cases/namnam-hero.jpg",
    tags: ["Logo", "Paleta i typografia", "Key visual", "Merch"],
    challenge:
      "Marka winiarska potrzebowała identyfikacji z charakterem — rozpoznawalnej od kieliszka po torbę na zakupy.",
    solution:
      "Znak z lejącym się winem, głęboka bordowa paleta i system, który działa na koszulkach, torbach i szyldzie tak samo dobrze jak w feedzie.",
    kpis: [
      { num: "logo + system", lbl: "pełna identyfikacja wizualna marki" },
      {
        num: "merch",
        lbl: "projekty koszulek i toreb gotowe do produkcji",
      },
      { num: "key visual", lbl: "styl rozpoznawalny w każdym medium" },
    ],
    gallery: [{ src: "/images/cases/namnam-g1.jpg" }],
  },
};
