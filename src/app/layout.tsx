import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Tipografía moderna de la interfaz. next/font la descarga en la compilación y la
// sirve desde nuestro propio servidor (rápida y sin pedirle nada a Google en vivo).
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Entre Nosotros",
  description:
    "Un espacio para tener conversaciones importantes, con calma y con ayuda privada para expresarte mejor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
