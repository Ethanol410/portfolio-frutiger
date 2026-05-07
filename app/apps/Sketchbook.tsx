'use client';

import { ExternalLink, Palette } from 'lucide-react';

export const SketchbookApp = () => {
  return (
    <div className="h-full flex flex-col aero-app overflow-hidden">
      {/* Header aqua */}
      <div
        className="px-4 py-2.5 shrink-0 flex items-center gap-3"
        style={{
          background: 'linear-gradient(180deg, #cce9ff 0%, #a8d8f8 50%, #7fc4f0 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.7)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 4px rgba(80,160,220,0.2)',
        }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg,#5bbef5 0%,#2196f3 55%,#0d6fba 100%)',
            boxShadow: '0 2px 8px rgba(30,100,200,0.35), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-full"
            style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.55) 0%,transparent 100%)' }} />
          <Palette size={13} className="text-white relative z-10" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[13px] text-blue-950">Sketchpad</div>
          <div className="text-[10px] text-blue-700/70">JSPaint — MS Paint classique</div>
        </div>
        <a
          href="https://jspaint.app"
          target="_blank"
          rel="noopener noreferrer"
          title="Ouvrir dans un nouvel onglet"
          aria-label="Ouvrir JSPaint dans un nouvel onglet"
          className="p-1.5 rounded text-blue-600 hover:bg-white/30 transition-colors shrink-0"
        >
          <ExternalLink size={13} />
        </a>
      </div>

      {/* JSPaint iframe */}
      <iframe
        src="https://jspaint.app"
        title="JSPaint - MS Paint classique"
        className="flex-1 w-full border-0"
        sandbox="allow-scripts allow-same-origin allow-downloads allow-popups allow-modals allow-forms"
        allow="clipboard-read; clipboard-write"
        style={{ minHeight: 0 }}
      />
    </div>
  );
};
