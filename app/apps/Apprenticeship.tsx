'use client';

import React from 'react';
import {
  GraduationCap, Briefcase, MapPin, Calendar, Mail, FileText,
  ChevronRight, Sparkles, BookOpen, Target,
} from 'lucide-react';
import { portfolio } from '@/app/data/portfolio';
import { useOSStore } from '@/app/store/useOSStore';
import { ContactApp } from './Contact';
import { PDFViewerApp } from './PDFViewer';
import { Mail as MailIcon, FileText as FileTextIcon } from 'lucide-react';

const MISSIONS = [
  "Conception et intégration de fonctionnalités IA (LLM, agents, RAG, vision)",
  "Développement d'interfaces intelligentes pour le web ou le multimédia",
  "Prototypage rapide, R&D appliquée, mesure d'impact",
  "Industrialisation de proof of concept IA jusqu'à la mise en production",
];

const ARGUMENTS = [
  "Co-auteur d'un projet de recherche IA et interaction humain-machine, article soumis à ACM UIST 2026",
  "2 ans d'alternance full-stack déjà validés (autonomie en production)",
  "Lauréat du Prix Pépite Campus 2024 (Modall, en équipe avec deux étudiants de l'ENSSAT)",
  "Encadrement d'une nouvelle alternante chez Ici Carte Grise",
];

export const ApprenticeshipApp = () => {
  const { addWindow } = useOSStore();

  const openContact = () => {
    addWindow({
      id: 'contact',
      title: 'Me Contacter',
      icon: MailIcon,
      component: <ContactApp />,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 200,
      defaultPosition: { x: 220, y: 60 },
      defaultSize: { width: 550, height: 580 },
    });
  };

  const openCV = () => {
    addWindow({
      id: 'cv',
      title: 'Mon CV',
      icon: FileTextIcon,
      component: <PDFViewerApp file="/cv.pdf" />,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 200,
      defaultPosition: { x: 180, y: 50 },
      defaultSize: { width: 800, height: 660 },
    });
  };

  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        background: 'linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)',
      }}
    >
      <div className="px-6 py-6 flex flex-col gap-5">

        {/* Hero */}
        <header className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-emerald-700 text-xs font-medium mb-3"
            style={{
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.35)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {portfolio.availability.label}
          </div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight">
            Recherche alternance ingénieur IA
          </h1>
          <p className="text-sm text-sky-700 font-medium mt-1">Septembre 2026 · 3 ans</p>
        </header>

        {/* Formation ENSSAT */}
        <section
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(186,230,253,0.55)',
            boxShadow: '0 2px 10px rgba(14,165,233,0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap size={18} className="text-violet-500" />
            <h2 className="font-bold text-slate-800 text-sm">Formation visée</h2>
          </div>
          <div className="text-sm text-slate-700 space-y-1.5">
            <p className="font-semibold">
              ENSSAT, cycle ingénieur Informatique par apprentissage
            </p>
            <p className="text-xs text-slate-600">
              Option IAM, parcours <span className="font-semibold">IA & Multimédia</span>, Lannion (Université de Rennes).
            </p>
            <p className="text-xs text-slate-500 mt-2 italic">
              Rythme et calendrier précis à confirmer avec l&apos;école.
            </p>
          </div>
        </section>

        {/* Missions visées */}
        <section
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(186,230,253,0.55)',
            boxShadow: '0 2px 10px rgba(14,165,233,0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="text-sky-500" />
            <h2 className="font-bold text-slate-800 text-sm">Missions recherchées</h2>
          </div>
          <ul className="flex flex-col gap-2">
            {MISSIONS.map(m => (
              <li key={m} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                <ChevronRight size={14} className="text-sky-400 shrink-0 mt-0.5" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Pourquoi mon profil */}
        <section
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(186,230,253,0.55)',
            boxShadow: '0 2px 10px rgba(14,165,233,0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={18} className="text-violet-500" />
            <h2 className="font-bold text-slate-800 text-sm">Pourquoi mon profil</h2>
          </div>
          <ul className="flex flex-col gap-2">
            {ARGUMENTS.map(a => (
              <li key={a} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                <span className="text-violet-500 shrink-0 mt-0.5">·</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Mobilité / Logistique */}
        <section
          className="rounded-2xl p-5"
          style={{
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(186,230,253,0.55)',
            boxShadow: '0 2px 10px rgba(14,165,233,0.08)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={18} className="text-emerald-500" />
            <h2 className="font-bold text-slate-800 text-sm">Mobilité &amp; calendrier</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <Calendar size={13} className="text-sky-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-800">Démarrage</div>
                <div className="text-slate-600">Septembre 2026</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Briefcase size={13} className="text-sky-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-800">Durée</div>
                <div className="text-slate-600">3 ans (cycle ingénieur)</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={13} className="text-sky-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-800">Zone</div>
                <div className="text-slate-600">Lannion, Dinan, Côtes-d&apos;Armor</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <BookOpen size={13} className="text-sky-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-800">École</div>
                <div className="text-slate-600">ENSSAT, IAM</div>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <section className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={openCV}
            className="px-4 py-2 text-white text-sm font-semibold rounded-full flex items-center gap-1.5 transition-all hover:brightness-110 active:scale-95"
            style={{
              background: 'linear-gradient(180deg, #1976d2 0%, #1254a0 100%)',
              boxShadow: '0 3px 8px rgba(25,118,210,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            <FileText size={14} /> Mon CV
          </button>
          <button
            onClick={openContact}
            className="px-4 py-2 text-white text-sm font-semibold rounded-full flex items-center gap-1.5 transition-all hover:brightness-110 active:scale-95"
            style={{
              background: 'linear-gradient(180deg, #16a34a 0%, #15803d 100%)',
              boxShadow: '0 3px 8px rgba(22,163,74,0.3), inset 0 1px 0 rgba(255,255,255,0.3)',
            }}
          >
            <Mail size={14} /> Me contacter
          </button>
        </section>

        <p className="text-center text-[11px] text-slate-500 mt-2 mb-2">
          Contact direct :{" "}
          <a href={`mailto:${portfolio.email}`} className="text-sky-700 hover:underline">
            {portfolio.email}
          </a>
        </p>

      </div>
    </div>
  );
};
