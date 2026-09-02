import { CONTACT, SERVICES } from "@/data/site";
import {
  absoluteUrl,
  SITE_DESCRIPTION,
  SITE_URL,
  SOCIAL_PROFILES,
} from "@/lib/site";

export const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "never ending story",
  url: SITE_URL,
  image: absoluteUrl("/opengraph-image"),
  email: CONTACT.email,
  telephone: CONTACT.phoneLabel,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kraków",
    addressCountry: "PL",
  },
  areaServed: [
    {
      "@type": "City",
      name: "Kraków",
    },
    {
      "@type": "Country",
      name: "Polska",
    },
  ],
  description: SITE_DESCRIPTION,
  sameAs: SOCIAL_PROFILES,
  makesOffer: SERVICES.map((service) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: service.title,
      description: service.body,
    },
  })),
};

export function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
