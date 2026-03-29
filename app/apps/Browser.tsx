'use client';

import React, { useState, useRef } from 'react';
import { Bookmark, RefreshCw, AlertTriangle } from 'lucide-react';

const BOOKMARKS = [
  { label: 'Frutiger Aero', url: 'https://fr.wikipedia.org/wiki/Frutiger_Aero' },
  { label: 'GitHub',        url: 'https://github.com/Ethanol410' },
  { label: 'MDN Web Docs',  url: 'https://developer.mozilla.org/fr/' },
  { label: 'Can I Use',     url: 'https://caniuse.com' },
];

// Sites connus pour bloquer les iframes
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
    <div className="flex flex-col h-full bg-gray-100">
      {/* Barre de navigation */}
      <div className="flex flex-col gap-1 p-2 border-b bg-gray-200 shrink-0">
        <div className="flex gap-2 items-center">
          <button
            onClick={() => navigate()}
            className="text-gray-500 hover:text-gray-700 p-1 transition-colors"
            title="Rafraîchir"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
          <input
            className="flex-1 px-3 py-1.5 rounded border border-gray-300 text-sm bg-white"
            value={inputUrl}
            onChange={e => setInputUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="https://..."
          />
          <button
            onClick={() => navigate()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded text-xs transition-colors"
          >
            Go
          </button>
        </div>

        {/* Bookmarks */}
        <div className="flex gap-1 flex-wrap">
          <Bookmark size={12} className="text-gray-400 mt-0.5 shrink-0" />
          {BOOKMARKS.map(b => (
            <button
              key={b.url}
              onClick={() => navigate(b.url)}
              className="text-xs text-blue-600 hover:underline px-1.5 py-0.5 rounded hover:bg-blue-50 transition-colors truncate max-w-[120px]"
              title={b.url}
            >
              {b.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu */}
      {blocked ? (
        <div className="flex-1 flex flex-col items-center justify-center gap-3 bg-gray-50 text-center p-6">
          <AlertTriangle size={36} className="text-amber-400" />
          <div>
            <h3 className="font-semibold text-gray-700 mb-1">Ce site bloque l'affichage intégré</h3>
            <p className="text-xs text-gray-500 mb-4">
              {iframeUrl}
              <br />refuse d'être affiché dans une fenêtre (X-Frame-Options).
            </p>
            <a
              href={iframeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 transition-colors"
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
