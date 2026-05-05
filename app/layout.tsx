import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';
import "./globals.css";
 
const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
 
export const metadata: Metadata = {
  title: "SATORI — Marketing Digital e IA",
  description: "Estrategia, contenido e IA para empresarios mexicanos.",
  // ESTA ES LA PARTE CLAVE PARA EL FAVICON:
  icons: {
    icon: "/favicon.png", // Next.js busca automáticamente en la carpeta 'public'
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      {/* Ya no necesitas el <head> manual, Next.js usa el metadata de arriba */}
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <GoogleAnalytics gaId="G-BM9ZGGCDMG" />
      </body>
    </html>
  );
}