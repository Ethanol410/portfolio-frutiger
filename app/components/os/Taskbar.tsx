import React, { useState, useEffect, useRef } from 'react';
import { useOSStore, AppWindow } from '@/app/store/useOSStore';
import { Monitor, Calendar } from 'lucide-react';
import { StartMenu } from './StartMenu';

export const Taskbar = () => {
  const { windows, activeWindowId, focusApp, minimizeApp } = useOSStore();
  const [startOpen, setStartOpen] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const startButtonRef = useRef<HTMLButtonElement>(null); // Ref pour le bouton

  const handleTaskClick = (win: AppWindow) => {
    if (win.isMinimized || activeWindowId !== win.id) {
      focusApp(win.id);
    } else {
      minimizeApp(win.id);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Ignorer si le clic est sur le bouton Démarrer lui-même (géré par onClick)
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

    // Gestion de la touche Windows (Meta)
    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === 'Meta') {
            event.preventDefault(); // Empêcher l'ouverture du vrai menu Windows si possible (dépend du navigateur/OS)
            setStartOpen(prev => !prev);
        }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown); // <-- Listener Clavier
    
    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="fixed bottom-0 w-full z-[99999]">
      {/* Menu Démarrer : on le met DANS la div pour que menuRef fonctionne correctement avec l'outside click */}
      <div ref={menuRef}>
         {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}
      </div>

      <div className="h-10 bg-gray-200/80 backdrop-blur-md border-t border-white/50 flex items-center px-2 gap-2">
        <button 
          ref={startButtonRef}
          className={`
            flex items-center gap-2 px-3 py-1 rounded-bl-xl rounded-tr-xl rounded-tl-md rounded-br-md text-white font-bold text-sm shadow-md transition-all
            ${startOpen ? 'bg-green-600 brightness-110 shadow-inner translate-y-[1px]' : 'bg-gradient-to-b from-green-400 to-green-600 hover:brightness-110 active:scale-95'}
          `}
          onClick={() => setStartOpen(!startOpen)}
        >
          <Monitor size={16} /> Start
        </button>

        <div className="w-[1px] h-6 bg-gray-400/50 mx-1" />

        <div className="flex gap-1 overflow-x-auto no-scrollbar">
          {Object.values(windows).filter(w => w.isOpen).map((win) => (
            <button
              key={win.id}
              onClick={() => handleTaskClick(win)}
              className={`
                flex items-center gap-2 px-3 py-1 rounded w-32 truncate text-xs transition-all border-b-2
                ${activeWindowId === win.id && !win.isMinimized
                  ? 'bg-white/60 border-blue-500 shadow-inner' 
                  : 'hover:bg-white/40 border-transparent hover:border-gray-400'}
              `}
            >
              <win.icon size={14} className="min-w-[14px]" />
              <span className="truncate">{win.title}</span>
            </button>
          ))}
        </div>

        <div className="ml-auto relative" ref={calendarRef}>
            <button 
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex flex-col items-center px-3 py-1 text-xs font-medium bg-blue-100/30 border border-white/40 rounded shadow-inner hover:bg-white/40 transition-colors"
            >
              <span>{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              <span className="text-[10px] opacity-80">{new Date().toLocaleDateString()}</span>
            </button>

            {showCalendar && (
              <div className="absolute bottom-12 right-0 w-64 bg-white/90 backdrop-blur-xl border border-white/50 rounded-lg shadow-2xl p-4 animate-in slide-in-from-bottom-5">
                <div className="font-bold text-lg mb-2 text-gray-800 flex items-center gap-2">
                    <Calendar size={18} className="text-blue-600"/>
                    {new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}
                </div>
                <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-600">
                    {['L','M','M','J','V','S','D'].map(d => <div key={d} className="font-bold">{d}</div>)}
                    {[...Array(30)].map((_, i) => (
                       <div key={i} className={`p-1 rounded cursor-pointer ${i+1 === new Date().getDate() ? 'bg-blue-600 text-white font-bold shadow-md' : 'hover:bg-gray-200'}`}>
                         {i+1}
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