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
    id: 'recherche-uist',
    title: 'Recherche IA, soumission ACM UIST 2026',
    subtitle: "Couplage IA et interaction humain-machine, IUT Lannion (Université de Rennes)",
    date: '2025 à 2026',
    tags: ['IA', 'Recherche HCI', 'LLM', 'UIST 2026'],
    content: `## Contexte

Projet de recherche mené à l'IUT de Lannion (Université de Rennes), couplant intelligence artificielle et interaction humain-machine. Encadré par un chercheur de l'IRISA. L'article a été soumis à la conférence ACM UIST 2026, l'une des conférences de référence en interaction humain-machine. Résultats d'évaluation attendus en août 2026.

## Pourquoi UIST

UIST (ACM Symposium on User Interface Software and Technology) rassemble chaque année les travaux de recherche les plus pointus sur les nouvelles façons de concevoir et de comprendre les interfaces. Y soumettre un papier en cycle de licence est rare.

## Mon rôle

Co-auteur. Contribution au prototype web et à l'instrumentation de l'évaluation utilisateur menée pour le papier.

## Ce que ça m'a appris

Travailler à plusieurs voix sur un objet de recherche où la rigueur formelle (modélisation, mesures, étude utilisateur) compte autant que la qualité d'exécution. Apprendre à itérer un prototype sous contrainte de calendrier de soumission. Tenir un standard d'écriture scientifique avec des chercheurs de l'IRISA.

## Pour en savoir plus

Le contenu précis de l'article est sous embargo jusqu'à la décision de comité (août 2026). Je peux en parler en entretien dans le cadre de mon travail réalisé.`,
  },
  {
    id: 'agentix',
    title: 'Agentix Canvas',
    subtitle: 'Brainstorming collaboratif avec orchestration multi-agents IA',
    date: '2025 à 2026',
    tags: ['Multi-agents', 'LLM', 'Collaboration', 'Temps réel'],
    link: 'https://github.com/Web-Interactive-Systems/project-agentic-canvas-Ethanol410',
    content: `## Vision

Créer un espace de brainstorming où plusieurs agents IA coopèrent pour aider un groupe à structurer ses idées, générer des plans d'action et explorer des pistes créatives, le tout en temps réel.

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
    id: 'ethanos-assistant',
    title: 'EthanOS Assistant',
    subtitle: "Assistant conversationnel intégré au portfolio (Groq + Anthropic)",
    date: '2026',
    tags: ['LLM', 'Streaming SSE', 'Architecture résiliente'],
    link: 'https://github.com/Ethanol410/portfolio-frutiger',
    content: `## L'idée

Embarquer un assistant conversationnel directement dans le portfolio, capable de présenter mon parcours et de déclencher l'ouverture des fenêtres de l'OS simulé (CV, projets, contact). Le chat n'est pas un gadget : il prouve que je sais intégrer un LLM dans une interface réelle, avec un comportement maîtrisé.

## Architecture

- Double provider : Groq (Llama 3.3) en principal, Anthropic Claude en fallback
- Streaming SSE côté API route Next.js
- Parsing d'actions inter-fenêtres au format \`[ACTION:open:AppName]\`
- Suggestions contextuelles basées sur l'historique de conversation
- Persistance localStorage de la conversation

## Ce que ça démontre

- Intégration LLM en prod (auth, streaming, gestion d'erreur, fallback)
- Composition d'un system prompt à partir des données du portfolio
- Pattern d'action déclenchée par le LLM pour piloter l'UI

Tu peux le tester en cliquant sur l'icône Ethan IA depuis le bureau.`,
  },
  {
    id: 'modall',
    title: 'Modall',
    subtitle: "Enceintes audio modulaires, Lauréat Pépite Campus 2024",
    date: '2024',
    tags: ['Entrepreneuriat', 'Design produit', 'Hardware', 'Pépite'],
    content: `## L'idée

Modall est un projet d'enceintes audio modulaires, pensées comme des Legos. L'utilisateur construit son enceinte selon ses besoins (taille, puissance, format) avec des modules interconnectables. Une enceinte qui grandit avec ses usages plutôt qu'un objet fini.

## Équipe

Projet collaboratif mené pendant ma première année de BUT MMI, en équipe avec **deux étudiants de l'ENSSAT**. C'est par cette collaboration que j'ai connu l'école et la qualité de leur formation, ce qui pèse aujourd'hui dans mon choix d'y candidater pour le cycle ingénieur.

## Mes contributions

- Design produit et direction artistique
- Prototype fonctionnel (impression 3D et électronique)
- Pitch et présentation devant le jury Pépite
- Business plan et étude de marché initiale

## Distinction

Lauréat du **Prix Pépite Campus** à Quimper, le **12 mars 2024**. Pépite récompense l'entrepreneuriat étudiant dans l'écosystème campus.

## Aujourd'hui

Le projet est en pause, nos parcours respectifs nous ont menés ailleurs. Mais l'expérience reste fondatrice : c'est là que j'ai compris que je voulais travailler dans des contextes pluridisciplinaires où le logiciel rencontre le matériel et le design.`,
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
        <p className="text-xs text-gray-500 px-1">Notes sur mes projets de recherche et mes initiatives en IA appliquée.</p>

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
