import React from 'react';
import { FileText, Folder } from 'lucide-react';
import { motion } from 'framer-motion'; // <-- Import

interface DesktopIconProps {
  name: string;
  type: 'folder' | 'file' | 'app';
  onDoubleClick: () => void;
}

export const DesktopIcon = ({ name, type, onDoubleClick }: DesktopIconProps) => {
  return (
    <motion.div 
      drag // <-- Active le drag & drop
      dragMomentum={false} // Arrête l'icône dès qu'on lâche (plus précis)
      className="flex flex-col items-center gap-1 w-20 p-2 rounded hover:bg-white/20 hover:border hover:border-white/30 cursor-pointer group transition-colors active:cursor-grabbing"
      onDoubleClick={onDoubleClick}
    >
      {/* On empêche le drag sur l'icône interne pour éviter les bugs de clic */}
      <div className="drop-shadow-lg text-blue-500 group-hover:scale-110 transition-transform pointer-events-none">
        {type === 'folder' ? (
          <Folder size={40} fill="#60a5fa" className="text-blue-600" />
        ) : (
          <FileText size={40} className="text-gray-200 fill-white" />
        )}
      </div>
      <span className="text-white text-xs text-center font-medium drop-shadow-md px-1 rounded bg-black/0 group-hover:bg-blue-600/60 line-clamp-2 pointer-events-none">
        {name}
      </span>
    </motion.div>
  );
};