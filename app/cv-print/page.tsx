'use client';

import { portfolio } from '@/app/data/portfolio';
import {
  CV_PROJECTS,
  DISTINCTIONS,
  FORMATIONS,
  SKILL_LABELS,
  SKILL_ORDER,
  SOFT_SKILLS,
  stripUrl,
} from './cv-data';

export default function CvPrintLong() {
  const p = portfolio;

  return (
    <div className="cv-root cv-long">
      {/* Toolbar (screen only) */}
      <div className="cv-toolbar no-print">
        <button type="button" onClick={() => window.print()}>Imprimer / PDF</button>
        <a href="/cv-print/short">Version 1 page</a>
        <a href="/">Retour</a>
      </div>

      {/* HEADER */}
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

      {/* EXPÉRIENCE */}
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

      {/* PROJETS (tous) */}
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

      {/* FORMATION */}
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

      {/* COMPÉTENCES */}
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

      {/* DISTINCTIONS + ENGAGEMENT */}
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

      {/* SOFT SKILLS + LANGUES */}
      <div className="cv-grid-2">
        <section className="cv-section">
          <div className="cv-section-title">Soft skills</div>
          {SOFT_SKILLS.map((s, i) => (
            <div key={i} className="cv-bullet">{s}</div>
          ))}
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
