import type { Metadata } from "next";
import { Archivo, Lora } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  axes: ["wdth"],
  variable: "--font-archivo",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  style: ["italic"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "never ending story — agencja social media · Kraków",
  description:
    "Zmieniamy relacje w Relacje. Kompleksowa obsługa social mediów dla gastronomii, hoteli i beauty. Kraków.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pl" className={`${archivo.variable} ${lora.variable}`}>
      <body className="bg-paper font-sans leading-[1.55] text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
