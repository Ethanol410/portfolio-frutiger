import React from 'react';
import { Github, Linkedin, Mail, MapPin, Award, Quote, Phone } from 'lucide-react';
import { portfolio } from '@/app/data/portfolio';

const SKILL_LABELS: Record<string, string> = {
  frontend: 'Front-End',
  backend: 'Back-End',
  ai: 'IA & LLM',
  tools: 'Outils',
  databases: 'Bases de données',
};

const SKILL_COLORS: Record<string, string> = {
  frontend: 'bg-blue-50 text-blue-600 border-blue-100',
  backend: 'bg-purple-50 text-purple-600 border-purple-100',
  ai: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  tools: 'bg-gray-100 text-gray-600 border-gray-200',
  databases: 'bg-orange-50 text-orange-600 border-orange-100',
};

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

        <div className="flex gap-3">
          <a
            href={portfolio.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 md:p-2 bg-gray-800 text-white rounded-full hover:scale-110 transition-transform"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={portfolio.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 md:p-2 bg-blue-700 text-white rounded-full hover:scale-110 transition-transform"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${portfolio.email}`}
            className="p-3 md:p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href={`tel:${portfolio.phone}`}
            className="p-3 md:p-2 bg-green-500 text-white rounded-full hover:scale-110 transition-transform"
            aria-label="Téléphone"
          >
            <Phone size={18} />
          </a>
        </div>
      </div>

      {/* Bio */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-2 border-b pb-2">Biographie</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{portfolio.bio}</p>
      </div>

      {/* Skills */}
      <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-bold text-gray-800 mb-3 border-b pb-2">Compétences</h3>
        <div className="flex flex-col gap-3">
          {(Object.entries(portfolio.skills) as [string, string[]][]).map(([category, items]) => (
            <div key={category}>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5">
                {SKILL_LABELS[category] ?? category}
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span
                    key={skill}
                    className={`px-3 py-1 text-xs font-semibold rounded-full border ${SKILL_COLORS[category] ?? 'bg-gray-50 text-gray-600 border-gray-200'}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience */}
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
                <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{exp.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Awards */}
      {portfolio.awards.length > 0 && (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-3 border-b pb-2 flex items-center gap-2">
            <Award size={16} className="text-yellow-500" /> Distinctions
          </h3>
          <div className="flex flex-col gap-3">
            {portfolio.awards.map((award, i) => (
              <div key={i} className="flex gap-3 bg-yellow-50 border border-yellow-100 rounded-lg p-3">
                <Award size={20} className="text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{award.title} <span className="text-yellow-600 font-normal">· {award.year}</span></div>
                  <div className="text-xs text-gray-500 mt-0.5">{award.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {portfolio.recommendations.length > 0 && (
        <div className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-bold text-gray-800 mb-3 border-b pb-2 flex items-center gap-2">
            <Quote size={16} className="text-blue-400" /> Recommandations
          </h3>
          <div className="flex flex-col gap-3">
            {portfolio.recommendations.map((rec, i) => (
              <div key={i} className="bg-gray-50 border border-gray-100 rounded-lg p-4">
                <p className="text-xs text-gray-600 italic leading-relaxed mb-2">"{rec.quote}"</p>
                <div className="font-semibold text-gray-800 text-xs">{rec.name}</div>
                <div className="text-[10px] text-gray-400">{rec.role}</div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
