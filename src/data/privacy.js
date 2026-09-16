import { CONTACT } from "./site";

/**
 * @typedef {Object} PrivacySection
 * @property {string} title
 * @property {string[]} [paragraphs]
 * @property {string[]} [bullets]
 */

/** @type {PrivacySection[]} */
export const PRIVACY_SECTIONS = [
  {
    title: "Administrator danych",
    paragraphs: [
      "Administratorem Twoich danych osobowych jest Agencja Never Ending Story Sp. z o.o. z siedzibą w ul. Filarecka 17A lok. 16B, 30-110 Kraków, NIP 6772531887, REGON 542974805 — dalej „Agencja\" albo „my\".",
      `W sprawach dotyczących danych osobowych napisz na ${CONTACT.email} albo zadzwoń pod ${CONTACT.phoneLabel}.`,
      "Nie powołaliśmy inspektora ochrony danych, więc w sprawach związanych z przetwarzaniem danych kontaktuj się bezpośrednio z nami.",
    ],
  },
  {
    title: "Jakie dane zbieramy",
    paragraphs: [
      "Zbieramy tylko to, co sam(a) nam przekażesz, oraz podstawowe dane techniczne potrzebne do działania strony.",
      "Nie zbieramy danych szczególnych kategorii, takich jak informacje o zdrowiu, wyznaniu czy poglądach. Prosimy, żeby nie umieszczać ich w treści wiadomości.",
    ],
    bullets: [
      "z formularza kontaktowego: imię, nazwisko, numer telefonu i treść wiadomości,",
      "z korespondencji e-mail i rozmów telefonicznych: dane, które nam w nich podasz,",
      "automatycznie: adres IP, data i godzina zapytania oraz typ przeglądarki — w technicznych logach naszego dostawcy hostingu.",
    ],
  },
  {
    title: "Po co i na jakiej podstawie",
    bullets: [
      "żeby odpowiedzieć na Twoje zapytanie i przygotować ofertę — art. 6 ust. 1 lit. b RODO, czyli działania podejmowane na Twoje żądanie przed zawarciem umowy,",
      "żeby kontaktować się w trakcie współpracy oraz ustalać, dochodzić i bronić się przed roszczeniami — art. 6 ust. 1 lit. f RODO, czyli nasz prawnie uzasadniony interes,",
      "żeby strona działała poprawnie i bezpiecznie — art. 6 ust. 1 lit. f RODO.",
    ],
  },
  {
    title: "Jak długo przechowujemy dane",
    bullets: [
      "dane z formularza i korespondencję — przez czas potrzebny na obsługę zapytania, a następnie przez okres przedawnienia ewentualnych roszczeń,",
      "jeśli dojdzie do współpracy — przez czas jej trwania oraz okres wymagany przepisami podatkowymi i o rachunkowości,",
      "logi serwera — zgodnie z okresem retencji stosowanym przez dostawcę hostingu.",
    ],
  },
  {
    title: "Komu przekazujemy dane",
    paragraphs: [
      "Twoje dane mogą trafić do podmiotów, które świadczą nam usługi — wyłącznie w zakresie niezbędnym do ich wykonania i na podstawie umów powierzenia przetwarzania.",
      "Nie sprzedajemy Twoich danych i nie udostępniamy ich do celów marketingowych podmiotów trzecich.",
    ],
    bullets: [
      "Vercel Inc. — hosting i dostarczanie strony,",
      "Google Ireland Limited — poczta elektroniczna,",
      "Google Ireland Limited — po uruchomieniu wysyłki formularza kontaktowego,",
      "doradcy prawni i księgowi oraz organy publiczne, jeżeli wymagają tego przepisy.",
    ],
  },
  {
    title: "Przekazywanie poza Europejski Obszar Gospodarczy",
    paragraphs: [
      "Część naszych dostawców ma siedzibę poza Europejskim Obszarem Gospodarczym. W takim przypadku dane przekazujemy na podstawie decyzji Komisji Europejskiej stwierdzającej odpowiedni stopień ochrony albo na podstawie standardowych klauzul umownych zatwierdzonych przez Komisję.",
    ],
  },
  {
    title: "Twoje prawa",
    paragraphs: [
      "W każdej chwili masz prawo do:",
      `Z każdego z tych praw skorzystasz, pisząc na ${CONTACT.email}.`,
      "Masz również prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych, ul. Stawki 2, 00-193 Warszawa.",
    ],
    bullets: [
      "dostępu do swoich danych i otrzymania ich kopii — art. 15 RODO,",
      "sprostowania danych — art. 16 RODO,",
      "usunięcia danych — art. 17 RODO,",
      "ograniczenia przetwarzania — art. 18 RODO,",
      "przenoszenia danych — art. 20 RODO,",
      "sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie — art. 21 RODO.",
    ],
  },
  {
    title: "Czy podanie danych jest obowiązkowe",
    paragraphs: [
      "Podanie danych jest dobrowolne, ale bez imienia, numeru telefonu i treści wiadomości nie będziemy w stanie odpowiedzieć na zapytanie.",
    ],
  },
  {
    title: "Pliki cookies",
    paragraphs: [
      "Strona nie korzysta z ciasteczek analitycznych, marketingowych ani śledzących i nie profilujemy odwiedzających. Jeśli to się zmieni, zaktualizujemy tę politykę i — tam, gdzie wymaga tego prawo — poprosimy Cię wcześniej o zgodę.",
    ],
  },
  {
    title: "Zautomatyzowane decyzje",
    paragraphs: [
      "Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, w tym profilowaniu.",
    ],
  },
  {
    title: "Zmiany polityki",
    paragraphs: [
      "Politykę możemy aktualizować — na przykład gdy zmienią się nasze narzędzia albo przepisy. Aktualna wersja jest zawsze dostępna na tej stronie.",
    ],
  },
];

/** Widoczna w stopce modala. */
export const PRIVACY_UPDATED_AT = "16.09.2026";
