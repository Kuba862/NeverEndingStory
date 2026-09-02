export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const SITE_TITLE = "never ending story — agencja social media · Kraków";

export const SITE_DESCRIPTION =
  "Zmieniamy relacje w Relacje. Kompleksowa obsługa social mediów dla gastronomii, hoteli i beauty. Kraków.";

export const OG_IMAGE_ALT =
  "Zespół agencji never ending story i wyróżnik marki";

export const SOCIAL_PROFILES = [];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
