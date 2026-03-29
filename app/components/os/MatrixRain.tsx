'use client';

import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  onExit: () => void;
}

export const MatrixRain = ({ onExit }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF'.split('');
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const id = setInterval(draw, 33);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fixed inset-0 z-[9999999]" onClick={onExit}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-8 left-0 right-0 text-center text-green-400 font-mono text-sm animate-pulse">
        Cliquez pour sortir de la Matrix
      </div>
    </div>
  );
};
