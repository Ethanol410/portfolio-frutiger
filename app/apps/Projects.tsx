import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "Portfolio OS",
    desc: "Un système d'exploitation simulé en React/Next.js avec gestion de fenêtres et drag & drop.",
    tech: ["Next.js", "Zustand", "Tailwind"],
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "E-Commerce Dashboard",
    desc: "Interface d'administration pour gérer des produits et visualiser des statistiques de vente.",
    tech: ["React", "Recharts", "Node.js"],
    color: "bg-emerald-500"
  },
  {
    id: 3,
    title: "Chat App TR",
    desc: "Application de messagerie temps réel utilisant Socket.io et une base de données Redis.",
    tech: ["Socket.io", "Express", "Redis"],
    color: "bg-purple-500"
  }
];

export const ProjectsApp = () => {
  return (
    <div className="h-full bg-gray-100 p-6 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            {/* Fake Thumbnail */}
            <div className={`h-32 ${project.color} flex items-center justify-center text-white font-bold text-xl`}>
              {project.title}
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-800 mb-1">{project.title}</h3>
              <p className="text-xs text-gray-500 mb-3 line-clamp-2">{project.desc}</p>
              
              <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                {project.tech.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded border">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-auto">
                <button className="flex-1 flex items-center justify-center gap-1 bg-gray-900 text-white text-xs py-2 rounded hover:bg-gray-800">
                  <Github size={12} /> Code
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 border border-gray-300 text-gray-700 text-xs py-2 rounded hover:bg-gray-50">
                  <ExternalLink size={12} /> Demo
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};