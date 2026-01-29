'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { X, Minimize2, Maximize2 } from 'lucide-react';
import { useOSStore, AppWindow } from '@/app/store/useOSStore';
import { useIsMobile } from '@/app/hooks/useIsMobile'; // <-- Import Hook

interface WindowFrameProps {
  window: AppWindow;
}

export const WindowFrame = ({ window: appWindow }: WindowFrameProps) => {
  const { closeApp, focusApp, minimizeApp, toggleMaximizeApp } = useOSStore();
  const isMobile = useIsMobile(); // <-- Utilisation du Hook

  if (!appWindow.isOpen || appWindow.isMinimized) return null;

  // Sur mobile, on force "isMaximized" visuellement
  const isActuallyMaximized = appWindow.isMaximized || isMobile;

  return (
    <motion.div
      drag={!isActuallyMaximized} // Pas de drag sur mobile ou si maximisé
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0, x: appWindow.defaultPosition?.x || 0, y: appWindow.defaultPosition?.y || 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        x: isActuallyMaximized ? 0 : undefined,
        y: isActuallyMaximized ? 0 : undefined,
        width: isActuallyMaximized ? "100vw" : 600,
        height: isActuallyMaximized ? "calc(100vh - 40px)" : "auto", // -40px barre desktop (ou 48px mobile, à ajuster si besoin)
        borderRadius: isActuallyMaximized ? 0 : 8
      }}
      onPointerDown={() => focusApp(appWindow.id)}
      style={{ zIndex: appWindow.zIndex, position: 'absolute' }}
      className={`flex flex-col aero-glass overflow-hidden shadow-2xl`}
    >
      {/* Barre de titre */}
      <div 
        className="h-9 bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-between px-3 select-none touch-none"
        onDoubleClick={() => !isMobile && toggleMaximizeApp(appWindow.id)}
      >
        <div className="flex items-center gap-2 text-white font-bold text-sm drop-shadow-md">
          <appWindow.icon size={16} /> {appWindow.title}
        </div>
        <div className="flex gap-2">
          <button onClick={(e) => { e.stopPropagation(); minimizeApp(appWindow.id); }} className="p-1 hover:bg-white/20 rounded">
            <Minimize2 size={12} color="white" />
          </button>
          
          {/* On cache le bouton Maximiser sur mobile car c'est déjà forcé */}
          {!isMobile && (
            <button onClick={(e) => { e.stopPropagation(); toggleMaximizeApp(appWindow.id); }} className="p-1 hover:bg-white/20 rounded">
               {appWindow.isMaximized ? <Minimize2 size={12} color="white" /> : <Maximize2 size={12} color="white" />}
            </button>
          )}

          <button onClick={(e) => { e.stopPropagation(); closeApp(appWindow.id); }} className="bg-red-500 hover:bg-red-600 p-1 rounded-sm border border-red-700">
            <X size={12} color="white" />
          </button>
        </div>
      </div> 

      {/* Contenu */}
      <div className="flex-1 overflow-auto bg-white p-1 relative h-full text-gray-900">
        {appWindow.component}
      </div>
    </motion.div>
  );
};