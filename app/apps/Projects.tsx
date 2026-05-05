'use client';

import { useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Github, ExternalLink, Sparkles, Trophy, FlaskConical, Code2, ArrowLeft,
} from 'lucide-react';
import { portfolio } from '@/app/data/portfolio';

// ─── Config visuelle ─────────────────────────────────────────────────────────

const CLASSEMENT_LABEL: Record<string, string> = {
  star: 'À la une',
  secondary: 'Autres projets',
  archive: 'Archives',
};

const CLASSEMENT_ORDER: Array<'star' | 'secondary' | 'archive'> = ['star', 'secondary', 'archive'];

// Mapping color tailwind classique → gradient pour la bannière de carte.
const PROJECT_GRADIENTS: Record<string, [string, string]> = {
  'bg-violet-600':  ['#7c3aed', '#a78bfa'],
  'bg-emerald-600': ['#059669', '#34d399'],
  'bg-blue-500':    ['#0ea5e9', '#38bdf8'],
  'bg-fuchsia-600': ['#c026d3', '#e879f9'],
  'bg-orange-500':  ['#f97316', '#fdba74'],
  'bg-cyan-600':    ['#0891b2', '#22d3ee'],
  'bg-rose-500':    ['#f43f5e', '#fb7185'],
  'bg-indigo-600':  ['#4f46e5', '#818cf8'],
};

// ─── CuratedProjectCard ──────────────────────────────────────────────────────

function CuratedProjectCard({
  project,
  onSelect,
}: {
  project: typeof portfolio.projects[number];
  onSelect: () => void;
}) {
  const [from, to] = PROJECT_GRADIENTS[project.color] ?? ['#0284c7', '#38bdf8'];
  const gradient = `linear-gradient(135deg, ${from}, ${to})`;
  const initial = project.title[0]?.toUpperCase() ?? 'E';

  return (
    <button
      onClick={onSelect}
      type="button"
      className="rounded-xl overflow-hidden flex flex-col text-left transition-all hover:scale-[1.02] hover:-translate-y-0.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
      style={{
        background: 'rgba(255,255,255,0.78)',
        border: '1px solid rgba(186,230,253,0.6)',
        boxShadow: '0 3px 14px rgba(14,165,233,0.10), inset 0 1px 0 rgba(255,255,255,0.95)',
      }}
    >
      {/* Banner */}
      <div
        className="relative flex items-center justify-center overflow-hidden shrink-0 px-4 w-full"
        style={{ height: 110, background: gradient }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 60%)' }}
        />
        <span
          className="absolute text-white/15 font-black font-mono select-none"
          style={{ fontSize: 96 }}
        >
          {initial}
        </span>
        <span
          className="relative z-10 text-white text-sm font-bold px-2 text-center leading-tight"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
        >
          {project.title}
        </span>

        {/* Badge venue (UIST 2026, etc.) */}
        {project.paperVenue && (
          <span
            className="absolute top-2 right-2 z-10 text-[10px] font-bold px-2 py-1 rounded-full text-violet-700 flex items-center gap-1"
            style={{
              background: 'rgba(255,255,255,0.92)',
              border: '1px solid rgba(167,139,250,0.5)',
              boxShadow: '0 1px 3px rgba(124,58,237,0.25)',
            }}
          >
            <FlaskConical size={10} /> {project.paperVenue}
          </span>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col gap-2 w-full">
        {project.subtitle && (
          <p className="text-[11px] text-blue-700/80 font-medium leading-snug">
            {project.subtitle}
          </p>
        )}

        <p className="text-xs text-sky-900/75 leading-relaxed line-clamp-3">
          {project.desc}
        </p>

        {project.tech.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {project.tech.slice(0, 5).map(t => (
              <span
                key={t}
                className="px-2 py-0.5 text-[10px] rounded-full font-medium"
                style={{ background: 'rgba(14,165,233,0.1)', color: '#0284c7', border: '1px solid rgba(14,165,233,0.2)' }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="text-[11px] text-sky-600 font-semibold mt-auto pt-1 flex items-center gap-1">
          Voir le détail <ExternalLink size={11} />
        </div>
      </div>
    </button>
  );
}

// ─── CuratedProjectDetail (vue détail à la place de la grille) ───────────────

function CuratedProjectDetail({
  project,
  onBack,
}: {
  project: typeof portfolio.projects[number];
  onBack: () => void;
}) {
  const [from, to] = PROJECT_GRADIENTS[project.color] ?? ['#0284c7', '#38bdf8'];
  const bannerGradient = `linear-gradient(135deg, ${from}, ${to})`;

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header avec retour */}
      <div className="aero-card border-b px-3 py-2.5 flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={onBack}
          aria-label="Retour à la liste des projets"
          title="Retour à la liste"
          className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-sky-700 rounded-md hover:bg-sky-100/70 active:bg-sky-200/70 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
        >
          <ArrowLeft size={16} />
          <span className="hidden sm:inline">Retour</span>
        </button>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-gray-800 text-sm truncate">{project.title}</div>
          {project.subtitle && (
            <div className="text-xs text-gray-500 truncate">{project.subtitle}</div>
          )}
        </div>
        {project.paperVenue && (
          <span
            className="text-[10px] font-bold px-2 py-1 rounded-full text-violet-700 flex items-center gap-1 shrink-0"
            style={{
              background: 'rgba(237,233,254,0.95)',
              border: '1px solid rgba(167,139,250,0.5)',
            }}
          >
            <FlaskConical size={10} /> {project.paperVenue}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Banner illustratif */}
        <div
          className="relative flex items-center justify-center overflow-hidden h-24 w-full"
          style={{ background: bannerGradient }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 60%)' }}
          />
          <span
            className="relative z-10 text-white text-base font-bold px-4 text-center"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
          >
            {project.title}
          </span>
        </div>

        <div className="p-5 flex flex-col gap-4">
          {/* Tags tech */}
          {project.tech.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {project.tech.map(t => (
                <span
                  key={t}
                  className="px-2 py-0.5 text-[11px] rounded-full font-medium"
                  style={{ background: 'rgba(14,165,233,0.1)', color: '#0284c7', border: '1px solid rgba(14,165,233,0.2)' }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Description courte */}
          <p className="text-sm text-sky-900/85 leading-relaxed">
            {project.desc}
          </p>

          {/* Métriques (si présentes) */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {project.metrics.map((m, i) => (
                <div
                  key={i}
                  className="rounded-lg p-2.5 text-center"
                  style={{ background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)' }}
                >
                  <div className="text-base font-bold text-sky-700">{m.value}</div>
                  <div className="text-[10px] text-sky-600 uppercase tracking-wide">{m.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Détails markdown */}
          {project.details && (
            <div className="prose prose-sm max-w-none text-gray-700 [&_h2]:text-base [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mt-4 [&_h2]:mb-2 [&_h2]:pb-1 [&_h2]:border-b [&_h2]:border-blue-100 [&_p]:text-sm [&_p]:leading-relaxed [&_p]:text-gray-600 [&_p]:mb-2 [&_ul]:my-2 [&_li]:text-sm [&_li]:text-gray-600 [&_li]:leading-relaxed [&_strong]:text-blue-700 [&_strong]:font-semibold">
              <ReactMarkdown>{project.details}</ReactMarkdown>
            </div>
          )}

          {/* Liens */}
          <div className="flex gap-2 flex-wrap pt-2 border-t border-blue-100">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white text-xs px-3 py-2 rounded-lg transition-all hover:opacity-90"
                style={{ background: 'linear-gradient(135deg,#0284c7,#38bdf8)', boxShadow: '0 2px 8px rgba(14,165,233,0.35)' }}
              >
                <Github size={12} /> Code GitHub
              </a>
            )}
            {project.demoUrl && project.demoUrl !== '#' && (
              <a
                href={project.demoUrl}
                target={project.demoUrl.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-sky-700 text-xs px-3 py-2 rounded-lg transition-all hover:bg-white/80"
                style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(125,211,252,0.5)' }}
              >
                <ExternalLink size={12} /> Démo live
              </a>
            )}
            {!project.githubUrl && !project.demoUrl && (
              <span className="text-[11px] text-sky-500/80 italic py-2">
                Pas de lien public, je peux vous montrer le projet en entretien.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── CuratedProjectsView (grille des projets curés) ──────────────────────────

const CuratedProjectsView = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const grouped = useMemo(() => {
    const map: Record<string, typeof portfolio.projects> = { star: [], secondary: [], archive: [] };
    for (const p of portfolio.projects) {
      const key = p.classement ?? 'secondary';
      if (!map[key]) map[key] = [];
      map[key].push(p);
    }
    return map;
  }, []);

  const selected = selectedId !== null
    ? portfolio.projects.find(p => p.id === selectedId) ?? null
    : null;

  if (selected) {
    return <CuratedProjectDetail project={selected} onBack={() => setSelectedId(null)} />;
  }

  return (
    <div className="h-full overflow-y-auto p-4">
      <div className="mb-4 flex items-start gap-2 px-1">
        <Sparkles size={16} className="text-violet-500 shrink-0 mt-0.5" />
        <p className="text-xs text-sky-700/80 leading-relaxed">
          Sélection commentée de mes projets, classés par signal pour un recrutement IA.
          Cliquez sur une fiche pour voir le détail (contexte, stack, ce que j&apos;y ai appris).
        </p>
      </div>

      {CLASSEMENT_ORDER.map(level => {
        const items = grouped[level];
        if (!items || items.length === 0) return null;
        return (
          <section key={level} className="mb-5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-sky-500 uppercase tracking-widest mb-3 px-1">
              {level === 'star' ? <Trophy size={12} className="text-violet-500" /> : <Code2 size={12} />}
              {CLASSEMENT_LABEL[level] ?? level}
              <span className="text-sky-300 normal-case font-medium">· {items.length}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {items.map(p => (
                <CuratedProjectCard
                  key={p.id}
                  project={p}
                  onSelect={() => setSelectedId(p.id)}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
};

// ─── ProjectsApp ─────────────────────────────────────────────────────────────

export const ProjectsApp = () => {
  return (
    <div className="h-full flex flex-col aero-app overflow-hidden">
      <div className="flex-1 overflow-hidden">
        <CuratedProjectsView />
      </div>
    </div>
  );
};
