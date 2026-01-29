import React, { useEffect, useState } from 'react';

interface BootScreenProps {
  onComplete: () => void;
}

export const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [lines, setLines] = useState<string[]>([]);

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
    bootSequence.forEach((line, index) => {
      delay += Math.random() * 500 + 200; // Délai aléatoire
      setTimeout(() => {
        setLines(prev => [...prev, line]);
        // Fin du boot
        if (index === bootSequence.length - 1) {
          setTimeout(onComplete, 800);
        }
      }, delay);
    });
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-black z-[99999] p-8 font-mono text-white text-sm cursor-none select-none">
      <div className="mb-4 text-blue-400 font-bold">ETHAN-PC BIOS v1.0</div>
      <div className="flex flex-col gap-1">
        {lines.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div className="animate-pulse">_</div>
      </div>
    </div>
  );
};