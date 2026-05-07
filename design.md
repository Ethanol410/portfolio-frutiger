Voici le `design.md` réécrit, exhaustif, intégrant **toute** l'analyse du site frutigeraeroarchive.org :

---

```markdown
# design.md
## Système de design — frutigeraeroarchive.org
### Analyse exhaustive et spécifications techniques

> Site analysé : https://frutigeraeroarchive.org
> Pages explorées : Introduction, Wallpapers, Resources, History, Icons, Blog, Music Player, Flash Media, Indie Games, Sketchbook, Televisions, Videos, Web Forum, Chat Room, Aero Webring, Other Links, Guestbook, Sitemap, Mascot, Site Info, Contact
> Thèmes testés : Longhorn (Default), Frutiger Aero, Y2K Futurism, Kasane Teto, Hatsune Miku
> Date d'analyse : 06/05/2026

---

## 1. PHILOSOPHIE & IDENTITÉ

### Concept fondateur
Le site est un **musée numérique vivant** dédié à l'esthétique **Frutiger Aero** (2005–2013). Il combine :
- Un **OS-skin web** : reproduit l'expérience d'un OS Windows Vista/7 directement dans le navigateur
- Une **galerie d'archives** : milliers de wallpapers, icônes, sons, vidéos d'époque
- Une **communauté** : forum phpBB, guestbook, chat xat, webring, sketchbook collaboratif
- Un **blog personnel** : ton intime, à la première personne, écrit par Daniele63

### Mood général
Doux, lumineux, organique mais high-tech. Nostalgique, optimiste, propre et "vivant". Le contraste **nature ↔ technologie** est l'âme visuelle : herbe en arrière-plan, interfaces glossy au premier plan.

### Anti-patterns (à ne JAMAIS faire)
- ❌ Design flat / minimaliste (Material, Inter, sans serif modernes)
- ❌ Gros espacements blancs / mode sombre tendance
- ❌ Tracking, cookies, popups intrusifs
- ❌ Animations excessives / parallax lourd
- ❌ Monétisation agressive

---

## 2. SYSTÈME DE THÈMES (CRUCIAL)

Le site propose **11 thèmes commutables** via un bouton "Themes" dans la navbar. Chaque thème modifie : couleurs, wallpaper de fond, banners de section, mascotte, sons UI, gradient des boutons.

| # | Thème | Wallpaper | Couleur dominante | Mascotte | Mood |
|---|-------|-----------|-------------------|----------|------|
| 1 | **Longhorn (Default)** | Herbe verte macro sombre | Vert sombre `#3a7a3a` sur fond `#0d0d0d` | Archive-Tan verte | Aero glass sombre |
| 2 | **Longhorn Neue** | Variation herbe similaire | Vert légèrement différent | Archive-Tan | Variation |
| 3 | **Frutiger Aero** | Herbe + ciel bleu, lumineux | **Bleu Vista** `#4a90d9` sur blanc/cyan | Archive-Tan | **Aero glass clair** (le vrai Vista/7) |
| 4 | **Dark Aero** | Bleu nuit | Bleu sombre `#1a3a6a` | Hatsune Miku | Aero nuit |
| 5 | **Nightcore** | Anime nuit néon | Rose/violet/cyan | Anime girl | Néon nightlife |
| 6 | **Y2K Futurism** | Cyber circuit board | **Teal/cyan** `#1aa9a9` | Mascotte cheveux bleus | Y2K, technique |
| 7 | **Hatsune Miku** | Miku artwork | Cyan/teal `#39c5bb` | Hatsune Miku | Vocaloid bleu |
| 8 | **Kasane Teto** | Pattern motif rouge | Rouge/grenat `#a02a3a` | Teto cheveux roses | Vocaloid rouge |
| 9 | **Kagamine Rin/Len** | Jaune Vocaloid | Jaune `#e0c040` | Rin & Len | Vocaloid jaune |
| 10 | **K-ON!** | Anime K-ON | Rose/marron | Yui | Slice of life |
| 11 | **Touhou** | Touhou artwork | Jaune/orange | Touhou character | Touhou-themed |

### Architecture multi-thèmes
- Implémenté en **CSS variables** pour swap instantané
- Choix persistant via `localStorage` (côté client uniquement)
- Sound effect joué au changement (sauf si vidéo/musique en cours)
- Le sélecteur s'ouvre en **panneau latéral droit** avec previews (vignettes 200x80px)
- Chaque thème change les **header banners** de chaque section (assets dédiés par thème)

---

## 3. PALETTE DE COULEURS (THÈME PAR DÉFAUT — LONGHORN)

### Couleurs de fond
```css
--wallpaper:           url('/img/wallpaper-grass.jpg');  /* photo herbe verte HD */
--surface-window:      rgba(10, 10, 10, 0.82);
--surface-header:      linear-gradient(180deg, #363636 0%, #1a1a1a 100%);
--surface-nav:         linear-gradient(180deg, #1e1e1e 0%, #0d0d0d 100%);
--surface-section-bar: linear-gradient(180deg, #383838 0%, #242424 100%);
--surface-card:        rgba(20, 20, 20, 0.7);
--surface-input:       rgba(0, 0, 0, 0.5);
```

### Accents verts (signature Longhorn/Aero)
```css
--accent-primary:      #4ecb71;   /* vert Aero principal */
--accent-secondary:    #6fcf97;   /* liens textes */
--accent-hover:        #8de0a8;   /* liens hover */
--accent-active:       #2d6e3e;   /* fond bouton actif navbar */
--accent-glow:         rgba(78, 203, 113, 0.35);
--accent-button-grad:  linear-gradient(180deg, #5cd683 0%, #2d8a4a 100%);
```

### Texte
```css
--text-primary:    #d4d4d4;   /* corps */
--text-secondary:  #999999;   /* meta */
--text-muted:      #666666;
--text-title:      #cccccc;   /* titres section */
--text-link:       #6fcf97;
--text-on-accent:  #ffffff;
```

### Bordures & ombres
```css
--border-glass:    rgba(255, 255, 255, 0.13);
--border-subtle:   rgba(255, 255, 255, 0.07);
--border-divider:  rgba(255, 255, 255, 0.10);
--shadow-window:   0 4px 20px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.09);
--shadow-button:   0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
--inset-glass:     inset 0 0 40px rgba(255,255,255,0.03);
```

### Variantes thèmes — tokens à overrider
Pour chaque thème, seuls **5 tokens** changent vraiment :
- `--accent-primary`
- `--accent-button-grad`
- `--text-link`
- `--wallpaper`
- `--banner-set` (chemin vers les images de banners par section)

---

## 4. TYPOGRAPHIE

### Stack principale
```css
font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif, Arial, Helvetica;
```

### Échelle
| Élément | Taille | Poids | Couleur |
|---------|--------|-------|---------|
| Titre site (logo) | 28px | 700 | `#fff` |
| Sous-titre logo (tagline) | 13px | 400 | `#bbb` |
| Titre section (barre noire) | 14px | 400 | `#ccc` |
| Banner titre (image) | ~60–80px italique | 400 | noir avec glow blanc |
| Banner sous-titre | ~24px italique | 400 | noir |
| H1 dans contenu | 18px | 600 | `#e0e0e0` |
| H2 | 16px | 600 | `#d4d4d4` |
| Corps de texte | 13px | 400 | `#d4d4d4` |
| Liens | 13px | 400 | `#6fcf97` |
| Navbar buttons | 12–13px | 400 | `#ddd` |
| Catégories navbar | 11px | 400 | `#aaa` (centré) |
| Footer / meta | 11px | 400 | `#888` |

### Règles
- `line-height: 1.55`
- Pas d'italique sauf pour citations/crédits
- Liens **non soulignés** par défaut, **soulignés au hover**
- Pas de `letter-spacing` exagéré
- Crédits artistes en très petit en bas des banners (`9px`)

---

## 5. LAYOUT GLOBAL

### Structure de page (toutes pages SAUF Blog & Chat Room)
```
┌──────────────────────────────────────────────────┐
│ [WALLPAPER fixe sur viewport entier]              │
│                                                  │
│  ┌────────────────────────────────────────────┐  │
│  │ HEADER (logo Windows + titre + tagline)    │  │
│  └────────────────────────────────────────────┘  │
│  ┌─────┐  ┌─────────────────────────────────┐   │
│  │ NAV │  │ SECTION TITLE BAR                │   │
│  │     │  ├─────────────────────────────────┤   │
│  │ ←   │  │ BANNER ILLUSTRÉ + MASCOTTE       │   │
│  │ 122 │  │ (h ~145px, flat 16:9)           │   │
│  │ px  │  ├─────────────────────────────────┤   │
│  │     │  │ INTRO TEXT + content             │   │
│  │     │  ├─────────────────────────────────┤   │
│  │     │  │ TABLE OF CONTENTS                │   │
│  │     │  ├─────────────────────────────────┤   │
│  │     │  │ SECTIONS (H titres + texte)      │   │
│  │     │  ├─────────────────────────────────┤   │
│  │     │  │ PAGINATION (Summary/Prev/Next)   │   │
│  │     │  └─────────────────────────────────┘   │
│  └─────┘                                         │
└──────────────────────────────────────────────────┘
```

### Dimensions clés
```css
--container-max:   1200px;     /* centré horizontalement */
--header-height:   ~95px;
--nav-width:       122px;      /* fixe */
--content-width:   ~790px;     /* le reste */
--gap:             10px;
--padding-window:  16px;
--radius-window:   10px;       /* haut du header */
--radius-card:     6px;
```

### Optimisé pour
- Cible historique : **1280×1024** (CRT 5:4 années 2000)
- Cible moderne : **1920×1080** (centré avec wallpaper sur les côtés)
- Mobile : `< 650px` → bascule en single column

---

## 6. COMPOSANTS UI DÉTAILLÉS

### 6.1 Header global (toutes pages)
```css
.site-header {
  background: linear-gradient(180deg, #363636, #1a1a1a);
  border: 1px solid var(--border-glass);
  border-radius: 12px 12px 0 0;
  padding: 14px 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: var(--shadow-window);
  position: relative;
}
.site-header::before {  /* reflet glossy supérieur */
  content: '';
  position: absolute;
  inset: 0 0 50% 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.08), transparent);
  border-radius: inherit;
  pointer-events: none;
}
.site-header__logo {
  width: 56px; height: 56px;
  /* drapeau Windows XP/Vista coloré (4 quadrants) */
}
.site-header__title { font-size: 28px; font-weight: 700; color: #fff; }
.site-header__tagline { font-size: 13px; color: #bbb; }
```

### 6.2 Navbar gauche (sidebar fixe)
```css
.nav {
  width: 122px;
  background: linear-gradient(180deg, #1e1e1e, #0d0d0d);
  border: 1px solid var(--border-glass);
  padding: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.nav__category {
  background: linear-gradient(180deg, #2a2a2a, #1a1a1a);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  padding: 4px;
  text-align: center;
  font-size: 11px;
  color: #aaa;
  margin-top: 8px;
}
.nav__link {
  display: flex; align-items: center; gap: 6px;
  padding: 5px 8px;
  background: linear-gradient(180deg, #2e2e2e, #181818);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
  color: #ddd;
  font-size: 12px;
  text-decoration: none;
  transition: background 0.15s ease;
}
.nav__link img { width: 16px; height: 16px; }  /* icônes Vista shell */
.nav__link:hover {
  background: linear-gradient(180deg, #3a3a3a, #222);
  color: var(--accent-primary);
}
.nav__link--active {
  background: linear-gradient(180deg, #4ecb71, #2d6e3e);
  color: #fff;
  border-color: rgba(255,255,255,0.2);
  text-shadow: 0 1px 1px rgba(0,0,0,0.4);
}

/* Boutons spéciaux : Sounds Off + Themes */
.nav__special {
  background: linear-gradient(180deg, #5cd683, #2d8a4a);
  color: #fff;
  font-weight: 600;
  text-align: center;
  border: 1px solid rgba(255,255,255,0.25);
  margin-top: 12px;
  padding: 6px;
  border-radius: 4px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.3), 0 1px 3px rgba(0,0,0,0.4);
}
```

### 6.3 Fenêtre de contenu (Aero Glass)
**Le composant signature — toutes les boîtes du site sont basées dessus.**
```css
.window {
  background: rgba(10, 10, 10, 0.82);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  box-shadow:
    0 4px 20px rgba(0,0,0,0.65),
    inset 0 1px 0 rgba(255,255,255,0.09),
    inset 0 0 40px rgba(255,255,255,0.03);
  position: relative;
  overflow: hidden;
}
.window::before {  /* reflet supérieur glossy */
  content: '';
  position: absolute;
  inset: 0 0 60% 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.06), transparent);
  pointer-events: none;
}
.window__title {
  background: linear-gradient(180deg, #383838, #242424);
  border-bottom: 1px solid var(--border-divider);
  text-align: center;
  padding: 6px 12px;
  font-size: 14px;
  color: #ccc;
}
.window__body { padding: 14px 18px; }
```

### 6.4 Banner de section (illustré)
**Élément distinctif : chaque page a un banner unique en haut.**
```
Dimensions : ~770 × 145px
Format : background-image avec photo nature + overlay
Contenu :
  - Texte gauche : nom de section en italique géant + tagline
  - Mascotte Archive-Tan en angle droit (180×140px transparente)
  - Crédit artiste en bas gauche : "Mascot Art: mimikitty49.neocities.org" (9px blanc)
Style typo : Comic Sans MS / Segoe UI italic, ~70px, noir, glow blanc
Bordure : aucun radius, juste les bords du window parent
```
Chaque thème = un set de banners dédié (icons, wallpapers, history, contact, etc.).

### 6.5 Table of Contents
```css
.toc {
  background: rgba(0,0,0,0.6);
  border: 1px solid var(--border-glass);
  border-radius: 6px;
  padding: 14px 20px;
}
.toc__item {
  display: flex; align-items: center; gap: 12px;
  padding: 8px 0;
  border-bottom: 1px dashed rgba(255,255,255,0.08);
}
.toc__item img { width: 32px; height: 32px; }  /* icône thématique */
.toc__item a {
  color: var(--accent-secondary);
  font-size: 14px;
  text-decoration: none;
}
.toc__item a:hover { text-decoration: underline; color: var(--accent-hover); }
```

### 6.6 Pagination "Summary / Previous / Next"
**Boutons glossy verts arrondis (style Vista)**
```css
.pagination {
  display: flex; gap: 12px; justify-content: center;
  padding: 14px 0;
}
.pagination__btn {
  background: linear-gradient(180deg, #5cd683, #2d8a4a);
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 14px;        /* très arrondi */
  padding: 8px 24px;
  color: #fff;
  font-weight: 600;
  font-size: 13px;
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,0.4),
    0 2px 4px rgba(0,0,0,0.5);
  cursor: pointer;
  transition: filter 0.15s;
}
.pagination__btn:hover { filter: brightness(1.1); }
.pagination__btn--icon::after { content: ' →'; }
```

### 6.7 Music Player (composant unique)
**Composant majeur : lecteur audio custom avec esthétique CD/Aqua**
```
Layout :
┌──────────────────────────────────────────┐
│ ━━━━ Music Player ♪ ━━━━━━━━━━━━━━━━━━│
├──────────────────────────────────────────┤
│       [⏮]  [▶ vert glossy 48px]  [⏭]    │
├──────────────────────────────────────────┤
│ Time Left: 1:28 ▓▓▓▓░░░    RANDOM SHUFFLE│
├─────────────────────────────┬───────────┤
│ Frutiger Aero Bliss          │           │
│ 1. drmr - Homebrew Channel  │  [Visual] │
│ 2. maplememory - skyfish    │   the     │
│ 3. A-Dog - Menu Settings    │ homebrew  │
│ 4. ...                       │  channel  │
│                              │           │
│                              │  [💿 CD   │
│                              │   spinning│
│                              │   anim]   │
├──────────────────────────────┴───────────┤
│ [Download↓] 🔊 ▓▓▓░ Vol:30 [Hide Sidebar]│
│                          [Hide Artwork]  │
│                          [Upload]        │
├──────────────────────────────────────────┤
│ Currently playing: drmr - Homebrew Ch.   │
└──────────────────────────────────────────┘
```
**Spécifications** :
- Fond aqua bleu très clair (`#aae0f0` à `#7ac0e0` gradient)
- Bouton play : cercle vert glossy 48px, icône triangle blanc
- Barre progression : verte aqua avec reflet
- CD : SVG/PNG en rotation continue (`@keyframes spin 4s linear infinite`)
- Visualizer : 16 barres animées sur l'audio
- Modes : Aquarium / Tropical Beach / Enable CD Mode / Upload Wallpaper / Toggle Dancer
- Boutons "Hide Sidebar" / "Hide Artwork" / "Upload" en bas droite (style Vista)
- Sidebar playlist scrollable

### 6.8 CRT TV Simulator
**Composant ludique sur la page Televisions**
- Image PNG d'un vrai CRT (Panasonic, Sony, etc.) en background
- iframe YouTube embed dans la zone écran
- Filtres CSS : `filter: blur(0.5px) saturate(1.2);` + scanlines en overlay
- Effet VHS optionnel (toggle)
- Stickers sur les côtés du TV (autocollants époque)
- Boutons physiques visuels en dessous

### 6.9 Formulaire de contact
```css
.form-field {
  background: rgba(0,0,0,0.5);
  border: 1px solid var(--border-glass);
  border-radius: 4px;
  padding: 10px 12px;
  color: #d4d4d4;
  font-family: var(--font-ui);
  font-size: 13px;
  width: 100%;
}
.form-field::placeholder { color: #666; font-style: italic; }
.form-label {
  color: var(--accent-secondary);   /* labels en vert ! */
  font-size: 13px;
  margin-bottom: 6px;
}
.btn-submit {
  width: 100%;
  padding: 12px;
  background: linear-gradient(180deg, #5cd683, #2d8a4a);
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  border: 1px solid rgba(255,255,255,0.3);
  border-radius: 6px;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.4);
}
```

### 6.10 Boutons 88×31 (Other Links)
**Reproductions des web badges des années 2000**
- Format strict : 88 × 31 pixels
- Affichés en grille 4 colonnes
- Au hover : variante GIF animée si disponible
- Code HTML embed copiable dans textarea sous chaque bouton
- Section "Promotional Graphics" avec textareas pré-remplies

### 6.11 Galerie wallpaper (lazy-load)
- Grille 3 colonnes
- Chaque image : aperçu cropped, taille fichier affichée, bouton download
- Click → ouvre **Spotlight viewer** (lightbox custom) avec navigation flèches
- Pagination par catégorie (Asadal, Material Dictionary 149, 178, 186, 206, 226...)
- Avertissement copyright en haut : "Warning: unless explicitly stated otherwise, all images contained in this website are for documentation purposes only..."

### 6.12 Webring widget
- Liste de membres avec preview screenshot 200×80
- Boutons "Previous", "Random", "Next" du webring
- Form d'inscription pour rejoindre
- Compteur de membres (ex: "139 members")

### 6.13 Guestbook
- Iframe externe vers service de guestbook
- Banner illustré "Guestbook" avec livre ouvert sur herbe
- Form avec : Name, Country (optional), Website (optional), How did you find this site, Memory from the 2000s, Message
- Mascotte (souvent Hatsune Miku ou Archive-Tan) flottant en bas à droite

### 6.14 Sketchbook
- **Embed JSPaint** (paint.js.org) en iframe sur ~700×500
- Lien "Open in a new window"
- Section "Hall of Fame" avec galerie des fanarts soumis
- Soumissions exclusivement via le forum (plus le contact)

### 6.15 Flash Media
- **Ruffle.js** pour émuler les .swf
- Lecteur Flash 720×500 centré
- Section "Information" en dessous (titre, créateur, lien Newgrounds)
- Liste de jeux/animations cliquables

### 6.16 Scrollbar customisée
```css
::-webkit-scrollbar { width: 16px; }
::-webkit-scrollbar-track {
  background: linear-gradient(90deg, #0d0d0d, #1a1a1a);
}
::-webkit-scrollbar-thumb {
  background: linear-gradient(90deg, #2a2a2a, #3a3a3a);
  border: 1px solid #555;
  border-radius: 2px;
}
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(90deg, #3a3a3a, #4a4a4a);
}
```

### 6.17 Layout EXCEPTION : Blog
**Le blog a un design totalement différent (inspiré Windows Mobile 2007)**
- Pas de sidebar
- Header simple : logo + titre "Archive Official Blog" centré sur fond herbe
- Barre de navigation horizontale fine : "Back to Site | Theme | Contact"
- Contenu en pleine largeur : titres bold blancs sur fond noir, listes bullet vertes
- Bouton RSS orange large (signature web 2.0)
- Quizz / images "anime personality" en grille 2 colonnes en bas

---

## 7. ICÔNES & ASSETS

### Icônes UI
- **Source** : Windows Vista / 7 shell icons (`shell32.dll`, `imageres.dll`)
- **Style** : 3D glossy semi-réaliste, reflets, transparence
- **Tailles** : 16×16 (navbar), 32×32 (TOC), 48×48 (catégories), 256×256 (favicon Vista Orb)
- **Format** : PNG transparents

### Mascotte principale : **Archive-Tan**
- Style anime OS-Tan (cheveux verts, casque audio, tenue tech)
- Numéro "63" sur l'épaule (clin d'œil au pseudo Daniele63)
- Artiste principale : Mimikitty49
- Variantes par thème : Miku (cyan), Teto (rouge), etc.
- Modèle MMD téléchargeable (3D pose-able)

### Wallpaper de fond
- **Default** : Photo macro herbe verte HD (style Windows 7 "Bliss" mais plus saturé)
- `background-attachment: fixed`
- `background-size: cover`
- Position centrée

### 88×31 buttons collection
- Format strict 88×31px
- Gradient bleu vers vert avec texte "Frutiger Aero Archive"
- Variantes : Archive-Tan, Nanami, Silver, Vistini

---

## 8. EFFETS VISUELS

### Effet Aero Glass (signature)
```css
.aero-glass {
  background: rgba(10, 10, 10, 0.82);
  backdrop-filter: blur(8px) saturate(1.2);
  border: 1px solid rgba(255,255,255,0.13);
  box-shadow:
    0 4px 20px rgba(0,0,0,0.6),
    inset 0 1px 0 rgba(255,255,255,0.09),
    inset 0 0 40px rgba(255,255,255,0.03);
}
.aero-glass::before {
  /* reflet supérieur subtil */
  content: '';
  position: absolute; inset: 0 0 60% 0;
  background: linear-gradient(180deg, rgba(255,255,255,0.06), transparent);
  pointer-events: none;
}
```

### Glow vert (hover/focus)
```css
.glow:hover {
  box-shadow: 0 0 12px rgba(78, 203, 113, 0.5);
}
```

### Reflet glossy boutons (Vista style)
```css
.btn-glossy {
  background: linear-gradient(180deg,
    #5cd683 0%, #4ecb71 50%, #2d8a4a 50%, #1f6e36 100%);
  /* Note : transition NETTE à 50% pour effet "lacque" Vista */
  border: 1px solid rgba(255,255,255,0.25);
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.4);
}
```

### Animations CD spinning (music player)

Je reprends à partir de la coupure :

```markdown
### Animations CD spinning (music player)
```css
@keyframes cd-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
.cd {
  animation: cd-spin 4s linear infinite;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.6));
}
.cd--paused { animation-play-state: paused; }
```

### Visualizer audio
```css
@keyframes vu {
  0%, 100% { transform: scaleY(0.3); }
  50%      { transform: scaleY(1); }
}
.vu-bar {
  width: 4px; height: 40px;
  background: linear-gradient(180deg, #5cd683, #2d8a4a);
  transform-origin: bottom;
  animation: vu 0.4s ease-in-out infinite;
}
.vu-bar:nth-child(2)  { animation-delay: 0.1s; }
.vu-bar:nth-child(3)  { animation-delay: 0.2s; }
/* etc. — pattern décalé sur 16 barres */
```

### Scanlines overlay (TV simulator + parfois music player)
```css
.scanlines::after {
  content: '';
  position: absolute; inset: 0;
  background: repeating-linear-gradient(
    0deg,
    rgba(0,0,0,0.15) 0px,
    rgba(0,0,0,0.15) 1px,
    transparent 1px,
    transparent 3px
  );
  pointer-events: none;
  mix-blend-mode: multiply;
}
```

### Aquarium / Tropical Beach mode (music player)
- Wallpaper de la zone music remplacé par animation de poissons (sprites)
- Bulles montantes en boucle (`@keyframes bubble`)
- Toggle on/off via lien texte

### Dancer (music player)
- Sprite GIF d'un personnage qui danse en bas du player
- Animation déclenchée à l'allumage du toggle
- Synchronisée à la musique (oscillation simple)

### Transitions globales
```css
* {
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    box-shadow 0.2s ease;
}
```
**Pas** de `transform` au hover sur les boutons (anti-pattern moderne dans ce contexte).

---

## 9. SONS UI (Sound FX)

### Bouton "Sounds Off" / "Sounds On"
Toggle global qui active/désactive **tous** les effets sonores du site.

### Sons utilisés
| Action | Son | Source |
|--------|-----|--------|
| Hover navbar | Léger "tick" | Custom |
| Click bouton | "Click" Windows Vista | shell |
| Changement de thème | "Tada" / chime | Windows |
| Play music | Sound de CD-ROM qui démarre | (toggle dispo) |
| Switch video | Click TV | Custom |
| Switch flash media | Click | Custom |
| Site startup (optionnel) | Windows Vista boot sound | Microsoft |

### Implémentation
- État stocké dans `localStorage` (clé `soundsEnabled`)
- Audio préchargé en `<audio preload="auto">`
- Pas de son automatique sur visite (respect des autoplay policies)
- Désactivé temporairement si vidéo/musique principale en lecture

---

## 10. INVENTAIRE COMPLET DES PAGES (24 pages)

### Main Content (6)
| Page | Spécificités UI |
|------|-----------------|
| `/index` (Introduction) | Banner + texte + galerie 6 images "exemples FA" cliquables |
| `/wallpapers` | TOC paginée + grille 3 col + Spotlight viewer + warning copyright |
| `/resources` | Sections multiples : Transformation Packs, PNG, Userbars, Cursors |
| `/history` | Banner + TOC ancres + sections datées chronologiques |
| `/icons` | TOC avec icônes preview + grille de packs téléchargeables |
| `/blog/home` | **Layout différent (Windows Mobile 2007)** + RSS + grilles persona |

### Entertainment (6)
| Page | Spécificités UI |
|------|-----------------|
| `/music` | Lecteur CD custom + visualizer + sidebar artwork |
| `/flash_media` | Player Ruffle + info box + liste cliquable |
| `/indie_games` | Fiches jeux : titre, créateur, plateforme, prix, screenshots |
| `/sketchbook` | Iframe JSPaint embed + Hall of Fame galerie |
| `/televisions` | Choix de TV → simulateur CRT + iframe YouTube |
| `/videos` | Player HTML5 + info box + autoplay toggle + categories |

### Community (5)
| Page | Spécificités UI |
|------|-----------------|
| Forum (externe) | phpBB auto-hébergé `forum.frutigeraeroarchive.org` |
| `/chat_room` | Iframe xat + règles en bas + liens app store |
| `/aero_webring` | Members list + form join + RSS + Prev/Random/Next |
| `/other_links` | 88×31 buttons + textareas embed code + liens externes |
| `/guestbook` | Iframe service externe + form + mascotte flottante |

### Website (5)
| Page | Spécificités UI |
|------|-----------------|
| `/site_map` | Liste descriptive de chaque section avec H titres verts |
| `/site_mascot` | Fiche identité + 4 sections : Fanart, Official, MMD, Concept |
| `/site_info` | Privacy policy + section "Updates" (changelog public) |
| Donate (externe) | Lien Ko-Fi |
| `/contact` | Form (Name, Email, Image upload, Message) + bouton vert XL |

---

## 11. PAGINATION & NAVIGATION INTERNE

### Pattern "Wallpapers / Resources / Icons"
Chaque catégorie est paginée :
- **Header bar** indique : `Current page: Asadal Stock Images`
- **3 boutons en bas** : `[Summary 📚] [← Previous] [Next →]`
- Style des boutons : voir 6.6 (glossy verts arrondis)
- Click "Summary" → retour à la table des matières

### Ancres dans History
- Liens TOC qui scrollent vers la section avec `scroll-behavior: smooth`
- Lien "jump to this section" dans l'intro

---

## 12. RESPONSIVE & ACCESSIBILITÉ

### Breakpoints
```css
/* Mobile (overhaul total) */
@media (max-width: 650px) {
  .nav { width: 100%; flex-direction: row; flex-wrap: wrap; }
  .container { width: 100%; }
  body { font-size: 14px; }  /* augmenté */
  .banner { height: 100px; }
}

/* Tablette */
@media (min-width: 651px) and (max-width: 1024px) {
  .container { width: 100%; }
}

/* Desktop optimal */
@media (min-width: 1280px) {
  .container { max-width: 1200px; margin: 0 auto; }
}
```

### Accessibilité (a11y)
- **Tous les `<img>` ont un `alt`** (générique pour wallpapers : "Frutiger Aero - Image 1")
- Navigation **clavier complète** : `tab` traverse navbar puis contenu
- **Tags sémantiques** : `<header>`, `<nav>`, `<main>`, `<article>`, `<aside>`
- Contraste vérifié avec WAVE Web Accessibility tool
- Labels formulaires correctement liés à leurs inputs (`for`/`id`)
- **Versions NO-JS** disponibles pour chaque page interactive (sketchbook, music, flash, RSS)
- `<title>` pour les images (translatable par les extensions)
- Méta `darkreader-lock` pour empêcher Dark Reader de casser le CSS

### Non-JavaScript fallbacks
- Wallpapers : génération HTML statique (Python pré-build) au lieu de JS
- Music player : version simple `<audio controls>` natifs
- Resources : liste plate de liens téléchargements
- RSS button : copie URL en JS, sinon fallback `<a href>` direct

---

## 13. ARCHITECTURE TECHNIQUE OBSERVÉE

### Stack
- **HTML/CSS/JS vanilla** (aucun framework SPA)
- Hébergement **auto-hébergé** (déménagé de Neocities en novembre 2025)
- **phpBB** pour le forum
- **xat** pour la chatroom
- **Ruffle** pour Flash emulation
- **JSPaint** embed pour le sketchbook
- **Spotlight.js** pour le lightbox d'images
- **Magnific Popup** pour le viewer
- **Video.js** abandonné au profit du player HTML5 natif
- Génération de pages images via **Python** (pré-build)
- **RSS feeds** multiples (`/rss/blog.xml`, `/rss/updates.xml`, `/rss/webring.xml`)

### Performance
- **Lazy loading** sur images de la galerie wallpapers
- Pas de framework lourd → premier paint très rapide
- Préchargement audio pour music player
- Pas de tracking, pas de cookies (sauf localStorage thème)

### SEO & Métadonnées
- `human.json` (vérification d'authorship humain)
- 88×31 buttons en `<link rel="me">`
- Webrings comme signal de réseau d'authorship
- Open Graph + Twitter Card

---

## 14. TONE OF VOICE / CONTENU

### Style d'écriture
- **Première personne** (je, mon, mes)
- Ton **personnel et chaleureux** : "Hi everyone!", "Sorry I haven't updated in a while"
- **Honnêteté radicale** : annonce les bugs, les pertes de motivation, les changements d'avis
- **Crédits explicites** à chaque contributeur (Tokoni, Lily, Mimikitty49, ElijahQ2010, etc.)
- **Mentions personnelles** des donateurs (par leur nom)
- **Excuses fréquentes** quand contenu retiré (copyright, manque de temps)
- Pas de jargon corporate, pas de buzzwords
- Émojis discrets, principalement `♫` pour musique

### Microcopy
- "Enjoy 2000s wallpapers, music, games, and much more!" (tagline header)
- "Lost? Here's a map of the site." (sitemap banner)
- "Discover unique Frutiger Aero games." (indie games banner)
- "Customize your programs." (icons banner)
- "Recreations of old hardware." (TV banner)
- "Send me an e-mail!" (contact banner)
- "Come join our webring today!" (webring banner)

### Avertissements types
> "Warning: unless explicitly stated otherwise, all images contained in this website are for documentation purposes only, and may be subject to copyright laws. They are preserved here for archival and educational reasons."

---

## 15. VALEURS & PRINCIPES DE DESIGN

### Les 7 piliers
1. **Authenticité nostalgique** — pas de pastiche, vraie fidélité aux assets d'époque
2. **Densité informationnelle** — beaucoup de contenu visible, pas d'espace vide tendance
3. **Communauté visible** — forum, guestbook, fanart, soumissions au cœur du site
4. **Accessibilité radicale** — chaque page fonctionne sans JS
5. **Transparence du créateur** — changelog public, ton personnel, excuses honnêtes
6. **Préservation patrimoniale** — archive, pas piratage ; demande permissions
7. **Refus du Web moderne** — pas de tracking, pas de pubs, pas de SPA, pas de dark patterns

---

## 16. TOKENS DE DESIGN (CSS COMPLET PRÊT À L'EMPLOI)

```css
:root {
  /* === LAYOUT === */
  --container-max:    1200px;
  --nav-width:        122px;
  --content-max:      790px;
  --gap:              10px;
  --padding-window:   16px;
  --padding-card:     14px;

  /* === RAYONS === */
  --radius-sm:        4px;
  --radius-md:        6px;
  --radius-lg:        10px;
  --radius-pill:      14px;

  /* === TYPO === */
  --font-ui:          "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  --font-mono:        "Courier New", Courier, monospace;
  --fs-xs:            11px;
  --fs-sm:            12px;
  --fs-base:          13px;
  --fs-md:            14px;
  --fs-lg:            16px;
  --fs-xl:            18px;
  --fs-2xl:           28px;
  --lh-base:          1.55;

  /* === COULEURS (thème par défaut Longhorn) === */
  --wallpaper:           url('/img/wallpaper-grass.jpg');
  --bg-window:           rgba(10, 10, 10, 0.82);
  --bg-header:           linear-gradient(180deg, #363636 0%, #1a1a1a 100%);
  --bg-nav:              linear-gradient(180deg, #1e1e1e 0%, #0d0d0d 100%);
  --bg-section-bar:      linear-gradient(180deg, #383838 0%, #242424 100%);
  --bg-card:             rgba(20, 20, 20, 0.7);
  --bg-input:            rgba(0, 0, 0, 0.5);

  --accent:              #4ecb71;
  --accent-light:        #6fcf97;
  --accent-hover:        #8de0a8;
  --accent-dark:         #2d6e3e;
  --accent-glow:         rgba(78, 203, 113, 0.35);
  --accent-grad:         linear-gradient(180deg, #5cd683 0%, #2d8a4a 100%);

  --text:                #d4d4d4;
  --text-secondary:      #999999;
  --text-muted:          #666666;
  --text-title:          #cccccc;
  --text-link:           #6fcf97;
  --text-on-accent:      #ffffff;

  --border:              rgba(255, 255, 255, 0.13);
  --border-subtle:       rgba(255, 255, 255, 0.07);
  --border-divider:      rgba(255, 255, 255, 0.10);

  /* === OMBRES === */
  --shadow-window:       0 4px 20px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.09);
  --shadow-button:       0 1px 3px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15);
  --shadow-glow:         0 0 12px var(--accent-glow);

  /* === EFFETS === */
  --blur-glass:          blur(8px);
  --transition-base:     0.15s ease;
}

/* === THÈME : Frutiger Aero (clair, le vrai Vista) === */
[data-theme="frutiger-aero"] {
  --wallpaper:           url('/img/wallpaper-aero-sky.jpg');
  --bg-window:           rgba(220, 240, 255, 0.85);
  --bg-header:           linear-gradient(180deg, #6bb8ee 0%, #4a90d9 100%);
  --bg-nav:              linear-gradient(180deg, #cce4f7 0%, #a3cdee 100%);
  --bg-section-bar:      linear-gradient(180deg, #6bb8ee 0%, #4a90d9 100%);
  --accent:              #4a90d9;
  --accent-grad:         linear-gradient(180deg, #6bb8ee 0%, #2a70b9 100%);
  --text:                #1a3a5c;
  --text-link:           #2a70b9;
  --border:              rgba(255, 255, 255, 0.6);
}

/* === THÈME : Y2K Futurism === */
[data-theme="y2k"] {
  --wallpaper:           url('/img/wallpaper-y2k-circuit.jpg');
  --accent:              #1aa9a9;
  --accent-grad:         linear-gradient(180deg, #2bd0d0 0%, #168888 100%);
  --text-link:           #4adada;
}

/* === THÈME : Kasane Teto === */
[data-theme="teto"] {
  --wallpaper:           url('/img/wallpaper-teto.jpg');
  --accent:              #c0394a;
  --accent-grad:         linear-gradient(180deg, #d04858 0%, #802030 100%);
  --text-link:           #e07080;
}

/* === THÈME : Hatsune Miku === */
[data-theme="miku"] {
  --wallpaper:           url('/img/wallpaper-miku.jpg');
  --accent:              #39c5bb;
  --accent-grad:         linear-gradient(180deg, #5ddad0 0%, #1f9a92 100%);
  --text-link:           #5ddad0;
}

/* (suite similaire pour Nightcore, Kagamine, K-ON!, Touhou) */
```

---

## 17. CHECKLIST D'IMPLÉMENTATION

### Phase 1 — Fondations
- [ ] Setup wallpaper fixe full-viewport
- [ ] Header global avec logo Windows
- [ ] Navbar gauche fixe avec catégories
- [ ] Composant `.window` Aero glass (avec `::before` pour reflet)
- [ ] Système de tokens CSS variables
- [ ] Police Segoe UI (fallback web)

### Phase 2 — Composants
- [ ] Section title bar (gradient sombre)
- [ ] Banners de section (asset par page)
- [ ] Table of Contents avec icônes
- [ ] Pagination boutons glossy verts
- [ ] Boutons navbar avec icônes Vista
- [ ] Bouton spécial "Sounds Off" / "Themes" (vert pleine largeur)

### Phase 3 — Features signature
- [ ] Music Player CD spinning + visualizer
- [ ] CRT TV Simulator avec iframe YouTube
- [ ] Embed Ruffle pour Flash
- [ ] Embed JSPaint pour Sketchbook
- [ ] Spotlight viewer pour images
- [ ] Form de contact avec upload fichier
- [ ] 88×31 buttons + embed code

### Phase 4 — Système de thèmes
- [ ] 11 thèmes via CSS variables overrides
- [ ] Panneau latéral droit Theme Selector avec previews
- [ ] Persistance localStorage
- [ ] Asset packs par thème (banners, mascotte, sons)

### Phase 5 — Polissage
- [ ] Sound FX (toggle global)
- [ ] Animations CD, visualizer, scanlines
- [ ] Versions NO-JS de chaque page interactive
- [ ] RSS feeds (blog, updates, webring)
- [ ] SEO + Open Graph + favicons multiples
- [ ] Tests accessibilité WAVE
- [ ] Responsive mobile < 650px

### Phase 6 — Communauté
- [ ] phpBB auto-hébergé
- [ ] Webring page + form join
- [ ] Guestbook (iframe ou natif)
- [ ] Sitemap descriptif
- [ ] Changelog public sur Site Info
- [ ] Page mascotte avec MMD model download

---

## 18. RÉFÉRENCES & SOURCES

- **Windows Vista / 7 Aero UI** — DWM, glass, transparence
- **Apple Aqua (Mac OS X 2000–2013)** — skeuomorphisme glossy
- **PlayStation 3 XMB / Wii Menu** — interfaces gaming glossy
- **iPod / early iPhone UI** — reflections métalliques
- **CARI (Consumer Aesthetics Research Institute)** — théorisation Frutiger Aero (2017)
- **Sites Neocities & MARQUEE.moe** — culture web personnelle hand-crafted
- **Vocaloid / OS-Tan culture** — mascottes anthropomorphes japonaises
- **Web 2.0 (2004–2010)** — badges glossy, gradients, bordures arrondies, 88×31
- **Frutiger typeface** (Adrian Frutiger) — humanist sans-serif → Segoe UI
- **Stock photos era (iStockphoto, Getty 2005–2012)** — nature HD, globes, eau, bokeh
- **Windows Mobile 2007 website** — inspiration directe pour le layout du blog

---

## 19. ATTRIBUTIONS

- **Webmaster** : Daniele63 (auteur du site)
- **Mascotte Archive-Tan** : design Daniele63, art principal Mimikitty49.neocities.org
- **Logo / 88×31** : Lily / ZesCrew 2
- **Contributeurs wallpapers** : Tokoni, Liam/Z2r, Megan, ElijahQ2010, Spirit, lakelover, felicitytothemoon
- **Bug reports & a11y** : communauté Forum

---

*Document de design réalisé sur la base d'une exploration exhaustive de toutes les pages publiques du site frutigeraeroarchive.org, avec test des 11 thèmes disponibles.*
*Version : 1.0 — 06/05/2026*
```

---
