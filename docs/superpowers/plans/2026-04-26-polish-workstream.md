# Polish Workstream Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Améliorer la qualité perçue du portfolio — bundle optimisé, OG image valide, manifest PWA corrigé, bugs UX résolus, quick wins UX ajoutés.

**Architecture:** Dix tâches indépendantes, une par composant ou fichier de config. Zéro refactoring, zéro split de store. Chaque tâche est réversible.

**Tech Stack:** Next.js 16, TypeScript strict, next/og (ImageResponse intégré), lucide-react

---

## File Map

| Fichier | Action |
|---------|--------|
| `next.config.ts` | MODIFIER — `optimizePackageImports` + `images.formats` |
| `app/components/os/MatrixRain.tsx` | MODIFIER — pause animation sur `visibilitychange` |
| `app/page.tsx` | MODIFIER — `next/image` sur avatar (ligne 198) |
| `app/apps/About.tsx` | MODIFIER — `next/image` sur avatar (ligne 37) |
| `app/components/os/LockScreen.tsx` | MODIFIER — `next/image` sur avatar avec `fill` (ligne 46) |
| `app/api/og/route.tsx` | CRÉER — ImageResponse 1200×630 |
| `app/layout.tsx` | MODIFIER — pointer OG et Twitter images vers `/api/og` |
| `public/manifest.json` | MODIFIER — nom, description, purpose |
| `app/components/os/WindowFrame.tsx` | MODIFIER — icône `Copy` pour restore |
| `app/apps/Projects.tsx` | MODIFIER — pinned repos toujours affichés |
| `app/apps/Paint.tsx` | MODIFIER — confirmation avant Clear |
| `app/apps/MusicPlayer.tsx` | MODIFIER — indicateur fin de piste |
| `app/components/os/Browser.tsx` | MODIFIER — barre de progression iframe |

---

## Task 1 : `next.config.ts` — optimizePackageImports + images.formats

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1 : Vérifier TypeScript avant modification**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 2 : Remplacer le contenu de `next.config.ts`**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options',        value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy',        value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection',       value: '1; mode=block' },
        ],
      },
    ];
  },
};

export default nextConfig;
```

- [ ] **Step 3 : Vérifier TypeScript**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

Expected : zéro erreur.

- [ ] **Step 4 : Commit**

```bash
git -C D:/portfolio-frutiger add next.config.ts
git -C D:/portfolio-frutiger commit -m "perf: add optimizePackageImports and image formats to next.config"
```

---

## Task 2 : `MatrixRain.tsx` — pause animation sur onglet caché

**Files:**
- Modify: `app/components/os/MatrixRain.tsx`

**Contexte :** La fonction `draw` est actuellement appelée via `setInterval(draw, 33)` (ligne 39). L'ID de l'interval est stocké dans `const id`. Pour permettre le pause/resume, on passe à `let id` et on ajoute un listener `visibilitychange` dans le même `useEffect`.

- [ ] **Step 1 : Vérifier TypeScript avant modification**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 2 : Remplacer le contenu de `app/components/os/MatrixRain.tsx`**

```typescript
'use client';

import React, { useEffect, useRef } from 'react';

interface MatrixRainProps {
  onExit: () => void;
}

export const MatrixRain = ({ onExit }: MatrixRainProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789ABCDEF'.split('');
    const fontSize = 14;
    const cols = Math.floor(canvas.width / fontSize);
    const drops = Array(cols).fill(1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    let id = setInterval(draw, 33);

    const onVisibilityChange = () => {
      if (document.hidden) {
        clearInterval(id);
      } else {
        id = setInterval(draw, 33);
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearInterval(id);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999999]" onClick={onExit}>
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-8 left-0 right-0 text-center text-green-400 font-mono text-sm animate-pulse">
        Cliquez pour sortir de la Matrix
      </div>
    </div>
  );
};
```

**Changement clé :** `const id` → `let id`, ajout de `onVisibilityChange` et son cleanup.

- [ ] **Step 3 : Vérifier TypeScript**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 4 : Commit**

```bash
git -C D:/portfolio-frutiger add app/components/os/MatrixRain.tsx
git -C D:/portfolio-frutiger commit -m "perf: pause MatrixRain animation when tab is hidden"
```

---

## Task 3 : `next/image` sur les avatars

**Files:**
- Modify: `app/page.tsx` (ligne 198)
- Modify: `app/apps/About.tsx` (ligne 37)
- Modify: `app/components/os/LockScreen.tsx` (ligne 46)

**Contexte :** Les trois fichiers utilisent `<img src={portfolio.avatar} ...>`. `portfolio.avatar` vaut `/people_31.png`. Les deux premiers ont `w-24 h-24` (96×96px). LockScreen a `w-full h-full object-cover` — utiliser `fill` avec `sizes`.

- [ ] **Step 1 : Vérifier TypeScript avant modification**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 2 : Modifier `app/page.tsx` ligne 198**

Remplacer :
```tsx
              <img src={portfolio.avatar} alt={portfolio.fullName} className="w-24 h-24 rounded-full object-cover" />
```

Par :
```tsx
              <Image src={portfolio.avatar} alt={portfolio.fullName} width={96} height={96} className="rounded-full object-cover" />
```

Ajouter l'import en haut du fichier (après les imports existants) :
```tsx
import Image from 'next/image';
```

- [ ] **Step 3 : Modifier `app/apps/About.tsx` ligne 37**

Remplacer :
```tsx
        <img src={portfolio.avatar} alt={portfolio.fullName} className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-4 border-blue-100" />
```

Par :
```tsx
        <Image src={portfolio.avatar} alt={portfolio.fullName} width={96} height={96} className="rounded-full object-cover mb-4 shadow-lg border-4 border-blue-100" />
```

Ajouter l'import `Image` en haut du fichier.

- [ ] **Step 4 : Modifier `app/components/os/LockScreen.tsx` ligne 46**

Lire le fichier pour confirmer la structure du parent de l'img (doit avoir `position: relative` pour `fill`). Remplacer :
```tsx
            <img src={portfolio.avatar} alt={portfolio.name} className="w-full h-full object-cover" />
```

Par :
```tsx
            <Image src={portfolio.avatar} alt={portfolio.name} fill className="object-cover" sizes="128px" />
```

Si le parent n'a pas `position: relative`, l'ajouter via `className` ou `style`. Vérifier que le rendu visuel est identique.

Ajouter l'import `Image` en haut du fichier.

- [ ] **Step 5 : Vérifier TypeScript**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

Si TypeScript signale `fill` sans parent positionné, ajouter `style={{ position: 'relative' }}` sur le parent.

- [ ] **Step 6 : Commit**

```bash
git -C D:/portfolio-frutiger add app/page.tsx app/apps/About.tsx app/components/os/LockScreen.tsx
git -C D:/portfolio-frutiger commit -m "perf: replace img with next/image on avatar components"
```

---

## Task 4 : OG image dynamique — `app/api/og/route.tsx` + `app/layout.tsx`

**Files:**
- Create: `app/api/og/route.tsx`
- Modify: `app/layout.tsx` (lignes 37-44 et 51)

- [ ] **Step 1 : Vérifier TypeScript avant modification**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 2 : Créer `app/api/og/route.tsx`**

```tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #1e3a8a 100%)',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
          Ethan Collin
        </div>
        <div style={{ fontSize: 36, opacity: 0.85, textAlign: 'center' }}>
          Développeur Web FullStack & IA — BUT MMI
        </div>
        <div style={{ fontSize: 24, opacity: 0.55, marginTop: 32, textAlign: 'center' }}>
          portfolio-frutiger.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

- [ ] **Step 3 : Tester la route en local**

```bash
cd D:/portfolio-frutiger && npm run dev
```

Ouvrir `http://localhost:3000/api/og` dans un navigateur. Vérifier qu'une image 1200×630 s'affiche. Arrêter le serveur.

- [ ] **Step 4 : Modifier `app/layout.tsx` — mettre à jour openGraph et twitter**

Remplacer dans la section `openGraph` (lignes 37-44) :
```typescript
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EthanOS — Portfolio interactif d'Ethan Collin",
      },
    ],
```

Par :
```typescript
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
        alt: "EthanOS — Portfolio interactif d'Ethan Collin",
      },
    ],
```

Remplacer aussi la ligne Twitter (ligne 51) :
```typescript
    images: ["/og-image.png"],
```
Par :
```typescript
    images: ["/api/og"],
```

- [ ] **Step 5 : Vérifier TypeScript**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 6 : Commit**

```bash
git -C D:/portfolio-frutiger add app/api/og/route.tsx app/layout.tsx
git -C D:/portfolio-frutiger commit -m "feat: add dynamic OG image route and update metadata"
```

---

## Task 5 : `public/manifest.json` — corrections PWA

**Files:**
- Modify: `public/manifest.json`

- [ ] **Step 1 : Remplacer le contenu de `public/manifest.json`**

```json
{
  "name": "EthanOS",
  "short_name": "EthanOS",
  "description": "Portfolio d'Ethan Collin — Développeur Web FullStack & IA",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#1e40af",
  "icons": [
    {
      "src": "/favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "/icons/vista_pc_1.ico",
      "sizes": "192x192",
      "type": "image/x-icon",
      "purpose": "any"
    }
  ]
}
```

**Changements :**
- `name`: "Ethan Portfolio OS" → "EthanOS"
- `description`: "Ethan Dupont" → "Ethan Collin"
- `purpose`: "any maskable" → "any" (syntaxe valide, .ico ne peut pas être maskable)

- [ ] **Step 2 : Vérifier que le JSON est valide**

```bash
node -e "JSON.parse(require('fs').readFileSync('D:/portfolio-frutiger/public/manifest.json', 'utf8')); console.log('JSON valide')"
```

Expected : `JSON valide`

- [ ] **Step 3 : Commit**

```bash
git -C D:/portfolio-frutiger add public/manifest.json
git -C D:/portfolio-frutiger commit -m "fix: correct PWA manifest name, description and icon purpose"
```

---

## Task 6 : `WindowFrame.tsx` — icône restore distincte

**Files:**
- Modify: `app/components/os/WindowFrame.tsx`

**Contexte :** Le bouton restore affiche `Minimize2` quand la fenêtre est maximisée — identique au bouton minimize juste à côté. Remplacer par `Copy` (deux carrés = convention restore). `Copy` est dans lucide-react.

- [ ] **Step 1 : Vérifier TypeScript avant modification**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 2 : Ajouter `Copy` à l'import lucide-react**

Remplacer la ligne :
```typescript
import { X, Minimize2, Maximize2 } from 'lucide-react';
```

Par :
```typescript
import { X, Minimize2, Maximize2, Copy } from 'lucide-react';
```

- [ ] **Step 3 : Remplacer l'icône du bouton restore**

Trouver dans le JSX :
```tsx
              {appWindow.isMaximized ? <Minimize2 size={12} color="white" /> : <Maximize2 size={12} color="white" />}
```

Remplacer par :
```tsx
              {appWindow.isMaximized ? <Copy size={12} color="white" /> : <Maximize2 size={12} color="white" />}
```

- [ ] **Step 4 : Vérifier TypeScript**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 5 : Commit**

```bash
git -C D:/portfolio-frutiger add app/components/os/WindowFrame.tsx
git -C D:/portfolio-frutiger commit -m "fix: use Copy icon for restore button to distinguish from minimize"
```

---

## Task 7 : `Projects.tsx` — pinned repos toujours affichés

**Files:**
- Modify: `app/apps/Projects.tsx`

**Contexte :** Les pinned repos disparaissent quand un filtre `activeLang` est actif. La variable `showPinned` contrôle l'affichage de la section pinned (ligne ~527). Elle est probablement définie comme `!activeLang && !search` ou similaire. Fix : la rendre indépendante des filtres.

- [ ] **Step 1 : Vérifier TypeScript avant modification**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 2 : Trouver la définition de `showPinned` dans `app/apps/Projects.tsx`**

```bash
grep -n "showPinned" D:/portfolio-frutiger/app/apps/Projects.tsx
```

Lire les lignes autour de la définition pour comprendre la condition actuelle.

- [ ] **Step 3 : Modifier `showPinned` pour toujours afficher les pinned repos**

Remplacer la définition actuelle (quelle qu'elle soit) par :

```typescript
const showPinned = pinned.length > 0;
```

Cette ligne doit être placée après le `useMemo` qui calcule `pinned`.

- [ ] **Step 4 : Vérifier TypeScript**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 5 : Commit**

```bash
git -C D:/portfolio-frutiger add app/apps/Projects.tsx
git -C D:/portfolio-frutiger commit -m "fix: always show pinned repos regardless of active filter"
```

---

## Task 8 : `Paint.tsx` — confirmation avant Clear

**Files:**
- Modify: `app/apps/Paint.tsx`

**Contexte :** La fonction `clearCanvas` (ligne 66) efface le canvas sans confirmation. Un clic accidentel sur Trash2 perd le dessin.

- [ ] **Step 1 : Vérifier TypeScript avant modification**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 2 : Modifier `clearCanvas` dans `app/apps/Paint.tsx`**

Remplacer :
```typescript
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };
```

Par :
```typescript
  const clearCanvas = () => {
    if (!confirm('Effacer le dessin ? Cette action est irréversible.')) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  };
```

- [ ] **Step 3 : Vérifier TypeScript**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 4 : Commit**

```bash
git -C D:/portfolio-frutiger add app/apps/Paint.tsx
git -C D:/portfolio-frutiger commit -m "feat: add confirmation dialog before clearing Paint canvas"
```

---

## Task 9 : `MusicPlayer.tsx` — indicateur fin de piste

**Files:**
- Modify: `app/apps/MusicPlayer.tsx`

**Contexte :** Quand une piste se termine, `onEnded` passe à la piste suivante mais rien ne l'indique visuellement. Ajouter un état `isEnded` temporaire (1.5s) avec affichage "Piste suivante…".

- [ ] **Step 1 : Vérifier TypeScript avant modification**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 2 : Ajouter l'état `isEnded` dans `app/apps/MusicPlayer.tsx`**

Après la ligne `const [barHeights, setBarHeights] = useState(Array(14).fill(10));`, ajouter :
```typescript
  const [isEnded, setIsEnded] = useState(false);
```

- [ ] **Step 3 : Modifier le handler `onEnded` dans le useEffect des events audio**

Trouver :
```typescript
    const onEnded = () => setCurrentTrack(p => (p + 1) % tracks.length);
```

Remplacer par :
```typescript
    const onEnded = () => {
      setIsEnded(true);
      setTimeout(() => setIsEnded(false), 1500);
      setCurrentTrack(p => (p + 1) % tracks.length);
    };
```

- [ ] **Step 4 : Ajouter l'indicateur visuel dans le JSX**

Trouver le bloc "Info piste" (après les barres de visualisation) :
```tsx
      {/* Info piste */}
      <div className="text-center mt-3 px-4">
        <h3 className="font-bold text-sky-900 truncate text-sm">{tracks[currentTrack].title}</h3>
        <p className="text-xs text-sky-600/70 mt-0.5">{tracks[currentTrack].artist}</p>
      </div>
```

Remplacer par :
```tsx
      {/* Info piste */}
      <div className="text-center mt-3 px-4">
        <h3 className="font-bold text-sky-900 truncate text-sm">{tracks[currentTrack].title}</h3>
        <p className="text-xs text-sky-600/70 mt-0.5">{tracks[currentTrack].artist}</p>
        {isEnded && (
          <p className="text-xs text-sky-400 animate-pulse mt-1">Piste suivante…</p>
        )}
      </div>
```

- [ ] **Step 5 : Vérifier TypeScript**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 6 : Commit**

```bash
git -C D:/portfolio-frutiger add app/apps/MusicPlayer.tsx
git -C D:/portfolio-frutiger commit -m "feat: add end-of-track indicator in MusicPlayer"
```

---

## Task 10 : `Browser.tsx` — barre de progression iframe

**Files:**
- Modify: `app/components/os/Browser.tsx`

**Contexte :** L'état `loading` existe déjà (ligne 24) et est mis à `false` via `onLoad` (ligne 140). Il manque uniquement une barre visuelle. L'icône `RefreshCw` tourne déjà pendant le chargement — on ajoute une barre fine sous la navbar.

- [ ] **Step 1 : Vérifier TypeScript avant modification**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 2 : Ajouter la barre de progression dans `app/components/os/Browser.tsx`**

Lire le fichier pour trouver la div de navigation (la grande `div` avec le background glass aqua). Ajouter juste après la div de navigation (avant le bloc `blocked` ou l'iframe) :

```tsx
      {/* Barre de progression */}
      <div
        className={`h-0.5 bg-sky-400 shrink-0 transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0'}`}
      />
```

- [ ] **Step 3 : Vérifier TypeScript**

```bash
cd D:/portfolio-frutiger && npx tsc --noEmit
```

- [ ] **Step 4 : Commit**

```bash
git -C D:/portfolio-frutiger add app/components/os/Browser.tsx
git -C D:/portfolio-frutiger commit -m "feat: add loading progress bar to Browser iframe"
```

---

## Vérification finale

```bash
# TypeScript global propre
cd D:/portfolio-frutiger && npx tsc --noEmit

# 10 commits présents
git -C D:/portfolio-frutiger log --oneline -12

# Vérifier manifest corrigé
grep "Dupont" D:/portfolio-frutiger/public/manifest.json
# Expected : aucun résultat

# Vérifier OG image route existe
ls D:/portfolio-frutiger/app/api/og/route.tsx

# Vérifier layout.tsx pointe vers /api/og
grep "api/og" D:/portfolio-frutiger/app/layout.tsx
# Expected : 2 occurrences (openGraph et twitter)

# Vérifier Copy importé dans WindowFrame
grep "Copy" D:/portfolio-frutiger/app/components/os/WindowFrame.tsx
# Expected : 2 lignes (import + JSX)
```
