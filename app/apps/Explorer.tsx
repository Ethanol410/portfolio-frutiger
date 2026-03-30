import React, { useState } from 'react';
import { useOSStore } from '@/app/store/useOSStore';
import { FileNode, myComputer } from '@/app/data/fileSystem';
import { Folder, FileText, ArrowLeft, FileCode } from 'lucide-react';
import { PDFViewerApp } from './PDFViewer';

interface ExplorerProps {
  initialPath?: string;
}

export const ExplorerApp = ({ initialPath = 'root' }: ExplorerProps) => {
  const { addWindow } = useOSStore();
  const [history, setHistory] = useState<string[]>([]);
  const [currentFolderId, setCurrentFolderId] = useState<string>(initialPath === 'root' ? 'root' : initialPath);

  const findNode = (nodes: FileNode[], id: string): FileNode | null => {
    for (const node of nodes) {
      if (node.id === id) return node;
      if (node.children) {
        const found = findNode(node.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const currentFolder = currentFolderId === 'root'
    ? { id: 'root', name: 'Mon PC', type: 'folder', children: myComputer } as FileNode
    : findNode(myComputer, currentFolderId);

  const handleNavigate = (node: FileNode) => {
    if (node.type === 'folder') {
      setHistory([...history, currentFolderId]);
      setCurrentFolderId(node.id);
    } else {
      if (node.name.endsWith('.pdf')) {
        addWindow({
          id: `pdf-${node.id}`,
          title: node.name,
          icon: FileText,
          component: <PDFViewerApp fileUrl={node.content || ''} />,
          isOpen: true,
          isMinimized: false,
          isMaximized: false,
          zIndex: 10,
          defaultPosition: { x: 100, y: 50 },
        });
      }
    }
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const previousId = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setCurrentFolderId(previousId);
  };

  const getIcon = (node: FileNode) => {
    if (node.type === 'folder') return <Folder size={40} className="fill-sky-300 text-sky-500" />;
    if (node.name.endsWith('.pdf')) return <FileText size={40} className="text-red-400" />;
    if (node.name.endsWith('.txt')) return <FileCode size={40} className="text-sky-400" />;
    return <FileText size={40} className="text-sky-300" />;
  };

  return (
    <div className="flex flex-col h-full aero-app">
      {/* Barre de navigation */}
      <div
        className="flex items-center gap-2 p-2 shrink-0"
        style={{
          background: 'linear-gradient(180deg,rgba(255,255,255,0.75) 0%,rgba(224,242,255,0.85) 100%)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(186,230,253,0.6)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 4px rgba(14,165,233,0.08)',
        }}
      >
        <button
          onClick={handleBack}
          disabled={history.length === 0}
          className="p-1.5 rounded-lg transition-colors disabled:opacity-30 text-sky-500 hover:bg-white/60 hover:text-sky-700"
        >
          <ArrowLeft size={16} />
        </button>
        <div
          className="flex-1 text-sm font-medium text-sky-800 px-3 py-1.5 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.75)',
            border: '1px solid rgba(125,211,252,0.4)',
          }}
        >
          {currentFolder?.name || 'Inconnu'}
        </div>
      </div>

      {/* Grille de fichiers */}
      <div className="flex-1 p-4 grid grid-cols-4 gap-4 content-start overflow-auto">
        {currentFolder?.children?.map((item) => (
          <div
            key={item.id}
            onDoubleClick={() => handleNavigate(item)}
            className="flex flex-col items-center gap-1.5 p-2 rounded-xl border border-transparent cursor-pointer group transition-all hover:scale-105"
            style={{
              background: 'transparent',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'rgba(14,165,233,0.1)';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(125,211,252,0.4)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLDivElement).style.background = 'transparent';
              (e.currentTarget as HTMLDivElement).style.borderColor = 'transparent';
            }}
          >
            <div className="drop-shadow-sm transition-transform group-hover:scale-105">
              {getIcon(item)}
            </div>
            <span className="text-xs text-center text-sky-800 font-medium group-hover:text-sky-600 line-clamp-2 w-full break-words">
              {item.name}
            </span>
          </div>
        )) || (
          <div className="col-span-4 text-center text-sky-400 mt-10 text-sm">Dossier vide</div>
        )}
      </div>

      {/* Status bar */}
      <div
        className="shrink-0 flex items-center px-3 py-1 text-[11px] text-sky-500/80"
        style={{
          background: 'rgba(255,255,255,0.55)',
          borderTop: '1px solid rgba(186,230,253,0.4)',
        }}
      >
        {currentFolder?.children?.length || 0} élément(s)
      </div>
    </div>
  );
};
