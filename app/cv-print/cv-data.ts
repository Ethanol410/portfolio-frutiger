// Données partagées entre versions short (1 page) et long (2 pages) du CV.

export const SKILL_LABELS: Record<string, string> = {
  ia:           'IA & ML',
  multimedia:   'Multimédia',
  web:          'Front / Web',
  backend:      'Backend',
  architecture: 'Architecture',
  devops:       'DevOps & tests',
};

export const SKILL_ORDER = ['ia', 'multimedia', 'web', 'backend', 'architecture', 'devops'];

// ── Sidebar data ─────────────────────────────────────────────────

export const CV_SOFT_SKILLS = [
  'Esprit d\'équipe',
  'Pouvoir de conviction',
  'Autonomie',
  'Adaptabilité & Lucidité',
];

export const CV_COMPETENCES = [
  'Développement Web',
  'Bases de données',
  'Langages & Algorithmique',
  'IA & Cloud',
];

export const CV_INTERESTS = [
  'Musculation / Nutrition',
  'Informatique',
  'Vidéos',
  'Voyage',
];

export const CV_LANGUAGES = [
  { name: 'Anglais', level: 'B1', note: 'Lecture tech courante' },
  { name: 'Français', level: 'Natif', note: 'Prix d\'excellence' },
];

// ── Structured experiences for CV print ──────────────────────────

export interface CvExperience {
  period: string;
  role: string;
  company: string;
  missions: string;
  tools: string;
  learned: string;
  accent: 'red' | 'green';
}

export const CV_EXPERIENCES: CvExperience[] = [
  {
    period: 'Août 2024 → 2026',
    role: 'Alternant Développeur Full Stack Natif',
    company: 'Ici Carte Grise · Brest (29)',
    missions: 'Reprise en solo de la plateforme B2C (prod, PHP 8.2 / MySQL) après départ du tuteur. Développement d\'une solution modulaire B2B (eProcess). Encadrement d\'une nouvelle alternante.',
    tools: 'PHP 7.4 / 8.2 · JavaScript · MySQL · Firebase · Docker · GitHub · LlamaExtract',
    learned: 'Autonomie sous pression · rigueur · gestion de projet agile',
    accent: 'red',
  },
  {
    period: '2025 → aujourd\'hui',
    role: 'Développeur web freelance',
    company: 'Freelance',
    missions: 'Conception, développement et hébergement de sites vitrines et d\'applications métier avec parcours client complexe. Accompagnement complet (recueil des besoins, maintenance, SAV).',
    tools: 'Next.js · Tailwind · TypeScript · Stripe · Prisma · Zod · WordPress · Elementor',
    learned: 'Sens de l\'écoute · gestion client · responsive design',
    accent: 'green',
  },
];

export const FORMATIONS = [
  {
    title: 'Cycle ingénieur ENSSAT, option IAM (IA & Multimédia)',
    place: 'Lannion · Université de Rennes',
    period: 'Septembre 2026 (3 ans, alternance)',
  },
  {
    title: 'BUT MMI, parcours Développement Web et dispositifs interactifs',
    place: 'IUT de Lannion · Université de Rennes',
    period: '2023 à 2026 (BUT3 en cours)',
  },
  {
    title: 'Bac STMG, option Gestion Finance',
    place: 'Lycée Les Cordeliers, Dinan',
    period: '2022',
  },
];

export interface CvProject {
  title: string;
  sub: string;
  period: string;
  desc: string;
  tech: string;
  star: boolean; // True = inclus dans la version short
}

export const CV_PROJECTS: CvProject[] = [
  {
    title: 'Recherche IA, soumission ACM UIST 2026',
    sub: 'IUT Lannion · Université de Rennes',
    period: '2025 à 2026',
    desc: 'Co-auteur d\'un projet de recherche couplant IA et interaction humain-machine, encadré par un chercheur de l\'IRISA. Article soumis à ACM UIST 2026, conférence A* en HCI.',
    tech: 'TypeScript · LLM · Recherche HCI · Évaluation utilisateur',
    star: true,
  },
  {
    title: 'Agentix Canvas',
    sub: 'Brainstorming collaboratif piloté par agents IA',
    period: '2025 à 2026',
    desc: 'Créateur. Canvas temps réel, orchestration de 3 agents IA spécialisés (Idées, Critique, Structuration) pilotés par un assistant Isa. Cartes mentales auto-générées.',
    tech: 'React · WebSockets · Multi-agents · Claude / Groq',
    star: true,
  },
  {
    title: 'Audio Investigation Game',
    sub: 'Forensique audio interactive, festival Crime & Science 2026',
    period: '2026',
    desc: 'Application immersive avec pipeline Web Audio natif (filtres biquad, FFT, A/B sans click) et pilotage WebHID d\'un Elgato Stream Deck+. Architecture data-driven, deux scénarios sur un seul moteur.',
    tech: 'React 18 · TS strict · Web Audio API · WebHID · Tone.js · PWA',
    star: true,
  },
  {
    title: 'Bot Telegram, Veille Claude Code',
    sub: 'Agrégateur multi-sources avec classification LLM',
    period: '2026',
    desc: 'Bot Python autonome qui scrape 10+ sources toutes les 8h, classifie la pertinence avec Gemini Flash, déduplique sur cache GitHub Gist, publie sur Telegram et Discord. Tourne sur GitHub Actions.',
    tech: 'Python 3.12 · Gemini Flash · GitHub Actions · Scrapling',
    star: true,
  },
  {
    title: 'MathQuest',
    sub: 'PWA d\'auto-formation aux mathématiques pour l\'IA',
    period: '2026',
    desc: 'Construit seul pour combler mes lacunes maths avant le cycle ingénieur. 4 modules dont un dédié IA / ML (gradient, tenseurs, rétropropagation). Persistance offline IndexedDB.',
    tech: 'Next.js 15 · React 19 · KaTeX · D3 · Zustand · Dexie · Vitest',
    star: false,
  },
  {
    title: 'EthanOS Portfolio · Frutiger',
    sub: 'Portfolio interactif en OS simulé avec assistant LLM',
    period: '2026',
    desc: 'OS Frutiger Aero / Vista jouable, 10+ apps. Assistant Ethan IA en streaming SSE (Groq + fallback Anthropic), parsing d\'actions inter-fenêtres pour piloter l\'UI depuis le LLM.',
    tech: 'Next.js 16 · React 19 · TypeScript · Zustand · Groq · Anthropic',
    star: false,
  },
  {
    title: 'Modall',
    sub: 'Enceintes audio modulaires, lauréat Pépite Campus 2024',
    period: '2024',
    desc: 'Concept hardware d\'enceintes modulaires monté avec deux étudiants de l\'ENSSAT en première année de BUT MMI. Lauréat Pépite Campus, Quimper, 12 mars 2024.',
    tech: 'Design produit · Hardware · Pitch · Business plan',
    star: true,
  },
];

export const DISTINCTIONS = [
  'Lauréat Prix Pépite Campus 2024 (Modall, Quimper, 12 mars 2024)',
  'Co-auteur, soumission ACM UIST 2026 (résultats août 2026)',
  'Admis IMT Mines Alès, parcours Développement Logiciel (avril 2026)',
  'Admissible ENSSAT IAI-IAM, entretien le 29 avril 2026',
];

export const SOFT_SKILLS = [
  'Autonomie sous pression, reprise solo de la plateforme prod',
  'Adaptation et lucidité, parcours non-linéaire et MathQuest comme remédiation',
  'Transmission, encadrement d\'une nouvelle alternante et chef de projet BDE',
];

export const stripUrl = (u: string) => u.replace(/^https?:\/\//, '');
