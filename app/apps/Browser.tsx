'use client';

import React, { useState, useRef } from 'react';
import { Bookmark, RefreshCw, AlertTriangle } from 'lucide-react';

const BOOKMARKS = [
  { label: 'Frutiger Aero', url: 'https://fr.wikipedia.org/wiki/Frutiger_Aero' },
  { label: 'GitHub',        url: 'https://github.com/Ethanol410' },
  { label: 'MDN Web Docs',  url: 'https://developer.mozilla.org/fr/' },
  { label: 'Can I Use',     url: 'https://caniuse.com' },
];

const IFRAME_BLOCKLIST = ['linkedin.com', 'twitter.com', 'x.com', 'facebook.com', 'instagram.com', 'google.com', 'youtube.com', 'github.com'];

function isLikelyBlocked(url: string): boolean {
  return IFRAME_BLOCKLIST.some(domain => url.includes(domain));
}

export const BrowserApp = () => {
  const [inputUrl, setInputUrl] = useState('https://fr.wikipedia.org/wiki/Frutiger_Aero');
  const [iframeUrl, setIframeUrl] = useState('https://fr.wikipedia.org/wiki/Frutiger_Aero');
  const [iframeKey, setIframeKey] = useState(0);
  const [blocked, setBlocked] = useState(false);
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const navigate = (url?: string) => {
    const target = url ?? inputUrl;
    const normalized = target.startsWith('http') ? target : `https://${target}`;
    const likely = isLikelyBlocked(normalized);
    setInputUrl(normalized);
    setIframeUrl(normalized);
    setIframeKey(k => k + 1);
    setBlocked(likely);
    setLoading(!likely);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') navigate();
  };

  return (
    <div className="flex flex-col h-full aero-app">
      {/* Barre de navigation — glass aqua */}
      <div
        className="flex flex-col gap-1.5 p-2 shrink-0"
        style={{
          background: 'linear-gradient(180deg,rgba(255,255,255,0.75) 0%,rgba(224,242,255,0.85) 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(186,230,253,0.6)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 4px rgba(14,165,233,0.08)',
        }}
      >
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate()}
            className="text-sky-400 hover:text-sky-600 p-1.5 rounded-lg hover:bg-white/60 transition-colors"
            title="Rafraîchir"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          <div
            className="flex-1 flex items-center rounded-xl px-3 py-1.5"
            style={{
              background: 'rgba(255,255,255,0.8)',
              border: '1px solid rgba(125,211,252,0.45)',
              boxShadow: '0 1px 4px rgba(14,165,233,0.08)',
            }}
          >
            <input
              className="flex-1 bg-transparent text-sm outline-none text-sky-900 placeholder:text-sky-300"
              value={inputUrl}
              onChange={e => setInputUrl(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="https://..."
            />
          </div>
          <button
            onClick={() => navigate()}
            className="text-white text-xs px-4 py-1.5 rounded-lg transition-all hover:opacity-90"
            style={{
              background: 'linear-gradient(135deg,#0284c7,#38bdf8)',
              boxShadow: '0 2px 8px rgba(14,165,233,0.35)',
            }}
          >
            Go
          </button>
        </div>

        {/* Bookmarks */}
        <div className="flex gap-1 flex-wrap items-center">
          <Bookmark size={11} className="text-sky-400 shrink-0" />
          {BOOKMARKS.map(b => (
            <button
              key={b.url}
              onClick={() => navigate(b.url)}
              className="text-xs text-sky-600 hover:text-sky-800 px-2 py-0.5 rounded-lg hover:bg-white/60 transition-colors truncate max-w-[120px]"
              title={b.url}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu */}
      {blocked ? (
        <div
          className="flex-1 flex flex-col items-center justify-center gap-4 text-center p-6"
          style={{ background: 'linear-gradient(160deg,#f0f7ff,#e8f4fd)' }}
        >
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(251,191,36,0.15)', border: '1px solid rgba(251,191,36,0.3)' }}
          >
            <AlertTriangle size={28} className="text-amber-400" />
          </div>
          <div>
            <h3 className="font-semibold text-sky-800 mb-1">Ce site bloque l'affichage intégré</h3>
            <p className="text-xs text-sky-600/70 mb-4">
              {iframeUrl}<br />refuse d'être affiché dans une fenêtre (X-Frame-Options).
            </p>
            <a
              href={iframeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-white text-xs rounded-lg transition-all hover:opacity-90"
              style={{ background: 'linear-gradient(135deg,#0284c7,#38bdf8)', boxShadow: '0 2px 8px rgba(14,165,233,0.35)' }}
            >
              Ouvrir dans un vrai onglet →
            </a>
          </div>
        </div>
      ) : (
        <iframe
          ref={iframeRef}
          key={iframeKey}
          src={iframeUrl}
          className="flex-1 w-full border-none bg-white"
          title="Browser"
          onLoad={() => setLoading(false)}
          onError={() => { setBlocked(true); setLoading(false); }}
        />
      )}
    </div>
  );
};
