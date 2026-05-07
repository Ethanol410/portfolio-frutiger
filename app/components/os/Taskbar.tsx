import React, { useState, useEffect, useRef } from 'react';
import { useOSStore, AppWindow } from '@/app/store/useOSStore';
import { Calendar, Music, FileText, Mail, Github, Linkedin, Briefcase, Volume2, VolumeX } from 'lucide-react';

/* Windows 4-quadrant flag (inline SVG) */
const WinFlag = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true" fill="none">
    <rect x="1"  y="1"  width="7" height="7" rx="1" fill="#F25022" />
    <rect x="10" y="1"  width="7" height="7" rx="1" fill="#7FBA00" />
    <rect x="1"  y="10" width="7" height="7" rx="1" fill="#00A4EF" />
    <rect x="10" y="10" width="7" height="7" rx="1" fill="#FFB900" />
  </svg>
);
import { MusicPlayerApp } from '@/app/apps/MusicPlayer';
import { ContactApp } from '@/app/apps/Contact';
import { PDFViewerApp } from '@/app/apps/PDFViewer';
import { StartMenu } from './StartMenu';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import { portfolio } from '@/app/data/portfolio';

export const Taskbar = () => {
  const { windows, activeWindowId, focusApp, minimizeApp, addWindow, soundsEnabled, toggleSounds } = useOSStore();
  const [startOpen, setStartOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const menuRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();
  const { spotifyNowPlaying, spotifyIsListening } = useOSStore();

  const openMusicPlayer = () => {
    addWindow({
      id: 'musicplayer',
      title: 'Lecteur Musique',
      icon: Music,
      component: <MusicPlayerApp />,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      defaultPosition: { x: 50, y: 40 },
      defaultSize: { width: 500, height: 600 },
    });
  };

  const openCV = () => {
    addWindow({
      id: 'cv',
      title: 'Mon CV',
      icon: FileText,
      component: <PDFViewerApp file="/cv_ethan_collin.pdf" />,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      defaultPosition: { x: 120, y: 40 },
      defaultSize: { width: 800, height: 660 },
    });
  };

  const openContact = () => {
    addWindow({
      id: 'contact',
      title: 'Me Contacter',
      icon: Mail,
      component: <ContactApp />,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 10,
      defaultPosition: { x: 300, y: 60 },
      defaultSize: { width: 550, height: 580 },
    });
  };

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTaskClick = (win: AppWindow) => {
    if (win.isMinimized || activeWindowId !== win.id) {
      focusApp(win.id);
    } else {
      minimizeApp(win.id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (startButtonRef.current && startButtonRef.current.contains(event.target as Node)) {
        return;
      }
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setStartOpen(false);
      }
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Meta') {
        event.preventDefault();
        setStartOpen(prev => !prev);
      }
      if (event.key === 'Escape') {
        setStartOpen(false);
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Calendar helpers
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Day of week the 1st falls on (0=Sun → convert to Mon-based: Mon=0)
  const firstDayRaw = new Date(year, month, 1).getDay(); // 0=Sun, 1=Mon...
  const firstDayOffset = (firstDayRaw + 6) % 7; // Mon-based offset

  return (
    <div className="fixed bottom-0 w-full z-[99999]">
      <div ref={menuRef}>
        {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      </div>

      <div
        className="h-12 md:h-10 flex items-center px-2 gap-2 taskbar-safe"
        style={{
          background: 'linear-gradient(180deg, rgba(28,55,130,0.78) 0%, rgba(8,18,65,0.94) 100%)',
          backdropFilter: 'blur(22px) saturate(180%)',
          WebkitBackdropFilter: 'blur(22px) saturate(180%)',
          borderTop: '1px solid rgba(120,170,255,0.32)',
          boxShadow: '0 -1px 0 rgba(255,255,255,0.08), inset 0 1px 0 rgba(120,170,255,0.18), 0 -4px 24px rgba(0,10,60,0.55)',
        }}
      >

        <button
          ref={startButtonRef}
          className="flex items-center gap-2 px-4 py-2 md:px-3 md:py-1 rounded-md text-white font-bold text-sm transition-all focus:ring-2 focus:ring-emerald-400/50 outline-none active:scale-95"
          style={startOpen ? {
            background: 'linear-gradient(180deg, rgba(37,99,235,0.9) 0%, rgba(29,78,216,0.95) 100%)',
            border: '1px solid rgba(96,165,250,0.5)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.2), 0 2px 8px rgba(0,0,80,0.4)',
          } : {
            background: [
              'radial-gradient(circle at 42% 30%, rgba(255,255,255,.70) 0%, rgba(255,255,255,.12) 28%, transparent 52%)',
              'radial-gradient(circle at 60% 72%, rgba(0,80,20,.25) 0%, transparent 48%)',
              'linear-gradient(180deg, #4ade80 0%, #16a34a 42%, #15803d 100%)',
            ].join(', '),
            border: '1px solid rgba(22,163,74,.75)',
            boxShadow: '0 0 14px rgba(74,222,128,.45), 0 2px 8px rgba(0,0,0,.3), inset 0 1px 0 rgba(255,255,255,.38)',
          }}
          onClick={() => setStartOpen(!startOpen)}
          aria-label="Ouvrir le menu démarrer"
        >
          <WinFlag /> <span className="font-bold">Start</span>
        </button>

        {/* Bandeau de disponibilité, lecture seule, hidden on small screens. */}
        {!isMobile && (
          <div
            className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-medium text-emerald-200 shrink-0"
            style={{
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.35)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05)',
            }}
            title={portfolio.availability.label}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="max-w-[260px] truncate">{portfolio.availability.label}</span>
          </div>
        )}

        <div className="w-[1px] h-6 bg-white/20 mx-1" />

        {!isMobile && (
          <div className="flex gap-1 overflow-x-auto no-scrollbar">
            {Object.values(windows).filter(w => w.isOpen).map((win) => (
              <button
                key={win.id}
                onClick={() => handleTaskClick(win)}
                title={win.title}
                className={`
                  flex items-center gap-2 px-3 py-1 rounded w-32 truncate text-xs transition-all border-b-2 outline-none focus:bg-white/20
                  ${activeWindowId === win.id && !win.isMinimized
                    ? 'bg-white/20 border-blue-400 text-white shadow-inner'
                    : 'text-gray-300 hover:bg-white/10 border-transparent hover:border-gray-500'}
                `}
              >
                <win.icon size={14} className="min-w-[14px]" />
                <span className="truncate">{win.title}</span>
              </button>
            ))}
          </div>
        )}

        {spotifyIsListening && spotifyNowPlaying && (
          <button
            onClick={openMusicPlayer}
            title={`${spotifyNowPlaying.title} · ${spotifyNowPlaying.artist}`}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs transition-all hover:brightness-110 active:scale-95 shrink-0"
            style={{
              background: 'rgba(29,185,84,0.15)',
              border: '1px solid rgba(29,185,84,0.35)',
              color: '#4ade80',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="max-w-[140px] truncate hidden sm:inline">
              {spotifyNowPlaying.title} · {spotifyNowPlaying.artist}
            </span>
            <span className="sm:hidden">♫</span>
          </button>
        )}

        {/* Boutons utilitaires (Mode recruteur, CV, Contact, GitHub, LinkedIn) */}
        <div className="ml-auto flex items-center gap-1 mr-1">
          {/* Bascule son système */}
          <button
            onClick={toggleSounds}
            title={soundsEnabled ? 'Couper les sons système' : 'Réactiver les sons système'}
            aria-label={soundsEnabled ? 'Couper les sons système' : 'Réactiver les sons système'}
            className="p-1.5 rounded-md text-blue-200 hover:bg-white/10 hover:text-white transition-colors"
          >
            {soundsEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
          <a
            href="/recruiter"
            title="Mode recruteur, vue CV plate scannable"
            aria-label="Mode recruteur"
            className="px-2.5 py-1.5 sm:py-1 mr-1 text-[10px] font-semibold text-white rounded-md flex items-center gap-1.5 transition-all hover:scale-105 active:scale-95 shrink-0"
            style={{
              background: 'linear-gradient(180deg, rgba(15,23,42,0.85) 0%, rgba(2,6,23,0.92) 100%)',
              border: '1px solid rgba(125,211,252,0.45)',
              boxShadow: '0 2px 6px rgba(2,6,23,0.35), inset 0 1px 0 rgba(125,211,252,0.25)',
            }}
          >
            <Briefcase size={13} className="sm:hidden" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0 hidden sm:block" />
            <span className="hidden sm:inline">Mode recruteur</span>
          </a>
          <button
            onClick={openCV}
            title="Mon CV"
            aria-label="Ouvrir mon CV"
            className="p-1.5 rounded-md text-blue-200 hover:bg-white/10 hover:text-white transition-colors"
          >
            <FileText size={14} />
          </button>
          <button
            onClick={openContact}
            title="Me contacter"
            aria-label="Ouvrir le formulaire de contact"
            className="p-1.5 rounded-md text-blue-200 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Mail size={14} />
          </button>
          <a
            href={portfolio.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            aria-label="Voir mon GitHub"
            className="p-1.5 rounded-md text-blue-200 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Github size={14} />
          </a>
          <a
            href={portfolio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            aria-label="Voir mon LinkedIn"
            className="p-1.5 rounded-md text-blue-200 hover:bg-white/10 hover:text-white transition-colors"
          >
            <Linkedin size={14} />
          </a>
        </div>

        <div className="relative" ref={calendarRef}>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex flex-col items-center px-3 py-1 text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-white rounded transition-colors focus:ring-1 focus:ring-white/30"
          >
            <span className="text-sm md:text-xs">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="text-[10px] opacity-70 hidden sm:inline">{now.toLocaleDateString()}</span>
          </button>

          {showCalendar && (
            <div className="absolute bottom-12 right-0 w-64 max-w-[calc(100vw-16px)] bg-white/90 backdrop-blur-xl border border-white/50 rounded-lg shadow-2xl p-4 animate-in slide-in-from-bottom-5">
              <div className="font-bold text-lg mb-2 text-gray-800 flex items-center gap-2">
                <Calendar size={18} className="text-blue-600" />
                {now.toLocaleDateString('fr-FR', { weekday: 'long', month: 'long', day: 'numeric' })}
              </div>
              <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-600">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((d, i) => (
                  <div key={i} className="font-bold">{d}</div>
                ))}
                {/* Empty cells before the 1st */}
                {[...Array(firstDayOffset)].map((_, i) => (
                  <div key={`empty-${i}`} />
                ))}
                {/* Days of the month */}
                {[...Array(daysInMonth)].map((_, i) => (
                  <div
                    key={i}
                    className={`p-1 rounded cursor-pointer ${i + 1 === today ? 'bg-blue-600 text-white font-bold shadow-md' : 'hover:bg-gray-200'}`}
                  >
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
