import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
// import { CursorTrail } from "@/app/components/CursorTrail";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0f172a',
};

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-frutiger.vercel.app"),
  title: "Ethan Collin, apprenti ingénieur IA",
  description: "Portfolio interactif d'Ethan Collin, apprenti ingénieur IA et interfaces intelligentes. Co-auteur d'un projet de recherche soumis à ACM UIST 2026, lauréat Pépite Campus 2024 (Modall). Recherche alternance ingénieur IA, septembre 2026, Lannion ou Dinan.",
  manifest: "/manifest.json",
  keywords: ["Ethan Collin", "alternance IA", "ingénieur IA", "ENSSAT IAM", "UIST 2026", "LLM", "Next.js", "React", "Lannion", "Dinan", "portfolio"],
  authors: [{ name: "Ethan Collin", url: "https://github.com/Ethanol410" }],
  robots: { index: true, follow: true },
  openGraph: {
    title: "Ethan Collin, apprenti ingénieur IA",
    description: "Portfolio interactif en OS simulé (Frutiger Aero). Co-auteur d'une publication soumise à ACM UIST 2026, lauréat Pépite Campus 2024 (Modall). Alternance IA, septembre 2026, Lannion ou Dinan.",
    siteName: "EthanOS Portfolio",
    url: "https://portfolio-frutiger.vercel.app",
    locale: "fr_FR",
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "EthanOS, portfolio interactif d'Ethan Collin",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethan Collin, apprenti ingénieur IA",
    description: "Portfolio interactif en OS simulé. Co-auteur publication UIST 2026, lauréat Pépite Campus 2024 (Modall).",
    images: ["/api/og"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="darkreader-lock" />
        <link rel="me" href="https://github.com/Ethanol410" />
        <link rel="me" href="https://www.linkedin.com/in/ethan-collin-0a4869236/" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased`}
      >
        {children}
        {/* <CursorTrail /> */}
        <Analytics />
      </body>
    </html>
  );
}
