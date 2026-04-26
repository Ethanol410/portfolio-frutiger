# Spec : Workstream Accessibilité — EthanOS Portfolio

> Date : 2026-04-26
> Branche : master
> Scope : Accessibilité de base — focus trap, aria-labels, keyboard nav sur les éléments critiques

---

## Contexte

L'audit a donné un score de 4/10 en accessibilité. Les problèmes principaux : absence de focus trap dans les fenêtres, navigation clavier impossible dans Explorer, messages du chat IA non annoncés aux lecteurs d'écran, alt text générique sur la pochette d'album.

## Principe directeur

**Accessibilité de base (option A) :** corriger ce qui bloque les utilisateurs clavier et les lecteurs d'écran sur les éléments critiques. Les drags de fenêtres restent souris uniquement — c'est intentionnel dans l'esthétique OS simulé. Zéro changement de comportement visible.

---

## Fichiers modifiés

| Fichier | Action | Fix |
|---------|--------|-----|
| `app/components/os/WindowFrame.tsx` | MODIFIER | Focus trap + `aria-modal` + `aria-label` sur les boutons de contrôle |
| `app/apps/Explorer.tsx` | MODIFIER | `tabIndex` + `role="button"` + `onKeyDown` Enter/Space sur les items |
| `app/apps/AIChat.tsx` | MODIFIER | `aria-live="polite"` + `role="log"` sur la liste des messages |
| `app/apps/MusicPlayer.tsx` | MODIFIER | `alt` dynamique sur la pochette d'album |

---

## Design détaillé

### 1. Focus trap dans `WindowFrame.tsx`

**Problème :** quand une fenêtre est ouverte, Tab peut atteindre les éléments derrière elle. Un utilisateur clavier ne peut pas rester dans la fenêtre active.

**Implémentation — hook natif, zéro dépendance nouvelle :**

```typescript
function useFocusTrap(ref: React.RefObject<HTMLElement>, isActive: boolean) {
  useEffect(() => {
    if (!isActive || !ref.current) return;

    const el = ref.current;
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
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    }

    el.addEventListener('keydown', onKeyDown);
    return () => {
      el.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus();
    };
  }, [isActive, ref]);
}
```

**Attributs ajoutés au conteneur de la fenêtre :**

```html
<div role="dialog" aria-modal="true" aria-label={title} ref={containerRef}>
```

**Aria-labels sur les boutons de contrôle :**

```html
<button aria-label="Fermer">×</button>
<button aria-label="Réduire">_</button>
<button aria-label={isMaximized ? "Restaurer" : "Agrandir"}>□</button>
```

**Comportement :**
- À l'ouverture de la fenêtre : focus sur le premier élément focusable de la fenêtre
- Tab sur le dernier élément → revient au premier (cycle)
- Shift+Tab sur le premier → saute au dernier
- À la fermeture : focus restauré sur l'élément qui avait le focus avant l'ouverture

---

### 2. Keyboard nav dans `Explorer.tsx`

**Problème :** les fichiers et dossiers s'ouvrent uniquement au double-clic. Inaccessibles au clavier.

**Avant :**

```typescript
<div onDoubleClick={() => handleNavigate(item)}>
  {/* contenu */}
</div>
```

**Après :**

```typescript
<div
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
>
  {/* contenu inchangé */}
</div>
```

**Comportement :** Enter ou Espace = même action que le double-clic. La souris continue de fonctionner exactement comme avant.

---

### 3. `aria-live` dans `AIChat.tsx`

**Problème :** les nouveaux messages apparaissent dans le DOM silencieusement — un lecteur d'écran ne les annonce pas.

**Avant :**

```html
<div className="...">
  {messages.map(...)}
</div>
```

**Après :**

```html
<div
  aria-live="polite"
  aria-label="Conversation avec l'assistant"
  role="log"
  className="..."
>
  {messages.map(...)}
</div>
```

- `aria-live="polite"` : annonce le nouveau message quand l'utilisateur est inactif (pas d'interruption brutale)
- `role="log"` : indique aux lecteurs d'écran que c'est un flux chronologique

---

### 4. Alt text dans `MusicPlayer.tsx`

**Avant :**

```html
<img alt="album" src={currentTrack.cover} />
```

**Après :**

```html
<img alt={`${currentTrack.title} — pochette d'album`} src={currentTrack.cover} />
```

---

## Ce qui n'est PAS dans ce workstream

- Drag des fenêtres sans clavier — intentionnel dans l'esthétique OS simulé
- Settings wallpaper selector keyboard nav — cosmétique, pas critique
- Calendar cells dans Taskbar — widget d'affichage passif
- Terminal output `aria-live` — complexe, risqué
- WCAG AA contrast audit complet — reporté au workstream Polish
- `StartMenu.tsx` icône Vista — `alt=""` déjà correct (image décorative)

---

## Critères de succès

- [ ] Tab dans une fenêtre ouverte ne peut pas atteindre les éléments derrière elle
- [ ] Fermer une fenêtre restaure le focus sur l'élément précédent
- [ ] Les boutons close/minimize/maximize ont un `aria-label` lisible
- [ ] Enter et Espace ouvrent un fichier/dossier dans Explorer
- [ ] Un lecteur d'écran annonce les nouveaux messages dans AIChat
- [ ] La pochette d'album a un alt descriptif dans MusicPlayer
- [ ] `npx tsc --noEmit` — zéro erreur après chaque modification
- [ ] Aucune régression visible côté utilisateur
