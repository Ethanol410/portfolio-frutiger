import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const tracks = [
  // { title: "Lofi Study", artist: "Unknown", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }, 
  // { title: "Synthwave", artist: "Retro", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
  { title: "Lady Hear Me Tonight", artist: "Modjo", url: "/music/modjo-lady.mp3" },
  { title: "World Hold On", artist: "Bob Sinclar", url: "/music/bob-sinclar-world.mp3" },
  { title: "Elle m'a aimé", artist: "Kendji Girac", url: "/music/kendji-aimer.mp3" },
  { title: "Tout Donner", artist: "Maitre Gims", url: "/music/maitre-gims-tout-donner.mp3" },
];

const formatTime = (seconds: number) => {
  if (!isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const MusicPlayerApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [barHeights, setBarHeights] = useState(Array(10).fill(10));
  const audioRef = useRef<HTMLAudioElement>(null);

  // Gérer le changement de piste
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = tracks[currentTrack].url;
      audioRef.current.load();
      
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          // Erreur de lecture
          setIsPlaying(false);
        });
      }
    }
  }, [currentTrack, isPlaying]);

  // Mettre à jour le temps courant
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      // Passer automatiquement à la piste suivante
      setCurrentTrack((prev) => (prev + 1) % tracks.length);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Animer le visualizer
  useEffect(() => {
    if (!isPlaying) {
      return;
    }

    const interval = setInterval(() => {
      setBarHeights(Array(10).fill(0).map(() => Math.random() * 100));
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          setIsPlaying(false);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipToNext = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
  };

  const skipToPrev = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };


  return (
    <div className="h-full bg-gray-900 text-white flex flex-col p-4">
      {/* Visualizer (Fake) */}
      <div className="flex-1 bg-black rounded-lg mb-4 flex items-end justify-center gap-1 p-2 overflow-hidden border border-gray-700">
        {barHeights.map((height, i) => (
          <div key={i} className={`w-3 bg-green-500 transition-all duration-100 ${isPlaying ? '' : 'h-2'}`} style={{ height: isPlaying ? `${height}%` : '10%' }} />
        ))}
      </div>

      {/* Info */}
      <div className="text-center mb-4">
        <h3 className="font-bold text-green-400">{tracks[currentTrack].title}</h3>
        <p className="text-xs text-gray-400">{tracks[currentTrack].artist}</p>
      </div>

      {/* Barre de progression */}
      <div className="mb-2">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgressChange}
          className="w-full h-3 md:h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <div className="flex justify-between text-xs text-gray-400 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
        
      {/* Controls */}
      <div className="flex justify-center items-center gap-4">
        <button
          onClick={skipToPrev}
          className="p-3 hover:text-green-400 transition-colors"
        >
          <SkipBack size={20} />
        </button>
        <button 
          onClick={togglePlay}
          className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause /> : <Play className="ml-1" />}
        </button>
        <button
          onClick={skipToNext}
          className="p-3 hover:text-green-400 transition-colors"
        >
          <SkipForward size={20} />
        </button>
      </div>

      <audio ref={audioRef} />
    </div>
  );
};