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
}

export const portfolio: Portfolio = {
  name: "Ethan",
  fullName: "Ethan Collin",
  title: "Apprenti ingénieur IA & interfaces intelligentes",
  subtitle: "BUT MMI Lannion. Cycle ENSSAT IAM dès septembre 2026.",
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

  tagline: "Co-auteur d'un projet de recherche IA et interaction humain-machine soumis à UIST 2026. 2 ans d'alternance full-stack en production. Je conçois des systèmes où LLM et interfaces collaborent.",

  bio: "À 20 ans, j'ai repris seul la plateforme e-commerce d'Ici Carte Grise après le départ de mon tuteur (plusieurs milliers de transactions par mois en PHP 8, MySQL, intégrations API), et je l'ai tenue en prod tout en encadrant une nouvelle alternante. C'est cette capacité à livrer sous pression qui définit mon profil. En parallèle, à l'IUT MMI de Lannion, j'ai contribué à un projet de recherche couplant IA et interaction humain-machine, encadré par un chercheur de l'IRISA (Université de Rennes). L'article a été soumis à la conférence ACM UIST 2026. J'ai également co-créé Agentix Canvas, un outil de brainstorming collaboratif piloté par agents IA, lauréat du Prix du Campus Pépite 2025. En septembre 2026, je rejoins le cycle ingénieur ENSSAT, option IAM (IA & Multimédia) en alternance. Je cherche une entreprise d'accueil à Lannion ou Dinan pour conduire des projets d'IA appliquée pendant 3 ans.",

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
      "Animations Framer Motion",
      "Traitement d'image (en cours)",
    ],
    web: [
      "TypeScript",
      "React 19",
      "Next.js 16 (App Router)",
      "Tailwind CSS 4",
      "Zustand",
    ],
    backend: [
      "PHP 8.2 (production)",
      "MySQL",
      "Node.js, Express",
      "REST API",
      "Intégrations API (Resend, Spotify, GitHub, ANTS, Stripe)",
    ],
    devops: [
      "Git, GitHub Actions",
      "Vercel, déploiement continu",
      "Tests (Vitest, 97 % de couverture sur Weight Tracker)",
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
      role: "Recherche, co-créateur d'Agentix Canvas",
      company: "IUT de Lannion",
      period: "2025 à 2026",
      desc: "Outil de brainstorming collaboratif temps réel avec orchestration multi-agents IA (assistant Isa). Cartes mentales, plans d'action générés automatiquement, intégration LLM dans une interface réactive. Lauréat du Prix du Campus Pépite 2025.",
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
      subtitle: "Brainstorming collaboratif piloté par agents IA · Lauréat Pépite 2025",
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
La synchronisation des agents en temps réel est complexe : éviter les conflits de réponses, gérer les latences, maintenir la cohérence du contexte entre agents. Résolu par une file de messages et un état partagé côté serveur.

## Distinction
Lauréat du **Prix du Campus Pépite 2025**, dans l'écosystème entrepreneurial de Lannion.`,
      tech: ["React", "WebSockets", "LLM (Claude, Groq)", "Architecture multi-agents"],
      color: "bg-emerald-600",
      githubUrl: "https://github.com/Ethanol410/ProjetWorkshop",
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
  ],

  awards: [
    {
      title: "Prix du Campus, Concours Pépite",
      desc: "Lauréat du prix campus dans l'écosystème entrepreneurial de Lannion. Projet associé : Agentix Canvas (brainstorming collaboratif piloté par agents IA).",
      year: "2025",
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
};
