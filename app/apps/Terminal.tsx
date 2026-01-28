import React, { useState, useRef, useEffect } from 'react';

export const TerminalApp = () => {
  const [history, setHistory] = useState<string[]>(["Bienvenue sur EthanOS v1.0", "Tapez 'help' pour commencer."]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  const handleCommand = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let response = "";
      
      switch(cmd) {
        case 'help': response = "Commandes: help, clear, whoami, contact, ls"; break;
        case 'whoami': response = "Admin (Ethan)"; break;
        case 'clear': setHistory([]); setInput(""); return;
        case 'ls': response = "Documents  Images  Desktop"; break;
        case 'contact': response = "Email: ethan@example.com"; break;
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