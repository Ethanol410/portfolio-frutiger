'use client';

import { portfolio } from '@/app/data/portfolio';
import {
  CV_PROJECTS,
  DISTINCTIONS,
  FORMATIONS,
  SKILL_LABELS,
  SKILL_ORDER,
  stripUrl,
} from '../cv-data';

export default function CvPrintShort() {
  const p = portfolio;
  const projects = CV_PROJECTS.filter(pr => pr.star);

  return (
    <div className="cv-root cv-short">
      {/* Toolbar (screen only) */}
      <div className="cv-toolbar no-print">
        <button type="button" onClick={() => window.print()}>Imprimer / PDF</button>
        <a href="/cv-print">Version 2 pages</a>
        <a href="/">Retour</a>
      </div>

      {/* HEADER, plus compact */}
      <header className="cv-header cv-header-compact">
        <div className="cv-header-left">
          <h1>{p.fullName}</h1>
          <div className="cv-title">{p.title}</div>
          <div className="cv-target">{p.availability.label}</div>
        </div>
        <div className="cv-header-right">
          <div>{p.location}</div>
          <div><a href={`mailto:${p.email}`}>{p.email}</a></div>
          <div>{p.phone}</div>
          <div><a href={p.github}>{stripUrl(p.github)}</a> · <a href={p.linkedin}>{stripUrl(p.linkedin)}</a></div>
        </div>
      </header>

      {/* EXPÉRIENCE compactée */}
      <section className="cv-section">
        <div className="cv-section-title">Expérience</div>
        {p.experience.map((e, i) => (
          <div key={i} className="cv-item cv-item-compact">
            <div className="cv-item-head">
              <div className="cv-item-title">
                {e.role} <span className="cv-item-company">· {e.company}</span>
              </div>
              <div className="cv-item-meta">{e.period}</div>
            </div>
            <div className="cv-item-desc">{e.desc}</div>
          </div>
        ))}
      </section>

      {/* PROJETS, version courte avec étoiles uniquement, sans tech */}
      <section className="cv-section">
        <div className="cv-section-title">Projets</div>
        {projects.map((proj, i) => (
          <div key={i} className="cv-item cv-item-compact">
            <div className="cv-item-head">
              <div className="cv-item-title">
                {proj.title} <span className="cv-item-company">· {proj.sub}</span>
              </div>
              <div className="cv-item-meta">{proj.period}</div>
            </div>
            <div className="cv-item-desc">{proj.desc}</div>
          </div>
        ))}
      </section>

      {/* FORMATION compactée, single line par item */}
      <section className="cv-section">
        <div className="cv-section-title">Formation</div>
        {FORMATIONS.map((f, i) => (
          <div key={i} className="cv-item cv-item-compact">
            <div className="cv-item-head">
              <div className="cv-item-title">
                {f.title} <span className="cv-item-company">· {f.place}</span>
              </div>
              <div className="cv-item-meta">{f.period}</div>
            </div>
          </div>
        ))}
      </section>

      {/* COMPÉTENCES + DISTINCTIONS sur 2 col */}
      <div className="cv-grid-2">
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

        <section className="cv-section">
          <div className="cv-section-title">Distinctions</div>
          {DISTINCTIONS.map((d, i) => (
            <div key={i} className="cv-bullet">{d}</div>
          ))}
          <div className="cv-section-title" style={{ marginTop: '3mm' }}>Engagement &amp; langues</div>
          <div className="cv-bullet">Chef de projet BDE IUT Lannion (2024 à 2026)</div>
          <div className="cv-bullet">Français langue maternelle, anglais B1</div>
        </section>
      </div>
    </div>
  );
}
