import React, { useState } from 'react';
import { BookOpen, FlaskConical, ChevronRight, ArrowLeft, ExternalLink } from 'lucide-react';

interface ResearchNote {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  tags: string[];
  content: string;
  link?: string;
}

const notes: ResearchNote[] = [
  {
    id: 'ui-drift',
    title: 'UI Drift',
    subtitle: 'Détection des instabilités LLM dans les interfaces web',
    date: '2025 — 2026',
    tags: ['IA', 'LLM', 'Interfaces', 'Recherche'],
    link: 'https://github.com/Ethanol410/site-drift',
    content: `## Problème

Quand on demande à un LLM de modifier une interface web, il ne se contente pas d'appliquer le changement demandé. Il introduit aussi des modifications non-sollicitées : restructurations de code, changements stylistiques, renommages, réorganisations. Ces "dérives" (drifts) s'accumulent et rendent le système instable.

## Question de recherche

Comment détecter, quantifier et visualiser ces dérives afin de redonner à l'utilisateur le contrôle sur les modifications apportées par un LLM ?

## Approche

- **Modélisation formelle** des dérives : structurelles, sémantiques, stylistiques
- **Métriques quantitatives** : score de dérive, surface impactée, écart par rapport à l'intention
- **Prototype fonctionnel** : outil de comparaison avant/après avec heatmap des zones modifiées
- **Interfaces de contrôle** : permettre à l'utilisateur de valider ou rejeter chaque dérive

## Ce que j'ai appris

Les LLMs ont un biais fort vers la "correction" perçue du code. Même sans demande explicite, ils reformatent, renomment et réorganisent. Ce comportement est documenté mais rarement mesuré. UI Drift essaie de le rendre visible.`,
  },
  {
    id: 'agentix',
    title: 'Agentix Canvas',
    subtitle: 'Brainstorming collaboratif avec orchestration multi-agents IA',
    date: '2025 — 2026',
    tags: ['Multi-agents', 'LLM', 'Collaboration', 'Temps réel'],
    link: 'https://github.com/Ethanol410/ProjetWorkshop',
    content: `## Vision

Créer un espace de brainstorming où plusieurs agents IA coopèrent pour aider un groupe à structurer ses idées, générer des plans d'action et explorer des pistes créatives — le tout en temps réel.

## L'assistant Isa

Isa est l'agent coordinateur d'Agentix Canvas. Il orchestre les autres agents spécialisés :
- **Agent Idées** : génère et développe des concepts à partir des mots-clés
- **Agent Critique** : identifie les failles et contradictions
- **Agent Structuration** : organise les idées en plan actionnable

## Architecture

- Interface canvas en temps réel (React, WebSockets)
- Orchestration multi-agents via appels LLM en parallèle
- Carte mentale générée automatiquement depuis les discussions
- Plans d'action exportables

## Défis rencontrés

La synchronisation des agents en temps réel est complexe : éviter les conflits de réponses, gérer les latences, maintenir la cohérence du contexte entre agents. On a résolu ça avec une file de messages et un état partagé côté serveur.`,
  },
  {
    id: 'modall',
    title: 'Modall',
    subtitle: 'Enceintes modulaires — Prix du campus Pépite 2025',
    date: '2025',
    tags: ['Design', 'Hardware', 'Entrepreneuriat', 'Prix Pépite'],
    content: `## Concept

Modall est un système d'enceintes modulaires conçu pour s'adapter à tous les espaces. Les modules s'assemblent magnétiquement et communiquent en Bluetooth mesh pour créer des configurations audio personnalisées.

## Prix du campus Pépite

Lauréat du concours Pépite à l'IUT de Lannion en 2025. Le jury a distingué l'approche modulaire, le design épuré et le potentiel commercial du projet dans les espaces de coworking et événementiels.

## Ma contribution

- Design produit et direction artistique
- Prototype fonctionnel (impression 3D + électronique)
- Pitch et présentation devant le jury
- Business plan et étude de marché

## Ce que j'ai appris

Aller au bout d'une idée jusqu'au stade prototype-présentable en quelques semaines. Convaincre des non-techniciens. Défendre un projet sous pression.`,
  },
];

export const ResearchApp = () => {
  const [selected, setSelected] = useState<ResearchNote | null>(null);

  if (selected) {
    return (
      <div className="h-full aero-app flex flex-col overflow-hidden">
        <div className="aero-card border-b px-4 py-3 flex items-center gap-3 shrink-0">
          <button onClick={() => setSelected(null)} className="text-gray-500 hover:text-gray-700 transition-colors">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-gray-800 text-sm truncate">{selected.title}</div>
            <div className="text-xs text-gray-500 truncate">{selected.subtitle}</div>
          </div>
          {selected.link && (
            <a href={selected.link} target="_blank" rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 transition-colors p-1"
              title="Voir sur GitHub"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <div className="flex gap-2 flex-wrap mb-4">
            {selected.tags.map(t => (
              <span key={t} className="px-2 py-0.5 bg-blue-50 text-blue-600 text-[11px] rounded-full border border-blue-100 font-medium">
                {t}
              </span>
            ))}
            <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-[11px] rounded-full border border-gray-200 ml-auto">
              {selected.date}
            </span>
          </div>

          <div className="prose prose-sm max-w-none text-gray-700">
            {selected.content.split('\n').map((line, i) => {
              if (line.startsWith('## ')) {
                return <h2 key={i} className="text-base font-bold text-gray-800 mt-5 mb-2 pb-1 border-b border-blue-100">{line.slice(3)}</h2>;
              }
              if (line.startsWith('- **')) {
                const match = line.match(/- \*\*(.+?)\*\* : (.+)/);
                if (match) return (
                  <div key={i} className="flex gap-2 text-sm mb-1 ml-3">
                    <span className="font-semibold text-blue-700 shrink-0">{match[1]} :</span>
                    <span className="text-gray-600">{match[2]}</span>
                  </div>
                );
              }
              if (line.startsWith('- ')) {
                return <div key={i} className="text-sm text-gray-600 mb-1 ml-3 flex gap-2"><span className="text-blue-400 shrink-0">·</span>{line.slice(2)}</div>;
              }
              if (line === '') return <div key={i} className="h-2" />;
              return <p key={i} className="text-sm text-gray-600 leading-relaxed mb-2">{line}</p>;
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full aero-app flex flex-col overflow-hidden">
      <div className="aero-card border-b px-4 py-3 flex items-center gap-2 shrink-0">
        <FlaskConical size={16} className="text-violet-500" />
        <span className="font-bold text-gray-800 text-sm">Recherche & Projets</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
        <p className="text-xs text-gray-500 px-1">Notes sur mes projets de recherche et initiatives personnelles.</p>

        {notes.map(note => (
          <button
            key={note.id}
            onClick={() => setSelected(note)}
            className="aero-card rounded-xl p-4 text-left hover:shadow-md transition-all group"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 mb-1">
                <BookOpen size={14} className="text-violet-500 shrink-0" />
                <span className="font-bold text-gray-800 text-sm">{note.title}</span>
              </div>
              <ChevronRight size={15} className="text-gray-400 group-hover:text-blue-500 transition-colors shrink-0 mt-0.5" />
            </div>
            <p className="text-xs text-gray-500 mb-2 ml-5">{note.subtitle}</p>
            <div className="flex gap-1.5 flex-wrap ml-5">
              {note.tags.slice(0, 3).map(t => (
                <span key={t} className="px-2 py-0.5 bg-violet-50 text-violet-600 text-[10px] rounded-full border border-violet-100">
                  {t}
                </span>
              ))}
              <span className="text-[10px] text-gray-400 ml-auto">{note.date}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
