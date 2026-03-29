import React, { useState } from 'react';
import { useOSStore } from '@/app/store/useOSStore';
import { Lock, Terminal, Globe, Folder, Power, Settings, User as UserIcon, LayoutGrid, Music, Palette, Search, FileText, Mail, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

import { TerminalApp } from '@/app/apps/Terminal';
import { BrowserApp } from '@/app/apps/Browser';
import { ExplorerApp } from '@/app/apps/Explorer';
import { SettingsApp } from '@/app/apps/Settings';
import { AboutApp } from '@/app/apps/About';
import { ProjectsApp } from '@/app/apps/Projects';
import { MusicPlayerApp } from '@/app/apps/MusicPlayer';
import { PaintApp } from '@/app/apps/Paint';
import { ContactApp } from '@/app/apps/Contact';
import { PDFViewerApp } from '@/app/apps/PDFViewer';
import { AIChatApp } from '@/app/apps/AIChat';
import { portfolio } from '@/app/data/portfolio';

interface StartMenuProps {
  onClose: () => void;
}

// Vista icon mapping
const vistaIcons: Record<string, string> = {
  Browser: "/icons/chrome1.ico",
  Terminal: "/icons/vista_console.ico",
  Explorer: "/icons/explorer.ico",
  About: "/icons/vista_info.ico",
  Projects: "/icons/vista_book_1.ico",
  MusicPlayer: "/icons/wmp1.ico",
  Paint: "/icons/photogallery.ico",
  Contact: "/icons/wlm1.ico",
  CV: "/icons/vista_bench.ico",
  AIChat: "/icons/vista_info.ico",
};

export const StartMenu = ({ onClose }: StartMenuProps) => {
  const { addWindow, windows, launchApp, setLocked } = useOSStore();
  const [searchTerm, setSearchTerm] = useState("");

  const handleLaunch = (appName: string) => {
    let id = appName.toLowerCase();
    if (appName === 'Explorer') id = `explorer-${Date.now()}`;

    if (windows[id] && appName !== 'Explorer') {
      launchApp(id);
      onClose();
      return;
    }

    const baseWindow = {
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 99,
      defaultPosition: { x: 100 + Math.random() * 50, y: 50 + Math.random() * 50 }
    };

    switch (appName) {
      case 'Terminal':
        addWindow({ ...baseWindow, id: 'terminal', title: 'Terminal', icon: Terminal, component: <TerminalApp /> });
        break;
      case 'Browser':
        addWindow({ ...baseWindow, id: 'browser', title: 'Internet', icon: Globe, component: <BrowserApp />, defaultPosition: { x: 50, y: 50 } });
        break;
      case 'Settings':
        addWindow({ ...baseWindow, id: 'settings', title: 'Paramètres', icon: Settings, component: <SettingsApp />, defaultPosition: { x: 100, y: 100 } });
        break;
      case 'Explorer':
        addWindow({ ...baseWindow, id, title: 'Explorateur', icon: Folder, component: <ExplorerApp initialPath="root" /> });
        break;
      case 'About':
        addWindow({ ...baseWindow, id: 'about', title: 'À Propos', icon: UserIcon, component: <AboutApp />, defaultPosition: { x: 200, y: 100 } });
        break;
      case 'Projects':
        addWindow({ ...baseWindow, id: 'projects', title: 'Mes Projets', icon: LayoutGrid, component: <ProjectsApp />, defaultPosition: { x: 150, y: 80 } });
        break;
      case 'MusicPlayer':
        addWindow({ ...baseWindow, id: 'musicplayer', title: 'Lecteur Musique', icon: Music, component: <MusicPlayerApp />, defaultPosition: { x: 50, y: 200 } });
        break;
      case 'Paint':
        addWindow({ ...baseWindow, id: 'paint', title: 'Paint', icon: Palette, component: <PaintApp />, defaultPosition: { x: 80, y: 80 } });
        break;
      case 'Contact':
        addWindow({ ...baseWindow, id: 'contact', title: 'Me Contacter', icon: Mail, component: <ContactApp />, defaultPosition: { x: 200, y: 100 } });
        break;
      case 'CV':
        addWindow({ ...baseWindow, id: 'cv', title: 'Mon CV', icon: FileText, component: <PDFViewerApp file="/cv.pdf" />, defaultPosition: { x: 120, y: 60 } });
        break;
      case 'AIChat':
        addWindow({ ...baseWindow, id: 'aichat', title: 'Ethan IA', icon: Sparkles, component: <AIChatApp />, defaultSize: { width: 420, height: 560 } });
        break;
    }
    onClose();
  };

  const AppIcon = ({ src, fallback: FallbackIcon, color }: { src: string; fallback: any; color: string }) => {
    const [failed, setFailed] = useState(false);
    if (failed) return <FallbackIcon size={18} className={color} />;
    return <img src={src} alt="" width={18} height={18} className="object-contain" onError={() => setFailed(true)} />;
  };

  const apps = [
    { name: 'À Propos', icon: UserIcon, action: 'About', color: 'text-orange-500', vistaKey: 'About' },
    { name: 'Mes Projets', icon: LayoutGrid, action: 'Projects', color: 'text-purple-600', vistaKey: 'Projects' },
    { name: 'Mon CV', icon: FileText, action: 'CV', color: 'text-blue-600', vistaKey: 'CV' },
    { name: 'Me Contacter', icon: Mail, action: 'Contact', color: 'text-green-600', vistaKey: 'Contact' },
    { name: 'Internet', icon: Globe, action: 'Browser', color: 'text-blue-500', vistaKey: 'Browser' },
    { name: 'Terminal', icon: Terminal, action: 'Terminal', color: 'text-gray-700', vistaKey: 'Terminal' },
    { name: 'Documents', icon: Folder, action: 'Explorer', color: 'text-yellow-500', vistaKey: 'Explorer' },
    { name: 'Musique', icon: Music, action: 'MusicPlayer', color: 'text-pink-500', vistaKey: 'MusicPlayer' },
    { name: 'Paint', icon: Palette, action: 'Paint', color: 'text-emerald-600', vistaKey: 'Paint' },
    { name: 'Ethan IA', icon: Sparkles, action: 'AIChat', color: 'text-violet-500', vistaKey: 'AIChat' },
  ];

  const filteredApps = apps.filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute bottom-12 left-2 w-[calc(100vw-16px)] sm:w-80 bg-white/95 backdrop-blur-2xl border border-gray-300/50 rounded-lg shadow-2xl flex flex-col overflow-hidden z-[1000000] text-gray-800"
    >
      {/* User header */}
      <div className="bg-blue-600 p-4 flex items-center gap-3 text-white shadow-md z-10">
        <img
          src={portfolio.avatar}
          alt={portfolio.fullName}
          className="w-10 h-10 rounded-full object-cover border-2 border-white/50"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <div>
          <div className="font-bold text-sm">{portfolio.fullName}</div>
          <div className="text-xs opacity-80">{portfolio.title}</div>
        </div>
      </div>

      {/* Search */}
      <div className="px-3 pt-3 pb-1 bg-gray-50 border-b border-gray-200">
        <div className="flex items-center gap-2 bg-white border border-gray-400 rounded px-2 py-1.5 focus-within:ring-2 ring-blue-500 focus-within:border-blue-500">
          <Search size={14} className="text-gray-600" />
          <input
            autoFocus
            className="bg-transparent border-none outline-none text-sm w-full placeholder-gray-500 text-gray-900 font-medium"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="flex h-80">
        <div className="flex-1 py-1 px-1 flex flex-col gap-1 bg-white overflow-y-auto">
          <div className="text-xs font-bold text-gray-500 px-3 py-1 uppercase tracking-wider">
            {searchTerm ? 'Résultats' : 'Applications'}
          </div>

          {filteredApps.length > 0 ? (
            filteredApps.map((app) => (
              <button
                key={app.name}
                onClick={() => handleLaunch(app.action)}
                className="flex items-center gap-3 px-3 py-2 hover:bg-blue-600 hover:text-white rounded transition-colors text-sm text-gray-900 font-medium text-left group"
              >
                <AppIcon
                  src={vistaIcons[app.vistaKey]}
                  fallback={app.icon}
                  color={`${app.color} group-hover:text-white`}
                />
                {app.name}
              </button>
            ))
          ) : (
            <div className="text-center text-gray-500 text-xs py-4">Aucune application trouvée.</div>
          )}
        </div>

        <div className="w-32 bg-slate-100 border-l border-gray-200 py-2 flex flex-col gap-1">
          <div className="text-xs font-bold text-gray-500 px-3 py-1 uppercase">Système</div>
          <button onClick={() => handleLaunch('Settings')} className="flex items-center gap-2 px-3 py-2 hover:bg-blue-200/50 transition-colors text-xs text-gray-600 text-left">
            <Settings size={14} /> Paramètres
          </button>
        </div>
      </div>

      <div className="bg-gray-200/80 p-3 border-t border-white/50 flex justify-between items-center">
        <div className="text-xs text-gray-500 italic">v1.1.0</div>
        <div className="flex gap-2">
          <button onClick={() => { onClose(); setLocked(true); }} className="flex items-center gap-2 px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white text-xs rounded shadow-sm transition-colors" title="Verrouiller">
            <Lock size={14} />
          </button>
          <button onClick={() => window.location.reload()} className="flex items-center gap-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded shadow-sm transition-colors" title="Redémarrer">
            <Power size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};
