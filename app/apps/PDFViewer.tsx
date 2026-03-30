import React from 'react';
import { Download, FileText } from 'lucide-react';

interface PDFViewerProps {
  file?: string;
  fileUrl?: string;
}

export const PDFViewerApp = ({ file, fileUrl }: PDFViewerProps) => {
  const src = file || fileUrl || '/cv.pdf';

  return (
    <div className="flex flex-col h-full aero-app">
      {/* Toolbar — glass aqua */}
      <div
        className="flex items-center gap-3 px-4 py-2 shrink-0"
        style={{
          background: 'linear-gradient(180deg,rgba(255,255,255,0.75) 0%,rgba(224,242,255,0.85) 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(186,230,253,0.6)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9)',
        }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg,#f87171,#ef4444)', boxShadow: '0 2px 6px rgba(239,68,68,0.3)' }}
          >
            <FileText size={13} className="text-white" />
          </div>
          <span className="text-sm font-semibold text-sky-900">PDF Reader</span>
        </div>

        <div className="flex-1" />

        <a
          href={src}
          download
          className="flex items-center gap-1.5 text-xs text-white px-3 py-1.5 rounded-lg transition-all hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg,#0284c7,#38bdf8)',
            boxShadow: '0 2px 8px rgba(14,165,233,0.35)',
          }}
        >
          <Download size={12} /> Télécharger
        </a>
      </div>

      {/* PDF iframe */}
      <iframe
        src={src}
        className="w-full flex-1 border-none"
        style={{ background: '#f8fafc' }}
        title="PDF Viewer"
      />
    </div>
  );
};
