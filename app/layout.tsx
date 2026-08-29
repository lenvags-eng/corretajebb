import type { Metadata } from "next";

import { AppChrome } from "@/components/site/app-chrome";

import "./globals.css";

export const metadata: Metadata = {
  title: "B & B Corretaje — Prototipo Local",
  description:
    "Corretaje con atención humana, información prudente y publicación controlada en la Región del Biobío.",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/brand/bb-logo.png",
    shortcut: "/brand/bb-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-CL">
      <body className="antialiased">
        <a href="#contenido" className="skip-link">
          Saltar al contenido principal
        </a>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}
