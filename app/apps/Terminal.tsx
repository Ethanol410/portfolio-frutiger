import React, { useState, useRef, useEffect } from 'react';
import { useOSStore } from '@/app/store/useOSStore';

export const TerminalApp = () => {
  const { launchApp, setWallpaper, closeApp, windows, setCrashed } = useOSStore(); // <-- Hooks du store
  const [history, setHistory] = useState<string[]>(["Bienvenue sur EthanOS v1.0", "Tapez 'help'."]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim();
      const args = cmd.split(' ');
      const mainCmd = args[0].toLowerCase();
      let response = "";
      
      switch(mainCmd) {
        case 'help': 
            response = "Commandes: open [app], close [id], wallpaper [url], clear, reboot, whoami"; 
            break;
        case 'whoami': response = "Admin (Ethan)"; break;
        case 'open':
            if(args[1]) {
                const appMap: Record<string, string> = {
                    'terminal': 'Terminal',
                    'browser': 'Browser',
                    'settings': 'Settings',
                    'projects': 'Projects',
                    'music': 'MusicPlayer',
                    'contact': 'Contact'
                };
                // Simuler un appel depuis le store n'est pas possible directement ici pour launchApp car il prend un ID, 
                // mais launchApp dans le store ne CREE pas la fenêtre.
                // Pour simplifier dans cet exemple, on ne fait que des logs ou actions simples
                // Idéalement, il faudrait que launchApp gère la création si inexistant, comme dans StartMenu.
                response = "Fonction open complète à venir (utiliser le menu démarrer pour l'instant).";
            } else response = "Usage: open [app name]";
            break;
        case 'close':
             if(args[1] && windows[args[1]]) {
                closeApp(args[1]);
                response = `Fermeture de ${args[1]}...`;
             } else response = "ID introuvable ou manquant.";
             break;
        case 'wallpaper':
            if(args[1]) {
                setWallpaper(args[1]);
                response = "Fond d'écran mis à jour.";
            } else response = "Usage: wallpaper [url]";
            break;
        case 'reboot':
            window.location.reload();
            break;
        case 'rm':
            if(args[1] === '-rf' && args[2] === '/') {
                setCrashed(true); // Déclenche le BSOD
                return;
            }
            response = "Permission denied.";
            break;
        case 'clear': setHistory([]); setInput(""); return;
        default: response = `Commande inconnue: ${cmd}`;
      }
      
      setHistory([...history, `> ${input}`, response]);
      setInput("");
    }
  };

  useEffect(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }), [history]);

  return (
    <div className="bg-black text-green-400 font-mono text-sm h-full p-2 overflow-y-auto" onClick={() => document.getElementById('term-input')?.focus()}>
      {history.map((line, i) => <div key={i}>{line}</div>)}
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