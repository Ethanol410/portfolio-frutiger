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
      {/* Barre de titre — Vista Aero chrome */}
      <div
        className="h-9 flex items-center justify-between px-3 select-none touch-none relative overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, rgba(90,165,245,0.97) 0%, rgba(38,110,220,0.93) 48%, rgba(22,82,195,0.97) 100%)',
          borderBottom: '1px solid rgba(10,50,160,0.45)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.42), inset 0 -1px 0 rgba(0,0,0,0.12)',
        }}
        onDoubleClick={() => !isMobile && toggleMaximizeApp(appWindow.id)}
      >
        {/* Glass reflection strip */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: '50%',
            background: 'linear-gradient(180deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,.04) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div className="flex items-center gap-2 text-white font-bold text-sm drop-shadow relative z-10">
          <appWindow.icon size={16} /> {appWindow.title}
        </div>

        <div className="flex gap-1.5 relative z-10">
          {/* Minimize — amber orb */}
          <button
            aria-label="Réduire"
            onClick={(e) => { e.stopPropagation(); soft(); minimizeApp(appWindow.id); }}
            className="p-3 md:p-0.5 hover:brightness-110 transition-all"
            style={{
              width: 18, height: 18, borderRadius: '50%',
              background: 'radial-gradient(circle at 38% 30%, rgba(255,255,255,.75) 0%, rgba(255,210,50,.55) 30%, rgba(180,130,0,.9) 100%)',
              border: '1px solid rgba(140,100,0,.45)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), 0 1px 4px rgba(0,0,0,.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Minimize2 size={8} color="rgba(90,60,0,.7)" />
          </button>

          {/* Maximize — green orb */}
          {!isMobile && (
            <button
              aria-label={appWindow.isMaximized ? 'Restaurer' : 'Agrandir'}
              onClick={(e) => { e.stopPropagation(); toggleMaximizeApp(appWindow.id); }}
              className="p-3 md:p-0.5 hover:brightness-110 transition-all"
              style={{
                width: 18, height: 18, borderRadius: '50%',
                background: 'radial-gradient(circle at 38% 30%, rgba(255,255,255,.75) 0%, rgba(100,220,100,.55) 30%, rgba(20,140,20,.9) 100%)',
                border: '1px solid rgba(10,100,10,.45)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), 0 1px 4px rgba(0,0,0,.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              {appWindow.isMaximized ? <Copy size={8} color="rgba(0,70,0,.7)" /> : <Maximize2 size={8} color="rgba(0,70,0,.7)" />}
            </button>
          )}

          {/* Close — red orb */}
          <button
            aria-label="Fermer"
            onClick={(e) => { e.stopPropagation(); soft(); closeApp(appWindow.id); }}
            className="p-3 md:p-0.5 hover:brightness-110 transition-all"
            style={{
              width: 18, height: 18, borderRadius: '50%',
              background: 'radial-gradient(circle at 38% 30%, rgba(255,255,255,.75) 0%, rgba(255,100,100,.55) 30%, rgba(200,20,20,.9) 100%)',
              border: '1px solid rgba(150,10,10,.45)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,.35), 0 1px 4px rgba(0,0,0,.35)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <X size={8} color="rgba(120,0,0,.8)" />
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