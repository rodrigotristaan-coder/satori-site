import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SATORI — Estrategia Digital para Empresarios",
  description: "Identitti, posicionamiento online y marketing con IA para empresarios mexicanos.",
  icons: {
    icon: [
      { url: "/favicon.ico",   sizes: "any"   },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple:   { url: "/apple-touch-icon.png", sizes: "180x180" },
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon"             href="/favicon.ico" sizes="any" />
        <link rel="icon"             href="/favicon-32.png" type="image/png" sizes="32x32" />
        <link rel="icon"             href="/favicon-16.png" type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="shortcut icon"    href="/favicon.ico" />
        <meta name="theme-color"     content="#A67C00" />
      </head>
      <body>{children}</body>
    </html>
  );
}