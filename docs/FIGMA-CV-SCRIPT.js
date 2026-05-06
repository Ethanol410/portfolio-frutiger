/**
 * Script Figma Plugin API — Mise à jour CV
 * À coller dans : use_figma (MCP Figma) avec fileKey = aiDs9AT5SYzoU9bkn9HGJv
 * Ou via Figma > Plugins > Console si le plugin est ouvert
 */

// Pre-load all fonts
const fonts = [
  { family: 'Hind', style: 'Regular' },
  { family: 'Hind', style: 'Medium' },
  { family: 'Hind', style: 'Bold' },
  { family: 'Montserrat', style: 'Bold' },
  { family: 'Montserrat', style: 'Medium' },
];
for (const f of fonts) {
  try { await figma.loadFontAsync(f); } catch(e) {}
}

async function setText(nodeId, newText) {
  const node = figma.getNodeById(nodeId);
  if (!node || node.type !== 'TEXT') return `${nodeId}: skip (${node ? node.type : 'not found'})`;
  const fontsToLoad = new Set();
  if (node.fontName === figma.mixed) {
    for (let i = 0; i < node.characters.length; i++) {
      const fn = node.getRangeFontName(i, i + 1);
      if (fn && fn !== figma.mixed) fontsToLoad.add(JSON.stringify(fn));
    }
  } else if (node.fontName && node.fontName !== figma.mixed) {
    fontsToLoad.add(JSON.stringify(node.fontName));
  }
  for (const fStr of fontsToLoad) {
    try { await figma.loadFontAsync(JSON.parse(fStr)); } catch(e) {}
  }
  try {
    node.characters = newText;
    return `${nodeId}: OK`;
  } catch(e) {
    return `${nodeId}: ERROR - ${e.message}`;
  }
}

const log = [];

// ── ICG Experience ────────────────────────────────────────────────────────────
log.push(await setText('117:976', 'Ici Carte Grise · Brest (29)'));
log.push(await setText('117:983', 'Août 2024 → 2026'));
log.push(await setText('117:977', "Reprise en solo de la plateforme B2C (prod, PHP 8.2 / MySQL) après départ du tuteur. Développement d'une solution modulaire B2B (eProcess). Encadrement d'une nouvelle alternante."));
log.push(await setText('117:978', 'PHP 7.4 / 8.2 · JavaScript · MySQL · Firebase · Docker · GitHub · LlamaExtract'));
log.push(await setText('117:979', 'Autonomie sous pression · rigueur · gestion de projet agile'));

// ── Freelance Experience ──────────────────────────────────────────────────────
log.push(await setText('117:987', 'Développeur web freelance'));
log.push(await setText('117:988', "Freelance · 2025 → aujourd'hui"));
log.push(await setText('117:995', "2025 → aujourd'hui"));
log.push(await setText('117:989', "Conception, développement et hébergement de sites vitrines et d'applications métier avec parcours client complexe. Accompagnement complet (recueil des besoins, maintenance, SAV)."));
log.push(await setText('117:990', 'Next.js · Tailwind · TypeScript · Stripe · Prisma · Zod · WordPress · Elementor'));
log.push(await setText('117:991', "Sens de l'écoute · gestion client · responsive design"));

// ── Soft Skills — "Solaire" → "Adaptabilité & Lucidité" ──────────────────────
log.push(await setText('117:907', 'Adaptabilité & Lucidité'));
const solaireBadge = figma.getNodeById('117:906');
if (solaireBadge && 'resize' in solaireBadge) {
  solaireBadge.resize(130, 16);
  log.push('117:906: badge resized to 130px');
}

// ── Projet : Recherche IA (was Workshop de Noël) ──────────────────────────────
log.push(await setText('117:1013', 'Recherche IA, soumission ACM UIST 2026'));
log.push(await setText('117:1014', '2025 à 2026'));
log.push(await setText('117:1016', "Co-auteur d'un projet de recherche couplant IA et interaction humain-machine, encadré par un chercheur de l'IRISA. Article soumis à ACM UIST 2026, conférence A* en HCI."));
log.push(await setText('117:1015', 'TypeScript · LLM · Recherche HCI · Évaluation utilisateur'));
log.push(await setText('117:1017', 'IUT Lannion · Université de Rennes'));

// ── Projet : Audio Investigation Game (was App nutrition) ─────────────────────
log.push(await setText('117:1029', 'Audio Investigation Game'));
log.push(await setText('117:1030', '2026 · Festival Crime & Science'));
log.push(await setText('117:1032', "Application immersive avec pipeline Web Audio natif (filtres biquad, FFT, A/B sans click) et pilotage WebHID d'un Elgato Stream Deck+. Architecture data-driven, deux scénarios sur un seul moteur."));
log.push(await setText('117:1031', 'React 18 · TS strict · Web Audio API · WebHID · Tone.js · PWA'));
log.push(await setText('117:1033', 'Forensique audio interactive'));

// ── Projet : Agentix Canvas (update) ─────────────────────────────────────────
log.push(await setText('117:998', 'Agentix Canvas'));
log.push(await setText('117:999', '2025 à 2026'));
log.push(await setText('117:1001', "Créateur. Canvas temps réel, orchestration de 3 agents IA spécialisés (Idées, Critique, Structuration) pilotés par un assistant Isa. Cartes mentales auto-générées."));
log.push(await setText('117:1000', 'React · WebSockets · Multi-agents · Claude / Groq'));
log.push(await setText('117:1002', 'Brainstorming collaboratif piloté par agents IA'));

// ── Projet : Bot Telegram (was App running social) ────────────────────────────
log.push(await setText('117:1044', 'Bot Telegram, Veille Claude Code'));
log.push(await setText('117:1045', '2026 · Agrégateur multi-sources'));
log.push(await setText('117:1047', "Bot Python autonome qui scrape 10+ sources toutes les 8h, classifie la pertinence avec Gemini Flash, déduplique sur cache GitHub Gist, publie sur Telegram et Discord. Tourne sur GitHub Actions."));
log.push(await setText('117:1046', 'Python 3.12 · Gemini Flash · GitHub Actions · Scrapling'));
log.push(await setText('117:1048', 'Classification LLM · déduplication · autonomie'));

// ── Projet : Modall (was Fab Ta Pépite) ──────────────────────────────────────
log.push(await setText('117:1059', 'Modall'));
log.push(await setText('117:1060', '2024 · Lauréat Pépite Campus'));
log.push(await setText('117:1062', "Concept hardware d'enceintes modulaires monté avec deux étudiants de l'ENSSAT en première année de BUT MMI. Lauréat Pépite Campus, Quimper, 12 mars 2024."));
log.push(await setText('117:1061', 'Design produit · Hardware · Pitch · Business plan'));
log.push(await setText('117:1063', "Créativité · sens de l'initiative · pouvoir de conviction"));

// ── Projet : MathQuest (was Simulateur Pokémon) ───────────────────────────────
log.push(await setText('117:1080', 'MathQuest'));
log.push(await setText('117:1081', '2026 · PWA auto-formation'));
log.push(await setText('117:1083', "Construit seul pour combler mes lacunes maths avant le cycle ingénieur. 4 modules dont un dédié IA / ML (gradient, tenseurs, rétropropagation). Persistance offline IndexedDB."));
log.push(await setText('117:1082', 'Next.js 15 · React 19 · KaTeX · D3 · Zustand · Dexie · Vitest'));
log.push(await setText('117:1084', "PWA d'auto-formation aux mathématiques pour l'IA"));

log
