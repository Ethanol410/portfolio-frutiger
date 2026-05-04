'use client';
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minimize2, Maximize2, Copy } from 'lucide-react';
import { useOSStore, AppWindow } from '@/app/store/useOSStore';
import { useIsMobile } from '@/app/hooks/useIsMobile';
import { useHaptics } from '@/app/hooks/useHaptics';

interface WindowFrameProps {
  window: AppWindow;
}

export const WindowFrame = ({ window: appWindow }: WindowFrameProps) => {
  const { closeApp, focusApp, minimizeApp, toggleMaximizeApp } = useOSStore();
  const isMobile = useIsMobile();
  const { soft } = useHaptics();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!appWindow.isOpen || appWindow.isMinimized) return;
    const el = containerRef.current;
    if (!el) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusable = Array.from(
      el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    first?.focus();

    function onKeyDown(e: KeyboardEvent) {
      // Escape ferme la fenêtre active (accessibilité clavier).
      if (e.key === 'Escape') {
        e.preventDefault();
        closeApp(appWindow.id);
        return;
      }
      if (e.key !== 'Tab') return;
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus(); }
      }
    }

    el.addEventListener('keydown', onKeyDown);
    return () => {
      el.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [appWindow.isOpen, appWindow.isMinimized, appWindow.id, closeApp]);

  if (!appWindow.isOpen || appWindow.isMinimized) return null;

  const isActuallyMaximized = appWindow.isMaximized || isMobile;

  return (
    <motion.div
      ref={containerRef}
      role="dialog"
      aria-modal="true"
      aria-label={appWindow.title}
      drag={!isActuallyMaximized}
      dragMomentum={false}
      initial={{ scale: 0.9, opacity: 0, x: appWindow.defaultPosition?.x || 0, y: appWindow.defaultPosition?.y || 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        x: isActuallyMaximized ? 0 : undefined,
        y: isActuallyMaximized ? 0 : undefined,
        width: isActuallyMaximized ? "100vw" : (appWindow.defaultSize?.width ?? 600),
        height: isActuallyMaximized ? (isMobile ? "calc(100vh - 48px)" : "calc(100vh - 40px)") : (appWindow.defaultSize?.height ?? "auto"),
        borderRadius: isActuallyMaximized ? 0 : 8
      }}
      onPointerDown={() => { focusApp(appWindow.id); }}
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
          <button
            aria-label="Réduire"
            onClick={(e) => { e.stopPropagation(); soft(); minimizeApp(appWindow.id); }}
            className="p-3 md:p-1 hover:bg-white/20 rounded"
          >
            <Minimize2 size={12} color="white" />
          </button>

          {!isMobile && (
            <button
              aria-label={appWindow.isMaximized ? "Restaurer" : "Agrandir"}
              onClick={(e) => { e.stopPropagation(); toggleMaximizeApp(appWindow.id); }}
              className="p-3 md:p-1 hover:bg-white/20 rounded"
            >
              {appWindow.isMaximized ? <Copy size={12} color="white" /> : <Maximize2 size={12} color="white" />}
            </button>
          )}

          <button
            aria-label="Fermer"
            onClick={(e) => { e.stopPropagation(); soft(); closeApp(appWindow.id); }}
            className="bg-red-500 hover:bg-red-600 p-3 md:p-1 rounded-sm border border-red-700"
          >
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