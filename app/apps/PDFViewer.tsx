import React from 'react';

interface PDFViewerProps {
  fileUrl: string;
}

export const PDFViewerApp = ({ fileUrl }: PDFViewerProps) => {
  return (
    <div className="flex flex-col h-full bg-gray-700">
      {/* Barre d'outils factice pour le look */}
      <div className="flex items-center gap-4 px-4 py-2 bg-gray-800 text-white border-b border-gray-600 shadow-sm">
        <span className="font-bold text-sm">PDF Reader</span>
        <div className="h-4 w-[1px] bg-gray-500"></div>
        <div className="text-xs text-gray-300">1 / 1</div>
        <div className="flex-1"></div>
        <a 
          href={fileUrl} 
          download 
          className="text-xs bg-blue-600 hover:bg-blue-500 px-3 py-1 rounded transition-colors"
        >
          Télécharger
        </a>
      </div>

      {/* Zone d'affichage du PDF */}
      <iframe 
        src={fileUrl} 
        className="w-full flex-1 border-none bg-gray-500"
        title="PDF Viewer"
      />
    </div>
  );
};