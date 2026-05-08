import { useMemo } from 'react';
import { useOSStore } from '@/app/store/useOSStore';

// ─── Shared AudioContext singleton to avoid creating a new context per tone ───
let sharedCtx: AudioContext | null = null;

const getCtx = (): AudioContext | null => {
  try {
    if (!sharedCtx || sharedCtx.state === 'closed') {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      sharedCtx = new Ctor();
    }
    if (sharedCtx.state === 'suspended') {
      void sharedCtx.resume();
    }
    return sharedCtx;
  } catch {
    return null;
  }
};

const createTone = (
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.15,
  startAt = 0,
) => {
  try {
    const ctx = getCtx();
    if (!ctx) return;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    oscillator.type = type;
    const t = ctx.currentTime + startAt;
    oscillator.frequency.setValueAtTime(frequency, t);
    gainNode.gain.setValueAtTime(volume, t);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, t + duration);
    oscillator.start(t);
    oscillator.stop(t + duration);
  } catch {
    // AudioContext can fail, silently ignore
  }
};

// Reads the current mute state from the store at call-time. This avoids stale
// closures: callers that memoize handlers (useCallback) without listing the
// play-* function in their deps still see the latest mute state.
const isMuted = () => !useOSStore.getState().soundsEnabled;

export const useSound = () =>
  useMemo(
    () => ({
      // Short UI click: high-pitch sine blip
      playClick: () => {
        if (isMuted()) return;
        createTone(880, 0.08, 'sine', 0.12);
      },
      // Hover tick: ultra-short, very quiet
      playHover: () => {
        if (isMuted()) return;
        createTone(1200, 0.04, 'sine', 0.06);
      },
      // Error: low double-beep
      playError: () => {
        if (isMuted()) return;
        createTone(220, 0.15, 'square', 0.15);
        createTone(180, 0.20, 'square', 0.15, 0.18);
      },
      // Window open: soft glass-chime trio
      playOpen: () => {
        if (isMuted()) return;
        createTone(1047, 0.18, 'sine', 0.10);           // C6
        createTone(1319, 0.18, 'sine', 0.08, 0.10);     // E6
        createTone(1568, 0.25, 'sine', 0.07, 0.18);     // G6
      },
      // Window close: soft descending chime
      playClose: () => {
        if (isMuted()) return;
        createTone(784, 0.18, 'sine', 0.09);             // G5
        createTone(523, 0.22, 'sine', 0.08, 0.14);       // C5
      },
      // CD-ROM / track start: warm analog whoosh
      playCDStart: () => {
        if (isMuted()) return;
        createTone(294, 0.15, 'sine', 0.10);             // D4
        createTone(440, 0.18, 'sine', 0.09, 0.12);       // A4
        createTone(587, 0.25, 'sine', 0.08, 0.25);       // D5
      },
      // Startup: Vista-style ascending chord
      playStartup: () => {
        if (isMuted()) return;
        createTone(523,  0.30, 'sine', 0.15);            // C5
        createTone(659,  0.30, 'sine', 0.15, 0.20);      // E5
        createTone(784,  0.40, 'sine', 0.15, 0.40);      // G5
        createTone(1047, 0.60, 'sine', 0.12, 0.60);      // C6
      },
      // Notification: gentle double-ping
      playNotification: () => {
        if (isMuted()) return;
        createTone(880,  0.12, 'sine', 0.10);
        createTone(1047, 0.18, 'sine', 0.09, 0.15);
      },
    }),
    [],
  );
