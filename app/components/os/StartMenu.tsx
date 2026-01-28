import React from 'react';
import { useOSStore } from '@/app/store/useOSStore';
import { Terminal, Globe, Folder, Power, Settings, User as UserIcon, LayoutGrid } from 'lucide-react';
import { motion } from 'framer-motion';

// --- IMPORTS DES APPLICATIONS (Nécessaire pour les créer) ---
// Note: Adapte les chemins "../../apps/..." si ton dossier apps est ailleurs
// import { TerminalApp } from '@/apps/Terminal'; 
import { TerminalApp } from '@/app/apps/Terminal';
// import { BrowserApp } from '@/apps/Browser';
import { BrowserApp } from '@/app/apps/Browser';
// import { ExplorerApp } from '@/apps/Explorer';
import { ExplorerApp } from '@/app/apps/Explorer';
// import { SettingsApp } from '@/apps/Settings';
import { SettingsApp } from '@/app/apps/Settings';

import { AboutApp } from '@/app/apps/About';
import { ProjectsApp } from '@/app/apps/Projects';

interface StartMenuProps {
  onClose: () => void;
}

export const StartMenu = ({ onClose }: StartMenuProps) => {
  const { addWindow, windows, launchApp } = useOSStore();

  const handleLaunch = (appName: string) => {
    // 1. Définir l'ID unique
    let id = appName.toLowerCase();
    if (appName === 'Explorer') id = `explorer-${Date.now()}`; // ID unique pour chaque dossier

    // 2. Vérifier si l'app existe déjà (sauf pour l'explorateur qui peut avoir plusieurs instances)
    if (windows[id] && appName !== 'Explorer') {
      launchApp(id);
      onClose();
      return;
    }

    // 3. Configuration de base
    const baseWindow = {
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 99, // On met un z-index élevé pour qu'elle apparaisse devant
      defaultPosition: { x: 100 + Math.random() * 50, y: 50 + Math.random() * 50 }
    };

    // 4. Création de la fenêtre selon l'app
    switch (appName) {
      case 'Terminal':
        addWindow({ ...baseWindow, id: 'terminal', title: 'Terminal', icon: Terminal, component: <TerminalApp /> });
        break;
      case 'Browser':
        addWindow({ ...baseWindow, id: 'browser', title: 'Internet', icon: Globe, component: <BrowserApp />, defaultPosition: {x: 50, y: 50} });
        break;
      case 'Settings':
        addWindow({ ...baseWindow, id: 'settings', title: 'Paramètres', icon: Settings, component: <SettingsApp />, defaultPosition: { x: 100, y: 100 } });
        break;
      case 'Explorer':
        addWindow({ 
            ...baseWindow, 
            id: id, 
            title: 'Explorateur de fichiers', 
            icon: Folder, 
            component: <ExplorerApp initialPath="root" /> 
        });
        break;
      case 'About':
        addWindow({ ...baseWindow, id: 'about', title: 'À Propos', icon: UserIcon, component: <AboutApp />, defaultPosition: { x: 200, y: 100 } });
        break;
    case 'Projects':
        addWindow({ ...baseWindow, id: 'projects', title: 'Mes Projets', icon: LayoutGrid, component: <ProjectsApp />, defaultPosition: { x: 150, y: 80 } });
        break;
    }

    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute bottom-12 left-2 w-80 bg-gray-100/90 backdrop-blur-xl border border-white/50 rounded-lg shadow-2xl flex flex-col overflow-hidden z-[10000]"
    >
      {/* Header Profile */}
      <div className="bg-blue-600 p-4 flex items-center gap-3 text-white">
        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30">
          <UserIcon size={24} />
        </div>
        <div>
          <div className="font-bold text-sm">Invité</div>
          <div className="text-xs opacity-80">Administrateur</div>
        </div>
      </div>

      <div className="flex h-80">
        {/* Colonne Gauche : Applications */}
        <div className="flex-1 py-2 px-1 flex flex-col gap-1 bg-white/50">
          <div className="text-xs font-bold text-gray-500 px-3 py-1 uppercase">Applications</div>
          
          <button onClick={() => handleLaunch('Browser')} className="flex items-center gap-2 px-3 py-2 hover:bg-blue-500 hover:text-white rounded transition-colors text-sm text-gray-800 text-left">
            <Globe size={18} className="text-blue-500 group-hover:text-white" /> Internet
          </button>
          
          <button onClick={() => handleLaunch('Terminal')} className="flex items-center gap-2 px-3 py-2 hover:bg-blue-500 hover:text-white rounded transition-colors text-sm text-gray-800 text-left">
            <Terminal size={18} className="text-gray-700 group-hover:text-white" /> Terminal
          </button>
          
          <button onClick={() => handleLaunch('Explorer')} className="flex items-center gap-2 px-3 py-2 hover:bg-blue-500 hover:text-white rounded transition-colors text-sm text-gray-800 text-left">
            <Folder size={18} className="text-yellow-500 group-hover:text-white" /> Documents
          </button>

          <button onClick={() => handleLaunch('Projects')} className="flex items-center gap-2 px-3 py-2 hover:bg-blue-500 hover:text-white rounded transition-colors text-sm text-gray-800 text-left">
            <LayoutGrid size={18} className="text-purple-600 group-hover:text-white" /> Mes Projets
          </button>

          <button onClick={() => handleLaunch('About')} className="flex items-center gap-2 px-3 py-2 hover:bg-blue-500 hover:text-white rounded transition-colors text-sm text-gray-800 text-left">
            <UserIcon size={18} className="text-orange-500 group-hover:text-white" /> À Propos
          </button>

          
        </div>

        {/* Colonne Droite : Système */}
        <div className="w-32 bg-blue-50/50 border-l border-white/50 py-2 flex flex-col gap-1">
           <div className="text-xs font-bold text-gray-500 px-3 py-1 uppercase">Système</div>
           <button onClick={() => handleLaunch('Settings')} className="flex items-center gap-2 px-3 py-2 hover:bg-blue-200/50 transition-colors text-xs text-gray-600 text-left">
             <Settings size={14} /> Paramètres
           </button>
        </div>
      </div>

      {/* Footer : Power */}
      <div className="bg-gray-200/80 p-3 border-t border-white/50 flex justify-end">
        <button 
          onClick={() => window.location.reload()} 
          className="flex items-center gap-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded shadow-sm transition-colors"
        >
          <Power size={14} /> Éteindre
        </button>
      </div>
    </motion.div>
  );
};