'use client';

import { portfolio } from '@/app/data/portfolio';
import {
  CV_COMPETENCES,
  CV_EXPERIENCES,
  CV_INTERESTS,
  CV_LANGUAGES,
  CV_PROJECTS,
  CV_SOFT_SKILLS,
  DISTINCTIONS,
  FORMATIONS,
  stripUrl,
} from '../cv-data';

export default function CvPrintShort() {
  const p = portfolio;
  const starredProjects = CV_PROJECTS.filter(pr => pr.star);

  return (
    <div className="cv-root cv-short">
      {/* Toolbar (screen only) */}
      <div className="cv-toolbar no-print">
        <button type="button" onClick={() => window.print()}>Imprimer / PDF</button>
        <a href="/cv-print">Version 2 pages</a>
        <a href="/">Retour</a>
      </div>

      {/* ── SIDEBAR ────────────────────────────────────────────── */}
      <aside className="cv-sidebar">
        <div className="cv-photo-wrap">
          <img src={p.avatar} alt="Photo de profil" />
        </div>

        <h1 className="cv-name">{p.fullName.toUpperCase()}</h1>
        <p className="cv-name-title">{p.title}</p>

        <div className="cv-badge">
          <span className="cv-badge-text">Développeur orienté IA</span>
        </div>

        <div className="cv-sep" />

        <div className="cv-sidebar-heading">Contact</div>
        <div className="cv-contact-item">
          <span className="cv-contact-dot" />
          <a href={`mailto:${p.email}`}>{p.email}</a>
        </div>
        <div className="cv-contact-item">
          <span className="cv-contact-dot" />
          <span className="cv-contact-text">{p.phone}</span>
        </div>
        <div className="cv-contact-item">
          <span className="cv-contact-dot" />
          <span className="cv-contact-text">Dinan · Lannion (22)</span>
        </div>
        <div className="cv-contact-item">
          <span className="cv-contact-dot" />
          <a href={p.github}>{stripUrl(p.github)}</a>
        </div>
        <div className="cv-contact-item">
          <span className="cv-contact-dot" />
          <a href={p.linkedin}>{stripUrl(p.linkedin)}</a>
        </div>

        <div className="cv-sep" />

        <div className="cv-sidebar-heading">Soft Skills</div>
        <div className="cv-tags">
          {CV_SOFT_SKILLS.map((s) => (
            <span key={s} className="cv-tag">{s}</span>
          ))}
        </div>

        <div className="cv-sep" />

        <div className="cv-sidebar-heading">Compétences</div>
        {CV_COMPETENCES.map((c) => (
          <div key={c} className="cv-comp-item">
            <span className="cv-comp-dot" />
            {c}
          </div>
        ))}

        <div className="cv-sep" />

        <div className="cv-sidebar-heading">Langues</div>
        {CV_LANGUAGES.map((l) => (
          <div key={l.name} className="cv-lang-row">
            <span className="cv-lang-name">{l.name}</span>
            <span className="cv-lang-level">{l.level}</span>
          </div>
        ))}

        <div className="cv-sep" />

        <div className="cv-sidebar-heading">Intérêts</div>
        <div className="cv-tags">
          {CV_INTERESTS.map((i) => (
            <span key={i} className="cv-interest-tag">{i}</span>
          ))}
        </div>

        <div className="cv-sep" />

        <div className="cv-sidebar-heading">Distinctions</div>
        {DISTINCTIONS.slice(0, 3).map((d, i) => (
          <div key={i} className="cv-contact-item">
            <span className="cv-contact-dot" />
            <span className="cv-contact-text">{d}</span>
          </div>
        ))}
      </aside>

      {/* ── MAIN ───────────────────────────────────────────────── */}
      <main className="cv-main">
        <div className="cv-main-header">
          <div className="cv-main-target">{p.availability.label}</div>
          <div className="cv-main-sub">Cycle ingénieur ENSSAT IAM (IA &amp; Multimédia), 3 ans en alternance</div>
        </div>

        <div className="cv-main-content">

          {/* Expériences */}
          <section className="cv-section">
            <div className="cv-section-title">Expériences</div>
            {CV_EXPERIENCES.map((e, i) => (
              <div key={i} className="cv-exp-item">
                <div className={`cv-exp-period-badge${e.accent === 'green' ? ' green' : ''}`}>
                  {e.period}
                </div>
                <div className="cv-exp-title">{e.role}</div>
                <div className="cv-exp-company">{e.company}</div>
                <div className="cv-exp-row">
                  <span className="cv-exp-row-value">{e.missions}</span>
                </div>
                <div className="cv-exp-row">
                  <span className="cv-exp-row-label">Outils :</span>
                  <span className="cv-exp-row-value">{e.tools}</span>
                </div>
              </div>
            ))}
          </section>

          {/* Projets (starred only) */}
          <section className="cv-section">
            <div className="cv-section-title">Projets phares</div>
            <div className="cv-projects-grid">
              {starredProjects.map((proj, i) => (
                <div key={i} className="cv-proj-card star">
                  <div className="cv-proj-title">{proj.title}</div>
                  <div className="cv-proj-period">{proj.period}</div>
                  <div className="cv-proj-desc">{proj.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Formation */}
          <section className="cv-section">
            <div className="cv-section-title">Formation</div>
            {FORMATIONS.map((f, i) => (
              <div key={i} className="cv-formation-item">
                <div className="cv-formation-period">{f.period}</div>
                <div className="cv-formation-body">
                  <div className="cv-formation-title">{f.title}</div>
                  <div className="cv-formation-place">{f.place}</div>
                </div>
              </div>
            ))}
          </section>

        </div>
      </main>
    </div>
  );
}
