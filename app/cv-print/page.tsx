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

      {/* ── SIDEBAR ────────────────────────────────────────────── */}
      <aside className="cv-sidebar">
        {/* Photo */}
        <div className="cv-photo-wrap">
          <img src={p.avatar} alt="Photo de profil" />
        </div>

        {/* Name + title */}
        <h1 className="cv-name">{p.fullName.toUpperCase()}</h1>
        <p className="cv-name-title">{p.title}</p>

        {/* Orientation badge */}
        <div className="cv-badge">
          <span className="cv-badge-text">Développeur orienté IA</span>
        </div>

        <div className="cv-sep" />

        {/* Contact */}
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

        {/* Soft skills */}
        <div className="cv-sidebar-heading">Soft Skills</div>
        <div className="cv-tags">
          {CV_SOFT_SKILLS.map((s) => (
            <span key={s} className="cv-tag">{s}</span>
          ))}
        </div>

        <div className="cv-sep" />

        {/* Compétences */}
        <div className="cv-sidebar-heading">Compétences</div>
        {CV_COMPETENCES.map((c) => (
          <div key={c} className="cv-comp-item">
            <span className="cv-comp-dot" />
            {c}
          </div>
        ))}

        <div className="cv-sep" />

        {/* Langues */}
        <div className="cv-sidebar-heading">Langues</div>
        {CV_LANGUAGES.map((l) => (
          <div key={l.name} className="cv-lang-row">
            <span className="cv-lang-name">{l.name}</span>
            <span className="cv-lang-level">{l.level}</span>
            {l.note && <span className="cv-lang-note">{l.note}</span>}
          </div>
        ))}

        <div className="cv-sep" />

        {/* Centres d'intérêt */}
        <div className="cv-sidebar-heading">Centres d'intérêt</div>
        <div className="cv-tags">
          {CV_INTERESTS.map((i) => (
            <span key={i} className="cv-interest-tag">{i}</span>
          ))}
        </div>

        <div className="cv-sep" />

        {/* Distinctions */}
        <div className="cv-sidebar-heading">Distinctions</div>
        {DISTINCTIONS.map((d, i) => (
          <div key={i} className="cv-contact-item">
            <span className="cv-contact-dot" />
            <span className="cv-contact-text">{d}</span>
          </div>
        ))}
      </aside>

      {/* ── MAIN ───────────────────────────────────────────────── */}
      <main className="cv-main">
        {/* Green header */}
        <div className="cv-main-header">
          <div className="cv-main-target">{p.availability.label}</div>
          <div className="cv-main-sub">Cycle ingénieur ENSSAT IAM (IA &amp; Multimédia), 3 ans en alternance</div>
          <div className="cv-main-location">aux alentours de Lannion ou Dinan</div>
        </div>

        {/* White content */}
        <div className="cv-main-content">

          {/* Expériences professionnelles */}
          <section className="cv-section">
            <div className="cv-section-title">Expériences Professionnelles</div>
            {CV_EXPERIENCES.map((e, i) => (
              <div key={i} className="cv-exp-item">
                <div className={`cv-exp-period-badge${e.accent === 'green' ? ' green' : ''}`}>
                  {e.period}
                </div>
                <div className="cv-exp-title">{e.role}</div>
                <div className="cv-exp-company">{e.company}</div>
                <div className="cv-exp-row">
                  <span className="cv-exp-row-label">Missions :</span>
                  <span className="cv-exp-row-value">{e.missions}</span>
                </div>
                <div className="cv-exp-row">
                  <span className="cv-exp-row-label">Outils :</span>
                  <span className="cv-exp-row-value">{e.tools}</span>
                </div>
                <div className="cv-exp-row">
                  <span className="cv-exp-row-label">Acquis :</span>
                  <span className="cv-exp-row-value">{e.learned}</span>
                </div>
              </div>
            ))}
          </section>

          {/* Projets */}
          <section className="cv-section">
            <div className="cv-section-title">Projets</div>
            <div className="cv-projects-grid">
              {CV_PROJECTS.map((proj, i) => (
                <div key={i} className={`cv-proj-card${proj.star ? ' star' : ''}`}>
                  <div className="cv-proj-title">{proj.title}</div>
                  <div className="cv-proj-period">{proj.sub} · {proj.period}</div>
                  <div className="cv-proj-desc">{proj.desc}</div>
                  <div className="cv-proj-tech">{proj.tech}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Formations */}
          <section className="cv-section">
            <div className="cv-section-title">Formations</div>
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

          {/* Engagement */}
          <section className="cv-section">
            <div className="cv-section-title">Engagement</div>
            {p.engagements.map((e, i) => (
              <div key={i} className="cv-exp-item">
                <div className="cv-exp-title">{e.title}</div>
                <div className="cv-exp-company">{e.role} · {e.period}</div>
                <div className="cv-exp-row">
                  <span className="cv-exp-row-value">{e.desc}</span>
                </div>
              </div>
            ))}
          </section>

        </div>
      </main>
    </div>
  );
}
