import React, { useEffect, useState } from 'react';
import { useHaptics } from '@/app/hooks/useHaptics';

interface BootScreenProps {
  onComplete: () => void;
}

// Séquence courte (1.5 s total) pour réduire la friction recruteur tout en gardant l'effet immersif.
const BOOT_LINES = [
  "INITIALIZING BIOS...",
  "LOADING USER PROFILE: ETHAN COLLIN",
  "SYSTEM READY.",
];

export const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const { tap } = useHaptics();

  useEffect(() => {
    let delay = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_LINES.forEach((line, index) => {
      delay += 220 + Math.random() * 180;
      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === BOOT_LINES.length - 1) {
          const t2 = setTimeout(onComplete, 450);
          timers.push(t2);
        }
      }, delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Skip on any key or click on the BIOS area itself.
  useEffect(() => {
    const skip = () => { tap(); onComplete(); };
    document.addEventListener('keydown', skip, { once: true });
    return () => {
      document.removeEventListener('keydown', skip);
    };
  }, [onComplete]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSkip = () => { tap(); onComplete(); };

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 bg-black z-[99999] p-8 font-mono text-white text-sm select-none cursor-pointer"
    >
      <div className="mb-4 text-blue-400 font-bold">ETHAN-PC BIOS v1.0</div>
      <div className="flex flex-col gap-1">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div className="animate-pulse">_</div>
      </div>

      {/* Bouton skip visible et explicite, en haut à droite. */}
      <button
        onClick={(e) => { e.stopPropagation(); handleSkip(); }}
        className="absolute top-6 right-6 px-3 py-1.5 text-[11px] font-medium text-blue-100 rounded-full border border-blue-400/40 bg-blue-950/40 hover:bg-blue-900/60 transition-colors backdrop-blur-sm"
        aria-label="Passer l'intro"
      >
        Passer l&apos;intro &rarr;
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 text-xs">
        Astuce : ajoutez <code className="text-blue-300">?recruiter=1</code> à l&apos;URL pour passer cet écran automatiquement.
      </div>
    </div>
  );
};
