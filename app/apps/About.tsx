import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, Award, Quote, Phone, Zap, Users, Wrench, FlaskConical, Trophy, Target, GraduationCap } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { portfolio } from '@/app/data/portfolio';

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

const SKILL_LABELS: Record<string, string> = {
  ia: 'IA & Machine Learning',
  multimedia: 'Multimédia',
  web: 'Développement web',
  backend: 'Backend & API',
  architecture: 'Architecture & patterns',
  devops: 'DevOps & outils',
  soft: 'Soft skills',
  frontend: 'Front-End',
  tools: 'Outils',
  databases: 'Bases de données',
};

const BIO_ICONS: LucideIcon[] = [Wrench, FlaskConical, Trophy, Target, GraduationCap];

const SKILL_COLORS: Record<string, string> = {
  ia: 'bg-violet-50 text-violet-700 border-violet-100',
  multimedia: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100',
  web: 'bg-blue-50 text-blue-700 border-blue-100',
  backend: 'bg-purple-50 text-purple-700 border-purple-100',
  architecture: 'bg-indigo-50 text-indigo-700 border-indigo-100',
  devops: 'bg-emerald-50 text-emerald-700 border-emerald-100',
  soft: 'bg-amber-50 text-amber-700 border-amber-100',
  frontend: 'bg-blue-50 text-blue-600 border-blue-100',
  tools: 'bg-gray-100 text-gray-600 border-gray-200',
  databases: 'bg-orange-50 text-orange-600 border-orange-100',
};

export const AboutApp = () => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="h-full aero-app overflow-y-auto p-6 flex flex-col items-center gap-4">

      {/* Header Profile */}
      <motion.div variants={fadeUp} className="w-full aero-card rounded-xl p-6 flex flex-col items-center text-center">
        <Image src={portfolio.avatar} alt={portfolio.fullName} width={96} height={96} className="rounded-full object-cover mb-4 shadow-lg border-4 border-blue-100" />
        <h2 className="text-2xl font-bold text-gray-800">{portfolio.fullName}</h2>
        <p className="text-blue-600 font-semibold mb-0.5">{portfolio.title}</p>
        <p className="text-blue-500/80 text-xs mb-2">{portfolio.subtitle}</p>
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <MapPin size={14} /> {portfolio.location}
        </div>
        <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-4">
          <Zap size={12} className="text-emerald-500" />
          {portfolio.availability.label}
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
      </motion.div>

      {/* Bio - blocs thématiques pour faciliter la lecture */}
      <motion.div variants={fadeUp} className="w-full aero-card rounded-xl p-6">
        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Biographie</h3>
        <div className="flex flex-col gap-4">
          {portfolio.bio.map((block, i) => {
            const Icon = BIO_ICONS[i] ?? Wrench;
            return (
              <div key={i} className="flex gap-3">
                <div className="shrink-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(160deg, #cce9ff 0%, #7fc4f0 100%)',
                      boxShadow: '0 2px 6px rgba(80,150,220,0.25), inset 0 1px 0 rgba(255,255,255,0.7)',
                    }}
                  >
                    <Icon size={15} className="text-blue-900" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-800 text-sm mb-1">{block.title}</div>
                  <p className="text-gray-600 text-xs leading-relaxed">{block.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div variants={fadeUp} className="w-full aero-card rounded-xl p-6">
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
      </motion.div>

      {/* Experience */}
      <motion.div variants={fadeUp} className="w-full aero-card rounded-xl p-6">
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
      </motion.div>

      {/* Awards */}
      {portfolio.awards.length > 0 && (
        <motion.div variants={fadeUp} className="w-full aero-card rounded-xl p-6">
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
        </motion.div>
      )}

      {/* Engagement / Vie associative */}
      {portfolio.engagements.length > 0 && (
        <motion.div variants={fadeUp} className="w-full aero-card rounded-xl p-6">
          <h3 className="font-bold text-gray-800 mb-3 border-b pb-2 flex items-center gap-2">
            <Users size={16} className="text-emerald-500" /> Engagement
          </h3>
          <div className="flex flex-col gap-3">
            {portfolio.engagements.map((eng, i) => (
              <div key={i} className="flex gap-3 bg-emerald-50 border border-emerald-100 rounded-lg p-3">
                <Users size={20} className="text-emerald-500 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-gray-800 text-sm">{eng.title}</div>
                  <div className="text-xs text-emerald-700 font-medium">{eng.role} · {eng.period}</div>
                  <div className="text-xs text-gray-500 mt-0.5 leading-relaxed">{eng.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recommendations */}
      {portfolio.recommendations.length > 0 && (
        <motion.div variants={fadeUp} className="w-full aero-card rounded-xl p-6">
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
        </motion.div>
      )}

    </motion.div>
  );
};
