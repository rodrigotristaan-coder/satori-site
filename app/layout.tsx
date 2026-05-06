import type { Metadata } from "next";
import "./globals.css";
 
export const metadata: Metadata = {
  title: "SATORI — Marketing Digital e IA",
  description: "Estrategia, contenido e IA para empresarios locales.",
};
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/png" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  );
}
 