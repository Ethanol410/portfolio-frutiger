import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0f172a',
};

export const metadata: Metadata = {
  title: "Ethan Collin — Portfolio",
  description: "Portfolio interactif d'Ethan Collin, développeur web FullStack & étudiant BUT MMI à Lannion. Alternance chez Ici Carte Grise, projets IA/LLM. Découvrez mon parcours dans un OS simulé inspiré de Windows Vista.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Ethan Collin — Portfolio OS",
    description: "Portfolio interactif inspiré de Windows Vista / Frutiger Aero. Développeur Web FullStack — PHP, React, Next.js, LLM.",
    siteName: "EthanOS Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EthanOS — Portfolio interactif d'Ethan Collin",
      },
    ],
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
