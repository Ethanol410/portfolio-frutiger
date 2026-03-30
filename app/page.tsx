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
  Terminal: "/icons/window-vista/vista_console.ico",
  Internet: "/icons/chrome1.ico",
  "Mes Projets": "/icons/window-vista/vista_book_1.ico",
  Musique: "/icons/wmp1.ico",
  Paramètres: "/icons/window-vista/vista_personalization.ico",
  Contact: "/icons/wlm1.ico",
  "À Propos": "/icons/window-vista/vista_info.ico",
  Paint: "/icons/photogallery.ico",
  "Mon CV": "/icons/window-vista/vista_bench.ico",
  "Ethan IA": "/icons/window-vista/vista_collab.ico",
  Recherche: "/icons/window-vista/vista_search_globe.ico",
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
        <div className="h-full flex flex-col items-center justify-center text-center px-6 py-6 gap-4 relative overflow-hidden" style={{
          background: 'linear-gradient(160deg, #e4f3fd 0%, #d6ebfa 45%, #eef7ff 100%)',
        }}>
          {/* Orbes lumineux Frutiger Aero */}
          <div className="absolute rounded-full pointer-events-none" style={{
            width: 280, height: 280,
            background: 'radial-gradient(circle, rgba(100,195,255,0.28) 0%, transparent 70%)',
            top: -80, right: -80,
          }} />
          <div className="absolute rounded-full pointer-events-none" style={{
            width: 220, height: 220,
            background: 'radial-gradient(circle, rgba(150,220,255,0.22) 0%, transparent 70%)',
            bottom: -50, left: -50,
          }} />

          {/* Avatar — anneau glass aqua */}
          <div className="relative">
            <div style={{
              background: 'rgba(255,255,255,0.65)',
              border: '3px solid rgba(150,210,255,0.65)',
              boxShadow: '0 6px 20px rgba(80,150,220,0.2), inset 0 1px 0 rgba(255,255,255,0.95)',
              borderRadius: '50%',
              padding: 3,
            }}>
              <img
                src={portfolio.avatar}
                alt={portfolio.fullName}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            <div
              className="absolute -bottom-1 -right-1 text-white text-[10px] font-bold px-2 py-0.5 rounded-full"
              style={{
                background: 'linear-gradient(145deg, #4ade80 0%, #16a34a 100%)',
                boxShadow: '0 2px 6px rgba(22,163,74,0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
                border: '2px solid rgba(255,255,255,0.85)',
              }}
            >
              DISPO
            </div>
          </div>

          {/* Identité */}
          <div>
            <h1 className="text-2xl font-black text-blue-950 tracking-tight">{portfolio.fullName}</h1>
            <p className="text-blue-600 font-semibold text-sm mt-1">{portfolio.title}</p>
            <p className="text-blue-400/80 text-xs mt-1">{portfolio.location}</p>
          </div>

          {/* Tagline — carte glass */}
          <div className="rounded-2xl px-5 py-3 max-w-xs" style={{
            background: 'rgba(255,255,255,0.62)',
            border: '1px solid rgba(150,210,255,0.5)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.95), 0 2px 8px rgba(80,150,220,0.07)',
            backdropFilter: 'blur(8px)',
          }}>
            <p className="text-blue-800/75 text-sm leading-relaxed">
              Je construis des interfaces intelligentes qui croisent{' '}
              <span className="text-cyan-600 font-semibold">IA</span>{' '}
              et{' '}
              <span className="text-blue-700 font-semibold">développement web</span>.
            </p>
          </div>

          {/* Disponibilité */}
          <div className="flex items-center gap-2 rounded-full px-4 py-1.5" style={{
            background: 'rgba(235,255,245,0.85)',
            border: '1px solid rgba(100,220,140,0.4)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
          }}>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-emerald-700 text-xs font-medium">{portfolio.availability.label}</span>
          </div>

          {/* Actions — boutons Aero glossy */}
          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => handleLaunch('Projects')}
              className="px-4 py-2 text-white text-sm rounded-full font-medium transition-all hover:brightness-110 active:scale-95"
              style={{
                background: 'linear-gradient(180deg, #63b8f6 0%, #1976d2 55%, #1254a0 100%)',
                boxShadow: '0 3px 8px rgba(25,118,210,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
              }}
            >
              Mes projets
            </button>
            <button
              onClick={() => handleLaunch('AIChat')}
              className="px-4 py-2 text-white text-sm rounded-full font-medium transition-all hover:brightness-110 active:scale-95 flex items-center gap-1.5"
              style={{
                background: 'linear-gradient(180deg, #a78bfa 0%, #7c3aed 55%, #5b21b6 100%)',
                boxShadow: '0 3px 8px rgba(109,40,217,0.28), inset 0 1px 0 rgba(255,255,255,0.35)',
              }}
            >
              <Sparkles size={13} /> Ethan IA
            </button>
            <button
              onClick={() => handleLaunch('CV')}
              className="px-4 py-2 text-blue-700 text-sm rounded-full font-medium transition-all hover:brightness-95 active:scale-95"
              style={{
                background: 'rgba(255,255,255,0.82)',
                border: '1px solid rgba(150,200,255,0.6)',
                boxShadow: '0 2px 6px rgba(80,150,220,0.1), inset 0 1px 0 rgba(255,255,255,0.95)',
              }}
            >
              Mon CV
            </button>
            <button
              onClick={() => handleLaunch('Contact')}
              className="px-4 py-2 text-white text-sm rounded-full font-medium transition-all hover:brightness-110 active:scale-95"
              style={{
                background: 'linear-gradient(180deg, #6ee7a0 0%, #16a34a 55%, #15803d 100%)',
                boxShadow: '0 3px 8px rgba(22,163,74,0.28), inset 0 1px 0 rgba(255,255,255,0.4)',
              }}
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
