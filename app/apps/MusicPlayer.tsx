import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from 'lucide-react';

const tracks = [
  { title: "Lady Hear Me Tonight", artist: "Modjo",       url: "/music/modjo-lady.mp3" },
  { title: "World Hold On",         artist: "Bob Sinclar", url: "/music/bob-sinclar-world.mp3" },
  { title: "Elle m'a aimé",         artist: "Kendji Girac",url: "/music/kendji-aimer.mp3" },
  { title: "Tout Donner",           artist: "Maitre Gims", url: "/music/maitre-gims-tout-donner.mp3" },
];

const formatTime = (seconds: number) => {
  if (!isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const MusicPlayerApp = () => {
  const [isPlaying, setIsPlaying]     = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration]       = useState(0);
  const [volume, setVolume]           = useState(0.8);
  const [muted, setMuted]             = useState(false);
  const [barHeights, setBarHeights]   = useState(Array(12).fill(10));
  const audioRef = useRef<HTMLAudioElement>(null);

  // Changer de piste — isPlaying est lu via ref pour éviter la boucle
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.src = tracks[currentTrack].url;
    audioRef.current.load();
    if (isPlayingRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrack]);

  // Events audio
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime    = () => setCurrentTime(audio.currentTime);
    const onMeta    = () => setDuration(audio.duration);
    const onEnded   = () => setCurrentTrack(p => (p + 1) % tracks.length);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  // Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = muted ? 0 : volume;
    }
  }, [volume, muted]);

  // Visualizer
  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setBarHeights(Array(12).fill(0).map(() => 10 + Math.random() * 90));
    }, 120);
    return () => clearInterval(id);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
    setIsPlaying(p => !p);
  };

  const playTrack = (index: number) => {
    if (index === currentTrack) {
      togglePlay();
    } else {
      setIsPlaying(true);
      setCurrentTrack(index);
    }
  };

  const handleProgress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = parseFloat(e.target.value);
    if (audioRef.current) audioRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    setMuted(false);
  };

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col overflow-hidden">
      {/* Visualizer */}
      <div className="flex-none bg-black mx-4 mt-4 rounded-lg flex items-end justify-center gap-1 p-2 overflow-hidden border border-gray-700" style={{ height: 80 }}>
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="w-2.5 bg-green-500 rounded-t transition-all duration-100"
            style={{ height: isPlaying ? `${h}%` : '10%' }}
          />
        ))}
      </div>

      {/* Info piste courante */}
      <div className="text-center mt-3 px-4">
        <h3 className="font-bold text-green-400 truncate">{tracks[currentTrack].title}</h3>
        <p className="text-xs text-gray-400">{tracks[currentTrack].artist}</p>
      </div>

      {/* Barre de progression */}
      <div className="px-4 mt-3">
        <input
          type="range"
          min="0"
          max={duration || 0}
          value={currentTime}
          onChange={handleProgress}
          className="w-full h-2 bg-gray-700 rounded-full appearance-none cursor-pointer accent-green-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Contrôles */}
      <div className="flex justify-center items-center gap-4 mt-2 px-4">
        <button onClick={() => setCurrentTrack(p => (p - 1 + tracks.length) % tracks.length)} className="p-2 hover:text-green-400 transition-colors">
          <SkipBack size={20} />
        </button>
        <button onClick={togglePlay} className="w-11 h-11 bg-green-500 rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform">
          {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
        </button>
        <button onClick={() => setCurrentTrack(p => (p + 1) % tracks.length)} className="p-2 hover:text-green-400 transition-colors">
          <SkipForward size={20} />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 px-4 mt-2">
        <button onClick={() => setMuted(m => !m)} className="text-gray-400 hover:text-white transition-colors shrink-0">
          {muted || volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={muted ? 0 : volume}
          onChange={handleVolume}
          className="flex-1 h-1.5 bg-gray-700 rounded-full appearance-none cursor-pointer accent-green-500"
        />
        <span className="text-xs text-gray-500 w-7 text-right">{Math.round((muted ? 0 : volume) * 100)}%</span>
      </div>

      {/* Playlist */}
      <div className="flex-1 overflow-y-auto mt-3 border-t border-gray-800">
        <div className="px-2 py-1 text-[10px] text-gray-500 uppercase tracking-widest font-bold flex items-center gap-1.5">
          <Music size={10} /> Playlist
        </div>
        {tracks.map((track, i) => (
          <button
            key={i}
            onClick={() => playTrack(i)}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
              i === currentTrack
                ? 'bg-green-500/10 text-green-400'
                : 'hover:bg-gray-800 text-gray-300'
            }`}
          >
            <div className="w-5 flex items-center justify-center shrink-0">
              {i === currentTrack && isPlaying ? (
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              ) : (
                <span className="text-xs text-gray-600">{i + 1}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{track.title}</div>
              <div className="text-xs text-gray-500 truncate">{track.artist}</div>
            </div>
          </button>
        ))}
      </div>

      <audio ref={audioRef} />
    </div>
  );
};
