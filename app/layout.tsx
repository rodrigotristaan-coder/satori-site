import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from '@next/third-parties/google';

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SATORI — Marketing Digital e IA",
  description: "Estrategia, contenido e IA para empresarios mexicanos.",
  icons: { icon: "/ENSO_NEGRO.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
      {/* CAMBIA ESTO POR TU ID REAL DE ANALYTICS (Ej: G-AB12345) */}
      <GoogleAnalytics gaId="G-BM9ZGGCDMG" />
    </html>
  );
}