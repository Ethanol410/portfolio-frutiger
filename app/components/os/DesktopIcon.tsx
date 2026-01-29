import React from 'react';
import { FileText, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSound } from '@/app/hooks/useSound';
import { useIsMobile } from '@/app/hooks/useIsMobile'; // <-- Import Hook

interface DesktopIconProps {
  name: string;
  type: 'folder' | 'file' | 'app';
  onDoubleClick: () => void;
}

export const DesktopIcon = ({ name, type, onDoubleClick }: DesktopIconProps) => {
  const { playClick } = useSound();
  const isMobile = useIsMobile(); // <-- Détection

  const handleInteraction = () => {
    playClick();
    onDoubleClick(); // On déclenche l'action passée en prop
  };

  return (
    <motion.div 
      drag={!isMobile} // <-- Drag désactivé sur mobile
      dragMomentum={false} 
      className="flex flex-col items-center gap-1 w-20 md:w-24 p-2 rounded hover:bg-white/10 border border-transparent hover:border-white/20 cursor-pointer group transition-colors active:cursor-grabbing active:scale-95"
      // Sur mobile = onClick (Single Tap), Sur Desktop = onDoubleClick
      onClick={isMobile ? handleInteraction : undefined}
      onDoubleClick={!isMobile ? handleInteraction : undefined}
      role="button"
      aria-label={`Ouvrir ${name}`}
      tabIndex={0}
    >
      <div className="drop-shadow-xl transition-transform group-hover:scale-110 pointer-events-none">
        {type === 'folder' ? (
          <Folder size={isMobile ? 36 : 42} className="text-blue-500 fill-blue-400 drop-shadow-md" />
        ) : (
          <FileText size={isMobile ? 36 : 42} className="text-gray-100 fill-white drop-shadow-md" />
        )}
      </div>
      
      <span className="text-white text-[10px] md:text-xs text-center font-medium px-2 py-0.5 rounded bg-black/40 shadow-sm backdrop-blur-[2px] line-clamp-2 w-full break-words pointer-events-none group-hover:bg-blue-600">
        {name}
      </span>
    </motion.div>
  );
};