"use client";
import React, { useEffect } from "react";
import { useOSStore } from "./store/useOSStore";
import { WindowFrame } from "./components/os/WindowFrame";
import { ContextMenu } from "./components/ui/ContextMenu";
import { Taskbar } from "./components/os/Taskbar";
import { DesktopIcon } from "./components/os/DesktopIcon";
import { TerminalApp } from "./apps/Terminal";
import { BrowserApp } from "./apps/Browser"; // <-- Import du navigateur
import { ExplorerApp } from "./apps/Explorer"; // <-- Import de l'explorateur
import { SettingsApp } from "./apps/Settings";
import { ProjectsApp } from "./apps/Projects";
import { myComputer } from "./data/fileSystem";
import { Monitor, Terminal, Globe, Folder, Settings, LayoutGrid } from "lucide-react"; // Globe pour internet

export default function Desktop() {
  const { windows, addWindow, wallpaper } = useOSStore(); // On utilise addWindow maintenant

  // Fonction pour lancer des apps spécifiques
  const handleLaunch = (appName: string, initialData?: any) => {
    const id = appName.toLowerCase();
    
    // Config de base pour une nouvelle fenêtre
    const baseWindow = {
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: 10,
        defaultPosition: { x: 150 + Math.random() * 50, y: 100 + Math.random() * 50 } // Position un peu aléatoire pour l'effet cascade
    };

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
        case 'Projects':
            addWindow({ ...baseWindow, id: 'projects', title: 'Mes Projets', icon: LayoutGrid, component: <ProjectsApp /> });
            break;
        case 'Explorer':
            // Pour l'explorateur, on peut avoir plusieurs fenêtres si on veut (id unique)
            const folderId = initialData || 'root';
            const winId = `explorer-${folderId}-${Date.now()}`;
            addWindow({ 
                ...baseWindow, 
                id: winId, 
                title: 'Explorateur de fichiers', 
                icon: Folder, 
                component: <ExplorerApp initialPath={folderId} /> 
            });
            break;
    }
  };

  useEffect(() => {
    // On initialise juste le message de bienvenue au démarrage
    addWindow({
       id: 'welcome',
       title: 'Bienvenue',
       icon: Monitor,
       component: <div className="p-4 text-center">
         <h1 className="text-2xl font-bold mb-2">Bienvenue sur ton OS !</h1>
         <p>Explore les dossiers ou lance le Terminal.</p>
       </div>,
       isOpen: true,
       isMinimized: false,
       isMaximized: false,
       zIndex: 1,
       defaultPosition: { x: 100, y: 50 }
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div 
  className="h-screen w-screen overflow-hidden relative bg-cover transition-all duration-500 font-sans select-none"
  style={{ backgroundImage: `url('${wallpaper}')` }} // <-- C'est ici que la magie opère
  >
      <ContextMenu />
      
      {/* Grille des icônes */}
      <div className="absolute top-0 left-0 p-4 flex flex-col flex-wrap gap-4 h-[calc(100vh-40px)] content-start z-0">
        
        {/* Apps Système */}
        <DesktopIcon name="Terminal" type="app" onDoubleClick={() => handleLaunch('Terminal')} />
        <DesktopIcon name="Internet" type="app" onDoubleClick={() => handleLaunch('Browser')} />
        <DesktopIcon name="Mes Projets" type="app" onDoubleClick={() => handleLaunch('Projects')} />

        {/* Dossiers du FileSystem */}
        {myComputer.map((node) => (
          <DesktopIcon 
            key={node.id} 
            name={node.name} 
            type={node.type as any} 
            onDoubleClick={() => handleLaunch('Explorer', node.id)} 
          />
        ))}
      </div>

      {/* Fenêtres */}
      {Object.values(windows).map((win) => (
        <WindowFrame key={win.id} window={win} />
      ))}

      <Taskbar />
    </div>
  );
}