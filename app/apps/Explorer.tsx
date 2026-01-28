import React, { useState } from 'react';
import { useOSStore } from '@/app/store/useOSStore'; // <-- 1. Import du store
import { FileNode, myComputer } from '@/app/data/fileSystem';
import { Folder, FileText, ArrowLeft, FileCode, Music } from 'lucide-react'; // Ajout d'icônes
import { PDFViewerApp } from './PDFViewer'; // <-- 2. Import du lecteur

interface ExplorerProps {
  initialPath?: string;
}

export const ExplorerApp = ({ initialPath = 'root' }: ExplorerProps) => {
  const { addWindow } = useOSStore(); // <-- 3. Récupération de la fonction
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

  // --- Gestion du clic sur un fichier ---
  const handleNavigate = (node: FileNode) => {
    if (node.type === 'folder') {
      setHistory([...history, currentFolderId]);
      setCurrentFolderId(node.id);
    } else {
      // Si c'est un fichier, on regarde son extension ou son nom
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
          defaultPosition: { x: 100, y: 50 }
        });
      } else {
        // Fallback pour les autres fichiers (txt, etc.)
        alert(`Fichier : ${node.name}\n(Pas d'application par défaut pour ce type)`);
      }
    }
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const previousId = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setCurrentFolderId(previousId);
  };

  // Petite fonction utilitaire pour l'icône
  const getIcon = (node: FileNode) => {
    if (node.type === 'folder') return <Folder size={48} className="fill-blue-400 text-blue-600" />;
    if (node.name.endsWith('.pdf')) return <FileText size={48} className="text-red-500" />;
    if (node.name.endsWith('.txt')) return <FileCode size={48} className="text-gray-500" />;
    return <FileText size={48} className="text-gray-400" />;
  };

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <div className="flex items-center gap-2 p-2 border-b bg-white">
        <button 
          onClick={handleBack} 
          disabled={history.length === 0}
          className="p-1 rounded hover:bg-gray-200 disabled:opacity-30 transition-colors"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="text-sm font-medium text-gray-600 px-2 py-1 bg-gray-100 rounded flex-1 border">
          {currentFolder?.name || 'Inconnu'}
        </div>
      </div>

      <div className="flex-1 p-4 grid grid-cols-4 gap-4 content-start overflow-auto">
        {currentFolder?.children?.map((item) => (
          <div 
            key={item.id}
            onDoubleClick={() => handleNavigate(item)}
            className="flex flex-col items-center gap-1 p-2 hover:bg-blue-100/50 hover:border-blue-200 border border-transparent rounded cursor-pointer group"
          >
            <div className="drop-shadow-sm transition-transform group-hover:scale-105">
              {getIcon(item)}
            </div>
            <span className="text-xs text-center text-gray-700 font-medium group-hover:text-blue-700 line-clamp-2 w-full break-words">
              {item.name}
            </span>
          </div>
        )) || <div className="col-span-4 text-center text-gray-400 mt-10">Dossier vide</div>}
      </div>
      
      <div className="h-6 bg-gray-100 border-t flex items-center px-2 text-xs text-gray-500">
        {currentFolder?.children?.length || 0} élément(s)
      </div>
    </div>
  );
};