import React from 'react';
import { Github, Linkedin, Mail, MapPin, User } from 'lucide-react';

export const AboutApp = () => {
  const skills = ["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "Zustand"];

  return (
    <div className="h-full bg-gray-50 overflow-y-auto p-6 flex flex-col items-center">
      {/* Header Profile */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
        <div className="w-24 h-24 bg-gradient-to-tr from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
          <User size={48} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Ethan (Ton Nom)</h2>
        <p className="text-blue-600 font-medium mb-2">Développeur Front-End Créatif</p>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <MapPin size={14} /> Paris, France
        </div>

        {/* Social Links */}
        <div className="flex gap-3">
          <button className="p-2 bg-gray-800 text-white rounded-full hover:scale-110 transition-transform">
            <Github size={18} />
          </button>
          <button className="p-2 bg-blue-700 text-white rounded-full hover:scale-110 transition-transform">
            <Linkedin size={18} />
          </button>
          <button className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform">
            <Mail size={18} />
          </button>
        </div>
      </div>

      {/* Bio Section */}
      <div className="w-full mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-2 border-b pb-2">Biographie</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Passionné par le web et les interfaces utilisateurs, je crée des expériences interactives comme cet OS. 
          J'aime transformer des idées complexes en code propre et performant. Actuellement à la recherche d'une alternance ou d'un CDI.
        </p>
      </div>

      {/* Skills Section */}
      <div className="w-full mt-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Compétences</h3>
        <div className="flex flex-wrap gap-2">
          {skills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};