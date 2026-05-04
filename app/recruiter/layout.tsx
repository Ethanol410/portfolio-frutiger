'use client';
import { useEffect } from 'react';

/**
 * Layout dédié à la vue plate /recruiter.
 *
 * `globals.css` impose `html, body { overflow: hidden; touch-action: none }`
 * pour la simulation OS de la home, ce qui empêche le scroll naturel ailleurs.
 * On applique ici la classe `.scroll-page` qui contient un override avec
 * `!important` (cf. globals.css). Au unmount, on retire la classe pour
 * restaurer le comportement OS.
 */
export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    html.classList.add('scroll-page');
    body.classList.add('scroll-page');

    return () => {
      html.classList.remove('scroll-page');
      body.classList.remove('scroll-page');
    };
  }, []);

  return <>{children}</>;
}
