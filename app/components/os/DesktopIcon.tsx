import React from 'react';
import { FileText, Folder } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSound } from '@/app/hooks/useSound';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import { useHaptics } from '@/app/hooks/useHaptics';

interface DesktopIconProps {
  name: string;
  type: 'folder' | 'file' | 'app';
  onDoubleClick: () => void;
  iconSrc?: string;
}

export const DesktopIcon = ({ name, type, onDoubleClick, iconSrc }: DesktopIconProps) => {
  const { playClick } = useSound();
  const isMobile = useIsMobile();
  const { tap } = useHaptics();

  const handleInteraction = () => {
    playClick();
    tap();
    onDoubleClick();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleInteraction();
    }
  };

  return (
    <motion.div
      drag={!isMobile}
      dragMomentum={false}
      className="flex flex-col items-center gap-1 w-20 md:w-24 p-2 rounded hover:bg-white/10 border border-transparent hover:border-white/20 cursor-pointer group transition-colors active:cursor-grabbing active:scale-95"
      onClick={isMobile ? handleInteraction : undefined}
      onDoubleClick={!isMobile ? handleInteraction : undefined}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={`Ouvrir ${name}`}
      tabIndex={0}
    >
      <div className="drop-shadow-xl transition-transform group-hover:scale-110 pointer-events-none">
        {iconSrc ? (
          <img
            src={iconSrc}
            alt={name}
            width={isMobile ? 36 : 42}
            height={isMobile ? 36 : 42}
            className="object-contain drop-shadow-md"
          />
        ) : type === 'folder' ? (
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
