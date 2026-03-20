import React, { useState, useEffect, useRef } from 'react';
import { useOSStore, AppWindow } from '@/app/store/useOSStore';
import { Monitor, Calendar } from 'lucide-react';
import { StartMenu } from './StartMenu';
import { useIsMobile } from '@/app/hooks/useIsMobile';

export const Taskbar = () => {
  const { windows, activeWindowId, focusApp, minimizeApp } = useOSStore();
  const [startOpen, setStartOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [now, setNow] = useState(() => new Date());
  const menuRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null);
  const isMobile = useIsMobile();

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

      <div className="h-12 md:h-10 bg-slate-900/80 backdrop-blur-xl border-t border-white/20 flex items-center px-2 gap-2 shadow-2xl">

        <button
          ref={startButtonRef}
          className={`
            flex items-center gap-2 px-4 py-2 md:px-3 md:py-1 rounded-md text-white font-bold text-sm shadow-sm transition-all focus:ring-2 focus:ring-white/50 outline-none
            ${startOpen ? 'bg-blue-600' : 'bg-gradient-to-b from-emerald-500 to-emerald-700 active:scale-95'}
          `}
          onClick={() => setStartOpen(!startOpen)}
          aria-label="Ouvrir le menu démarrer"
        >
          <Monitor size={18} /> <span className="font-bold">Start</span>
        </button>

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

        <div className="ml-auto relative" ref={calendarRef}>
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex flex-col items-center px-3 py-1 text-xs font-medium text-gray-200 hover:bg-white/10 hover:text-white rounded transition-colors focus:ring-1 focus:ring-white/30"
          >
            <span className="text-sm md:text-xs">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span className="text-[10px] opacity-70 hidden sm:inline">{now.toLocaleDateString()}</span>
          </button>

          {showCalendar && (
            <div className="absolute bottom-12 right-0 w-64 bg-white/90 backdrop-blur-xl border border-white/50 rounded-lg shadow-2xl p-4 animate-in slide-in-from-bottom-5">
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
