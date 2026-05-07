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
      className="flex flex-col items-center gap-1 w-[78px] md:w-24 p-1.5 md:p-2 rounded-lg hover:bg-white/15 border border-transparent hover:border-cyan-400/40 cursor-pointer group transition-all active:cursor-grabbing active:scale-95 hover:shadow-[0_0_20px_rgba(72,202,228,0.38)]"
      onClick={isMobile ? handleInteraction : undefined}
      onDoubleClick={!isMobile ? handleInteraction : undefined}
      onKeyDown={handleKeyDown}
      role="button"
      aria-label={`Ouvrir ${name}`}
      tabIndex={0}
    >
      <div className="drop-shadow-xl transition-all group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_rgba(72,202,228,0.65)] pointer-events-none">
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

      <span title={name} className="text-white text-[9px] md:text-xs leading-tight text-center font-medium px-1 md:px-2 py-0.5 rounded bg-black/40 shadow-sm backdrop-blur-[2px] w-full pointer-events-none transition-all group-hover:bg-[rgba(0,150,200,0.88)] group-hover:shadow-[0_0_8px_rgba(0,180,216,0.55)] truncate md:line-clamp-2 md:[overflow-wrap:break-word] md:whitespace-normal">
        {name}
      </span>
    </motion.div>
  );
};
