export const portfolio = {
  name: "Ethan",
  fullName: "Ethan Dupont",
  title: "Développeur Front-End Créatif",
  location: "Paris, France",
  email: "ethan.dupont@gmail.com",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-profile",
  avatar: "/people_31.png",

  bio: "Passionné par le web et les interfaces utilisateurs, je crée des expériences interactives immersives comme cet OS portfolio. J'aime transformer des idées complexes en code propre et performant, avec une attention particulière pour l'UX et les animations. Curieux et autodidacte, j'explore constamment de nouveaux outils et frameworks. Actuellement à la recherche d'une alternance ou d'un poste en développement front-end.",

  skills: {
    frontend: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    backend: ["Node.js", "Express", "REST API"],
    tools: ["Git", "GitHub", "Figma", "VS Code"],
    databases: ["MongoDB", "Redis", "PostgreSQL"],
  },

  experience: [
    {
      role: "Développeur Front-End (Stage)",
      company: "Tech Startup",
      period: "2024",
      desc: "Développement d'une interface React avec intégration d'API REST.",
    },
    {
      role: "Projet Personnel — Portfolio OS",
      company: "Personnel",
      period: "2025",
      desc: "OS simulé en Next.js avec fenêtres draggables, 10 apps, animations Framer Motion.",
    },
  ],

  projects: [
    {
      id: 1,
      title: "Portfolio OS",
      desc: "Un système d'exploitation simulé en React/Next.js avec gestion de fenêtres draggables, drag & drop, et une dizaine d'applications intégrées (Terminal, Browser, Paint, Musique...).",
      tech: ["Next.js", "Zustand", "Tailwind CSS", "Framer Motion"],
      color: "bg-blue-500",
      githubUrl: "https://github.com/your-username/portfolio-os",
      demoUrl: "/",
    },
    {
      id: 2,
      title: "E-Commerce Dashboard",
      desc: "Interface d'administration complète pour gérer des produits, commandes et visualiser des statistiques de vente en temps réel avec des graphiques interactifs.",
      tech: ["React", "Recharts", "Node.js", "MongoDB"],
      color: "bg-emerald-500",
      githubUrl: "https://github.com/your-username/ecommerce-dashboard",
      demoUrl: "#",
    },
    {
      id: 3,
      title: "Chat App Temps Réel",
      desc: "Application de messagerie temps réel avec rooms, messages privés et notifications, utilisant Socket.io et Redis pour la persistance des sessions.",
      tech: ["Socket.io", "Express", "Redis", "React"],
      color: "bg-purple-500",
      githubUrl: "https://github.com/your-username/chat-app",
      demoUrl: "#",
    },
    {
      id: 4,
      title: "Task Manager",
      desc: "Gestionnaire de tâches avec drag & drop, étiquettes colorées, filtres avancés et synchronisation en temps réel entre plusieurs utilisateurs.",
      tech: ["React", "DnD Kit", "Supabase", "TypeScript"],
      color: "bg-orange-500",
      githubUrl: "https://github.com/your-username/task-manager",
      demoUrl: "#",
    },
    {
      id: 5,
      title: "API REST Blog",
      desc: "API REST complète pour un blog avec authentification JWT, gestion des rôles, upload d'images et système de commentaires.",
      tech: ["Express", "PostgreSQL", "JWT", "Multer"],
      color: "bg-rose-500",
      githubUrl: "https://github.com/your-username/blog-api",
      demoUrl: "#",
    },
  ],
};
