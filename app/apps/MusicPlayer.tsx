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
  const [isPlaying, setIsPlaying]       = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime]   = useState(0);
  const [duration, setDuration]         = useState(0);
  const [volume, setVolume]             = useState(0.8);
  const [muted, setMuted]               = useState(false);
  const [barHeights, setBarHeights]     = useState(Array(14).fill(10));
  const audioRef = useRef<HTMLAudioElement>(null);
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

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onTime  = () => setCurrentTime(audio.currentTime);
    const onMeta  = () => setDuration(audio.duration);
    const onEnded = () => setCurrentTrack(p => (p + 1) % tracks.length);
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = muted ? 0 : volume;
  }, [volume, muted]);

  useEffect(() => {
    if (!isPlaying) return;
    const id = setInterval(() => {
      setBarHeights(Array(14).fill(0).map(() => 15 + Math.random() * 85));
    }, 120);
    return () => clearInterval(id);
  }, [isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); }
    else { audioRef.current.play().catch(() => setIsPlaying(false)); }
    setIsPlaying(p => !p);
  };

  const playTrack = (index: number) => {
    if (index === currentTrack) { togglePlay(); }
    else { setIsPlaying(true); setCurrentTrack(index); }
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

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="h-full flex flex-col overflow-hidden aero-app">

      {/* Header aqua glossy */}
      <div
        className="px-4 py-3 shrink-0 flex items-center gap-3"
        style={{
          background: 'linear-gradient(180deg, #cce9ff 0%, #a8d8f8 50%, #7fc4f0 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.7)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 4px rgba(80,160,220,0.2)',
        }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg,#5bbef5 0%,#2196f3 55%,#0d6fba 100%)',
            boxShadow: '0 2px 8px rgba(30,100,200,0.35), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-full"
            style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.55) 0%,transparent 100%)' }} />
          <Music size={14} className="text-white relative z-10" />
        </div>
        <div>
          <div className="font-bold text-[13px] text-blue-950">Lecteur Musique</div>
          <div className="text-[10px] text-blue-700/70">{tracks[currentTrack].artist} — {tracks[currentTrack].title}</div>
        </div>
        {isPlaying && (
          <div className="ml-auto flex items-center gap-1 text-[10px] text-emerald-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> En lecture
          </div>
        )}
      </div>

      {/* Visualizer */}
      <div
        className="mx-4 mt-4 rounded-2xl flex items-end justify-center gap-1 px-4 py-3 overflow-hidden shrink-0"
        style={{
          background: 'linear-gradient(180deg,rgba(14,165,233,0.12) 0%,rgba(6,182,212,0.06) 100%)',
          border: '1px solid rgba(125,211,252,0.35)',
          height: 80,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
      >
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="rounded-t transition-all duration-100"
            style={{
              width: 10,
              height: isPlaying ? `${h}%` : '10%',
              background: `linear-gradient(180deg, #38bdf8 0%, #0ea5e9 50%, #0284c7 100%)`,
              boxShadow: isPlaying ? '0 0 4px rgba(14,165,233,0.5)' : 'none',
              opacity: 0.8 + (i % 3) * 0.07,
            }}
          />
        ))}
      </div>

      {/* Info piste */}
      <div className="text-center mt-3 px-4">
        <h3 className="font-bold text-sky-900 truncate text-sm">{tracks[currentTrack].title}</h3>
        <p className="text-xs text-sky-600/70 mt-0.5">{tracks[currentTrack].artist}</p>
      </div>

      {/* Barre de progression */}
      <div className="px-5 mt-3">
        <input
          type="range" min="0" max={duration || 0} value={currentTime}
          onChange={handleProgress}
          className="w-full accent-sky-500 cursor-pointer"
          style={{ height: 20 }}
        />
        <div className="flex justify-between text-[10px] text-sky-500/80 mt-0.5">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Contrôles */}
      <div className="flex justify-center items-center gap-5 mt-2 px-4">
        <button
          onClick={() => setCurrentTrack(p => (p - 1 + tracks.length) % tracks.length)}
          className="p-2 text-sky-500 hover:text-sky-700 transition-colors"
        >
          <SkipBack size={20} />
        </button>
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg,#5bbef5 0%,#2196f3 55%,#0d6fba 100%)',
            boxShadow: '0 4px 16px rgba(14,165,233,0.45), inset 0 1px 0 rgba(255,255,255,0.4)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full"
            style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.35) 0%,transparent 100%)' }} />
          {isPlaying
            ? <Pause size={20} className="text-white relative z-10" />
            : <Play size={20} className="text-white relative z-10 ml-0.5" />
          }
        </button>
        <button
          onClick={() => setCurrentTrack(p => (p + 1) % tracks.length)}
          className="p-2 text-sky-500 hover:text-sky-700 transition-colors"
        >
          <SkipForward size={20} />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 px-5 mt-2">
        <button onClick={() => setMuted(m => !m)} className="text-sky-400 hover:text-sky-600 transition-colors shrink-0">
          {muted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
        <input
          type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume}
          onChange={handleVolume}
          className="flex-1 accent-sky-500 cursor-pointer"
          style={{ height: 20 }}
        />
        <span className="text-[10px] text-sky-500/80 w-7 text-right">{Math.round((muted ? 0 : volume) * 100)}%</span>
      </div>

      {/* Playlist */}
      <div
        className="flex-1 overflow-y-auto mt-3 mx-3 mb-3 rounded-xl"
        style={{
          background: 'rgba(255,255,255,0.55)',
          border: '1px solid rgba(186,230,253,0.5)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
        }}
      >
        <div className="px-3 py-1.5 text-[10px] text-sky-500 uppercase tracking-widest font-bold flex items-center gap-1.5 border-b border-sky-100/60">
          <Music size={10} /> Playlist
        </div>
        {tracks.map((track, i) => (
          <button
            key={i}
            onClick={() => playTrack(i)}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all"
            style={
              i === currentTrack
                ? { background: 'rgba(14,165,233,0.1)', borderLeft: '3px solid #0ea5e9' }
                : { borderLeft: '3px solid transparent' }
            }
          >
            <div className="w-5 flex items-center justify-center shrink-0">
              {i === currentTrack && isPlaying
                ? <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                : <span className="text-xs text-sky-400/60">{i + 1}</span>
              }
            </div>
            <div className="flex-1 min-w-0">
              <div className={`text-sm font-medium truncate ${i === currentTrack ? 'text-sky-700' : 'text-sky-900/80'}`}>
                {track.title}
              </div>
              <div className="text-xs text-sky-500/70 truncate">{track.artist}</div>
            </div>
          </button>
        ))}
      </div>

      <audio ref={audioRef} />
    </div>
  );
};
