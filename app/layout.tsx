import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
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
  metadataBase: new URL("https://portfolio-frutiger.vercel.app"),
  title: "Ethan Collin — Développeur Web & IA",
  description: "Portfolio interactif d'Ethan Collin — développeur FullStack en alternance, étudiant BUT MMI à Lannion, spécialisé IA/LLM et interfaces web. Disponible en alternance dès septembre 2026.",
  manifest: "/manifest.json",
  keywords: ["Ethan Collin", "développeur web", "IA", "LLM", "Next.js", "React", "PHP", "BUT MMI", "Lannion", "portfolio", "alternance"],
  authors: [{ name: "Ethan Collin", url: "https://github.com/Ethanol410" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Ethan Collin — Développeur Web & IA | Portfolio OS",
    description: "Portfolio interactif en OS simulé (Frutiger Aero). Développeur FullStack PHP/React/Next.js, projets de recherche IA (UI Drift, Agentix Canvas). Disponible sept. 2026.",
    siteName: "EthanOS Portfolio",
    url: "https://portfolio-frutiger.vercel.app",
    locale: "fr_FR",
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
  twitter: {
    card: "summary_large_image",
    title: "Ethan Collin — Développeur Web & IA",
    description: "Portfolio interactif en OS simulé. FullStack PHP/React/Next.js + projets IA/LLM.",
    images: ["/og-image.png"],
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
        <Analytics />
      </body>
    </html>
  );
}
