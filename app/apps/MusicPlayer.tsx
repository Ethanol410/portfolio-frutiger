import React, { useState, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';

const tracks = [
  { title: "Lofi Study", artist: "Unknown", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" }, 
  { title: "Synthwave", artist: "Retro", url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" }
];

export const MusicPlayerApp = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col p-4">
      {/* Visualizer (Fake) */}
      <div className="flex-1 bg-black rounded-lg mb-4 flex items-end justify-center gap-1 p-2 overflow-hidden border border-gray-700">
        {[...Array(10)].map((_, i) => (
          <div key={i} className={`w-3 bg-green-500 transition-all duration-300 ${isPlaying ? 'animate-bounce' : 'h-2'}`} style={{ height: isPlaying ? `${Math.random() * 100}%` : '10%' }} />
        ))}
      </div>

      {/* Info */}
      <div className="text-center mb-4">
        <h3 className="font-bold text-green-400">{tracks[currentTrack].title}</h3>
        <p className="text-xs text-gray-400">{tracks[currentTrack].artist}</p>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-4">
        <button className="hover:text-green-400"><SkipBack size={20} /></button>
        <button 
          onClick={togglePlay}
          className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
        >
          {isPlaying ? <Pause /> : <Play className="ml-1" />}
        </button>
        <button className="hover:text-green-400"><SkipForward size={20} /></button>
      </div>

      <audio ref={audioRef} src={tracks[currentTrack].url} onEnded={() => setIsPlaying(false)} />
    </div>
  );
};