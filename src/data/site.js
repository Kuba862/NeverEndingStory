export const NAV_LINKS = [
  { href: "#realizacje", label: "Realizacje" },
  { href: "#proces", label: "Jak pracujemy" },
  { href: "#uslugi", label: "Usługi" },
  { href: "#zespol", label: "Zespół" },
];

export const HERO_TRUST = [
  { value: "30+", label: "marek pod opieką" },
  { value: "5,0 ★", label: "opinie Google" },
  { value: "100%", label: "materiałów u Was na miejscu" },
];

export const CLIENTS = [
  "Franca",
  "Salute Wine Bar",
  "Szara Gęś Le Prive",
  "Boccanera",
  "Hamsa",
  "Sababa",
  "Noto",
  "Sorrento",
  "Urban",
  "Pergamin Nullo",
  "Wine Garage",
  "Piano Sushi",
  "Campanile",
  "Mucho Gusto",
  "Dermestic",
  "Yasumi",
  "Calma",
  "Przestrzeń Pilates",
  "Las Dla Nas",
  "Spiżarnia Gąski",
];

export const PROCESS_STEPS = [
  {
    title: "Przyjeżdżamy do Was",
    body: "Zdjęcia i wideo powstają w Waszej siedzibie. Uczestniczymy w codzienności marki — i to ją pokazujemy w social mediach, zamiast stockowych obrazków.",
  },
  {
    title: "Planujemy z wyprzedzeniem",
    body: "Harmonogram i treści realizują wcześniej ustalone cele — rezerwacje, zasięg, rozpoznawalność — a nie doraźne pomysły z dnia na dzień.",
  },
  {
    title: "Prowadzimy wszystko",
    body: "Od strategii, przez publikacje i kampanie, po odpowiedzi w wiadomościach. Nie potrzebujecie dodatkowych specjalistów.",
  },
];

/**
 * @typedef {Object} HomeKpi
 * @property {number} count
 * @property {string} label
 * @property {string} source
 * @property {string} [prefix]
 * @property {string} [suffix]
 * @property {string} [decimal]
 * @property {string} [staticValue]
 */

/** @type {HomeKpi[]} */
export const KPIS = [
  {
    count: 1500,
    prefix: "+",
    label: "obserwujących w 3 miesiące, organicznie",
    source: "Salute Wine Bar",
  },
  {
    count: 218432,
    label: "odbiorców jednej kampanii reklamowej",
    source: "Las Dla Nas",
  },
  {
    count: 34,
    decimal: "0,",
    suffix: " zł",
    label: "koszt polubienia strony w kampanii",
    source: "Las Dla Nas",
  },
  {
    count: 50,
    decimal: "5,",
    staticValue: "5,0",
    label: "średnia ocen naszej pracy",
    source: "opinie Google",
  },
];

export const SERVICES = [
  {
    title: "Obsługa social mediów",
    body: "Facebook, Instagram i TikTok — strategia, publikacje, relacje, moderacja i kontakt z obserwującymi.",
  },
  {
    title: "Sesje foto i wideo",
    body: "Regularne sesje zdjęciowe i nagrania reelsów w Waszej lokalizacji, z własnym sprzętem i ekipą.",
  },
  {
    title: "Kampanie reklamowe",
    body: "Płatne kampanie nastawione na zasięg, rezerwacje i konwersję — z raportowaniem wyników.",
  },
  {
    title: "Identyfikacja wizualna",
    body: "Logo, paleta, typografia i key visual — spójny system, który działa od druku po social media.",
  },
  {
    title: "Projekty do druku",
    body: "Menu, plakaty, ulotki, karty lojalnościowe — grafiki gotowe do produkcji.",
  },
  {
    title: "Profil firmy w Google",
    body: "Prowadzenie wizytówki Google: aktualności, zdjęcia, odpowiedzi na opinie.",
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "„Wszelkie sugestie i moje wizje zostały idealnie odwzorowane, a moje social media otrzymały spójny wygląd i obserwujących.\"",
    cite: "opinia Google",
  },
  {
    quote:
      "„Ich wyczucie social mediów jest fenomenalne — potrafią dopasować treści do grupy docelowej, co przekłada się na skuteczność działań.\"",
    cite: "opinia Google",
  },
  {
    quote:
      "„Czułem się, jakbyśmy byli prawdziwym partnerstwem, a nie tylko klientem. Efekty ich działań były widoczne niemal natychmiast.\"",
    cite: "opinia Google",
  },
];

export const TEAM = [
  {
    name: "Ania",
    role: "Założycielka · Graphic Designer",
    image: "/images/team/ania.jpg",
    alt: "Ania",
  },
  {
    name: "Victoria",
    role: "Założycielka · Social Media Specialist",
    image: "/images/team/victoria.jpg",
    alt: "Victoria",
  },
  {
    name: "Maciek",
    role: "Copywriter · Video Editor",
    image: "/images/team/maciek.jpg",
    alt: "Maciek",
  },
  {
    name: "Patryk",
    role: "Fotograf · Videomaker",
    image: "/images/team/patryk.jpg",
    alt: "Patryk",
  },
  {
    name: "Anita",
    role: "Graphic Designer",
    image: "/images/team/anita.jpg",
    alt: "Anita",
  },
  {
    name: "Ola",
    role: "Fotografka · Videomakerka",
    image: "/images/team/ola.jpg",
    alt: "Ola",
  },
];

export const CONTACT = {
  email: "agencjaneverendingstory@gmail.com",
  phoneLabel: "+48 606 227 462",
  phoneHref: "+48606227462",
};
