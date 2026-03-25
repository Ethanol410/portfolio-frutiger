"use client";
import React, { useEffect, useState, useCallback } from "react";
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
import { AboutApp } from "./apps/About";
import { ContactApp } from "./apps/Contact";
import { MusicPlayerApp } from "./apps/MusicPlayer";
import { PaintApp } from "./apps/Paint";
import { PDFViewerApp } from "./apps/PDFViewer";
import { myComputer } from "./data/fileSystem";
import { BootScreen } from "./components/os/BootScreen";
import { NotificationToaster } from "./components/os/NotificationToaster";
import { AnimatePresence } from "framer-motion";
import { LockScreen } from "./components/os/LockScreen";
import { BSOD } from "./components/os/BSOD";
import { useSound } from "./hooks/useSound";
import { portfolio } from "./data/portfolio";
import {
  Monitor, Terminal, Globe, Folder, Settings, LayoutGrid,
  Mail, Music, Palette, User, FileText
} from "lucide-react";

// Vista icon mapping
const vistaIcons: Record<string, string> = {
  Terminal: "/icons/vista_console.ico",
  Internet: "/icons/chrome1.ico",
  "Mes Projets": "/icons/vista_book_1.ico",
  Musique: "/icons/wmp1.ico",
  Paramètres: "/icons/vista_personalization.ico",
  Contact: "/icons/wlm1.ico",
  "À Propos": "/icons/vista_info.ico",
  Paint: "/icons/photogallery.ico",
  "Mon CV": "/icons/vista_bench.ico",
};

export default function Desktop() {
  const { windows, addWindow, closeApp, activeWindowId, wallpaper, isLocked, isCrashed } = useOSStore();
  const [isBooting, setIsBooting] = useState(true);
  const { playStartup } = useSound();

  const handleLaunch = useCallback((appName: string, initialData?: any) => {
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
        addWindow({ ...baseWindow, id: 'browser', title: 'Internet', icon: Globe, component: <BrowserApp />, defaultPosition: { x: 50, y: 50 } });
        break;
      case 'Settings':
        addWindow({ ...baseWindow, id: 'settings', title: 'Paramètres', icon: Settings, component: <SettingsApp />, defaultPosition: { x: 100, y: 100 } });
        break;
      case 'Projects':
        addWindow({ ...baseWindow, id: 'projects', title: 'Mes Projets', icon: LayoutGrid, component: <ProjectsApp />, defaultSize: { width: 820, height: 580 } });
        break;
      case 'MusicPlayer':
        addWindow({ ...baseWindow, id: 'musicplayer', title: 'Lecteur Musique', icon: Music, component: <MusicPlayerApp />, defaultPosition: { x: 50, y: 200 } });
        break;
      case 'About':
        addWindow({ ...baseWindow, id: 'about', title: 'À Propos', icon: User, component: <AboutApp />, defaultPosition: { x: 200, y: 80 } });
        break;
      case 'Contact':
        addWindow({ ...baseWindow, id: 'contact', title: 'Me Contacter', icon: Mail, component: <ContactApp />, defaultPosition: { x: 300, y: 100 } });
        break;
      case 'Paint':
        addWindow({ ...baseWindow, id: 'paint', title: 'Paint', icon: Palette, component: <PaintApp />, defaultPosition: { x: 200, y: 150 } });
        break;
      case 'CV':
        addWindow({ ...baseWindow, id: 'cv', title: 'Mon CV', icon: FileText, component: <PDFViewerApp file="/cv.pdf" />, defaultPosition: { x: 120, y: 60 } });
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
    }
  }, [addWindow]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Alt+F4 — close active window
      if (e.altKey && e.key === 'F4') {
        e.preventDefault();
        if (activeWindowId) closeApp(activeWindowId);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeWindowId, closeApp]);

  useEffect(() => {
    addWindow({
      id: 'welcome',
      title: `Bienvenue — ${portfolio.fullName}`,
      icon: Monitor,
      component: (
        <div className="p-6 flex flex-col items-center text-center gap-4 h-full justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
          <img src={portfolio.avatar} alt={portfolio.fullName} className="w-20 h-20 rounded-full object-cover shadow-lg border-4 border-white" />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{portfolio.fullName}</h1>
            <p className="text-blue-600 font-medium mt-1">{portfolio.title}</p>
            <p className="text-gray-500 text-sm mt-2 max-w-xs">
              Bienvenue sur mon OS portfolio ! Explorez mes projets, compétences et contactez-moi.
            </p>
          </div>
          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={() => handleLaunch('Projects')}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition-colors shadow-sm"
            >
              Mes projets
            </button>
            <button
              onClick={() => handleLaunch('CV')}
              className="px-4 py-2 bg-gray-800 text-white text-sm rounded-full hover:bg-gray-700 transition-colors shadow-sm"
            >
              Mon CV
            </button>
            <button
              onClick={() => handleLaunch('Contact')}
              className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-full hover:bg-emerald-700 transition-colors shadow-sm"
            >
              Me contacter
            </button>
          </div>
        </div>
      ),
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 1,
      defaultPosition: { x: 100, y: 50 }
    });

    setTimeout(() => playStartup(), 1000);

    setTimeout(() => {
      useOSStore.getState().addNotification({
        title: "Système prêt",
        message: "Bienvenue sur EthanOS v1.1.0. Double-cliquez sur une icône pour démarrer.",
        type: 'info'
      });
    }, 4500);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (isCrashed) {
    return <BSOD onRestart={() => window.location.reload()} />;
  }

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
          <DesktopIcon name="À Propos" type="app" iconSrc={vistaIcons["À Propos"]} onDoubleClick={() => handleLaunch('About')} />
          <DesktopIcon name="Mes Projets" type="app" iconSrc={vistaIcons["Mes Projets"]} onDoubleClick={() => handleLaunch('Projects')} />
          <DesktopIcon name="Mon CV" type="app" iconSrc={vistaIcons["Mon CV"]} onDoubleClick={() => handleLaunch('CV')} />
          <DesktopIcon name="Contact" type="app" iconSrc={vistaIcons["Contact"]} onDoubleClick={() => handleLaunch('Contact')} />
          <DesktopIcon name="Terminal" type="app" iconSrc={vistaIcons["Terminal"]} onDoubleClick={() => handleLaunch('Terminal')} />
          <DesktopIcon name="Internet" type="app" iconSrc={vistaIcons["Internet"]} onDoubleClick={() => handleLaunch('Browser')} />
          <DesktopIcon name="Musique" type="app" iconSrc={vistaIcons["Musique"]} onDoubleClick={() => handleLaunch('MusicPlayer')} />
          <DesktopIcon name="Paramètres" type="app" iconSrc={vistaIcons["Paramètres"]} onDoubleClick={() => handleLaunch('Settings')} />

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
