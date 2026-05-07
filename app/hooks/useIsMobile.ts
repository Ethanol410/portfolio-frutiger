import { useState, useEffect } from 'react';

/**
 * Détecte un "petit écran" (téléphone portrait OU landscape).
 * - portrait : largeur < breakpoint (768 par défaut)
 * - landscape : hauteur < shortBreakpoint (500), typique d'un iPhone à plat,
 *   où les fenêtres aux dimensions desktop ne tiennent plus.
 */
export const useIsMobile = (breakpoint = 768, shortBreakpoint = 500) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      setIsMobile(w < breakpoint || h < shortBreakpoint);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    window.addEventListener('orientationchange', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('orientationchange', checkMobile);
    };
  }, [breakpoint, shortBreakpoint]);

  return isMobile;
};