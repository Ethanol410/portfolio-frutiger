'use client';

import { portfolio } from '@/app/data/portfolio';

const stripUrl = (u: string) => u.replace(/^https?:\/\//, '');

const SKILL_LABELS: Record<string, string> = {
  ia:           'IA & ML',
  multimedia:   'Multimédia',
  web:          'Front / Web',
  backend:      'Backend',
  architecture: 'Architecture',
  devops:       'DevOps & tests',
};

const SKILL_ORDER = ['ia', 'multimedia', 'web', 'backend', 'architecture', 'devops'];

const FORMATIONS = [
  {
    title: 'Cycle ingénieur ENSSAT, option IAM (IA & Multimédia)',
    place: 'Lannion · Université de Rennes',
    period: 'Septembre 2026 (3 ans, alternance)',
  },
  {
    title: 'BUT MMI, parcours Développement Web et dispositifs interactifs',
    place: 'IUT de Lannion · Université de Rennes',
    period: '2023 à 2026 (BUT3 en cours)',
  },
  {
    title: 'Bac STMG, option Gestion Finance',
    place: 'Lycée Les Cordeliers, Dinan',
    period: '2022',
  },
];

const CV_PROJECTS = [
  {
    title: 'Recherche IA, soumission ACM UIST 2026',
    sub: 'IUT Lannion · Université de Rennes',
    period: '2025 à 2026',
    desc: 'Co-auteur d\'un projet de recherche couplant IA et interaction humain-machine, encadré par un chercheur de l\'IRISA. Article soumis à ACM UIST 2026, conférence A* en HCI.',
    tech: 'TypeScript · LLM · Recherche HCI · Évaluation utilisateur',
  },
  {
    title: 'Agentix Canvas',
    sub: 'Brainstorming collaboratif piloté par agents IA',
    period: '2025 à 2026',
    desc: 'Créateur. Canvas temps réel, orchestration de 3 agents IA spécialisés (Idées, Critique, Structuration) pilotés par un assistant Isa. Cartes mentales auto-générées.',
    tech: 'React · WebSockets · Multi-agents · Claude / Groq',
  },
  {
    title: 'Audio Investigation Game',
    sub: 'Forensique audio interactive, festival Crime & Science 2026',
    period: '2026',
    desc: 'Application immersive avec pipeline Web Audio natif (filtres biquad, FFT, A/B sans click) et pilotage WebHID d\'un Elgato Stream Deck+. Architecture data-driven, deux scénarios sur un seul moteur.',
    tech: 'React 18 · TS strict · Web Audio API · WebHID · Tone.js · PWA',
  },
  {
    title: 'Bot Telegram, Veille Claude Code',
    sub: 'Agrégateur multi-sources avec classification LLM',
    period: '2026',
    desc: 'Bot Python autonome qui scrape 10+ sources toutes les 8h, classifie la pertinence avec Gemini Flash, déduplique sur cache GitHub Gist, publie sur Telegram et Discord. Tourne sur GitHub Actions.',
    tech: 'Python 3.12 · Gemini Flash · GitHub Actions · Scrapling',
  },
  {
    title: 'MathQuest',
    sub: 'PWA d\'auto-formation aux mathématiques pour l\'IA',
    period: '2026',
    desc: 'Construit seul pour combler mes lacunes maths avant le cycle ingénieur. 4 modules dont un dédié IA / ML (gradient, tenseurs, rétropropagation). Persistance offline IndexedDB.',
    tech: 'Next.js 15 · React 19 · KaTeX · D3 · Zustand · Dexie · Vitest',
  },
  {
    title: 'EthanOS Portfolio · Frutiger',
    sub: 'Portfolio interactif en OS simulé avec assistant LLM',
    period: '2026',
    desc: 'OS Frutiger Aero / Vista jouable, 10+ apps. Assistant Ethan IA en streaming SSE (Groq + fallback Anthropic), parsing d\'actions inter-fenêtres pour piloter l\'UI depuis le LLM.',
    tech: 'Next.js 16 · React 19 · TypeScript · Zustand · Groq · Anthropic',
  },
  {
    title: 'Modall',
    sub: 'Enceintes audio modulaires, lauréat Pépite Campus 2024',
    period: '2024',
    desc: 'Concept hardware d\'enceintes modulaires (style Lego) monté avec deux étudiants de l\'ENSSAT en première année de BUT MMI. Lauréat Pépite Campus, Quimper, 12 mars 2024.',
    tech: 'Design produit · Hardware · Pitch · Business plan',
  },
];

const DISTINCTIONS = [
  'Lauréat Prix Pépite Campus 2024 (Modall, Quimper, 12 mars 2024)',
  'Co-auteur, soumission ACM UIST 2026 (résultats août 2026)',
  'Admis IMT Mines Alès, parcours Développement Logiciel (avril 2026)',
  'Admissible ENSSAT IAI-IAM, entretien le 29 avril 2026',
];

export default function CvPrintPage() {
  const p = portfolio;

  return (
    <div className="cv-root">
      {/* Toolbar (screen only) */}
      <div className="cv-toolbar no-print">
        <button type="button" onClick={() => window.print()}>Imprimer / PDF</button>
        <a href="/">Retour</a>
      </div>

      {/* ─── HEADER ───────────────────────────────────────────── */}
      <header className="cv-header">
        <div className="cv-header-left">
          <h1>{p.fullName}</h1>
          <div className="cv-title">{p.title}</div>
          <div className="cv-target">{p.availability.label}</div>
          <div className="cv-target" style={{ fontWeight: 400, color: '#475569', marginTop: '1mm' }}>
            Cycle ingénieur ENSSAT IAM (IA &amp; Multimédia), 3 ans en alternance
          </div>
        </div>
        <div className="cv-header-right">
          <div>{p.location}</div>
          <div><a href={`mailto:${p.email}`}>{p.email}</a></div>
          <div>{p.phone}</div>
          <div><a href={p.github}>{stripUrl(p.github)}</a></div>
          <div><a href={p.linkedin}>{stripUrl(p.linkedin)}</a></div>
        </div>
      </header>

      {/* ─── EXPÉRIENCE ───────────────────────────────────────── */}
      <section className="cv-section">
        <div className="cv-section-title">Expérience professionnelle</div>
        {p.experience.map((e, i) => (
          <div key={i} className="cv-item">
            <div className="cv-item-head">
              <div className="cv-item-title">{e.role}</div>
              <div className="cv-item-meta">{e.period}</div>
            </div>
            <div className="cv-item-sub">{e.company}</div>
            <div className="cv-item-desc">{e.desc}</div>
          </div>
        ))}
      </section>

      {/* ─── PROJETS ──────────────────────────────────────────── */}
      <section className="cv-section">
        <div className="cv-section-title">Projets</div>
        {CV_PROJECTS.map((proj, i) => (
          <div key={i} className="cv-item">
            <div className="cv-item-head">
              <div className="cv-item-title">{proj.title}</div>
              <div className="cv-item-meta">{proj.period}</div>
            </div>
            <div className="cv-item-sub">{proj.sub}</div>
            <div className="cv-item-desc">{proj.desc}</div>
            <div className="cv-item-tech">{proj.tech}</div>
          </div>
        ))}
      </section>

      {/* ─── FORMATION ────────────────────────────────────────── */}
      <section className="cv-section">
        <div className="cv-section-title">Formation</div>
        {FORMATIONS.map((f, i) => (
          <div key={i} className="cv-item">
            <div className="cv-item-head">
              <div className="cv-item-title">{f.title}</div>
              <div className="cv-item-meta">{f.period}</div>
            </div>
            <div className="cv-item-sub">{f.place}</div>
          </div>
        ))}
      </section>

      {/* ─── COMPÉTENCES ──────────────────────────────────────── */}
      <section className="cv-section">
        <div className="cv-section-title">Compétences techniques</div>
        {SKILL_ORDER.map((k) => {
          const list = p.skills[k];
          if (!list) return null;
          return (
            <div key={k} className="cv-skill-row">
              <div className="cv-skill-cat">{SKILL_LABELS[k]}</div>
              <div className="cv-skill-list">{list.join(' · ')}</div>
            </div>
          );
        })}
      </section>

      {/* ─── DISTINCTIONS + ENGAGEMENT (2 cols) ──────────────── */}
      <div className="cv-grid-2">
        <section className="cv-section">
          <div className="cv-section-title">Distinctions</div>
          {DISTINCTIONS.map((d, i) => (
            <div key={i} className="cv-bullet">{d}</div>
          ))}
        </section>

        <section className="cv-section">
          <div className="cv-section-title">Engagement</div>
          {p.engagements.map((e, i) => (
            <div key={i} className="cv-item">
              <div className="cv-item-title" style={{ fontSize: '10pt' }}>{e.title}</div>
              <div className="cv-item-sub">{e.role} · {e.period}</div>
              <div className="cv-item-desc">{e.desc}</div>
            </div>
          ))}
        </section>
      </div>

      {/* ─── SOFT SKILLS + LANGUES ──────────────────────────── */}
      <div className="cv-grid-2">
        <section className="cv-section">
          <div className="cv-section-title">Soft skills</div>
          <div className="cv-bullet">Autonomie sous pression — reprise solo de la plateforme prod</div>
          <div className="cv-bullet">Adaptation et lucidité — parcours non-linéaire, MathQuest comme remédiation maths</div>
          <div className="cv-bullet">Transmission — encadrement d'une nouvelle alternante, chef de projet BDE</div>
        </section>

        <section className="cv-section">
          <div className="cv-section-title">Langues &amp; intérêts</div>
          <div className="cv-bullet">Français, langue maternelle</div>
          <div className="cv-bullet">Anglais B1, lecture de littérature scientifique IA</div>
          <div className="cv-bullet">Musculation, nutrition, voyages, vidéo</div>
        </section>
      </div>
    </div>
  );
}
