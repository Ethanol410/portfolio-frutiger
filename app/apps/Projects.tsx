import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { portfolio } from '@/app/data/portfolio';

export const ProjectsApp = () => {
  return (
    <div className="h-full bg-gray-100 p-6 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {portfolio.projects.map((project) => (
          <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
            {/* Thumbnail */}
            <div className={`h-32 ${project.color} flex items-center justify-center text-white font-bold text-xl`}>
              {project.title}
            </div>

            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-bold text-gray-800 mb-1">{project.title}</h3>
              <p className="text-xs text-gray-500 mb-3 line-clamp-3">{project.desc}</p>

              <div className="flex flex-wrap gap-1 mb-4 mt-auto">
                {project.tech.map(t => (
                  <span key={t} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] rounded border">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex gap-2 mt-auto">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 bg-gray-900 text-white text-xs py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  <Github size={12} /> Code
                </a>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-1 border border-gray-300 text-gray-700 text-xs py-2 rounded hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink size={12} /> Demo
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
