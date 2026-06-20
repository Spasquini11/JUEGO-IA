import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
