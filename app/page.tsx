"use client";
import React, { useEffect, useState } from "react";
import { useOSStore } from "./store/useOSStore";
import { WindowFrame } from "./components/os/WindowFrame";
import { ContextMenu } from "./components/ui/ContextMenu";
import { Taskbar } from "./components/os/Taskbar";
import { DesktopIcon } from "./components/os/DesktopIcon";
import { TerminalApp } from "./apps/Terminal";
import { BrowserApp } from "./apps/Browser";
import { ExplorerApp } from "./apps/Explorer";
import { SettingsApp } from "./apps/Settings";
import { ProjectsApp } from "./apps/Projects";
import { myComputer } from "./data/fileSystem";
import { ContactApp } from "./apps/Contact";
import { MusicPlayerApp } from "./apps/MusicPlayer";
import { BootScreen } from "./components/os/BootScreen";
import { NotificationToaster } from "./components/os/NotificationToaster";
import { AnimatePresence } from "framer-motion";
import { LockScreen } from "./components/os/LockScreen";
import { PaintApp } from "./apps/Paint";
import { Monitor, Terminal, Globe, Folder, Settings, LayoutGrid, Mail, Music, Palette } from "lucide-react";
import { BSOD } from "./components/os/BSOD"; // <-- Import
import { useSound } from "./hooks/useSound"; // <-- Import Hook

export default function Desktop() {
  const { windows, addWindow, wallpaper, isLocked, isCrashed, setCrashed } = useOSStore(); // Récupérer isCrashed
  const [isBooting, setIsBooting] = useState(true);
  const { playStartup } = useSound();

  const handleLaunch = (appName: string, initialData?: any) => {
    const id = appName.toLowerCase();
    
    const baseWindow = {
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        zIndex: 10,
        defaultPosition: { x: 150 + Math.random() * 50, y: 100 + Math.random() * 50 }
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
        case 'MusicPlayer':
            addWindow({ ...baseWindow, id: 'musicplayer', title: 'Lecteur Musique', icon: Music, component: <MusicPlayerApp />, defaultPosition: { x: 50, y: 200 } });
            break;
        case 'Explorer':
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
        case 'Contact':
            addWindow({ ...baseWindow, id: 'contact', title: 'Me Contacter', icon: Mail, component: <ContactApp />, defaultPosition: { x: 300, y: 100 } });
        break;
        case 'Paint':
            addWindow({ ...baseWindow, id: 'paint', title: 'Paint', icon: Palette, component: <PaintApp />, defaultPosition: { x: 200, y: 150 } });
        break;
    }
  };

  useEffect(() => {
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
    
    // Jouer le son de démarrage un peu après
    setTimeout(() => {
        playStartup();
    }, 1000);

    setTimeout(() => {
      useOSStore.getState().addNotification({
        title: "Système prêt",
        message: "Bienvenue sur EthanOS. Tous les systèmes sont opérationnels.",
        type: 'info'
      });
    }, 4500); 
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Si l'OS a crashé
  if (isCrashed) {
    return <BSOD onRestart={() => window.location.reload()} />;
  }

  // Affichage du Boot Screen
  if (isBooting) {
    return <BootScreen onComplete={() => setIsBooting(false)} />;
  }

  return (
    <div 
      className="h-screen w-screen overflow-hidden relative bg-cover transition-all duration-500 font-sans select-none"
      style={{ backgroundImage: `url('${wallpaper}')` }}
    >
      <AnimatePresence>
        {isLocked && <LockScreen />}
      </AnimatePresence>
      
      <div className={`h-full w-full ${isLocked ? "blur-sm scale-105 transition-all duration-700" : "transition-all duration-700 scale-100 blur-0"}`}>
        
        <NotificationToaster />
        <ContextMenu />
      
        <div className="absolute top-0 left-0 p-4 flex flex-col flex-wrap gap-4 h-[calc(100vh-40px)] content-start z-0">
          <DesktopIcon name="Terminal" type="app" onDoubleClick={() => handleLaunch('Terminal')} />
          <DesktopIcon name="Internet" type="app" onDoubleClick={() => handleLaunch('Browser')} />
          <DesktopIcon name="Mes Projets" type="app" onDoubleClick={() => handleLaunch('Projects')} />
          <DesktopIcon name="Musique" type="app" onDoubleClick={() => handleLaunch('MusicPlayer')} />
          <DesktopIcon name="Paramètres" type="app" onDoubleClick={() => handleLaunch('Settings')} />
          <DesktopIcon name="Contact" type="app" onDoubleClick={() => handleLaunch('Contact')} />
          
          {myComputer.map((node) => (
            <DesktopIcon
              key={node.id}
              name={node.name}
              type={node.type as any}
              onDoubleClick={() => handleLaunch('Explorer', node.id)}
            />
          ))}
        </div>

        {Object.values(windows).map((win) => (
          <WindowFrame key={win.id} window={win} />
        ))}
        
        <Taskbar />
      </div>
    </div>
  );
}