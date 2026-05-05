import type { Metadata } from 'next';
import './print.css';

export const metadata: Metadata = {
  title: 'Ethan Collin — CV',
  description: 'CV imprimable d\'Ethan Collin, apprenti ingénieur IA.',
  robots: 'noindex, nofollow',
};

export default function CvPrintLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
