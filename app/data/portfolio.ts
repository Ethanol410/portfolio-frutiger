interface Availability {
  status: 'disponible' | 'indisponible' | 'bientot';
  label: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
}

interface ProjectMetric {
  label: string;
  value: string;
}

interface Project {
  id: number;
  title: string;
  subtitle?: string;
  desc: string;
  details?: string;
  tech: string[];
  color: string;
  githubUrl: string | null;
  demoUrl: string | null;
  paperVenue?: string;
  metrics?: ProjectMetric[];
  classement: 'star' | 'secondary' | 'archive';
}

interface Award {
  title: string;
  desc: string;
  year: string;
}

interface Recommendation {
  name: string;
  role: string;
  quote: string;
}

interface Engagement {
  title: string;
  role: string;
  desc: string;
  period: string;
}

export interface Portfolio {
  name: string;
  fullName: string;
  title: string;
  subtitle: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  avatar: string;
  availability: Availability;
  tagline: string;
  bio: string;
  skills: Record<string, string[]>;
  experience: Experience[];
  projects: Project[];
  awards: Award[];
  recommendations: Recommendation[];
  engagements: Engagement[];
}

export const portfolio: Portfolio = {
  name: "Ethan",
  fullName: "Ethan Collin",
  title: "Apprenti ingénieur IA & interfaces intelligentes",
  subtitle: "BUT MMI Lannion (parcours Développement Web et dispositifs interactifs). Cycle ENSSAT IAM dès septembre 2026.",
  location: "Lannion · Dinan · Côtes-d'Armor",
  email: "ethan.collin2304@gmail.com",
  phone: "06 04 46 10 27",
  github: "https://github.com/Ethanol410",
  linkedin: "https://linkedin.com/in/ethan-collin",
  avatar: "/people_31.png",

  availability: {
    status: "disponible",
    label: "Alternance ingénieur IA, septembre 2026, Lannion ou Dinan",
  },

  tagline: "Co-auteur d'un projet de recherche IA et interaction humain-machine soumis à UIST 2026. 2 ans d'alternance full-stack en production. Je veux passer de l'utilisation à la conception de l'IA, et concevoir sous contraintes réelles.",

  bio: "À 20 ans, j'ai repris seul la plateforme e-commerce d'Ici Carte Grise après le départ de mon tuteur (plusieurs milliers de transactions par mois en PHP 8, MySQL, intégrations API), et je l'ai tenue en prod tout en encadrant une nouvelle alternante. C'est cette capacité à concevoir sous contraintes réelles qui définit mon profil. Cette expérience m'a aussi appris que maintenir un code existant demande autant d'ingénierie que d'écrire du neuf. En parallèle, à l'IUT MMI de Lannion, j'ai contribué à un projet de recherche couplant IA et interaction humain-machine, encadré par un chercheur de l'IRISA (Université de Rennes). L'article a été soumis à la conférence ACM UIST 2026. J'ai aussi créé Agentix Canvas, un outil de brainstorming collaboratif piloté par agents IA. En première année de BUT MMI, j'ai monté Modall avec deux étudiants de l'ENSSAT, un projet d'enceintes audio modulaires lauréat du Prix Pépite Campus à Quimper en mars 2024. Conscient que mon bagage maths est à renforcer pour un cycle ingénieur, j'ai construit MathQuest, une PWA d'auto-formation aux mathématiques que j'utilise quotidiennement. Je n'attends pas l'école pour combler mes lacunes : je transforme les constats en action. En septembre 2026, je rejoins le cycle ingénieur ENSSAT, option IAM (IA et Multimédia) en alternance. Je cherche une entreprise d'accueil à Lannion ou Dinan pour passer de l'utilisation à la conception de l'IA, sur trois ans.",

  skills: {
    ia: [
      "LLM en production (Groq, Anthropic Claude, OpenAI)",
      "Streaming SSE, parsing d'actions, system prompt dynamique",
      "Architectures multi-agents",
      "Recherche IA et interaction humain-machine",
      "Python (en montée en compétence)",
    ],
    multimedia: [
      "Web Audio API",
      "Canvas 2D",
      "D3.js (visualisations interactives)",
      "Animations Framer Motion",
      "Traitement d'image (en cours)",
    ],
    web: [
      "TypeScript strict",
      "React 19",
      "Next.js 16 (App Router)",
      "Next.js 15 (PWA, MathQuest)",
      "Tailwind CSS 4",
      "Zustand",
      "KaTeX (rendu LaTeX)",
      "Dexie (IndexedDB, persistance offline)",
    ],
    backend: [
      "PHP 8.2 (production)",
      "MySQL",
      "Node.js, Express",
      "REST API",
      "Intégrations API (Resend, Spotify, GitHub, ANTS, Stripe)",
    ],
    architecture: [
      "Design patterns : Singleton, Observer, Factory, Strategy",
      "Architecture MVC (au quotidien chez Ici Carte Grise)",
      "Pub/Sub et reactivité (Zustand, addEventListener)",
      "Streaming SSE et orchestration multi-agents",
    ],
    devops: [
      "Git, GitHub Actions",
      "Vercel, déploiement continu",
      "Tests : Vitest (unit, 97 % de couverture sur Weight Tracker), Playwright (e2e)",
      "PWA (offline-first, IndexedDB, Service Workers)",
    ],
    soft: [
      "Autonomie sous pression",
      "Encadrement d'alternant",
      "Curiosité de recherche",
      "Communication et médiation",
    ],
  },

  experience: [
    {
      role: "Développeur FullStack en alternance",
      company: "Ici Carte Grise",
      period: "2024 à 2026",
      desc: "Reprise en solo de la plateforme B2C (plusieurs milliers de transactions par mois) en PHP 7.4 et 8.2, JavaScript et MySQL, après le départ de mon tuteur. Responsable du pôle développement web, encadrement d'une nouvelle alternante.",
    },
    {
      role: "Recherche, contributeur publication ACM UIST 2026",
      company: "IUT de Lannion, Université de Rennes",
      period: "2025 à 2026",
      desc: "Projet de recherche couplant IA et interaction humain-machine, encadré par un chercheur de l'IRISA (Université de Rennes). Contribution au prototype web et à l'instrumentation de l'évaluation utilisateur. Article soumis à la conférence ACM UIST 2026.",
    },
    {
      role: "Recherche, créateur d'Agentix Canvas",
      company: "IUT de Lannion",
      period: "2025 à 2026",
      desc: "Outil de brainstorming collaboratif temps réel avec orchestration multi-agents IA (assistant Isa). Cartes mentales, plans d'action générés automatiquement, intégration LLM dans une interface réactive.",
    },
  ],

  projects: [
    {
      id: 1,
      title: "Recherche IA · soumission ACM UIST 2026",
      subtitle: "IUT Lannion, Université de Rennes (2025 à 2026)",
      desc: "Co-auteur d'un projet de recherche couplant IA et interaction humain-machine, encadré par un chercheur de l'IRISA. Article soumis à la conférence ACM UIST 2026 (résultats attendus en août 2026). Contribution au prototype web et à l'évaluation utilisateur.",
      details: `## Contexte
Projet de recherche mené à l'IUT de Lannion (Université de Rennes), couplant intelligence artificielle et interaction humain-machine. Encadré par un chercheur de l'IRISA. L'article a été soumis à **ACM UIST 2026**, l'une des conférences de référence en interaction humain-machine. Résultats d'évaluation attendus en août 2026.

## Pourquoi UIST
UIST (ACM Symposium on User Interface Software and Technology) rassemble chaque année les travaux de recherche les plus pointus sur les nouvelles façons de concevoir et de comprendre les interfaces. Y soumettre un papier en cycle de licence est rare.

## Mon rôle
Co-auteur. Contribution au prototype web et à l'instrumentation de l'évaluation utilisateur menée pour le papier.

## Ce que ça m'a appris
Travailler à plusieurs voix sur un objet de recherche où la rigueur formelle (modélisation, mesures, étude utilisateur) compte autant que la qualité d'exécution. Apprendre à itérer un prototype sous contrainte de calendrier de soumission. Tenir un standard d'écriture scientifique avec des chercheurs de l'IRISA.

## Pour en savoir plus
Le contenu précis de l'article est sous embargo jusqu'à la décision de comité (août 2026). Je peux en parler en entretien dans le cadre du travail que j'y ai réalisé.`,
      tech: ["TypeScript", "LLM", "Recherche HCI", "Évaluation utilisateur"],
      color: "bg-violet-600",
      githubUrl: null,
      demoUrl: null,
      paperVenue: "ACM UIST 2026 (soumission)",
      classement: "star",
    },
    {
      id: 2,
      title: "Agentix Canvas",
      subtitle: "Brainstorming collaboratif piloté par agents IA",
      desc: "Canvas temps réel où Isa, un assistant orchestrant 3 agents (Idées, Critique, Structuration), enrichit une session de brainstorming humaine. Génération de cartes mentales, propositions de plans d'action, validation croisée entre agents.",
      details: `## Vision
Créer un espace de brainstorming où plusieurs agents IA coopèrent pour aider un groupe à structurer ses idées, générer des plans d'action et explorer des pistes créatives, le tout en temps réel.

## L'assistant Isa
Isa est l'agent coordinateur d'Agentix Canvas. Il orchestre les autres agents spécialisés :
- **Agent Idées** : génère et développe des concepts à partir des mots-clés
- **Agent Critique** : identifie les failles et contradictions
- **Agent Structuration** : organise les idées en plan actionnable

## Architecture
- Interface canvas en temps réel (React, WebSockets)
- Orchestration multi-agents via appels LLM en parallèle
- Carte mentale générée automatiquement depuis les discussions
- Plans d'action exportables

## Défis rencontrés
La synchronisation des agents en temps réel est complexe : éviter les conflits de réponses, gérer les latences, maintenir la cohérence du contexte entre agents. Résolu par une file de messages et un état partagé côté serveur.`,
      tech: ["React", "WebSockets", "LLM (Claude, Groq)", "Architecture multi-agents"],
      color: "bg-emerald-600",
      githubUrl: "https://github.com/Web-Interactive-Systems/project-agentic-canvas-Ethanol410",
      demoUrl: null,
      classement: "star",
    },
    {
      id: 3,
      title: "Portfolio EthanOS Frutiger",
      subtitle: "Système d'exploitation simulé en Next.js (ce site)",
      desc: "Faux OS Frutiger Aero / Vista en Next.js 16 et React 19. 12 apps simulées (Terminal, Browser, Paint, MusicPlayer Spotify, AIChat Groq+Claude, Recherche, Contact, etc.), drag & drop, focus management, easter eggs (BSOD, Konami code), persistance Zustand.",
      details: `## L'idée
Réinventer le portfolio comme une expérience interactive, en référence à l'esthétique Frutiger Aero / Windows Vista des années 2000. Le visiteur entre dans un véritable OS simulé : BIOS de boot, bureau, fenêtres draggables, taskbar, menu démarrer, barre de notifications, mode verrouillage, et une dizaine d'applications.

## Stack technique
- **Next.js 16 (App Router)** + **React 19** + **TypeScript**
- **Zustand** avec persistance localStorage pour l'état OS (fenêtres, notifications, wallpaper)
- **Framer Motion** pour les animations de fenêtres, le drag & drop, les transitions
- **Tailwind CSS 4** + glassmorphism custom (CSS variables, backdrop-filter)
- API routes Next.js pour les intégrations (Spotify, GitHub, Resend mail, Groq + Anthropic IA chat)

## Apps embarquées
Terminal interactif, navigateur web, Paint, lecteur Spotify, lecteur PDF, explorateur de fichiers, formulaire de contact, AIChat (Llama 3.3 + Claude fallback), notes de recherche, paramètres OS.

## Détails techniques que je trouve fiers
- **Focus trap accessibilité** : Tab/Shift+Tab boucle dans la fenêtre active, Escape ferme, focus restauré à la sortie
- **Streaming SSE** sur le chat IA avec parsing d'actions inter-fenêtres ("[ACTION:open:projects]")
- **Easter eggs** : Konami code → mode Matrix, BSOD aléatoire, secret Terminal commands
- **Mode recruteur** via /recruiter et bouton flottant pour bypass l'OS et offrir une vue plate
- **Sécurité** : middleware de rate limiting, validation Zod, headers de sécurité (HSTS, CSP-friendly, etc.)`,
      tech: ["Next.js 16", "React 19", "TypeScript", "Zustand", "Tailwind CSS 4", "Framer Motion"],
      color: "bg-blue-500",
      githubUrl: "https://github.com/Ethanol410/portfolio-frutiger",
      demoUrl: "/",
      classement: "secondary",
    },
    {
      id: 4,
      title: "EthanOS Assistant (AIChat)",
      subtitle: "Assistant conversationnel intégré au portfolio",
      desc: "Chat conversationnel branché sur Groq (Llama) et Anthropic Claude en double provider, streaming SSE, parsing d'actions inter-fenêtres. Démontre l'intégration LLM en interface live avec architecture résiliente (fallback).",
      details: `## Pourquoi ce projet
Embarquer un assistant conversationnel directement dans le portfolio, capable de présenter mon parcours et de déclencher l'ouverture des fenêtres de l'OS simulé (CV, projets, contact). Ce n'est pas un gadget : c'est la preuve que je sais intégrer un LLM en production, dans une interface réelle, avec un comportement maîtrisé.

## Architecture
- **Double provider** : Groq (Llama 3.3 70B) en principal, Anthropic Claude en fallback
- **Streaming SSE** côté API route Next.js (read-stream + decoder + parsing tour par tour)
- **Parsing d'actions inter-fenêtres** au format \`[ACTION:open:AppName]\` : le LLM peut piloter l'UI en demandant l'ouverture d'une fenêtre
- **Suggestions contextuelles** basées sur l'historique de conversation (mots-clés non encore couverts)
- **Persistance localStorage** de la conversation
- **Validation Zod** + rate limiting + token check sur la route API

## Sécurité
- Token d'application requis pour invoquer la route
- Validation stricte des messages (rôle, longueur)
- Rate limiting middleware (10 requêtes / minute / IP)
- Le system prompt inclut une **règle de confidentialité explicite** sur les informations sensibles

## Ce que ça démontre à un recruteur IA
- Intégration LLM en prod avec gestion d'erreur, fallback, streaming
- Pattern d'action LLM-driven UI (le modèle pilote des composants React)
- Maîtrise des contraintes industrielles (sécurité, throttle, validation)`,
      tech: ["Groq SDK", "Anthropic SDK", "SSE", "Next.js API routes"],
      color: "bg-fuchsia-600",
      githubUrl: "https://github.com/Ethanol410/portfolio-frutiger",
      demoUrl: "/",
      classement: "secondary",
    },
    {
      id: 5,
      title: "Weight Tracker MVP",
      subtitle: "Discipline d'ingénierie : 97 % de couverture de tests",
      desc: "Application de suivi de poids production-ready en Next.js, TypeScript et PostgreSQL. Schéma BDD, déploiement, 97 % de couverture de tests Vitest. Preuve de rigueur sur la qualité de code.",
      details: `## Le projet
Application de suivi de poids construite en mode production-ready : schéma de base de données pensé, tests unitaires et d'intégration, déploiement automatisé. Pas le projet le plus glamour visuellement, mais celui qui prouve que je sais faire de l'ingénierie sérieuse.

## Stack
- **Next.js** + **TypeScript** strict
- **PostgreSQL** avec migrations versionnées
- **Vitest** pour les tests unitaires et d'intégration
- Déploiement continu

## Le chiffre clé
**97 % de couverture de tests**. Pour un projet personnel, c'est inhabituel et c'est volontaire : je voulais m'imposer une discipline d'ingénierie de niveau prod sur un projet de A à Z.

## Ce que ça prouve
- Discipline TDD sur un projet complet (pas juste sur du code de démo)
- Maîtrise du schéma SQL et des migrations
- Capacité à tenir un standard de qualité sans pression externe
- Compréhension du compromis test/vélocité`,
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Vitest"],
      color: "bg-orange-500",
      githubUrl: "https://github.com/Ethanol410/weight-tracker-mvp",
      demoUrl: null,
      classement: "secondary",
    },
    {
      id: 6,
      title: "Modall",
      subtitle: "Enceintes audio modulaires · Lauréat Pépite Campus 2024",
      desc: "Projet d'enceintes audio modulaires pensées comme des Legos, monté en première année de BUT MMI avec deux étudiants de l'ENSSAT. Lauréat du Prix Pépite Campus à Quimper le 12 mars 2024.",
      details: `## L'idée
Permettre à l'utilisateur de construire son enceinte selon ses besoins (taille, puissance, format) avec des modules audio interconnectables, à la manière des Legos. Une enceinte qui grandit avec ses usages plutôt qu'un objet fini.

## Équipe et contexte
Projet collaboratif mené pendant ma première année de BUT MMI, en équipe avec **deux étudiants de l'ENSSAT**. C'est notamment cette collaboration qui m'a fait connaître l'école et qui pèse aujourd'hui dans mon choix d'y candidater pour le cycle ingénieur.

## Mes contributions
- Design produit et direction artistique
- Prototype fonctionnel (impression 3D plus électronique)
- Pitch et présentation devant le jury Pépite
- Business plan et étude de marché initiale

## Distinction
**Lauréat du Prix Pépite Campus**, à Quimper, le 12 mars 2024. Pépite récompense l'entrepreneuriat étudiant et nous a permis de valider l'approche modulaire, le design épuré et le potentiel produit.

## Aujourd'hui
Le projet est en pause, nos parcours respectifs nous ont menés ailleurs. Mais l'expérience reste fondatrice : c'est là que j'ai compris que je voulais travailler dans des contextes pluridisciplinaires où le logiciel rencontre le matériel et le design, et que j'ai pris confiance dans ma capacité à porter une idée jusqu'à un objet réel défendable devant un jury.`,
      tech: ["Design produit", "Impression 3D", "Électronique", "Pitch entrepreneurial"],
      color: "bg-cyan-600",
      githubUrl: null,
      demoUrl: null,
      classement: "secondary",
    },
    {
      id: 7,
      title: "MathQuest",
      subtitle: "PWA d'auto-formation aux mathématiques pour l'IA et le ML",
      desc: "Application web progressive construite seul pour combler activement mes lacunes en mathématiques avant le cycle ingénieur. 4 modules progressifs dont un dédié maths pour l'IA et le ML (gradient, tenseurs, rétropropagation). Utilisation quotidienne, 10 à 15 minutes par soir.",
      details: `## Pourquoi ce projet
J'ai un parcours non scientifique (bac STMG, BUT MMI). Pour préparer un cycle ingénieur en IA et multimédia, je sais que mon bagage maths est à renforcer. Au lieu d'attendre l'école pour le faire, j'ai construit mon propre dispositif de remédiation, utilisable au quotidien.

## L'idée
Une PWA qui déroule un programme structuré, avec exercices interactifs, formules rendues en LaTeX, visualisations dynamiques et persistance hors-ligne. 4 modules progressifs :
- **Maths discrètes** : logique, ensembles, arithmétique modulaire, dénombrement
- **Algèbre linéaire** : matrices, systèmes, espaces vectoriels, valeurs propres
- **Analyse et probabilités** : fonctions, suites, lois usuelles, Bayes
- **Maths pour l'IA et le ML** : gradient, tenseurs, rétropropagation, descente de gradient

## Stack technique
- **Next.js 15** + **React 19** + **TypeScript strict**
- **KaTeX** pour le rendu LaTeX des formules
- **D3.js** pour les visualisations interactives (graphiques, courbes, vecteurs)
- **Zustand** pour la gestion d'état
- **Dexie** (IndexedDB) pour la persistance hors-ligne et le suivi de progression
- **Vitest** et **Playwright** pour les tests unitaires et end-to-end
- **PWA** : installable, offline-first, notifications de rappel

## Discipline d'usage
J'utilise MathQuest 10 à 15 minutes chaque soir, en complément de mon alternance. Un compteur de séries quotidiennes et un système d'objectifs hebdomadaires me permettent de tenir le rythme.

## Ce que ça prouve
Trois choses :
1. **Lucidité** : je sais reconnaître mes lacunes et je ne les cache pas.
2. **Action** : je ne me contente pas du constat, je construis l'outil pour les combler.
3. **Discipline d'apprentissage** : pas une initiative ponctuelle, un dispositif quotidien.

C'est exactement la posture que je veux apporter dans une équipe IA : repérer un trou, construire un outil mesurable, l'utiliser avec rigueur.`,
      tech: ["Next.js 15", "React 19", "TypeScript", "KaTeX", "D3.js", "Zustand", "Dexie", "Vitest", "Playwright", "PWA"],
      color: "bg-violet-600",
      githubUrl: null,
      demoUrl: null,
      classement: "star",
    },
    {
      id: 8,
      title: "Calendrier de l'Avent Chihiro",
      subtitle: "Expérience narrative interactive inspirée du Voyage de Chihiro (Studio Ghibli)",
      desc: "PWA narrative qui revisite l'univers du film de Miyazaki sous forme de calendrier de l'Avent. Le joueur incarne un personnage piégé dans l'établissement thermal de Yubaba et progresse à travers des journées interactives mêlant dialogues, mini-jeux et animations. Construit en JavaScript vanilla, sans framework, avec Canvas, Web Audio API et support PWA installable.",
      details: `## Le concept
Une application web narrative inspirée du film *Le Voyage de Chihiro* (千と千尋の神隠し). Le joueur incarne un personnage piégé dans l'établissement thermal de Yubaba et progresse à travers des journées interactives qui mélangent narration, mini-jeux et découverte progressive.

## Trois journées jouables
- **Jour 1, Le Contrat** : rencontre avec Yubaba, signature interactive d'un contrat magique sur Canvas, vol du nom du joueur, apparition de Zeniba.
- **Jour 4, Le Nettoyage** : mini-jeu de frottage d'assiette avec détection de mouvement, barre de progression pixel par pixel, feedback audio temps réel.
- **Jour 24, La Libération** : confrontation finale avec Yubaba, aide de Kamaji, mini-jeu de destruction du contrat par clics successifs, scène finale cinématique avec le train.

## Mécaniques de jeu détaillées
- **Système de signature** sur Canvas HTML5 : détection tactile et souris, compteur de pixels pour validation, curseur personnalisé en pinceau.
- **Mini-jeu de nettoyage** : calcul de progression basé sur la distance parcourue, seuil de 250 points pour valider la tâche.
- **Destruction du contrat** : 4 états visuels progressifs (intact, fissuré, brisé, détruit), animation de tremblement à chaque clic, 9 clics nécessaires.

## Système narratif
Moteur de dialogue personnalisé avec :
- Effet **typewriter** lettre par lettre, avec son de machine à écrire
- Système de **speakers** avec changement dynamique de personnage (Yubaba, Zeniba, Kamaji)
- **CSS contextuel** par personnage qui parle
- **Positionnement dynamique** des personnages (gauche, droite, centre)
- **Transitions fluides** entre changements de speaker

## Stack technique
- **HTML5** + **CSS3** + **JavaScript Vanilla** (zéro dépendance externe)
- **Canvas API** pour signature et dessin
- **Web Audio API** pour les effets sonores contextuels (typing, brush, magic, cleaning) et la musique d'ambiance
- **Touch Events** + **Pointer Events** pour le support tactile mobile
- **PWA** : manifest.json, mode standalone, icône personnalisée, support iOS et Android
- **Système de calques** avec z-index hiérarchique (background, character, UI, items, effets, menu, scène finale)

## Architecture
Machine à états pour la progression : \`currentStep\` (Jour 1, 0-14), \`day4Step\` (0-5), \`day24Step\` (0-7), avec garde \`isTyping\` pour bloquer les clics pendant les animations de texte.

## Bonus, page de vote des Noiraudes
Mini-jeu secondaire (\`vote.html\`) : cliquer sur les Noiraudes pour donner des étoiles, avec animations de particules et système de score cumulatif.

## Ce que ça démontre
Un projet construit **sans framework**, qui prouve la maîtrise des fondamentaux web (Canvas, Web Audio, Touch Events, PWA) et la capacité à concevoir un moteur narratif complet (machine à états, transitions, gestion de speakers) à partir de rien. La direction artistique fan-art Ghibli respecte le matériau d'origine tout en en proposant une lecture interactive.

## Crédit
Fan project éducatif et non commercial, inspiré de l'univers du Studio Ghibli. Tous les droits sur les personnages et l'univers original appartiennent au Studio Ghibli et Hayao Miyazaki.`,
      tech: ["HTML5", "CSS3", "JavaScript Vanilla", "Canvas API", "Web Audio API", "PWA", "Touch Events"],
      color: "bg-rose-500",
      githubUrl: "https://github.com/Ethanol410/ProjetWorkshop",
      demoUrl: null,
      classement: "secondary",
    },
  ],

  awards: [
    {
      title: "Prix Pépite Campus",
      desc: "Lauréat du Prix Pépite Campus à Quimper, le 12 mars 2024, pour Modall, un projet d'enceintes audio modulaires monté en équipe avec deux étudiants de l'ENSSAT pendant ma première année de BUT MMI. Pépite récompense l'entrepreneuriat étudiant dans l'écosystème campus.",
      year: "2024",
    },
  ],

  recommendations: [
    {
      name: "Baptiste Vrigneau",
      role: "Chef du département MMI, IUT de Lannion",
      quote: "Grande motivation, implication remarquable, grande énergie, imagination et curiosité. Très favorable à une poursuite d'études en Bac+5.",
    },
    {
      name: "Corinne Schuchard",
      role: "Enseignante et Responsable Alternance MMI",
      quote: "Dynamisme, curiosité, médiateur en groupe de projet. Autonomie et résilience face aux défis de l'alternance. Recommandation pour un Cycle Master.",
    },
    {
      name: "Mohamed Ez-zaouia",
      role: "Enseignant Dev Front-end et Back-end avancé",
      quote: "Curiosité pour les technologies émergentes, intégration de LLM dans ses projets. Collaborateur agréable, esprit d'équipe et tempérament positif.",
    },
    {
      name: "Gwendal Jamain",
      role: "Développeur Web, Ici Carte Grise",
      quote: "Sérieux, rigueur et curiosité intellectuelle remarquables. Travail fiable, structuré et réfléchi. Recommandation sans réserve.",
    },
  ],

  engagements: [
    {
      title: "BDE de l'IUT de Lannion",
      role: "Chef de projet",
      period: "2024 à 2026",
      desc: "Chef de projet au Bureau des Étudiants. Responsable de deux opérations : la vente hebdomadaire de viennoiseries du vendredi matin (gestion fournisseur, trésorerie, logistique, financement des événements du BDE), et le concours de design du pull du BDE (animation de la communauté étudiante, organisation du vote, coordination avec le fournisseur, livraison dans les temps). Faire bouger un collectif autour d'un objectif commun, c'est une compétence d'ingénieur autant qu'une compétence associative.",
    },
  ],
};
