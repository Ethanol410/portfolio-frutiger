import React, { useState, useRef, useEffect } from 'react';
import { useOSStore } from '@/app/store/useOSStore';
import { Terminal, Globe, Settings, LayoutGrid, Mail, Music, Palette, User, Folder } from 'lucide-react';
import { BrowserApp } from './Browser';
import { SettingsApp } from './Settings';
import { ProjectsApp } from './Projects';
import { MusicPlayerApp } from './MusicPlayer';
import { ContactApp } from './Contact';
import { AboutApp } from './About';
import { useSound } from '@/app/hooks/useSound';

export const TerminalApp = () => {
  const { addWindow, setWallpaper, closeApp, windows, setCrashed } = useOSStore();
  const { playError } = useSound();
  const [history, setHistory] = useState<string[]>([
    "Bienvenue sur EthanOS v1.1.0",
    "Tapez 'help' pour afficher les commandes disponibles."
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      const args = cmd.split(' ');
      const mainCmd = args[0].toLowerCase();
      let response = "";

      switch (mainCmd) {
        case 'help':
          response = [
            "Commandes disponibles :",
            "  open [app]       — ouvrir une application",
            "  close [id]       — fermer une fenêtre par ID",
            "  wallpaper [url]  — changer le fond d'écran",
            "  whoami           — afficher l'utilisateur",
            "  ls               — lister les fenêtres ouvertes",
            "  clear            — vider le terminal",
            "  reboot           — redémarrer l'OS",
            "",
            "Apps: browser, terminal, settings, projects, music, contact, about"
          ].join("\n");
          break;

        case 'whoami':
          response = "Administrateur — EthanOS v1.1.0";
          break;

        case 'ls':
          const openWindows = Object.values(windows).filter(w => w.isOpen);
          if (openWindows.length === 0) {
            response = "Aucune fenêtre ouverte.";
          } else {
            response = openWindows.map(w => `  [${w.id}] ${w.title}`).join("\n");
          }
          break;

        case 'open': {
          if (!args[1]) {
            response = "Usage: open [app]\nApps: browser, terminal, settings, projects, music, contact, about";
            break;
          }
          const appMap: Record<string, { id: string; title: string; icon: any; component: React.ReactNode }> = {
            browser:   { id: 'browser',     title: 'Internet',        icon: Globe,      component: <BrowserApp /> },
            terminal:  { id: 'terminal2',   title: 'Terminal',        icon: Terminal,   component: <TerminalApp /> },
            settings:  { id: 'settings',    title: 'Paramètres',      icon: Settings,   component: <SettingsApp /> },
            projects:  { id: 'projects',    title: 'Mes Projets',     icon: LayoutGrid, component: <ProjectsApp /> },
            music:     { id: 'musicplayer', title: 'Lecteur Musique', icon: Music,      component: <MusicPlayerApp /> },
            contact:   { id: 'contact',     title: 'Me Contacter',    icon: Mail,       component: <ContactApp /> },
            about:     { id: 'about',       title: 'À Propos',        icon: User,       component: <AboutApp /> },
          };
          const app = appMap[args[1].toLowerCase()];
          if (app) {
            addWindow({
              ...app,
              isOpen: true,
              isMinimized: false,
              isMaximized: false,
              zIndex: 100,
              defaultPosition: { x: 150 + Math.random() * 100, y: 80 + Math.random() * 80 }
            });
            response = `Ouverture de ${app.title}...`;
          } else {
            playError();
            response = `App inconnue: '${args[1]}'. Utilisez: browser, terminal, settings, projects, music, contact, about`;
          }
          break;
        }

        case 'close':
          if (args[1] && windows[args[1]]) {
            closeApp(args[1]);
            response = `Fermeture de '${args[1]}'...`;
          } else {
            response = "ID introuvable. Utilisez 'ls' pour voir les fenêtres ouvertes.";
          }
          break;

        case 'wallpaper':
          if (args[1]) {
            setWallpaper(args[1]);
            response = "Fond d'écran mis à jour.";
          } else {
            response = "Usage: wallpaper [url]";
          }
          break;

        case 'reboot':
          window.location.reload();
          break;

        case 'rm':
          if (args[1] === '-rf' && args[2] === '/') {
            setCrashed(true);
            return;
          }
          playError();
          response = "Permission denied.";
          break;

        case 'clear':
          setHistory([]);
          setInput("");
          return;

        case '':
          setInput("");
          return;

        default:
          playError();
          response = `Commande inconnue: '${cmd}'. Tapez 'help'.`;
      }

      setHistory(prev => [...prev, `> ${input}`, ...response.split("\n")]);
      setInput("");
    }
  };

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [history]);

  return (
    <div
      className="bg-black text-green-400 font-mono text-sm h-full p-2 overflow-y-auto"
      onClick={() => document.getElementById('term-input')?.focus()}
    >
      {history.map((line, i) => <div key={i}>{line || '\u00A0'}</div>)}
      <div className="flex">
        <span>{'>'}</span>
        <input
          id="term-input"
          className="bg-transparent border-none outline-none flex-1 ml-2 text-green-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleCommand}
          autoFocus
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};
