import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music, ExternalLink, Sparkles, Clock, Headphones, Loader2 } from 'lucide-react';
import { useOSStore } from '@/app/store/useOSStore';
import { useSound } from '@/app/hooks/useSound';

const tracks = [
  { title: "Lady Hear Me Tonight", artist: "Modjo",       url: "/music/modjo-lady.mp3" },
  { title: "World Hold On",         artist: "Bob Sinclar", url: "/music/bob-sinclar-world.mp3" },
  { title: "Elle m'a aimé",         artist: "Kendji Girac",url: "/music/kendji-aimer.mp3" },
  { title: "Tout Donner",           artist: "Maitre Gims", url: "/music/maitre-gims-tout-donner.mp3" },
];

const BARS_COUNT = 14;
const ENERGY_DECAY = 0.86; // pour lisser les bars quand le signal chute brutalement

const formatTime = (seconds: number) => {
  if (!isFinite(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const formatMs = (ms: number) => formatTime(ms / 1000);

// Extraction de la couleur dominante d'une image (CORS-friendly via crossOrigin).
// Renvoie un triplet RGB normalisé, ou null si l'extraction échoue.
async function extractDominantColor(url: string): Promise<[number, number, number] | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const w = (canvas.width = 32);
        const h = (canvas.height = 32);
        const ctx = canvas.getContext('2d');
        if (!ctx) { resolve(null); return; }
        ctx.drawImage(img, 0, 0, w, h);
        const data = ctx.getImageData(0, 0, w, h).data;

        let r = 0, g = 0, b = 0, count = 0;
        // On filtre les pixels trop sombres (< 30) ou trop clairs (> 230)
        // pour récupérer une vraie couleur dominante "vivante".
        for (let i = 0; i < data.length; i += 4) {
          const pr = data[i], pg = data[i + 1], pb = data[i + 2];
          const max = Math.max(pr, pg, pb);
          const min = Math.min(pr, pg, pb);
          if (max < 30 || min > 230 || max - min < 20) continue;
          r += pr; g += pg; b += pb; count++;
        }
        if (count === 0) {
          // Fallback : moyenne brute
          for (let i = 0; i < data.length; i += 4) {
            r += data[i]; g += data[i + 1]; b += data[i + 2]; count++;
          }
        }
        resolve([Math.round(r / count), Math.round(g / count), Math.round(b / count)]);
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

// Formatage relatif "il y a N minutes/heures" pour les pistes recently played.
function timeAgo(isoString: string): string {
  const date = new Date(isoString);
  const diffMs = Date.now() - date.getTime();
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "à l'instant";
  if (diffMin < 60) return `il y a ${diffMin} min`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `il y a ${diffH} h`;
  const diffD = Math.floor(diffH / 24);
  if (diffD < 7) return `il y a ${diffD} j`;
  return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
}

export const MusicPlayerApp = () => {
  const [activeTab, setActiveTab] = useState<'local' | 'spotify'>('local');
  const {
    spotifyNowPlaying, spotifyTopTracks, spotifyIsListening, tickSpotifyProgress,
    spotifyRecentlyPlayed, spotifyRecentlyStats,
    musicRecos, musicRecosLoading, musicRecosError, fetchMusicRecos,
  } = useOSStore();

  const { playCDStart } = useSound();
  const [isPlaying, setIsPlaying]       = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [currentTime, setCurrentTime]   = useState(0);
  const [duration, setDuration]         = useState(0);
  const [volume, setVolume]             = useState(0.8);
  const [muted, setMuted]               = useState(false);
  const [barHeights, setBarHeights]     = useState<number[]>(Array(BARS_COUNT).fill(8));
  const [isEnded, setIsEnded]           = useState(false);
  const [ambientColor, setAmbientColor] = useState<[number, number, number] | null>(null);

  const audioRef = useRef<HTMLAudioElement>(null);
  const isPlayingRef = useRef(isPlaying);
  isPlayingRef.current = isPlaying;

  // Web Audio API : analyser FFT réel sur le flux audio local.
  const audioCtxRef   = useRef<AudioContext | null>(null);
  const analyserRef   = useRef<AnalyserNode | null>(null);
  const sourceRef     = useRef<MediaElementAudioSourceNode | null>(null);
  const rafRef        = useRef<number | null>(null);
  const fftBufferRef  = useRef<Uint8Array<ArrayBuffer> | null>(null);
  const smoothedBars  = useRef<number[]>(Array(BARS_COUNT).fill(0));

  // Initialise le graphe Web Audio (lazy, après une interaction utilisateur).
  const initAudioGraph = useCallback(() => {
    if (audioCtxRef.current || !audioRef.current) return;
    try {
      const Ctor = (window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext);
      if (!Ctor) return;
      const ctx = new Ctor();
      const source = ctx.createMediaElementSource(audioRef.current);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 128;
      analyser.smoothingTimeConstant = 0.7;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      audioCtxRef.current = ctx;
      analyserRef.current = analyser;
      sourceRef.current = source;
      fftBufferRef.current = new Uint8Array(new ArrayBuffer(analyser.frequencyBinCount));
    } catch {
      // L'AudioContext peut échouer (autoplay policy, déjà connecté). On retombe
      // sur le rendu statique par défaut (bars à 8 %), sans casser la lecture.
    }
  }, []);

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
    const onEnded = () => {
      setIsEnded(true);
      setTimeout(() => setIsEnded(false), 1500);
      setCurrentTrack(p => (p + 1) % tracks.length);
    };
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

  // Boucle de visualisation : utilise le FFT si disponible, sinon fallback random
  // pour rester visuellement vivant si Web Audio API n'est pas dispo.
  useEffect(() => {
    if (!isPlaying) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      return;
    }

    const tick = () => {
      const analyser = analyserRef.current;
      const buffer = fftBufferRef.current;

      if (analyser && buffer) {
        analyser.getByteFrequencyData(buffer);
        // On utilise les ~70 % bas du spectre, là où l'énergie musicale est concentrée.
        const usable = Math.floor(buffer.length * 0.7);
        const bars = Array.from({ length: BARS_COUNT }, (_, i) => {
          const start = Math.floor((i / BARS_COUNT) * usable);
          const end = Math.floor(((i + 1) / BARS_COUNT) * usable);
          let sum = 0;
          for (let k = start; k < end; k++) sum += buffer[k];
          const avg = sum / Math.max(1, end - start);
          return (avg / 255) * 100;
        });
        // Lissage : on prend le max entre la nouvelle valeur et la précédente décrétée.
        const smoothed = bars.map((v, i) => {
          const prev = smoothedBars.current[i] * ENERGY_DECAY;
          return Math.max(v, prev);
        });
        smoothedBars.current = smoothed;
        setBarHeights(smoothed);
      } else {
        // Fallback random discret si le FFT n'est pas branché.
        setBarHeights(Array(BARS_COUNT).fill(0).map(() => 15 + Math.random() * 70));
      }

      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [isPlaying]);

  // Tick local pour la barre de progression Spotify (fluidifie entre les fetchs).
  useEffect(() => {
    if (!spotifyIsListening) return;
    const id = setInterval(() => tickSpotifyProgress(1000), 1000);
    return () => clearInterval(id);
  }, [spotifyIsListening, tickSpotifyProgress]);

  // Extraction de la couleur dominante de la pochette Spotify pour l'ambient bg.
  useEffect(() => {
    let cancelled = false;
    if (activeTab !== 'spotify' || !spotifyNowPlaying?.albumArt) {
      setAmbientColor(null);
      return;
    }
    extractDominantColor(spotifyNowPlaying.albumArt).then((color) => {
      if (!cancelled) setAmbientColor(color);
    });
    return () => { cancelled = true; };
  }, [activeTab, spotifyNowPlaying?.albumArt]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    initAudioGraph();
    // L'AudioContext peut être suspendu (autoplay policy). On le réveille au click.
    if (audioCtxRef.current?.state === 'suspended') {
      void audioCtxRef.current.resume();
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => setIsPlaying(false));
      playCDStart();
    }
    setIsPlaying(p => !p);
  };

  const playTrack = (index: number) => {
    if (index === currentTrack) { togglePlay(); }
    else {
      initAudioGraph();
      if (audioCtxRef.current?.state === 'suspended') void audioCtxRef.current.resume();
      setIsPlaying(true); setCurrentTrack(index);
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

  // Background ambient pour l'onglet Spotify, basé sur la couleur dominante.
  const ambientBg = ambientColor
    ? `radial-gradient(ellipse at top, rgba(${ambientColor[0]},${ambientColor[1]},${ambientColor[2]},0.35) 0%, rgba(${ambientColor[0]},${ambientColor[1]},${ambientColor[2]},0.08) 45%, transparent 75%)`
    : undefined;

  return (
    <div className="h-full flex flex-col overflow-hidden aero-app relative">
      {/* Background ambient (onglet Spotify uniquement) */}
      {activeTab === 'spotify' && ambientBg && (
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{ background: ambientBg }}
        />
      )}

      {/* Header aqua glossy */}
      <div
        className="px-4 py-3 shrink-0 flex items-center gap-3 relative z-10"
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
        <div className="min-w-0">
          <div className="font-bold text-[13px] text-blue-950">Lecteur Musique</div>
          <div className="text-[10px] text-blue-700/70 truncate">
            {activeTab === 'local'
              ? `${tracks[currentTrack].artist}, ${tracks[currentTrack].title}`
              : spotifyNowPlaying
                ? `${spotifyNowPlaying.artist}, ${spotifyNowPlaying.title}`
                : 'Spotify'}
          </div>
        </div>
        {(activeTab === 'local' ? isPlaying : spotifyIsListening) && (
          <div className="ml-auto flex items-center gap-1 text-[10px] text-emerald-700 font-medium shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> En lecture
          </div>
        )}
      </div>

      {/* Onglets */}
      <div className="flex gap-1 px-3 pt-2 shrink-0 relative z-10">
        <button
          onClick={() => setActiveTab('local')}
          className="flex-1 py-1.5 rounded-t-lg text-[11px] font-semibold transition-all"
          style={activeTab === 'local'
            ? { background: 'rgba(14,165,233,0.15)', borderBottom: '2px solid #0ea5e9', color: '#0369a1' }
            : { background: 'rgba(255,255,255,0.3)', borderBottom: '2px solid transparent', color: '#94a3b8' }}
        >
          🎵 Local
        </button>
        <button
          onClick={() => setActiveTab('spotify')}
          className="flex-1 py-1.5 rounded-t-lg text-[11px] font-semibold transition-all"
          style={activeTab === 'spotify'
            ? { background: 'rgba(29,185,84,0.12)', borderBottom: '2px solid #1db954', color: '#15803d' }
            : { background: 'rgba(255,255,255,0.3)', borderBottom: '2px solid transparent', color: '#94a3b8' }}
        >
          🎧 Spotify
        </button>
      </div>

      {activeTab === 'local' && (<div className="flex flex-col flex-1 overflow-hidden min-h-0 relative z-10">

      {/* Visualizer FFT temps réel (Web Audio API) */}
      <div
        className="mx-4 mt-4 rounded-2xl flex items-end justify-center gap-1 px-4 py-3 overflow-hidden shrink-0"
        style={{
          background: 'linear-gradient(180deg,rgba(14,165,233,0.12) 0%,rgba(6,182,212,0.06) 100%)',
          border: '1px solid rgba(125,211,252,0.35)',
          height: 80,
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6)',
        }}
        title="Visualizer audio temps réel via Web Audio API (AnalyserNode FFT)"
      >
        {barHeights.map((h, i) => (
          <div
            key={i}
            className="rounded-t"
            style={{
              width: 10,
              height: isPlaying ? `${Math.max(8, h)}%` : '8%',
              background: `linear-gradient(180deg, #5cd683 0%, #4ecb71 50%, #2d8a4a 100%)`,
              boxShadow: isPlaying ? '0 0 5px rgba(92,214,131,0.6)' : 'none',
              opacity: 0.85 + (i % 3) * 0.05,
              transition: 'height 80ms ease-out',
            }}
          />
        ))}
      </div>

      {/* Info piste avec CD rotatif */}
      <div className="flex items-center gap-3 mt-3 px-4 shrink-0">
        {/* Artwork CD */}
        <div className="relative shrink-0">
          <div
            className={`w-14 h-14 rounded-full shadow-lg ring-2 ring-white/50 ${isPlaying ? 'cd-spinning' : ''}`}
            style={{
              background: 'conic-gradient(from 0deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #1a1a2e 100%)',
              boxShadow: '0 4px 14px rgba(0,0,0,0.4), inset 0 0 8px rgba(255,255,255,0.05)',
            }}
          >
            {/* Reflet glossy */}
            <div
              className="absolute inset-0 rounded-full"
              style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 55%)' }}
            />
            {/* Centre du CD */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full ring-1 ring-white/30"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(200,220,255,0.5) 100%)' }}
            />
          </div>
        </div>
        {/* Texte piste */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-sky-900 truncate text-sm">{tracks[currentTrack].title}</h3>
          <p className="text-xs text-sky-600/70 mt-0.5 truncate">{tracks[currentTrack].artist}</p>
          {isEnded && (
            <p className="text-xs text-sky-400 animate-pulse mt-1">Piste suivante…</p>
          )}
        </div>
      </div>

      {/* Barre de progression */}
      <div className="px-5 mt-3 shrink-0">
        <input
          type="range" min="0" max={duration || 0} value={currentTime}
          onChange={handleProgress}
          aria-label="Position de lecture"
          className="w-full accent-sky-500 cursor-pointer"
          style={{ height: 20 }}
        />
        <div className="flex justify-between text-[10px] text-sky-500/80 mt-0.5">
          <span>{formatTime(currentTime)}</span>
          <span className="text-sky-400/60">−{formatTime(Math.max(0, duration - currentTime))}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Contrôles */}
      <div className="flex justify-center items-center gap-5 mt-2 px-4 shrink-0">
        <button
          onClick={() => setCurrentTrack(p => (p - 1 + tracks.length) % tracks.length)}
          aria-label="Piste précédente"
          className="p-2 text-sky-500 hover:text-sky-700 transition-colors"
        >
          <SkipBack size={20} />
        </button>
        <button
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause' : 'Lecture'}
          className="w-12 h-12 rounded-full flex items-center justify-center active:scale-95 relative overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #5cd683 0%, #4ecb71 49.9%, #2d8a4a 50%, #1f6e36 100%)',
            boxShadow: '0 4px 16px rgba(45,138,74,0.5), inset 0 1px 0 rgba(255,255,255,0.45)',
            border: '1px solid rgba(0,0,0,0.2)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full"
            style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.4) 0%,transparent 100%)' }} />
          {isPlaying
            ? <Pause size={20} className="text-white relative z-10" />
            : <Play size={20} className="text-white relative z-10 ml-0.5" />
          }
        </button>
        <button
          onClick={() => setCurrentTrack(p => (p + 1) % tracks.length)}
          aria-label="Piste suivante"
          className="p-2 text-sky-500 hover:text-sky-700 transition-colors"
        >
          <SkipForward size={20} />
        </button>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-2 px-5 mt-2 shrink-0">
        <button
          onClick={() => setMuted(m => !m)}
          aria-label={muted ? 'Réactiver le son' : 'Couper le son'}
          className="text-sky-400 hover:text-sky-600 transition-colors shrink-0"
        >
          {muted || volume === 0 ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
        <input
          type="range" min="0" max="1" step="0.01" value={muted ? 0 : volume}
          onChange={handleVolume}
          aria-label="Volume"
          className="flex-1 accent-sky-500 cursor-pointer"
          style={{ height: 20 }}
        />
        <span className="text-[10px] text-sky-500/80 w-7 text-right">{Math.round((muted ? 0 : volume) * 100)}%</span>
      </div>

      {/* Playlist */}
      <div
        className="flex-1 min-h-0 overflow-y-auto mt-3 mx-3 mb-3 rounded-xl"
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

      </div>)}

      {activeTab === 'spotify' && (
        <div className="flex-1 min-h-0 overflow-y-auto flex flex-col gap-3 px-3 py-3 relative z-10">
          {/* Now Playing avec pochette tournante grand format */}
          {spotifyNowPlaying ? (
            <>
              <div
                className="rounded-2xl p-4 flex flex-col items-center gap-3 shrink-0"
                style={{
                  background: 'linear-gradient(135deg,rgba(255,255,255,0.6) 0%,rgba(255,255,255,0.35) 100%)',
                  border: '1px solid rgba(255,255,255,0.7)',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.85), 0 4px 14px rgba(0,0,0,0.06)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Pochette grand format avec rotation vinyle quand en lecture */}
                {spotifyNowPlaying.albumArt && (
                  <div className="relative w-40 h-40">
                    {/* Halo au tempo */}
                    <div
                      aria-hidden
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: ambientColor
                          ? `radial-gradient(circle, rgba(${ambientColor[0]},${ambientColor[1]},${ambientColor[2]},0.5) 0%, transparent 70%)`
                          : 'radial-gradient(circle, rgba(29,185,84,0.4) 0%, transparent 70%)',
                        filter: 'blur(20px)',
                        transform: spotifyIsListening ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 1s ease-in-out',
                      }}
                    />
                    {/* La pochette elle-même */}
                    <img
                      src={spotifyNowPlaying.albumArt}
                      alt={`${spotifyNowPlaying.title}, pochette d'album`}
                      className="relative w-40 h-40 rounded-full shadow-2xl ring-4 ring-white/40 object-cover"
                      style={{
                        animation: spotifyIsListening ? 'spotifyVinyl 12s linear infinite' : 'none',
                      }}
                    />
                    {/* Pastille centrale du vinyle */}
                    <div
                      aria-hidden
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/80 ring-2 ring-black/30"
                    />
                  </div>
                )}

                {/* Infos texte */}
                <div className="text-center w-full px-2">
                  <div className="flex items-center justify-center gap-1.5 mb-1">
                    <span className={`w-1.5 h-1.5 rounded-full bg-emerald-500 ${spotifyIsListening ? 'animate-pulse' : ''}`} />
                    <span className="text-[9px] font-bold text-emerald-700 uppercase tracking-widest">
                      {spotifyIsListening ? 'En cours' : 'En pause'}
                    </span>
                  </div>
                  <div className="font-bold text-sky-900 text-base truncate">{spotifyNowPlaying.title}</div>
                  <div className="text-xs text-sky-700/80 truncate mt-0.5">{spotifyNowPlaying.artist}</div>

                  {/* Barre de progression temps réel */}
                  <div className="mt-3 w-full h-1 rounded-full bg-emerald-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-emerald-500 transition-[width] duration-1000 ease-linear"
                      style={{
                        width: `${spotifyNowPlaying.durationMs > 0
                          ? Math.min(100, (spotifyNowPlaying.progressMs / spotifyNowPlaying.durationMs) * 100)
                          : 0}%`,
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-sky-500/80 mt-1">
                    <span>{formatMs(spotifyNowPlaying.progressMs)}</span>
                    <span>{formatMs(spotifyNowPlaying.durationMs)}</span>
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-sky-500/60 text-center -mt-1">
                Lecture en direct depuis mon Spotify, données rafraîchies toutes les 30 s.
              </p>
            </>
          ) : (
            <div
              className="rounded-2xl p-6 text-center shrink-0"
              style={{
                background: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(186,230,253,0.5)',
              }}
            >
              <div className="text-3xl mb-2">🎧</div>
              <div className="text-xs text-sky-600/70">Aucune lecture en cours sur Spotify.</div>
              <div className="text-[10px] text-sky-500/50 mt-1">Reviens plus tard pour voir ce que j&apos;écoute en direct.</div>
            </div>
          )}

          {/* Stats personnelles (sur les 50 dernières pistes) */}
          {spotifyRecentlyStats && spotifyRecentlyPlayed.length > 0 && (
            <div className="grid grid-cols-3 gap-2 shrink-0">
              <div
                className="rounded-xl p-2.5 text-center"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(186,230,253,0.5)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Clock size={12} className="text-emerald-600 mx-auto mb-1" />
                <div className="text-base font-bold text-sky-900 leading-none">{spotifyRecentlyStats.totalMinutes}</div>
                <div className="text-[9px] text-sky-600/70 uppercase tracking-wider mt-0.5">Min écoutées</div>
              </div>
              <div
                className="rounded-xl p-2.5 text-center"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(186,230,253,0.5)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Headphones size={12} className="text-emerald-600 mx-auto mb-1" />
                <div className="text-base font-bold text-sky-900 leading-none">{spotifyRecentlyStats.uniqueArtists}</div>
                <div className="text-[9px] text-sky-600/70 uppercase tracking-wider mt-0.5">Artistes</div>
              </div>
              <div
                className="rounded-xl p-2.5 text-center"
                style={{
                  background: 'rgba(255,255,255,0.6)',
                  border: '1px solid rgba(186,230,253,0.5)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <Music size={12} className="text-emerald-600 mx-auto mb-1" />
                <div className="text-base font-bold text-sky-900 leading-none">{spotifyRecentlyPlayed.length}</div>
                <div className="text-[9px] text-sky-600/70 uppercase tracking-wider mt-0.5">Pistes</div>
              </div>
            </div>
          )}

          {/* Top genres (chips) */}
          {spotifyRecentlyStats && spotifyRecentlyStats.topGenres.length > 0 && (
            <div
              className="rounded-xl px-3 py-2.5 shrink-0"
              style={{
                background: 'rgba(255,255,255,0.6)',
                border: '1px solid rgba(186,230,253,0.5)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="text-[10px] text-sky-500 uppercase tracking-widest font-bold mb-1.5">Genres détectés</div>
              <div className="flex flex-wrap gap-1.5">
                {spotifyRecentlyStats.topGenres.map((g) => (
                  <span
                    key={g.name}
                    className="px-2 py-0.5 text-[10px] rounded-full font-medium"
                    style={{
                      background: 'linear-gradient(135deg, rgba(29,185,84,0.12), rgba(14,165,233,0.12))',
                      color: '#0369a1',
                      border: '1px solid rgba(125,211,252,0.4)',
                    }}
                  >
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Recommandations IA (Groq) basées sur l'historique récent */}
          <div
            className="rounded-xl overflow-hidden shrink-0"
            style={{
              background: 'linear-gradient(135deg, rgba(167,139,250,0.12) 0%, rgba(124,58,237,0.06) 100%)',
              border: '1px solid rgba(167,139,250,0.4)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
              backdropFilter: 'blur(8px)',
            }}
          >
            <div className="px-3 py-1.5 flex items-center gap-1.5 border-b border-violet-100/60">
              <Sparkles size={11} className="text-violet-500" />
              <span className="text-[10px] text-violet-700 uppercase tracking-widest font-bold flex-1">Reco IA, par Ethan IA</span>
              {spotifyRecentlyPlayed.length > 0 && (
                <button
                  type="button"
                  onClick={() => fetchMusicRecos()}
                  disabled={musicRecosLoading}
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-md transition-colors disabled:opacity-40"
                  style={{
                    background: 'linear-gradient(135deg, #a78bfa, #7c3aed)',
                    color: 'white',
                    boxShadow: '0 2px 6px rgba(124,58,237,0.3)',
                  }}
                >
                  {musicRecosLoading ? (
                    <span className="inline-flex items-center gap-1">
                      <Loader2 size={9} className="animate-spin" /> Analyse…
                    </span>
                  ) : musicRecos.length > 0 ? 'Refaire' : 'Demander'}
                </button>
              )}
            </div>
            <div className="px-3 py-2.5">
              {/* Cas 1 : pas d'historique d'écoute (scope OAuth manquant) */}
              {spotifyRecentlyPlayed.length === 0 && !musicRecosLoading && (
                <div className="text-[11px] text-sky-800/80 leading-relaxed space-y-2">
                  <p>
                    Pour activer la recommandation IA, il faut l&apos;<strong>historique d&apos;écoute Spotify</strong>.
                    Aujourd&apos;hui le token OAuth n&apos;a pas le scope <code className="bg-violet-100/60 px-1 rounded">user-read-recently-played</code>.
                  </p>
                  <p className="flex flex-wrap gap-2">
                    <a
                      href="/api/spotify/login"
                      className="inline-flex items-center gap-1 px-2 py-1 text-[10px] font-semibold text-white rounded-md"
                      style={{
                        background: 'linear-gradient(135deg, #1db954, #0d8e3f)',
                        boxShadow: '0 2px 6px rgba(29,185,84,0.3)',
                      }}
                    >
                      Activer le scope (flow OAuth)
                    </a>
                    <span className="text-[10px] text-sky-500/70 self-center">
                      puis recharger
                    </span>
                  </p>
                </div>
              )}
              {/* Cas 2 : erreur retournée par la route */}
              {musicRecosError && spotifyRecentlyPlayed.length > 0 && (
                <div className="text-[11px] text-red-600/80 italic">{musicRecosError}</div>
              )}
              {/* Cas 3 : prêt mais pas encore demandé */}
              {!musicRecosError && musicRecos.length === 0 && !musicRecosLoading && spotifyRecentlyPlayed.length > 0 && (
                <p className="text-[11px] text-sky-700/70 leading-relaxed">
                  Demande à <strong>Ethan IA</strong> 5 recommandations de pistes basées sur tes 50 dernières écoutes
                  (modèle Llama 3.3 via Groq, croisement des genres et artistes détectés).
                </p>
              )}
              {musicRecos.length > 0 && (
                <div className="flex flex-col gap-2">
                  {musicRecos.map((r, i) => {
                    const searchUrl = `https://open.spotify.com/search/${encodeURIComponent(`${r.title} ${r.artist}`)}`;
                    return (
                      <a
                        key={`${r.artist}-${r.title}-${i}`}
                        href={searchUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-2 p-2 rounded-lg hover:bg-white/60 transition-colors group"
                      >
                        <span className="text-[10px] font-bold text-violet-500 w-4 shrink-0 mt-0.5">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-medium text-sky-900/85 truncate">{r.title}</div>
                          <div className="text-[10px] text-violet-700/80 truncate">{r.artist}</div>
                          <div className="text-[10px] text-sky-600/60 italic mt-0.5 leading-snug">{r.reason}</div>
                        </div>
                        <ExternalLink size={11} className="text-violet-400/0 group-hover:text-violet-500 transition-colors shrink-0 mt-0.5" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Recently played */}
          {spotifyRecentlyPlayed.length > 0 && (
            <div
              className="rounded-xl overflow-hidden shrink-0"
              style={{
                background: 'rgba(255,255,255,0.65)',
                border: '1px solid rgba(186,230,253,0.5)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="px-3 py-1.5 text-[10px] text-sky-500 uppercase tracking-widest font-bold flex items-center gap-1.5 border-b border-sky-100/60">
                <Clock size={10} /> Récemment écouté
              </div>
              {spotifyRecentlyPlayed.slice(0, 8).map((track) => (
                <a
                  key={`${track.id}-${track.playedAt}`}
                  href={`https://open.spotify.com/track/${track.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 border-b border-sky-50/50 last:border-0 hover:bg-emerald-50/40 transition-colors group"
                >
                  {track.albumArt ? (
                    <img src={track.albumArt} alt={`${track.title}, pochette`} className="w-9 h-9 rounded shrink-0 shadow-sm" />
                  ) : (
                    <div className="w-9 h-9 rounded bg-sky-100 shrink-0 flex items-center justify-center">
                      <Music size={11} className="text-sky-400" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-sky-900/85 truncate">{track.title}</div>
                    <div className="text-[10px] text-sky-500/70 truncate">{track.artist}</div>
                  </div>
                  <span className="text-[9px] text-sky-400/70 shrink-0">{timeAgo(track.playedAt)}</span>
                  <ExternalLink size={10} className="text-sky-400/0 group-hover:text-emerald-600 transition-colors shrink-0" />
                </a>
              ))}
            </div>
          )}

          {/* Top Tracks du mois */}
          {spotifyTopTracks.length > 0 && (
            <div
              className="rounded-xl overflow-hidden shrink-0 mb-2"
              style={{
                background: 'rgba(255,255,255,0.65)',
                border: '1px solid rgba(186,230,253,0.5)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="px-3 py-1.5 text-[10px] text-sky-500 uppercase tracking-widest font-bold flex items-center gap-1.5 border-b border-sky-100/60">
                <Music size={10} /> Top tracks du mois
              </div>
              {spotifyTopTracks.map((track, i) => (
                <a
                  key={track.id}
                  href={`https://open.spotify.com/track/${track.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-3 py-2 border-b border-sky-50/50 last:border-0 hover:bg-emerald-50/40 transition-colors group"
                >
                  {track.albumArt ? (
                    <img src={track.albumArt} alt={`${track.title}, pochette d'album`} className="w-10 h-10 rounded shrink-0 shadow-sm" />
                  ) : (
                    <div className="w-10 h-10 rounded bg-sky-100 shrink-0 flex items-center justify-center">
                      <Music size={12} className="text-sky-400" />
                    </div>
                  )}
                  <span className="text-[10px] text-sky-400/60 w-4 shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-sky-900/85 truncate">{track.title}</div>
                    <div className="text-[10px] text-sky-500/70 truncate">{track.artist}</div>
                  </div>
                  <ExternalLink size={11} className="text-sky-400/0 group-hover:text-emerald-600 transition-colors shrink-0" />
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Animation vinyle, locale au composant */}
      <style jsx global>{`
        @keyframes spotifyVinyl {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
