import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export default function manifest() {
  return {
    name: SITE_TITLE,
    short_name: "never ending story",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#FBF8F2",
    theme_color: "#E0762A",
    lang: "pl",
    icons: [
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
