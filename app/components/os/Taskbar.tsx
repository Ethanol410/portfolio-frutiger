import React, { useState, useEffect, useRef } from 'react'; // <-- Ajout imports
import { useOSStore, AppWindow } from '@/app/store/useOSStore';
import { Monitor } from 'lucide-react';
import { StartMenu } from './StartMenu'; // <-- Import StartMenu

export const Taskbar = () => {
  const { windows, activeWindowId, focusApp, minimizeApp } = useOSStore();
  const [startOpen, setStartOpen] = useState(false); // État du menu
  const menuRef = useRef<HTMLDivElement>(null); // Pour détecter le clic dehors

  const handleTaskClick = (win: AppWindow) => {
    if (win.isMinimized || activeWindowId !== win.id) {
      focusApp(win.id);
    } else {
      minimizeApp(win.id);
    }
  };

  // Fermer le menu si on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setStartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-0 w-full z-[9999]" ref={menuRef}>
      {/* Affichage conditionnel du Menu Démarrer */}
      {startOpen && <StartMenu onClose={() => setStartOpen(false)} />}

      <div className="h-10 bg-gray-200/80 backdrop-blur-md border-t border-white/50 flex items-center px-2 gap-2">
        {/* Bouton Démarrer Actif */}
        <button 
          className={`
            flex items-center gap-2 px-3 py-1 rounded-bl-xl rounded-tr-xl rounded-tl-md rounded-br-md text-white font-bold text-sm shadow-md transition-all
            ${startOpen ? 'bg-green-600 brightness-110 shadow-inner translate-y-[1px]' : 'bg-gradient-to-b from-green-400 to-green-600 hover:brightness-110 active:scale-95'}
          `}
          onClick={() => setStartOpen(!startOpen)}
        >
          <Monitor size={16} /> Start
        </button>

        <div className="w-[1px] h-6 bg-gray-400/50 mx-1" />

        {/* Liste des tâches */}
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

        <div className="ml-auto flex items-center px-3 py-1 text-xs font-medium bg-blue-100/30 border border-white/40 rounded shadow-inner">
          {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};