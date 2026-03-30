'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { useOSStore } from '@/app/store/useOSStore';
import { AboutApp } from './About';
import { ProjectsApp } from './Projects';
import { ContactApp } from './Contact';
import { PDFViewerApp } from './PDFViewer';
import { LayoutGrid, Mail, FileText } from 'lucide-react';
import { User as UserIconLucide } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  "Quelles sont tes compétences en IA ?",
  "Parle-moi de tes projets",
  "Tu es disponible quand ?",
  "Montre-moi ton CV",
];

export const AIChatApp = () => {
  const { addWindow } = useOSStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleAction = (action: { type: string; app: string }) => {
    if (action.type !== 'open') return;
    const base = {
      isOpen: true, isMinimized: false, isMaximized: false, zIndex: 200,
      defaultPosition: { x: 180 + Math.random() * 60, y: 80 + Math.random() * 40 },
    };
    switch (action.app) {
      case 'projects':
        addWindow({ ...base, id: 'projects', title: 'Mes Projets', icon: LayoutGrid, component: <ProjectsApp />, defaultSize: { width: 820, height: 580 } });
        break;
      case 'about':
        addWindow({ ...base, id: 'about', title: 'À Propos', icon: UserIconLucide, component: <AboutApp /> });
        break;
      case 'contact':
        addWindow({ ...base, id: 'contact', title: 'Me Contacter', icon: Mail, component: <ContactApp /> });
        break;
      case 'cv':
        addWindow({ ...base, id: 'cv', title: 'Mon CV', icon: FileText, component: <PDFViewerApp file="/cv.pdf" /> });
        break;
    }
  };

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: 'user', content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      if (data.action) handleAction(data.action);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: "Désolé, une erreur s'est produite." }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="h-full flex flex-col aero-app overflow-hidden">

      {/* Header — bande aqua glossy */}
      <div
        className="px-4 py-3 shrink-0 flex items-center gap-3"
        style={{
          background: 'linear-gradient(180deg, #cce9ff 0%, #a8d8f8 50%, #7fc4f0 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.7)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 4px rgba(80,160,220,0.2)',
        }}
      >
        {/* Icône avec reflet aqua */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #5bbef5 0%, #2196f3 55%, #0d6fba 100%)',
            boxShadow: '0 2px 8px rgba(30,100,200,0.35), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          {/* Reflet brillant */}
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-full"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)' }} />
          <Sparkles size={16} className="text-white relative z-10" />
        </div>

        <div>
          <div className="font-bold text-[13px] text-blue-950">Ethan IA</div>
          <div className="text-[10px] text-blue-700/70">Assistant portfolio · Llama 3.3</div>
        </div>

        <div className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-700 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          En ligne
        </div>
      </div>

      {/* Zone messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
            {/* Avatar central avec reflet */}
            <div className="relative">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #63c4f7 0%, #1976d2 60%, #0a4fa0 100%)',
                  boxShadow: '0 8px 24px rgba(25,118,210,0.35), inset 0 1px 0 rgba(255,255,255,0.6)',
                }}
              >
                <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.4) 0%, transparent 100%)' }} />
                <Bot size={28} className="text-white relative z-10" />
              </div>
            </div>

            <div>
              <h3 className="font-bold text-base text-blue-900 mb-1">Bonjour, je suis Ethan IA</h3>
              <p className="text-blue-700/70 text-sm max-w-xs leading-relaxed">
                Posez-moi des questions sur mon profil, mes projets ou mes compétences.
              </p>
            </div>

            {/* Suggestions — aero-card */}
            <div className="flex flex-col gap-2 w-full max-w-xs">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left text-sm px-4 py-2.5 rounded-xl text-blue-900 transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(160,210,255,0.6)',
                    boxShadow: '0 2px 6px rgba(100,170,230,0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

            {/* Avatar */}
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 relative overflow-hidden"
              style={msg.role === 'user' ? {
                background: 'linear-gradient(145deg, #63c4f7 0%, #1565c0 100%)',
                boxShadow: '0 2px 6px rgba(21,101,192,0.3), inset 0 1px 0 rgba(255,255,255,0.5)',
              } : {
                background: 'linear-gradient(145deg, #90caf9 0%, #1976d2 100%)',
                boxShadow: '0 2px 6px rgba(25,118,210,0.25), inset 0 1px 0 rgba(255,255,255,0.5)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full"
                style={{ background: 'rgba(255,255,255,0.35)' }} />
              {msg.role === 'user'
                ? <User size={13} className="text-white relative z-10" />
                : <Bot size={13} className="text-white relative z-10" />
              }
            </div>

            {/* Bulle */}
            <div
              className={`max-w-[78%] px-3.5 py-2.5 text-sm leading-relaxed relative overflow-hidden ${
                msg.role === 'user' ? 'rounded-2xl rounded-tr-sm' : 'rounded-2xl rounded-tl-sm'
              }`}
              style={msg.role === 'user' ? {
                background: 'linear-gradient(160deg, #5bbdf5 0%, #1976d2 100%)',
                color: '#fff',
                boxShadow: '0 3px 10px rgba(25,118,210,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
              } : {
                background: 'rgba(255,255,255,0.82)',
                color: '#1a3550',
                border: '1px solid rgba(160,210,255,0.55)',
                boxShadow: '0 2px 8px rgba(100,170,230,0.1), inset 0 1px 0 rgba(255,255,255,0.95)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {/* Reflet bulle user */}
              {msg.role === 'user' && (
                <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }} />
              )}
              <span className="relative z-10">{msg.content}</span>
            </div>
          </div>
        ))}

        {/* Indicateur de frappe */}
        {loading && (
          <div className="flex gap-2.5">
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden"
              style={{
                background: 'linear-gradient(145deg, #90caf9 0%, #1976d2 100%)',
                boxShadow: '0 2px 6px rgba(25,118,210,0.25), inset 0 1px 0 rgba(255,255,255,0.5)',
              }}
            >
              <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-full" style={{ background: 'rgba(255,255,255,0.35)' }} />
              <Bot size={13} className="text-white relative z-10" />
            </div>
            <div
              className="px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5"
              style={{
                background: 'rgba(255,255,255,0.82)',
                border: '1px solid rgba(160,210,255,0.55)',
                boxShadow: '0 2px 8px rgba(100,170,230,0.1)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Zone de saisie */}
      <div
        className="px-4 py-3 shrink-0"
        style={{
          background: 'linear-gradient(180deg, rgba(220,240,255,0.6) 0%, rgba(200,230,255,0.8) 100%)',
          borderTop: '1px solid rgba(255,255,255,0.8)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        <div
          className="flex gap-2 items-center px-3 py-2 rounded-xl transition-all"
          style={{
            background: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(150,205,255,0.6)',
            boxShadow: '0 2px 6px rgba(100,170,230,0.1), inset 0 1px 0 rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Posez une question..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-blue-300 text-blue-900"
            disabled={loading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0 disabled:opacity-40 relative overflow-hidden"
            style={{
              background: 'linear-gradient(160deg, #5bbdf5 0%, #1565c0 100%)',
              boxShadow: '0 2px 6px rgba(21,101,192,0.35), inset 0 1px 0 rgba(255,255,255,0.4)',
            }}
          >
            <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-lg pointer-events-none"
              style={{ background: 'rgba(255,255,255,0.25)' }} />
            {loading
              ? <Loader2 size={13} className="animate-spin text-white relative z-10" />
              : <Send size={13} className="text-white relative z-10" />
            }
          </button>
        </div>
        <p className="text-[10px] text-blue-500/70 text-center mt-1.5">Propulsé par Llama 3.3 · Groq</p>
      </div>
    </div>
  );
};
