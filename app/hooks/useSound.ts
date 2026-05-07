import { useCallback } from 'react';
import { useOSStore } from '@/app/store/useOSStore';

const createTone = (frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) => {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    gainNode.gain.setValueAtTime(volume, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  } catch {
    // Ignore audio errors (e.g., user hasn't interacted yet)
  }
};

export const useSound = () => {
  const soundsEnabled = useOSStore((s) => s.soundsEnabled);

  // Short UI click: high-pitch sine blip
  const playClick = useCallback(() => {
    if (!soundsEnabled) return;
    createTone(880, 0.08, 'sine', 0.12);
  }, [soundsEnabled]);

  // Error: low double-beep
  const playError = useCallback(() => {
    if (!soundsEnabled) return;
    createTone(220, 0.15, 'square', 0.15);
    setTimeout(() => createTone(180, 0.2, 'square', 0.15), 180);
  }, [soundsEnabled]);

  // Startup: ascending chord
  const playStartup = useCallback(() => {
    if (!soundsEnabled) return;
    createTone(523, 0.3, 'sine', 0.15);  // C5
    setTimeout(() => createTone(659, 0.3, 'sine', 0.15), 200);  // E5
    setTimeout(() => createTone(784, 0.4, 'sine', 0.15), 400);  // G5
    setTimeout(() => createTone(1047, 0.6, 'sine', 0.12), 600); // C6
  }, [soundsEnabled]);

  return { playClick, playError, playStartup };
};
