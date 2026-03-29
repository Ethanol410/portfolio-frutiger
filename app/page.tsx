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
import { AIChatApp } from "./apps/AIChat";
import { ResearchApp } from "./apps/Research";
import { myComputer } from "./data/fileSystem";
import { BootScreen } from "./components/os/BootScreen";
import { NotificationToaster } from "./components/os/NotificationToaster";
import { AnimatePresence, motion } from "framer-motion";
import { MatrixRain } from "./components/os/MatrixRain";
import { LockScreen } from "./components/os/LockScreen";
import { BSOD } from "./components/os/BSOD";
import { useSound } from "./hooks/useSound";
import { portfolio } from "./data/portfolio";
import {
  Monitor, Terminal, Globe, Folder, Settings, LayoutGrid,
  Mail, Music, Palette, User, FileText, Sparkles, FlaskConical
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
  "Ethan IA": "/icons/vista_info.ico",
};

export default function Desktop() {
  const { windows, addWindow, closeApp, activeWindowId, wallpaper, isLocked, isCrashed } = useOSStore();
  const [isBooting, setIsBooting] = useState(true);
  const [showMatrix, setShowMatrix] = useState(false);
  const { playStartup } = useSound();

  // Expose matrix mode pour le Terminal
  useEffect(() => {
    (window as any).__matrixMode = () => setShowMatrix(true);
    return () => { delete (window as any).__matrixMode; };
  }, []);

  // Konami code
  useEffect(() => {
    const KONAMI = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let pos = 0;
    const handler = (e: KeyboardEvent) => {
      if (e.key === KONAMI[pos]) {
        pos++;
        if (pos === KONAMI.length) {
          setShowMatrix(true);
          pos = 0;
        }
      } else {
        pos = 0;
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

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
      case 'AIChat':
        addWindow({ ...baseWindow, id: 'aichat', title: 'Ethan IA', icon: Sparkles, component: <AIChatApp />, defaultPosition: { x: 250, y: 80 }, defaultSize: { width: 420, height: 560 } });
        break;
      case 'Research':
        addWindow({ ...baseWindow, id: 'research', title: 'Recherche', icon: FlaskConical, component: <ResearchApp />, defaultPosition: { x: 200, y: 60 }, defaultSize: { width: 520, height: 580 } });
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
        <div className="h-full flex flex-col items-center justify-center text-center bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-900 text-white px-6 py-8 gap-5 relative overflow-hidden">
          {/* Cercles décoratifs Frutiger Aero */}
          <div className="absolute w-64 h-64 rounded-full bg-blue-500/10 blur-3xl top-0 right-0 pointer-events-none" />
          <div className="absolute w-48 h-48 rounded-full bg-cyan-400/10 blur-2xl bottom-0 left-0 pointer-events-none" />

          {/* Avatar */}
          <div className="relative">
            <img
              src={portfolio.avatar}
              alt={portfolio.fullName}
              className="w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-2xl shadow-blue-900/50"
            />
            <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-lg border-2 border-slate-900">
              DISPO
            </div>
          </div>

          {/* Identité */}
          <div>
            <h1 className="text-2xl font-black tracking-tight">{portfolio.fullName}</h1>
            <p className="text-blue-300 font-medium text-sm mt-1">{portfolio.title}</p>
            <p className="text-slate-400 text-xs mt-2">{portfolio.location}</p>
          </div>

          {/* Tagline */}
          <p className="text-slate-300 text-sm max-w-xs leading-relaxed">
            Je construis des interfaces intelligentes qui croisent <span className="text-cyan-300 font-semibold">IA</span> et <span className="text-blue-300 font-semibold">développement web</span>.
          </p>

          {/* Disponibilité */}
          <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-4 py-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-300 text-xs font-medium">{portfolio.availability.label}</span>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => handleLaunch('Projects')}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm rounded-full transition-colors shadow-md shadow-blue-900/50 font-medium"
            >
              Mes projets
            </button>
            <button
              onClick={() => handleLaunch('AIChat')}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm rounded-full transition-colors shadow-md font-medium flex items-center gap-1.5"
            >
              <Sparkles size={13} /> Ethan IA
            </button>
            <button
              onClick={() => handleLaunch('CV')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-full transition-colors border border-white/20 font-medium"
            >
              Mon CV
            </button>
            <button
              onClick={() => handleLaunch('Contact')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm rounded-full transition-colors shadow-md font-medium"
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
      defaultPosition: { x: 80, y: 40 },
      defaultSize: { width: 380, height: 520 }
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

  if (showMatrix) {
    return <MatrixRain onExit={() => setShowMatrix(false)} />;
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

        {/* Bureau — colonne gauche : apps portfolio en premier */}
        <div className="absolute top-0 left-0 p-4 flex flex-col gap-3 z-0">
          {/* Priorité portfolio */}
          <DesktopIcon name="Ethan IA"    type="app" iconSrc={vistaIcons["Ethan IA"]}    onDoubleClick={() => handleLaunch('AIChat')} />
          <DesktopIcon name="À Propos"    type="app" iconSrc={vistaIcons["À Propos"]}    onDoubleClick={() => handleLaunch('About')} />
          <DesktopIcon name="Mes Projets" type="app" iconSrc={vistaIcons["Mes Projets"]} onDoubleClick={() => handleLaunch('Projects')} />
          <DesktopIcon name="Mon CV"      type="app" iconSrc={vistaIcons["Mon CV"]}      onDoubleClick={() => handleLaunch('CV')} />
          <DesktopIcon name="Contact"     type="app" iconSrc={vistaIcons["Contact"]}     onDoubleClick={() => handleLaunch('Contact')} />
          <DesktopIcon name="Recherche"   type="app" iconSrc={vistaIcons["À Propos"]}    onDoubleClick={() => handleLaunch('Research')} />
        </div>

        {/* Bureau — colonne gauche suite : recherche */}
        {/* (ajouté dans la colonne gauche en fin) */}

        {/* Bureau — colonne droite : apps système */}
        <div className="absolute top-0 right-0 p-4 flex flex-col gap-3 z-0">
          <DesktopIcon name="Terminal"   type="app" iconSrc={vistaIcons["Terminal"]}   onDoubleClick={() => handleLaunch('Terminal')} />
          <DesktopIcon name="Internet"   type="app" iconSrc={vistaIcons["Internet"]}   onDoubleClick={() => handleLaunch('Browser')} />
          <DesktopIcon name="Musique"    type="app" iconSrc={vistaIcons["Musique"]}    onDoubleClick={() => handleLaunch('MusicPlayer')} />
          <DesktopIcon name="Paramètres" type="app" iconSrc={vistaIcons["Paramètres"]} onDoubleClick={() => handleLaunch('Settings')} />
          {myComputer.map((node) => (
            <DesktopIcon
              key={node.id}
              name={node.name}
              type={node.type as "app" | "folder" | "file"}
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
