# Accessibility Workstream Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter l'accessibilité de base à EthanOS — focus trap dans les fenêtres, navigation clavier dans Explorer, aria-live sur le chat IA, alt text descriptif sur les images.

**Architecture:** Quatre changements indépendants et séquentiels, un composant par tâche. Aucune abstraction partagée — chaque fix est local au fichier concerné. Zéro changement de comportement visible.

**Tech Stack:** TypeScript 5 strict, Next.js 16 App Router, React 19, Framer Motion 11

---

## File Map

| Fichier | Action |
|---------|--------|
| `app/components/os/WindowFrame.tsx` | MODIFIER — focus trap + `aria-modal` + `aria-label` sur les boutons |
| `app/apps/Explorer.tsx` | MODIFIER — `tabIndex` + `role="button"` + `onKeyDown` sur les items |
| `app/apps/AIChat.tsx` | MODIFIER — `aria-live="polite"` + `role="log"` sur le conteneur messages |
| `app/apps/MusicPlayer.tsx` | MODIFIER — `alt` descriptif sur les deux images de pochette |

---

## Task 1 : Focus trap dans `WindowFrame.tsx`

**Files:**
- Modify: `app/components/os/WindowFrame.tsx`

**Contexte :** Le composant fait 73 lignes. Il importe `React` en default import seulement — on doit ajouter `useRef` et `useEffect` aux named imports. L'early return `if (!appWindow.isOpen || appWindow.isMinimized) return null` est à la ligne 18, APRÈS les hooks existants : nos nouveaux hooks s'insèrent entre la ligne 16 et la ligne 18 (React règle des hooks : toujours avant le return conditionnel). La `motion.div` reçoit `ref={containerRef}`, `role="dialog"`, `aria-modal="true"`, et `aria-label={appWindow.title}`.

- [ ] **Step 1 : Vérifier que TypeScript est propre avant modification**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

Expected : zéro erreur.

- [ ] **Step 2 : Remplacer le contenu complet de `app/components/os/WindowFrame.tsx`**

```typescript
'use client';
import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Minimize2, Maximize2 } from 'lucide-react';
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
  }, [appWindow.isOpen, appWindow.isMinimized]);

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
              {appWindow.isMaximized ? <Minimize2 size={12} color="white" /> : <Maximize2 size={12} color="white" />}
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
```

**Note :** `nudge` a été retiré du destructuring de `useHaptics()` car il n'était pas utilisé dans le fichier original (seul `soft` était appelé). Si TypeScript signale que `nudge` manque, vérifier `useHaptics.ts` pour voir si c'est obligatoire — si non, laisser tel quel.

- [ ] **Step 3 : Vérifier TypeScript**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

Expected : zéro erreur. Si TypeScript signale `ref` incompatible avec `motion.div`, ajouter `as React.RefObject<HTMLDivElement>` au type du ref. Si `nudge` manque du destructuring et cause une erreur, le rajouter : `const { soft, nudge } = useHaptics();`.

- [ ] **Step 4 : Commit**

```bash
git -C D:/portfolio-frutiger add app/components/os/WindowFrame.tsx
git -C D:/portfolio-frutiger commit -m "feat(a11y): add focus trap and aria attributes to WindowFrame"
```

---

## Task 2 : Navigation clavier dans `Explorer.tsx`

**Files:**
- Modify: `app/apps/Explorer.tsx`

**Contexte :** Les items de la grille de fichiers sont des `<div>` avec `onDoubleClick` (lignes 99-121). Il faut ajouter `role="button"`, `tabIndex={0}`, `aria-label`, et `onKeyDown` (Enter/Space → même action que double-clic). Les handlers `onMouseEnter`/`onMouseLeave` restent inchangés.

- [ ] **Step 1 : Vérifier TypeScript avant modification**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 2 : Remplacer le bloc div item (lignes 99-121) dans `app/apps/Explorer.tsx`**

Remplacer :

```typescript
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
```

Par :

```typescript
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            aria-label={`${item.type === 'folder' ? 'Dossier' : 'Fichier'} : ${item.name}`}
            onDoubleClick={() => handleNavigate(item)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleNavigate(item);
              }
            }}
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
```

- [ ] **Step 3 : Vérifier TypeScript**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

Expected : zéro erreur.

- [ ] **Step 4 : Commit**

```bash
git -C D:/portfolio-frutiger add app/apps/Explorer.tsx
git -C D:/portfolio-frutiger commit -m "feat(a11y): add keyboard navigation to Explorer file items"
```

---

## Task 3 : `aria-live` dans `AIChat.tsx`

**Files:**
- Modify: `app/apps/AIChat.tsx`

**Contexte :** Le conteneur de messages est à la ligne 255 : `<div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">`. Il faut y ajouter `aria-live="polite"`, `aria-label="Conversation avec l'assistant"`, et `role="log"`. Zéro autre changement.

- [ ] **Step 1 : Vérifier TypeScript avant modification**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 2 : Modifier le div conteneur de messages dans `app/apps/AIChat.tsx`**

Remplacer la ligne 255 :

```typescript
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
```

Par :

```typescript
      <div
        aria-live="polite"
        aria-label="Conversation avec l'assistant"
        role="log"
        className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3"
      >
```

- [ ] **Step 3 : Vérifier TypeScript**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

Expected : zéro erreur.

- [ ] **Step 4 : Commit**

```bash
git -C D:/portfolio-frutiger add app/apps/AIChat.tsx
git -C D:/portfolio-frutiger commit -m "feat(a11y): add aria-live region to AIChat message list"
```

---

## Task 4 : Alt text descriptif dans `MusicPlayer.tsx`

**Files:**
- Modify: `app/apps/MusicPlayer.tsx`

**Contexte :** Il y a deux `<img alt="album">` dans le fichier. Le premier (ligne ~306) est la pochette Spotify Now Playing (`spotifyNowPlaying.albumArt`). Le second (ligne ~364) est la pochette dans la liste Top Tracks (`track.albumArt`). Les deux doivent avoir un `alt` descriptif.

- [ ] **Step 1 : Vérifier TypeScript avant modification**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 2 : Corriger la pochette Now Playing (ligne ~306-310)**

Remplacer :

```typescript
                <img
                  src={spotifyNowPlaying.albumArt}
                  alt="album"
                  className="w-14 h-14 rounded-lg shrink-0 shadow-md"
                />
```

Par :

```typescript
                <img
                  src={spotifyNowPlaying.albumArt}
                  alt={`${spotifyNowPlaying.title} — pochette d'album`}
                  className="w-14 h-14 rounded-lg shrink-0 shadow-md"
                />
```

- [ ] **Step 3 : Corriger la pochette Top Tracks (ligne ~364)**

Remplacer :

```typescript
                    <img src={track.albumArt} alt="album" className="w-8 h-8 rounded shrink-0" />
```

Par :

```typescript
                    <img src={track.albumArt} alt={`${track.title} — pochette d'album`} className="w-8 h-8 rounded shrink-0" />
```

- [ ] **Step 4 : Vérifier TypeScript**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

Expected : zéro erreur. Si TypeScript signale que `track.title` n'existe pas sur le type, vérifier le type `SpotifyTrack` dans le store et utiliser le bon nom de champ.

- [ ] **Step 5 : Commit**

```bash
git -C D:/portfolio-frutiger add app/apps/MusicPlayer.tsx
git -C D:/portfolio-frutiger commit -m "feat(a11y): add descriptive alt text to MusicPlayer album art"
```

---

## Vérification finale

```bash
# TypeScript global propre
cd D:/portfolio-frutiger && npx tsc --noEmit

# Vérifier les 4 commits
git -C D:/portfolio-frutiger log --oneline -6

# Vérifier qu'aucun alt="album" ne reste
grep -r 'alt="album"' D:/portfolio-frutiger/app

# Vérifier que __launchApp n'est pas réapparu
grep -r "__launchApp" D:/portfolio-frutiger/app/components/os/Taskbar.tsx
```

Expected :
- `tsc --noEmit` → zéro sortie
- `grep alt="album"` → aucun résultat
