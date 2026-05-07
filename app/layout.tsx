import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SATORI — Marketing Digital e IA",
  description: "Estrategia, contenido e IA para empresarios locales.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
    other: [{ rel: "apple-touch-icon", url: "/favicon.ico" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="theme-color" content="#020B18" />
      </head>
      <body>{children}</body>
    </html>
  );
}