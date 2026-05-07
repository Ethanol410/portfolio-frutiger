'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Trash2 } from 'lucide-react';
import { useOSStore } from '@/app/store/useOSStore';
import { AboutApp } from './About';
import { ProjectsApp } from './Projects';
import { ContactApp } from './Contact';
import { PDFViewerApp } from './PDFViewer';
import { LayoutGrid, Mail, FileText } from 'lucide-react';
import { User as UserIconLucide } from 'lucide-react';
import { portfolio } from '@/app/data/portfolio';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const STORAGE_KEY = 'ethanos-aichat-messages';

const INITIAL_SUGGESTIONS = [
  `Parle-moi de ${portfolio.projects[0].title}`,
  `Quelles sont tes compétences en IA ?`,
  `Parle-moi de ${portfolio.projects[1].title}`,
  `Tu es disponible quand ?`,
  `Montre-moi ton CV`,
];

// Pool de suggestions contextuelles avec mots-clés de déclenchement
const SUGGESTION_POOL: { text: string; keywords: string[] }[] = [
  { text: `Parle-moi de ${portfolio.projects[0].title}`, keywords: ['recherche', 'uist', 'irisa', 'humain-machine', 'hci', 'publication', 'article'] },
  { text: `Parle-moi de ${portfolio.projects[1].title}`, keywords: ['agentix', 'canvas', 'brainstorming', 'multi-agent', 'isa', 'pépite'] },
  { text: `Parle-moi de ${portfolio.projects[2].title}`, keywords: ['portfolio', 'frutiger', 'os', 'zustand', 'framer'] },
  { text: `Parle-moi de ${portfolio.projects[3].title}`, keywords: ['assistant', 'ethanos', 'ai', 'chat', 'groq', 'claude'] },
  { text: `Parle-moi de ${portfolio.projects[4].title}`, keywords: ['weight tracker', 'postgresql', 'test', 'couverture'] },
  { text: 'Quelles sont tes compétences en IA ?', keywords: ['ia', 'intelligence artificielle', 'llm', 'agent', 'groq', 'claude'] },
  { text: 'Quelles sont tes compétences frontend ?', keywords: ['react', 'next', 'tailwind', 'frontend', 'interface', 'css'] },
  { text: 'Parle-moi de ton alternance', keywords: ['alternance', 'ici carte grise', 'php', 'mysql', 'entreprise', 'expérience'] },
  { text: 'Tu as des distinctions ou prix ?', keywords: ['prix', 'pépite', 'distinction', 'agentix', 'award'] },
  { text: 'Qui te recommande ?', keywords: ['recommandation', 'recommend', 'avis', 'professeur', 'chef'] },
  { text: 'Tu candidates où pour la suite ?', keywords: ['enssat', 'iam', 'ingénieur', 'candidature', 'poursuite', 'septembre'] },
  { text: 'Tu es disponible quand ?', keywords: ['disponible', 'disponibilité', 'septembre', 'quand', 'lannion', 'dinan'] },
  { text: 'Montre-moi ton CV', keywords: ['cv', 'curriculum', 'résumé'] },
  { text: 'Comment te contacter ?', keywords: ['contact', 'email', 'téléphone', 'mail', 'linkedin'] },
  { text: 'Montre-moi tes projets', keywords: ['projet', 'réalisation', 'portfolio', 'travaux'] },
];

function getFollowUpSuggestions(messages: Message[]): string[] {
  const history = messages.map(m => m.content.toLowerCase()).join(' ');

  // Filtrer les suggestions dont les mots-clés n'ont pas encore été couverts
  const unused = SUGGESTION_POOL.filter(
    s => !s.keywords.some(kw => history.includes(kw))
  );

  // Prendre 3 suggestions au hasard parmi les non-couvertes
  const shuffled = [...unused].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3).map(s => s.text);
}

export const AIChatApp = () => {
  const { addWindow } = useOSStore();

  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as Message[]) : [];
    } catch {
      return [];
    }
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [followUps, setFollowUps] = useState<string[]>([]);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Persister les messages dans localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch {
      // localStorage plein ou indisponible
    }
  }, [messages]);

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
        addWindow({ ...base, id: 'about', title: 'À Propos', icon: UserIconLucide, component: <AboutApp />, defaultSize: { width: 620, height: 520 } });
        break;
      case 'contact':
        addWindow({ ...base, id: 'contact', title: 'Me Contacter', icon: Mail, component: <ContactApp />, defaultSize: { width: 520, height: 480 } });
        break;
      case 'cv':
        addWindow({ ...base, id: 'cv', title: 'Mon CV', icon: FileText, component: <PDFViewerApp file="/cv_ethan_collin.pdf" />, defaultSize: { width: 700, height: 540 } });
        break;
    }
  };

  const clearMessages = () => {
    setMessages([]);
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
  };

  const sendMessage = async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || loading) return;

    const userMsg: Message = { role: 'user', content };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setFollowUps([]);
    setLoading(true);

    // Placeholder pour la réponse streamée
    const assistantPlaceholder: Message = { role: 'assistant', content: '' };
    setMessages(prev => [...prev, assistantPlaceholder]);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-App-Token': process.env.NEXT_PUBLIC_APP_TOKEN ?? '',
        },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!res.ok || !res.body) {
        throw new Error('Réponse invalide');
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data:')) continue;
          const raw = line.slice(5).trim();
          if (raw === '[DONE]') break;

          try {
            const parsed = JSON.parse(raw);

            if (parsed.token) {
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  ...updated[updated.length - 1],
                  content: updated[updated.length - 1].content + parsed.token,
                };
                return updated;
              });
            }

            if (parsed.action) {
              handleAction(parsed.action);
            }
          } catch {
            // Chunk malformé, on ignore
          }
        }
      }
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          content: "Désolé, une erreur s'est produite.",
        };
        return updated;
      });
    } finally {
      setLoading(false);
      inputRef.current?.focus();
      // Générer les suggestions après la réponse complète
      setMessages(prev => {
        setFollowUps(getFollowUpSuggestions(prev));
        return prev;
      });
    }
  };

  return (
    <div className="h-full flex flex-col aero-app overflow-hidden">

      {/* Header : bande aqua glossy */}
      <div
        className="px-4 py-3 shrink-0 flex items-center gap-3"
        style={{
          background: 'linear-gradient(180deg, #cce9ff 0%, #a8d8f8 50%, #7fc4f0 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.7)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 4px rgba(80,160,220,0.2)',
        }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg, #5bbef5 0%, #2196f3 55%, #0d6fba 100%)',
            boxShadow: '0 2px 8px rgba(30,100,200,0.35), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-full"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, transparent 100%)' }} />
          <Sparkles size={16} className="text-white relative z-10" />
        </div>

        <div>
          <div className="font-bold text-[13px] text-blue-950">Ethan IA</div>
          <div className="text-[10px] text-blue-700/70">Assistant portfolio · Llama 3.3</div>
        </div>

        <div className="ml-auto flex items-center gap-3">
          {messages.length > 0 && (
            <button
              onClick={clearMessages}
              title="Effacer la conversation"
              className="p-1.5 rounded-lg transition-all hover:bg-red-100/60 text-blue-400 hover:text-red-400"
            >
              <Trash2 size={14} />
            </button>
          )}
          <div className="flex items-center gap-1.5 text-[10px] text-emerald-700 font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            En ligne
          </div>
        </div>
      </div>

      {/* Zone messages */}
      <div
        aria-live="polite"
        aria-label="Conversation avec l'assistant"
        role="log"
        className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
      >

        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full gap-5 text-center">
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

            <div className="flex flex-col gap-2 w-full max-w-xs">
              {INITIAL_SUGGESTIONS.map(s => (
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
              {msg.role === 'user' && (
                <div className="absolute top-0 left-0 right-0 h-1/2 rounded-t-2xl pointer-events-none"
                  style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%)' }} />
              )}
              {msg.role === 'assistant' ? (
                <div className="prose prose-sm prose-blue max-w-none relative z-10 [&_p]:my-0.5 [&_ul]:my-1 [&_li]:my-0 [&_strong]:font-semibold [&_code]:bg-blue-50 [&_code]:px-1 [&_code]:rounded [&_code]:text-blue-700">
                  {msg.content === '' && loading && i === messages.length - 1 ? (
                    <span className="flex gap-1 items-center h-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                    </span>
                  ) : (
                    <ReactMarkdown>{msg.content}</ReactMarkdown>
                  )}
                </div>
              ) : (
                <span className="relative z-10">{msg.content}</span>
              )}
            </div>
          </div>
        ))}

        {/* Indicateur de frappe global (avant que le placeholder n'apparaisse) */}
        {loading && messages[messages.length - 1]?.role !== 'assistant' && (
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

        {/* Suggestions contextuelles après la dernière réponse */}
        {!loading && followUps.length > 0 && (
          <div className="flex flex-wrap gap-2 pl-9 pt-1">
            {followUps.map(s => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                className="text-xs px-3 py-1.5 rounded-full text-blue-700 transition-all hover:scale-[1.03] active:scale-[0.97]"
                style={{
                  background: 'rgba(255,255,255,0.72)',
                  border: '1px solid rgba(150,205,255,0.65)',
                  boxShadow: '0 1px 4px rgba(100,170,230,0.1), inset 0 1px 0 rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                {s}
              </button>
            ))}
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
            onChange={e => { setInput(e.target.value); if (e.target.value) setFollowUps([]); }}
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
