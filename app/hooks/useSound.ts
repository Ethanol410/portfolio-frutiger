import { useCallback } from 'react';

export const useSound = () => {
  const playClick = useCallback(() => {
    // Assurez-vous d'avoir les fichiers audio dans public/sounds/
    const audio = new Audio('/sounds/click.mp3'); 
    audio.volume = 0.2;
    audio.play().catch(() => {}); // Ignorer les erreurs d'autoplay
  }, []);

  const playError = useCallback(() => {
    const audio = new Audio('/sounds/error.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {});
  }, []);

  const playStartup = useCallback(() => {
     const audio = new Audio('/sounds/startup.mp3');
     audio.volume = 0.4;
     audio.play().catch(() => {});
  }, []);

  return { playClick, playError, playStartup };
};