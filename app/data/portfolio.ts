export const portfolio = {
  name: "Ethan",
  fullName: "Ethan Collin",
  title: "Développeur Web FullStack — Étudiant BUT MMI",
  location: "Lannion, France",
  email: "ethan.collin2304@gmail.com",
  phone: "06 04 46 10 27",
  github: "https://github.com/Ethanol410",
  linkedin: "https://linkedin.com/in/ethan-collin",
  avatar: "/people_31.png",

  bio: "Étudiant en BUT MMI – Développement Web à l'IUT de Lannion, j'ai forgé mon profil technique à travers 2 ans d'alternance chez Ici Carte Grise, où j'ai géré en autonomie une plateforme B2C à fort trafic (PHP, JS, MySQL) après le départ de mon tuteur. Passionné par l'IA et les interfaces interactives, j'ai contribué à des projets de recherche mêlant LLM et web design (UI Drift, Agentix Canvas). Lauréat du prix campus Pépite pour mon projet Modall, je candidate à l'ENSSAT (IA & Multimédia) et au Master MIAGE pour concevoir des systèmes intelligents, robustes et utiles.",

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
      desc: "Maintenance et évolution d'une plateforme B2C à fort trafic en PHP 7.4/8.2, JavaScript, jQuery et MySQL. Gestion autonome du pôle développement après le départ du tuteur. Formation et encadrement d'une nouvelle alternante.",
    },
    {
      role: "Projet de Recherche — UI Drift",
      company: "IUT de Lannion",
      period: "2025 — 2026",
      desc: "Prototype de recherche sur les instabilités des interfaces générées par IA : détection des dérives qu'un LLM introduit au-delà des demandes utilisateur. Modélisation, métriques quantitatives et outils de contrôle.",
    },
    {
      role: "Projet de Recherche — Agentix Canvas",
      company: "IUT de Lannion",
      period: "2025 — 2026",
      desc: "Application de brainstorming collaboratif avec assistant IA multi-agents (Isa). Collaboration temps réel, cartes mentales, plans d'action, intégration LLM dans une interface interactive.",
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
