import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
 
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
 
export const metadata: Metadata = {
  title: "SATORI — Marketing Digital e IA",
  description: "Estrategia, contenido e IA para empresarios mexicanos.",
  // Forzamos la ruta del favicon
  icons: {
    icon: "/ENSO_NEGRO.png",
    shortcut: "/ENSO_NEGRO.png",
    apple: "/ENSO_NEGRO.png",
  },
};
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <GoogleAnalytics gaId="G-BM9ZGGCDMG" />
      </body>
    </html>
  );
}