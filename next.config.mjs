/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // AVIF (z fallbackiem do WebP) mocno tnie wagę zdjęć — mniej bajtów na LCP.
    formats: ["image/avif", "image/webp"],
    // Domyślna drabinka ma duże przeskoki (256 → 384 → 640), więc przeglądarka
    // pobierała warianty sporo większe od realnie renderowanych szerokości
    // (karty ~259px, zespół ~170px, CTA ~420px, hero ~540px).
    imageSizes: [32, 48, 64, 96, 128, 192, 256, 288, 384, 448, 576],
  },
};

export default nextConfig;
