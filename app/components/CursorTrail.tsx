'use client';
import { useEffect } from 'react';

const POOL = 20;
const THROTTLE_MS = 28;
const ORB_SIZE = 14;

export const CursorTrail = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dots: HTMLDivElement[] = [];
    let idx = 0;
    let lastMove = 0;

    for (let i = 0; i < POOL; i++) {
      const d = document.createElement('div');
      d.style.cssText = [
        'position:fixed',
        'pointer-events:none',
        `z-index:2147483647`,
        `width:${ORB_SIZE}px`,
        `height:${ORB_SIZE}px`,
        'border-radius:50%',
        'background:radial-gradient(circle at 38% 30%,rgba(255,255,255,.90) 0%,rgba(72,202,228,.68) 30%,rgba(0,150,200,.38) 58%,transparent 100%)',
        'box-shadow:0 0 6px rgba(72,202,228,.55)',
        'opacity:0',
        'left:0',
        'top:0',
        'transform:translate(-50%,-50%) scale(0)',
        'will-change:opacity,transform',
      ].join(';');
      document.body.appendChild(d);
      dots.push(d);
    }

    function onMove(e: MouseEvent) {
      const now = Date.now();
      if (now - lastMove < THROTTLE_MS) return;
      lastMove = now;

      const d = dots[idx % POOL];
      idx++;

      d.style.transition = 'none';
      d.style.left = e.clientX + 'px';
      d.style.top = e.clientY + 'px';
      d.style.opacity = '0.88';
      d.style.transform = 'translate(-50%,-50%) scale(1)';

      requestAnimationFrame(() => {
        d.style.transition = 'opacity 0.48s ease, transform 0.48s ease';
        setTimeout(() => {
          d.style.opacity = '0';
          d.style.transform = 'translate(-50%,-50%) scale(0.12)';
        }, 55);
      });
    }

    document.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      document.removeEventListener('mousemove', onMove);
      dots.forEach(d => d.remove());
    };
  }, []);

  return null;
};
