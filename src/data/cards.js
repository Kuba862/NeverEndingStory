/**
 * @typedef {'gastro'|'hotel'|'beauty'|'brand'} CaseCategory
 * @typedef {'salute'|'franca'|'szara'|'campanile'|'dermestic'|'yasumi'|'namnam'} CaseId
 * @typedef {Object} PortfolioCard
 * @property {CaseId} id
 * @property {string} img
 * @property {string} name
 * @property {CaseCategory} cat
 * @property {string} catLabel
 */

/** @type {PortfolioCard[]} */
export const CARDS = [
  {
    id: "salute",
    img: "/images/cases/salute-hero.jpg",
    name: "Salute Wine Bar",
    cat: "gastro",
    catLabel: "Gastronomia",
  },
  {
    id: "franca",
    img: "/images/cases/franca-hero.jpg",
    name: "Franca",
    cat: "gastro",
    catLabel: "Gastronomia",
  },
  {
    id: "szara",
    img: "/images/cases/szara-hero.jpg",
    name: "Szara Gęś Le Prive",
    cat: "gastro",
    catLabel: "Gastronomia",
  },
  {
    id: "campanile",
    img: "/images/cases/campanile-hero.jpg",
    name: "Campanile Hotel",
    cat: "hotel",
    catLabel: "Hotele i noclegi",
  },
  {
    id: "dermestic",
    img: "/images/cases/dermestic-hero.jpg",
    name: "Dermestic",
    cat: "beauty",
    catLabel: "Beauty & wellness",
  },
  {
    id: "yasumi",
    img: "/images/cases/yasumi-hero.jpg",
    name: "Yasumi Kraków",
    cat: "beauty",
    catLabel: "Beauty & wellness",
  },
  {
    id: "namnam",
    img: "/images/cases/namnam-hero.jpg",
    name: "ñam ñam vino",
    cat: "brand",
    catLabel: "Branding",
  },
  {
    id: "salute",
    img: "/images/cases/salute-b1.jpg",
    name: "Salute! — identyfikacja",
    cat: "brand",
    catLabel: "Branding",
  },
];
