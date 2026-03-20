import React, { useEffect, useState } from 'react';
import { useHaptics } from '@/app/hooks/useHaptics';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const { tap } = useHaptics();

  useEffect(() => {
    const bootSequence = [
      "INITIALIZING BIOS...",
      "CHECKING MEMORY... 16GB OK",
      "LOADING KERNEL...",
      "MOUNTING VIRTUAL FILE SYSTEM...",
      "STARTING REACT ENGINE...",
      "LOADING USER PROFILE: ETHAN...",
      "SYSTEM READY."
    ];

    let delay = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    bootSequence.forEach((line, index) => {
      delay += Math.random() * 500 + 200;
      const t = setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === bootSequence.length - 1) {
          const t2 = setTimeout(onComplete, 800);
          timers.push(t2);
        }
      }, delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  // Skip on any key or click
  useEffect(() => {
    const skip = () => { tap(); onComplete(); };
    document.addEventListener('keydown', skip, { once: true });
    document.addEventListener('click', skip, { once: true });
    return () => {
      document.removeEventListener('keydown', skip);
      document.removeEventListener('click', skip);
    };
  }, [onComplete]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="fixed inset-0 bg-black z-[99999] p-8 font-mono text-white text-sm cursor-none select-none">
      <div className="mb-4 text-blue-400 font-bold">ETHAN-PC BIOS v1.0</div>
      <div className="flex flex-col gap-1">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-500 text-xs animate-pulse">
        Appuyez sur une touche ou cliquez pour passer...
      </div>
    </div>
  );
};
