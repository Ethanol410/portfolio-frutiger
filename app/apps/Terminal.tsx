import React, { useState, useRef, useEffect } from 'react';
import { useOSStore } from '@/app/store/useOSStore';
import { Terminal, Globe, Settings, LayoutGrid, Mail, Music, Palette, User } from 'lucide-react';
import { BrowserApp } from './Browser';
import { SettingsApp } from './Settings';
import { ProjectsApp } from './Projects';
import { MusicPlayerApp } from './MusicPlayer';
import { ContactApp } from './Contact';
import { AboutApp } from './About';
import { useSound } from '@/app/hooks/useSound';
import { useHaptics } from '@/app/hooks/useHaptics';

type LineType = 'output' | 'input' | 'error' | 'success' | 'info';

interface TerminalLine {
  text: string;
  type: LineType;
}

const NEOFETCH = [
  { text: "    ███████╗████████╗██╗  ██╗ █████╗ ███╗  ██╗", type: 'info' as LineType },
  { text: "    ██╔════╝╚══██╔══╝██║  ██║██╔══██╗████╗ ██║", type: 'info' as LineType },
  { text: "    █████╗     ██║   ███████║███████║██╔██╗██║", type: 'info' as LineType },
  { text: "    ██╔══╝     ██║   ██╔══██║██╔══██║██║╚████║", type: 'info' as LineType },
  { text: "    ███████╗   ██║   ██║  ██║██║  ██║██║ ╚███║", type: 'info' as LineType },
  { text: "    ╚══════╝   ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚══╝", type: 'info' as LineType },
  { text: "", type: 'output' as LineType },
  { text: "  OS       EthanOS v1.1.0", type: 'output' as LineType },
  { text: "  Kernel   Next.js 16 / React 19", type: 'output' as LineType },
  { text: "  Shell    bash (EthanOS Terminal)", type: 'output' as LineType },
  { text: "  WM       Zustand Window Manager", type: 'output' as LineType },
  { text: "  CPU      TypeScript — 64 bits", type: 'output' as LineType },
  { text: "  Stack    Next.js · Tailwind · Framer Motion", type: 'output' as LineType },
  { text: "  User     Ethan Collin", type: 'output' as LineType },
  { text: "", type: 'output' as LineType },
];

const LINE_COLORS: Record<LineType, string> = {
  output: 'text-green-400',
  input:  'text-white',
  error:  'text-red-400',
  success:'text-emerald-400',
  info:   'text-cyan-400',
};

export const TerminalApp = () => {
  const { addWindow, setWallpaper, closeApp, windows, setCrashed } = useOSStore();
  const { playError } = useSound();
  const { error: hapticError, nudge: hapticNudge } = useHaptics();

  const [lines, setLines] = useState<TerminalLine[]>([
    { text: "Bienvenue sur EthanOS v1.1.0", type: 'success' },
    { text: "Tapez 'help' pour afficher les commandes disponibles.", type: 'output' },
  ]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const endRef = useRef<HTMLDivElement>(null);

  const pushLines = (newLines: TerminalLine[]) => {
    setLines(prev => [...prev, ...newLines]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(next);
      setInput(cmdHistory[next] ?? '');
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = historyIndex - 1;
      setHistoryIndex(next);
      setInput(next < 0 ? '' : cmdHistory[next]);
      return;
    }

    if (e.key !== 'Enter') return;

    const cmd = input.trim();
    const args = cmd.split(' ');
    const mainCmd = args[0].toLowerCase();

    if (cmd) {
      setCmdHistory(prev => [cmd, ...prev]);
      setHistoryIndex(-1);
    }

    const inputLine: TerminalLine = { text: `> ${input}`, type: 'input' };

    if (mainCmd === '' || !cmd) {
      pushLines([inputLine]);
      setInput('');
      return;
    }

    let response: TerminalLine[] = [];

    switch (mainCmd) {
      case 'help':
        response = [
          { text: "Commandes disponibles :", type: 'info' },
          { text: "  open [app]       — ouvrir une application", type: 'output' },
          { text: "  close [id]       — fermer une fenêtre par ID", type: 'output' },
          { text: "  wallpaper [url]  — changer le fond d'écran", type: 'output' },
          { text: "  whoami           — afficher l'utilisateur", type: 'output' },
          { text: "  ls               — lister les fenêtres ouvertes", type: 'output' },
          { text: "  date             — afficher la date et l'heure", type: 'output' },
          { text: "  echo [texte]     — afficher du texte", type: 'output' },
          { text: "  neofetch         — infos système", type: 'output' },
          { text: "  clear            — vider le terminal", type: 'output' },
          { text: "  reboot           — redémarrer l'OS", type: 'output' },
          { text: "", type: 'output' },
          { text: "  Apps: browser, terminal, settings, projects, music, contact, about", type: 'info' },
        ];
        break;

      case 'neofetch':
        response = NEOFETCH;
        break;

      case 'whoami':
        response = [{ text: "ethan@ethanos — Administrateur", type: 'success' }];
        break;

      case 'date':
        response = [{ text: new Date().toLocaleString('fr-FR'), type: 'info' }];
        break;

      case 'echo':
        response = [{ text: args.slice(1).join(' ') || '', type: 'output' }];
        break;

      case 'ls': {
        const openWindows = Object.values(windows).filter(w => w.isOpen);
        if (openWindows.length === 0) {
          response = [{ text: "Aucune fenêtre ouverte.", type: 'output' }];
        } else {
          response = openWindows.map(w => ({ text: `  [${w.id}] ${w.title}`, type: 'info' as LineType }));
        }
        break;
      }

      case 'open': {
        if (!args[1]) {
          response = [
            { text: "Usage: open [app]", type: 'error' },
            { text: "Apps: browser, terminal, settings, projects, music, contact, about", type: 'output' },
          ];
          break;
        }
        const appMap: Record<string, { id: string; title: string; icon: React.ElementType; component: React.ReactNode }> = {
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
            defaultPosition: { x: 150 + Math.random() * 100, y: 80 + Math.random() * 80 },
          });
          response = [{ text: `Ouverture de ${app.title}...`, type: 'success' }];
          hapticNudge();
        } else {
          playError();
          hapticError();
          response = [{ text: `App inconnue: '${args[1]}'. Tapez 'help'.`, type: 'error' }];
        }
        break;
      }

      case 'close':
        if (args[1] && windows[args[1]]) {
          closeApp(args[1]);
          response = [{ text: `Fermeture de '${args[1]}'...`, type: 'success' }];
        } else {
          response = [{ text: "ID introuvable. Utilisez 'ls' pour voir les fenêtres ouvertes.", type: 'error' }];
        }
        break;

      case 'wallpaper':
        if (args[1]) {
          setWallpaper(args[1]);
          response = [{ text: "Fond d'écran mis à jour.", type: 'success' }];
        } else {
          response = [{ text: "Usage: wallpaper [url]", type: 'error' }];
        }
        break;

      case 'reboot':
        window.location.reload();
        break;

      case 'rm':
        if (args[1] === '-rf' && args[2] === '/') {
          hapticError();
          setCrashed(true);
          return;
        }
        playError();
        hapticError();
        response = [{ text: "Permission denied.", type: 'error' }];
        break;

      case 'clear':
        setLines([]);
        setInput('');
        return;

      default:
        playError();
        hapticError();
        response = [{ text: `Commande inconnue: '${cmd}'. Tapez 'help'.`, type: 'error' }];
    }

    pushLines([inputLine, ...response]);
    setInput('');
  };

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [lines]);

  return (
    <div
      className="bg-black font-mono text-sm h-full p-2 overflow-y-auto"
      onClick={() => document.getElementById('term-input')?.focus()}
    >
      {lines.map((line, i) => (
        <div key={i} className={LINE_COLORS[line.type]}>
          {line.text || '\u00A0'}
        </div>
      ))}
      <div className="flex text-green-400">
        <span>{'>'}</span>
        <input
          id="term-input"
          className="bg-transparent border-none outline-none flex-1 ml-2 text-white caret-green-400"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          spellCheck={false}
        />
      </div>
      <div ref={endRef} />
    </div>
  );
};
