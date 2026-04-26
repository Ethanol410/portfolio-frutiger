# Spec : Workstream Polish — EthanOS Portfolio

> Date : 2026-04-26
> Branche : master
> Scope : Performance (sans code splitting), SEO/PWA, UX bugs, quick wins

---

## Contexte

L'audit a identifié plusieurs points de polish non traités par les workstreams précédents : bundle non optimisé, OG image manquante, manifest PWA incorrect, bugs UX mineurs, et features quick-win absentes. Ce workstream exclut délibérément les `dynamic()` imports (risque SSR) et le undo/redo Paint (feature complexe).

## Principe directeur

Améliorer la qualité perçue et la distribution du portfolio sans risque de régression sur les fonctionnalités existantes. Chaque changement est localisé et réversible.

---

## Fichiers modifiés / créés

| Fichier | Action |
|---------|--------|
| `next.config.ts` | MODIFIER — `optimizePackageImports` pour framer-motion et lucide-react |
| `app/components/os/MatrixRain.tsx` | MODIFIER — pause animation sur `visibilitychange` |
| `app/page.tsx` | MODIFIER — `next/image` sur l'avatar |
| `app/apps/About.tsx` | MODIFIER — `next/image` sur l'avatar |
| `app/components/os/LockScreen.tsx` | MODIFIER — `next/image` sur l'avatar |
| `app/api/og/route.tsx` | CRÉER — OG image dynamique via `ImageResponse` |
| `app/layout.tsx` | MODIFIER — pointer `openGraph.images` vers `/api/og` |
| `public/manifest.json` | MODIFIER — nom, description, icônes PNG, syntaxe `purpose` |
| `app/components/os/WindowFrame.tsx` | MODIFIER — icône restore (`Copy`) distincte de minimize |
| `app/apps/Projects.tsx` | MODIFIER — pinned repos toujours affichés malgré filtre |
| `app/apps/Paint.tsx` | MODIFIER — confirmation avant Clear |
| `app/apps/MusicPlayer.tsx` | MODIFIER — indicateur fin de piste |
| `app/components/os/Browser.tsx` | MODIFIER — barre de progression iframe |

---

## Design détaillé

### 1. `next.config.ts` — `optimizePackageImports`

Ajouter dans la config existante (qui contient déjà les headers de sécurité) :

```typescript
experimental: {
  optimizePackageImports: ['framer-motion', 'lucide-react'],
},
```

Réduit le bundle initial en n'important que les exports effectivement utilisés de ces deux librairies volumineuses.

---

### 2. `MatrixRain.tsx` — Pause sur onglet caché

Le RAF tourne en continu même quand l'utilisateur change d'onglet.

Lire `MatrixRain.tsx` pour identifier la variable RAF et la boucle `draw`. Ajouter dans le `useEffect` principal :

```typescript
const onVisibilityChange = () => {
  if (document.hidden) {
    cancelAnimationFrame(rafIdRef.current);
  } else {
    rafIdRef.current = requestAnimationFrame(draw);
  }
};
document.addEventListener('visibilitychange', onVisibilityChange);
// Dans le cleanup :
document.removeEventListener('visibilitychange', onVisibilityChange);
```

Le RAF id doit être stocké dans un `useRef` pour être accessible depuis le listener.

---

### 3. `next/image` sur les avatars

Remplacer `<img src="/people_31.png" ...>` par `<Image>` dans les trois fichiers qui l'utilisent. Les dimensions exactes sont à lire dans chaque fichier avant modification.

```tsx
import Image from 'next/image';

// Exemple (dimensions réelles à vérifier) :
<Image
  src="/people_31.png"
  alt="Ethan Collin"
  width={64}
  height={64}
  className="..."
/>
```

Next.js génère automatiquement WebP/AVIF, lazy loading et srcset. Ajouter dans `next.config.ts` :

```typescript
images: {
  formats: ['image/avif', 'image/webp'],
},
```

---

### 4. OG image dynamique — `app/api/og/route.tsx`

Créer une route qui retourne une `ImageResponse` 1200×630 avec le nom et le titre d'Ethan :

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
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 16 }}>
          Ethan Collin
        </div>
        <div style={{ fontSize: 32, opacity: 0.85 }}>
          Développeur Web FullStack & IA — BUT MMI
        </div>
        <div style={{ fontSize: 24, opacity: 0.6, marginTop: 24 }}>
          ethan-portfolio.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
```

Puis dans `app/layout.tsx`, mettre à jour `openGraph.images` :

```typescript
openGraph: {
  images: [{ url: '/api/og', width: 1200, height: 630 }],
}
```

---

### 5. `public/manifest.json` — Corrections PWA

**Avant :**
```json
{
  "description": "Ethan Dupont",
  "icons": [{ "src": "/icons/vista_pc_1.ico", "purpose": "any maskable" }]
}
```

**Après :**
```json
{
  "name": "EthanOS",
  "short_name": "EthanOS",
  "description": "Portfolio d'Ethan Collin — Développeur Web FullStack & IA",
  "icons": [
    {
      "src": "/icons/vista_pc_1.ico",
      "sizes": "64x64",
      "type": "image/x-icon"
    }
  ],
  "purpose": "any"
}
```

**Note :** Les icônes PNG 192×192 et 512×512 sont idéales pour une PWA complète, mais créer ces fichiers images dépasse le scope du workstream (nécessite des assets graphiques). On corrige le nom, la description et la syntaxe `purpose` invalide. L'icône .ico reste en attendant des PNGs fournis par l'utilisateur.

---

### 6. `WindowFrame.tsx` — Icône restore distincte

Quand la fenêtre est maximisée, le bouton restore affiche `Minimize2` — identique au bouton minimize juste à côté. Utiliser `Copy` (deux carrés superposés = convention restore) :

```tsx
import { X, Minimize2, Maximize2, Copy } from 'lucide-react';

// Bouton restore/maximize :
{appWindow.isMaximized
  ? <Copy size={12} color="white" />
  : <Maximize2 size={12} color="white" />
}
```

L'`aria-label` est déjà correct ("Restaurer" / "Agrandir") depuis le workstream Accessibilité.

---

### 7. `Projects.tsx` — Pinned repos toujours affichés

Quand un filtre technologie est actif, les pinned repos GitHub disparaissent si aucune de leurs techs ne correspond. Fix : séparer la logique de filtrage pour n'appliquer le filtre qu'aux projets locaux du portfolio.

Lire `Projects.tsx` pour comprendre comment le filtre est appliqué, puis modifier pour que les pinned repos contournent le filtre tech.

---

### 8. `Paint.tsx` — Confirmation avant Clear

```typescript
const handleClear = () => {
  if (!confirm('Effacer le dessin ? Cette action est irréversible.')) return;
  const ctx = canvasRef.current?.getContext('2d');
  if (!ctx) return;
  ctx.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
};
```

---

### 9. `MusicPlayer.tsx` — Indicateur fin de piste

Ajouter un état `isEnded` déclenché par `audio.onended` (ou l'event `ended`) :

```typescript
const [isEnded, setIsEnded] = useState(false);

// Dans le useEffect des events audio :
const onEnded = () => {
  setIsEnded(true);
  setTimeout(() => setIsEnded(false), 1500);
  setCurrentTrack(p => (p + 1) % tracks.length);
};
```

Afficher dans l'UI (sous le titre de la piste) :

```tsx
{isEnded && (
  <p className="text-xs text-sky-400 animate-pulse">Piste suivante…</p>
)}
```

---

### 10. `Browser.tsx` — Barre de progression iframe

```tsx
const [loading, setLoading] = useState(true);

// Barre fine au-dessus de l'iframe :
<div
  className={`h-0.5 bg-sky-400 transition-opacity duration-500 ${loading ? 'opacity-100' : 'opacity-0'}`}
/>
<iframe
  onLoad={() => setLoading(false)}
  ...
/>
```

---

## Ce qui n'est PAS dans ce workstream

- `dynamic()` imports / code splitting — risque SSR
- Undo/Redo dans Paint — feature complexe
- Icônes PNG 192×192 / 512×512 pour PWA complète — nécessite assets fournis
- Service Worker / offline mode — hors scope
- `Math.random()` → `crypto.randomUUID()` — pas un vrai bug dans ce projet (positions, pas IDs)

---

## Critères de succès

- [ ] `npx tsc --noEmit` — zéro erreur après chaque tâche
- [ ] Bundle framer-motion et lucide-react réduit (vérifiable via `next build` output)
- [ ] MatrixRain ne consomme plus de CPU quand l'onglet est caché
- [ ] Les avatars passent par `next/image` (format moderne, lazy loading)
- [ ] `/api/og` retourne une image 1200×630 valide
- [ ] Le manifest PWA n'a plus `"Ethan Dupont"` ni `"purpose": "any maskable"`
- [ ] Les boutons minimize et restore ont des icônes distinctes
- [ ] Les pinned repos apparaissent avec ou sans filtre tech actif
- [ ] Clear dans Paint demande confirmation
- [ ] Fin de piste affiche "Piste suivante…" pendant 1.5s
- [ ] Browser affiche une barre de chargement pendant le chargement de l'iframe
- [ ] Aucune régression visible côté utilisateur
