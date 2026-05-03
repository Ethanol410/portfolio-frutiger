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

interface Project {
  id: number;
  title: string;
  desc: string;
  tech: string[];
  color: string;
  githubUrl: string;
  demoUrl: string;
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
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  avatar: string;
  availability: Availability;
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
  title: "Développeur Web FullStack & IA — BUT MMI",
  location: "Lannion, France",
  email: "ethan.collin2304@gmail.com",
  phone: "06 04 46 10 27",
  github: "https://github.com/Ethanol410",
  linkedin: "https://linkedin.com/in/ethan-collin",
  avatar: "/people_31.png",

  availability: {
    status: "disponible",
    label: "Disponible — Alternance dès sept. 2026",
  },

  bio: "À 20 ans, j'ai pris en charge seul une plateforme e-commerce à fort trafic après le départ de mon tuteur — et j'ai livré. C'est cette autonomie et cette capacité à m'adapter sous pression qui définissent mon profil. Développeur FullStack en alternance chez Ici Carte Grise depuis 2 ans, je construis en parallèle des projets de recherche à l'IUT qui croisent IA et interfaces web (UI Drift, Agentix Canvas). Lauréat du prix campus Pépite, je candidate à l'ENSSAT (IA & Multimédia) et au Master MIAGE pour concevoir les systèmes intelligents de demain.",

  skills: {
    frontend: ["React", "Next.js", "TypeScript", "JavaScript", "jQuery", "Tailwind CSS", "HTML/CSS", "Framer Motion"],
    backend: ["PHP 7.4/8.2", "MySQL", "Node.js", "Express", "REST API"],
    ai: ["Intégration LLM", "IA générative", "Agents IA", "Interfaces Humain-IA"],
    tools: ["Git", "GitHub", "Figma", "VS Code", "Unity", "C#"],
  },

  experience: [
    {
      role: "Développeur FullStack (Alternance)",
      company: "Ici Carte Grise",
      period: "2024 — 2026",
      desc: "Gestion autonome d'une plateforme B2C (plusieurs milliers de transactions/mois) en PHP 7.4/8.2, JS, MySQL — après le départ du tuteur. Responsable du pôle développement web et encadrement d'une nouvelle alternante.",
    },
    {
      role: "Projet de Recherche — UI Drift",
      company: "IUT de Lannion",
      period: "2025 — 2026",
      desc: "Détection et visualisation des instabilités qu'un LLM introduit dans les interfaces web au-delà des demandes utilisateur. Modélisation quantitative des dérives, prototype fonctionnel avec métriques de contrôle.",
    },
    {
      role: "Projet de Recherche — Agentix Canvas",
      company: "IUT de Lannion",
      period: "2025 — 2026",
      desc: "Outil de brainstorming collaboratif temps réel avec orchestration multi-agents IA (assistant Isa). Cartes mentales, plans d'action générés automatiquement, intégration LLM dans une interface réactive.",
    },
  ],

  projects: [
    {
      id: 1,
      title: "Portfolio OS Frutiger",
      desc: "Un système d'exploitation simulé en Next.js/React avec fenêtres draggables, 10+ apps (Terminal, Browser, Paint, Musique…), esthétique Windows Vista / Frutiger Aero.",
      tech: ["Next.js", "TypeScript", "Zustand", "Tailwind CSS", "Framer Motion"],
      color: "bg-blue-500",
      githubUrl: "https://github.com/Ethanol410/portfolio-frutiger",
      demoUrl: "/",
    },
    {
      id: 2,
      title: "UI Drift",
      desc: "Prototype de recherche : détection et visualisation des instabilités introduites par les LLM dans les interfaces web. Modélisation des dérives, métriques quantitatives, interaction mixte humain-IA.",
      tech: ["TypeScript", "LLM", "IA générative", "Métriques"],
      color: "bg-violet-600",
      githubUrl: "https://github.com/Ethanol410/site-drift",
      demoUrl: "#",
    },
    {
      id: 3,
      title: "Agentix Canvas",
      desc: "Application de brainstorming collaboratif intégrant un assistant IA multi-agents (Isa). Cartes mentales, plans d'action, collaboration temps réel et intégration de modèles de langage.",
      tech: ["React", "LLM", "Temps réel", "Agents IA"],
      color: "bg-emerald-600",
      githubUrl: "https://github.com/Ethanol410/ProjetWorkshop",
      demoUrl: "#",
    },
    {
      id: 4,
      title: "Weight Tracker MVP",
      desc: "Application de suivi de poids production-ready avec Next.js, TypeScript et PostgreSQL. 97% de couverture de tests.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Tests"],
      color: "bg-orange-500",
      githubUrl: "https://github.com/Ethanol410/weight-tracker-mvp",
      demoUrl: "#",
    },
    {
      id: 5,
      title: "POC Interface Audio",
      desc: "Proof of concept d'une interface audio interactive développée en TypeScript.",
      tech: ["TypeScript", "Web Audio API"],
      color: "bg-cyan-600",
      githubUrl: "https://github.com/Ethanol410/poc-interface-audio",
      demoUrl: "#",
    },
  ],

  awards: [
    {
      title: "Prix du campus — Concours Pépite",
      desc: "Projet Modall : enceintes modulaires innovantes. Lauréat du prix campus dans l'écosystème entrepreneurial de Lannion.",
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
      role: "Enseignante & Responsable Alternance MMI",
      quote: "Dynamisme, curiosité, médiateur en groupe de projet. Autonomie et résilience face aux défis de l'alternance. Recommandation pour un Cycle Master.",
    },
    {
      name: "Mohamed Ez-zaouia",
      role: "Enseignant — Dev Front-end & Back-end avancé",
      quote: "Curiosité pour les technologies émergentes, intégration de LLM dans ses projets. Collaborateur agréable, esprit d'équipe et tempérament positif.",
    },
    {
      name: "Gwendal Jamain",
      role: "Développeur Web, Ici Carte Grise",
      quote: "Sérieux, rigueur et curiosité intellectuelle remarquables. Travail fiable, structuré et réfléchi. Recommandation sans réserve.",
    },
  ],
};
