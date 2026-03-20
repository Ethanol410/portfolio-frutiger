import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Ethan Dupont — Portfolio",
  description: "Portfolio interactif d'Ethan Dupont, développeur front-end créatif. Découvrez mes projets et compétences dans un OS simulé inspiré de Windows Vista.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Ethan Dupont — Portfolio OS",
    description: "Portfolio interactif inspiré de Windows Vista / Frutiger Aero. Développeur Front-End React / Next.js.",
    url: "https://your-portfolio.vercel.app",
    siteName: "EthanOS Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EthanOS — Portfolio interactif",
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
