'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { useOSStore } from '@/app/store/useOSStore';
import { AboutApp } from './About';
import { ProjectsApp } from './Projects';
import { ContactApp } from './Contact';
import { PDFViewerApp } from './PDFViewer';
import { LayoutGrid, UserIcon, Mail, FileText } from 'lucide-react';
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
    <div className="h-full flex flex-col bg-gradient-to-b from-slate-900 to-slate-800 text-white">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex items-center gap-3 bg-white/5 shrink-0">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0">
          <Sparkles size={16} />
        </div>
        <div>
          <div className="font-semibold text-sm">Ethan IA</div>
          <div className="text-[10px] text-slate-400">Assistant portfolio — Propulsé par Claude</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-[10px] text-emerald-400">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          En ligne
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Bot size={30} />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Bonjour, je suis Ethan IA</h3>
              <p className="text-slate-400 text-sm max-w-xs">
                Posez-moi des questions sur mon profil, mes projets ou mes compétences.
              </p>
            </div>
            <div className="flex flex-col gap-2 w-full max-w-xs">
              {SUGGESTIONS.map(s => (
                <button
                  key={s}
                  onClick={() => sendMessage(s)}
                  className="text-left text-sm px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors text-slate-300"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
              msg.role === 'user'
                ? 'bg-blue-500'
                : 'bg-gradient-to-br from-violet-500 to-blue-500'
            }`}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user'
                ? 'bg-blue-600 text-white rounded-tr-sm'
                : 'bg-white/10 text-slate-100 rounded-tl-sm'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex gap-2.5">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center shrink-0">
              <Bot size={14} />
            </div>
            <div className="px-3.5 py-3 rounded-2xl rounded-tl-sm bg-white/10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-white/10 bg-white/5 shrink-0">
        <div className="flex gap-2 items-center bg-white/10 rounded-xl px-3 py-2 focus-within:ring-1 ring-violet-500 transition-all">
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
            placeholder="Posez une question..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-slate-500 text-white"
            disabled={loading}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-7 h-7 rounded-lg bg-violet-600 hover:bg-violet-500 disabled:opacity-30 flex items-center justify-center transition-all shrink-0"
          >
            {loading ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
          </button>
        </div>
        <p className="text-[10px] text-slate-500 text-center mt-1.5">Propulsé par Claude Haiku · Anthropic</p>
      </div>
    </div>
  );
};
