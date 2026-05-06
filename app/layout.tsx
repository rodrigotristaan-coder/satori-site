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
        <link rel="icon" href="/icon.png" type="image/png" />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/icon.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}
 