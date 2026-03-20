import React from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { portfolio } from '@/app/data/portfolio';

export const AboutApp = () => {
  return (
    <div className="h-full bg-gray-50 overflow-y-auto p-6 flex flex-col items-center gap-4">

      {/* Header Profile */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center text-center">
        <img
          src={portfolio.avatar}
          alt={portfolio.fullName}
          className="w-24 h-24 rounded-full object-cover mb-4 shadow-lg border-4 border-blue-100"
        />
        <h2 className="text-2xl font-bold text-gray-800">{portfolio.fullName}</h2>
        <p className="text-blue-600 font-medium mb-2">{portfolio.title}</p>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-4">
          <MapPin size={14} /> {portfolio.location}
        </div>

        {/* Social Links */}
        <div className="flex gap-3">
          <a
            href={portfolio.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-gray-800 text-white rounded-full hover:scale-110 transition-transform"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={portfolio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-blue-700 text-white rounded-full hover:scale-110 transition-transform"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${portfolio.email}`}
            className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>

      {/* Bio Section */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-2 border-b pb-2">Biographie</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{portfolio.bio}</p>
      </div>

      {/* Skills Section */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Compétences</h3>
        <div className="flex flex-col gap-3">
          {(Object.entries(portfolio.skills) as [string, string[]][]).map(([category, items]) => (
            <div key={category}>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                {category === 'frontend' ? 'Front-End' :
                 category === 'backend' ? 'Back-End' :
                 category === 'tools' ? 'Outils' : 'Bases de données'}
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full border border-blue-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience / Timeline */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Parcours</h3>
        <div className="flex flex-col gap-4">
          {portfolio.experience.map((exp, i) => (
            <div key={i} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mt-1 shrink-0" />
                {i < portfolio.experience.length - 1 && (
                  <div className="w-0.5 flex-1 bg-blue-100 mt-1" />
                )}
              </div>
              <div className="pb-2">
                <div className="font-semibold text-gray-800 text-sm">{exp.role}</div>
                <div className="text-xs text-blue-600 font-medium">{exp.company} · {exp.period}</div>
                <div className="text-xs text-gray-500 mt-0.5">{exp.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
