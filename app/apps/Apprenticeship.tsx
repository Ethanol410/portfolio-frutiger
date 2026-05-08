'use client';

import React from 'react';
import {
  GraduationCap, Briefcase, MapPin, Calendar, Mail, FileText,
  ChevronRight, Sparkles, Target, Wallet, Globe2, FileSignature,
  FolderDown, Phone, ExternalLink, CheckCircle2, Building2, BookOpen,
  Hash,
} from 'lucide-react';
import { portfolio } from '@/app/data/portfolio';
import { APPRENTICESHIP } from '@/app/data/apprenticeship';
import { useOSStore } from '@/app/store/useOSStore';
import { ContactApp } from './Contact';
import { PDFViewerApp } from './PDFViewer';

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

const CARD_STYLE: React.CSSProperties = {
  background: 'rgba(255,255,255,0.85)',
  border: '1px solid rgba(186,230,253,0.55)',
  boxShadow: '0 2px 10px rgba(14,165,233,0.08)',
};

interface SectionProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  highlight?: boolean;
}

const Section = ({ icon, title, children, highlight }: SectionProps) => (
  <section
    className="rounded-2xl p-5"
    style={
      highlight
        ? {
            background: 'linear-gradient(160deg, rgba(220,252,231,0.95) 0%, rgba(187,247,208,0.85) 100%)',
            border: '1px solid rgba(34,197,94,0.45)',
            boxShadow: '0 4px 16px rgba(22,163,74,0.18), inset 0 1px 0 rgba(255,255,255,0.7)',
          }
        : CARD_STYLE
    }
  >
    <div className="flex items-center gap-2 mb-3">
      {icon}
      <h2 className="font-bold text-slate-800 text-sm">{title}</h2>
    </div>
    {children}
  </section>
);

const KeyStat = ({ value, label }: { value: string; label: string }) => (
  <div
    className="flex flex-col items-center justify-center px-3 py-2.5 rounded-xl flex-1 min-w-[110px]"
    style={{
      background: 'rgba(255,255,255,0.9)',
      border: '1px solid rgba(186,230,253,0.7)',
      boxShadow: '0 2px 6px rgba(14,165,233,0.1), inset 0 1px 0 rgba(255,255,255,0.9)',
    }}
  >
    <span className="text-base font-black text-sky-700 leading-tight">{value}</span>
    <span className="text-[10px] font-medium text-slate-500 text-center leading-tight mt-0.5">{label}</span>
  </div>
);

const docFromPath = (path: string) => path.split('/').pop() || 'document';

export const ApprenticeshipApp = () => {
  const { addWindow } = useOSStore();

  const openContact = () => {
    addWindow({
      id: 'contact',
      title: 'Me Contacter',
      icon: Mail,
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
      icon: FileText,
      component: <PDFViewerApp file="/cv_ethan_collin.pdf" />,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 200,
      defaultPosition: { x: 180, y: 50 },
      defaultSize: { width: 800, height: 660 },
    });
  };

  const openPdf = (file: string, title: string) => {
    addWindow({
      id: `doc-${file}`,
      title,
      icon: FileText,
      component: <PDFViewerApp file={file} />,
      isOpen: true,
      isMinimized: false,
      isMaximized: false,
      zIndex: 210,
      defaultPosition: { x: 200, y: 50 },
      defaultSize: { width: 820, height: 680 },
    });
  };

  const totalE1Days = APPRENTICESHIP.year1Schedule.length;

  return (
    <div
      className="h-full overflow-y-auto"
      style={{
        background: 'linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)',
      }}
    >
      <div className="px-6 py-6 flex flex-col gap-5">

        {/* ─── HERO ─── */}
        <header className="text-center">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-emerald-700 text-xs font-medium mb-3"
            style={{
              background: 'rgba(16,185,129,0.12)',
              border: '1px solid rgba(16,185,129,0.35)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {portfolio.availability.label}
          </div>
          <h1 className="text-2xl font-black text-slate-900 leading-tight">
            Recherche alternance ingénieur IA & Multimédia
          </h1>
          <p className="text-sm text-sky-700 font-medium mt-1">
            ENSSAT, 7 sept. 2026 → 6 sept. 2029, Lannion ou Dinan
          </p>

          <div className="flex flex-wrap gap-2 justify-center mt-4">
            <KeyStat value="36 mois" label="1800 h de formation" />
            <KeyStat value="≈ 50 / 50" label="école / entreprise" />
            <KeyStat value="750 €/an" label="coût employeur" />
          </div>
        </header>

        {/* ─── POURQUOI MON PROFIL ─── */}
        <Section
          icon={<Sparkles size={18} className="text-violet-500" />}
          title="Pourquoi mon profil"
        >
          <ul className="flex flex-col gap-2">
            {ARGUMENTS.map(a => (
              <li key={a} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                <span className="text-violet-500 shrink-0 mt-0.5">·</span>
                <span>{a}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ─── COMPÉTENCES IAM ACQUISES ─── */}
        <Section
          icon={<BookOpen size={18} className="text-violet-500" />}
          title="Ce que j'acquiers pendant le cycle (parcours IAM)"
        >
          <p className="text-[11px] text-slate-500 italic mb-2.5">
            Compétences officielles ENSSAT, parcours IA &amp; Multimédia, niveau visé en fin de cycle.
          </p>
          <ul className="flex flex-col gap-1.5">
            {APPRENTICESHIP.iamSkills.map(s => (
              <li
                key={s.label}
                className="flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg"
                style={{
                  background: 'rgba(241,245,249,0.7)',
                  border: '1px solid rgba(186,230,253,0.4)',
                }}
              >
                <span className="text-xs font-medium text-slate-700">{s.label}</span>
                <span
                  className="text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    background: s.level === 'Maîtrise pratique' ? 'rgba(124,58,237,0.12)' : 'rgba(14,165,233,0.12)',
                    color: s.level === 'Maîtrise pratique' ? '#6d28d9' : '#0369a1',
                  }}
                >
                  {s.level}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ─── MISSIONS RECHERCHÉES ─── */}
        <Section
          icon={<Target size={18} className="text-sky-500" />}
          title="Missions recherchées en entreprise"
        >
          <ul className="flex flex-col gap-2">
            {MISSIONS.map(m => (
              <li key={m} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                <ChevronRight size={14} className="text-sky-400 shrink-0 mt-0.5" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </Section>

        {/* ─── CALENDRIER OFFICIEL ─── */}
        <Section
          icon={<Calendar size={18} className="text-sky-500" />}
          title="Calendrier officiel 2026 → 2029, année 1"
        >
          <div className="flex items-stretch w-full rounded-lg overflow-hidden mb-3" style={{ height: 26 }}>
            {APPRENTICESHIP.year1Schedule.map((p, i) => (
              <div
                key={p.code}
                className="flex items-center justify-center text-[10px] font-bold text-white"
                style={{
                  flex: 1,
                  background: p.kind === 'school'
                    ? 'linear-gradient(180deg, #38bdf8 0%, #0284c7 100%)'
                    : 'linear-gradient(180deg, #34d399 0%, #059669 100%)',
                  borderRight: i < totalE1Days - 1 ? '1px solid rgba(255,255,255,0.4)' : 'none',
                }}
                title={`${p.code}, ${p.label}, du ${p.start} au ${p.end}`}
              >
                {p.code}
              </div>
            ))}
          </div>
          <ul className="flex flex-col gap-1 text-[11px] text-slate-700">
            {APPRENTICESHIP.year1Schedule.map(p => (
              <li key={p.code} className="flex items-start gap-2">
                <span
                  className="font-mono font-bold shrink-0 w-7"
                  style={{ color: p.kind === 'school' ? '#0284c7' : '#059669' }}
                >
                  {p.code}
                </span>
                <span className="text-slate-500 shrink-0 w-[170px]">{p.start} → {p.end}</span>
                <span className="font-medium">{p.label}</span>
              </li>
            ))}
          </ul>
          <p className="text-[11px] text-slate-500 italic mt-3">
            Les années 2 et 3 suivent le même rythme par blocs (pas une alternance hebdomadaire).
            La période internationale obligatoire de 9 à 12 semaines se positionne idéalement sur E3 année 1, E3 année 2, ou en mobilité académique S5.
          </p>
          <button
            onClick={() => openPdf('/alternance/calendrier-fisa-2026-2029.pdf', 'Calendrier alternance 2026-2029')}
            className="mt-3 text-xs font-semibold text-sky-700 hover:underline flex items-center gap-1"
          >
            <FileText size={12} /> Ouvrir le calendrier officiel PDF
          </button>
        </Section>

        {/* ─── COÛT EMPLOYEUR (highlight) ─── */}
        <Section
          icon={<Wallet size={18} className="text-emerald-600" />}
          title="Combien ça coûte à votre entreprise"
          highlight
        >
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-4xl font-black text-emerald-700 leading-none">750 €</span>
            <span className="text-sm font-semibold text-emerald-800">/ an</span>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            C&apos;est tout. Le coût total de la formation est de <strong>12 000 €/an</strong>, dont <strong>11 250 €</strong> pris en charge par votre <strong>OPCO</strong>, sans reste à charge supplémentaire (depuis le 1<sup>er</sup> juillet 2025).
          </p>
          <p className="text-xs text-slate-700 leading-relaxed mt-2">
            <strong>Salaire apprenti</strong> : selon barème légal (% du SMIC variable selon l&apos;âge et l&apos;année de contrat).
          </p>
          <p className="text-xs text-slate-700 leading-relaxed mt-2">
            <strong>Aides à l&apos;embauche d&apos;apprentis</strong> : votre OPCO et l&apos;URSSAF vous orientent sur les dispositifs en vigueur.
          </p>
          <div
            className="mt-3 p-3 rounded-lg text-[11px] text-slate-700 leading-relaxed"
            style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            <strong>Cas particulier, employeur public ou associatif</strong> non assujetti à la taxe d&apos;apprentissage : convention de financement directe avec l&apos;UIMM Bretagne.
            <br />Contact : <strong>{APPRENTICESHIP.publicEmployerContact.name}</strong>, {APPRENTICESHIP.publicEmployerContact.org}, <a href={`mailto:${APPRENTICESHIP.publicEmployerContact.email}`} className="text-sky-700 hover:underline">{APPRENTICESHIP.publicEmployerContact.email}</a>, {APPRENTICESHIP.publicEmployerContact.phone}.
          </div>
        </Section>

        {/* ─── PÉRIODE INTERNATIONALE ─── */}
        <Section
          icon={<Globe2 size={18} className="text-sky-500" />}
          title="Période internationale obligatoire"
        >
          <p className="text-xs text-slate-700 leading-relaxed mb-2">
            <strong>9 à 12 semaines à l&apos;étranger</strong> sur les 3 ans, exigées par la Commission des Titres d&apos;Ingénieurs.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
            <div className="rounded-lg p-3" style={{ background: 'rgba(241,245,249,0.7)', border: '1px solid rgba(186,230,253,0.4)' }}>
              <div className="text-[11px] font-bold text-slate-800 mb-1">Mise à disposition</div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Je reste votre salarié, en mission dans une filiale ou un partenaire à l&apos;étranger. Vous conservez la responsabilité contractuelle.
              </p>
            </div>
            <div className="rounded-lg p-3" style={{ background: 'rgba(241,245,249,0.7)', border: '1px solid rgba(186,230,253,0.4)' }}>
              <div className="text-[11px] font-bold text-slate-800 mb-1">Mise en veille</div>
              <p className="text-[11px] text-slate-600 leading-snug">
                Le contrat est suspendu pendant la mobilité (stage à l&apos;étranger ou semestre académique en université partenaire ENSSAT).
              </p>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 italic">
            Périodes recommandées : été A1→A2 ou A2→A3 (juillet-août), ou semestre 5 (sept. 2028 → fév. 2029). À choisir ensemble selon le contexte de l&apos;entreprise.
          </p>
        </Section>

        {/* ─── PROCESS DE SIGNATURE ─── */}
        <Section
          icon={<FileSignature size={18} className="text-sky-500" />}
          title="Process de signature en 5 étapes"
        >
          <ol className="flex flex-col gap-2">
            {APPRENTICESHIP.signatureSteps.map((step, i) => (
              <li key={step} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                <span
                  className="shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                  style={{ background: 'linear-gradient(135deg, #38bdf8, #0284c7)' }}
                >
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
          <div
            className="mt-3 p-3 rounded-lg"
            style={{ background: 'rgba(254,243,199,0.5)', border: '1px solid rgba(251,191,36,0.4)' }}
          >
            <div className="text-[11px] font-bold text-amber-900 mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 size={12} /> À ne pas oublier côté employeur
            </div>
            <ul className="flex flex-col gap-1">
              {APPRENTICESHIP.employerObligations.map(o => (
                <li key={o} className="flex items-start gap-1.5 text-[11px] text-amber-900 leading-snug">
                  <span className="shrink-0 mt-0.5">·</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ─── REPÈRES ADMINISTRATIFS (CERFA) ─── */}
        <Section
          icon={<Hash size={18} className="text-slate-500" />}
          title="Repères administratifs (utiles pour le CERFA)"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
            <div>
              <div className="font-bold text-slate-700">Diplôme visé</div>
              <div className="text-slate-600">{APPRENTICESHIP.diploma.label}</div>
            </div>
            <div>
              <div className="font-bold text-slate-700">Code RNCP / diplôme</div>
              <div className="text-slate-600 font-mono">{APPRENTICESHIP.diploma.rncp} / {APPRENTICESHIP.diploma.code}</div>
            </div>
            <div>
              <div className="font-bold text-slate-700">CFA responsable</div>
              <div className="text-slate-600">{APPRENTICESHIP.cfa.name}</div>
              <div className="text-slate-500">{APPRENTICESHIP.cfa.address}</div>
              <div className="text-slate-500 font-mono">SIRET {APPRENTICESHIP.cfa.siret} · UAI {APPRENTICESHIP.cfa.uai}</div>
            </div>
            <div>
              <div className="font-bold text-slate-700">Lieu de formation</div>
              <div className="text-slate-600">{APPRENTICESHIP.school.name}, {APPRENTICESHIP.school.parent}</div>
              <div className="text-slate-500">{APPRENTICESHIP.school.address}</div>
              <div className="text-slate-500 font-mono">SIRET {APPRENTICESHIP.school.siret} · UAI {APPRENTICESHIP.school.uai}</div>
            </div>
            <div>
              <div className="font-bold text-slate-700">Dates de contrat</div>
              <div className="text-slate-600">07/09/2026 → 06/09/2029</div>
            </div>
            <div>
              <div className="font-bold text-slate-700">Durée</div>
              <div className="text-slate-600">36 mois, 1800 heures de formation</div>
            </div>
          </div>
        </Section>

        {/* ─── PACK DE DOCUMENTS ─── */}
        <Section
          icon={<FolderDown size={18} className="text-violet-500" />}
          title="Pack de documents officiels"
        >
          <p className="text-[11px] text-slate-500 italic mb-2.5">
            Tout ce dont vous avez besoin pour étudier et monter le contrat. PDF cliquables ouverts dans le PDFViewer du portfolio, .doc et .docx en téléchargement direct.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {APPRENTICESHIP.documents.map(d => {
              const isPdf = d.kind === 'pdf';
              return isPdf ? (
                <button
                  key={d.id}
                  onClick={() => openPdf(d.file, d.label)}
                  className="flex items-start gap-2.5 p-2.5 rounded-lg text-left transition-all hover:brightness-105"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(186,230,253,0.6)',
                  }}
                >
                  <FileText size={14} className="text-rose-500 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold text-slate-800 leading-snug">{d.label}</div>
                    <div className="text-[10px] text-slate-500 font-mono truncate">{docFromPath(d.file)}</div>
                  </div>
                </button>
              ) : (
                <a
                  key={d.id}
                  href={d.file}
                  download
                  className="flex items-start gap-2.5 p-2.5 rounded-lg text-left transition-all hover:brightness-105"
                  style={{
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(186,230,253,0.6)',
                  }}
                >
                  <FileText size={14} className="text-blue-500 shrink-0 mt-0.5" />
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-semibold text-slate-800 leading-snug">{d.label}</div>
                    <div className="text-[10px] text-slate-500 font-mono truncate">{docFromPath(d.file)} (téléchargement)</div>
                  </div>
                </a>
              );
            })}
          </div>
          <div className="flex flex-wrap gap-3 mt-3 text-[11px]">
            <a
              href={APPRENTICESHIP.school.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-700 hover:underline flex items-center gap-1 font-semibold"
            >
              <ExternalLink size={11} /> Page formation ENSSAT
            </a>
            <a
              href={APPRENTICESHIP.school.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-700 hover:underline flex items-center gap-1 font-semibold"
            >
              <ExternalLink size={11} /> Wiki recherche terrain d&apos;apprentissage
            </a>
          </div>
        </Section>

        {/* ─── CONTACTS ─── */}
        <Section
          icon={<Building2 size={18} className="text-sky-500" />}
          title="Contacts officiels"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

            {/* Moi */}
            <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(186,230,253,0.5)' }}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-sky-700 mb-1.5">Moi</div>
              <div className="text-xs font-bold text-slate-800">{portfolio.fullName}</div>
              <div className="text-[11px] text-slate-600 mb-1.5">Candidat, {APPRENTICESHIP.school.track}</div>
              <a href={`mailto:${portfolio.email}`} className="flex items-center gap-1 text-[11px] text-sky-700 hover:underline">
                <Mail size={10} /> {portfolio.email}
              </a>
              <a href={`tel:${portfolio.phone.replace(/\s/g, '')}`} className="flex items-center gap-1 text-[11px] text-sky-700 hover:underline">
                <Phone size={10} /> {portfolio.phone}
              </a>
            </div>

            {/* ENSSAT */}
            <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(186,230,253,0.5)' }}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-sky-700 mb-1.5">ENSSAT, filière IAI</div>
              {APPRENTICESHIP.school.contacts.map(c => (
                <div key={c.email} className="mb-1.5 last:mb-0">
                  <div className="text-xs font-bold text-slate-800 leading-tight">{c.name}</div>
                  <div className="text-[10px] text-slate-500 leading-tight">{c.role}</div>
                  <a href={`mailto:${c.email}`} className="flex items-center gap-1 text-[10px] text-sky-700 hover:underline">
                    <Mail size={9} /> {c.email}
                  </a>
                </div>
              ))}
            </div>

            {/* CFAI / convention */}
            <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(186,230,253,0.5)' }}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-sky-700 mb-1.5">{APPRENTICESHIP.cfa.name}, convention</div>
              <a href={`mailto:${APPRENTICESHIP.cfa.contactEmail}`} className="flex items-center gap-1 text-[11px] text-sky-700 hover:underline">
                <Mail size={10} /> {APPRENTICESHIP.cfa.contactEmail}
              </a>
              <a href={`tel:${APPRENTICESHIP.cfa.contactPhone.replace(/\s/g, '')}`} className="flex items-center gap-1 text-[11px] text-sky-700 hover:underline">
                <Phone size={10} /> {APPRENTICESHIP.cfa.contactPhone}
              </a>
            </div>

            {/* UIMM employeur public */}
            <div className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(186,230,253,0.5)' }}>
              <div className="text-[10px] font-bold uppercase tracking-wider text-sky-700 mb-1.5">Employeur public ou asso</div>
              <div className="text-xs font-bold text-slate-800">{APPRENTICESHIP.publicEmployerContact.name}</div>
              <div className="text-[10px] text-slate-500 mb-1">{APPRENTICESHIP.publicEmployerContact.org}</div>
              <a href={`mailto:${APPRENTICESHIP.publicEmployerContact.email}`} className="flex items-center gap-1 text-[11px] text-sky-700 hover:underline">
                <Mail size={10} /> {APPRENTICESHIP.publicEmployerContact.email}
              </a>
              <a href={`tel:${APPRENTICESHIP.publicEmployerContact.phone.replace(/\s/g, '')}`} className="flex items-center gap-1 text-[11px] text-sky-700 hover:underline">
                <Phone size={10} /> {APPRENTICESHIP.publicEmployerContact.phone}
              </a>
            </div>

          </div>
        </Section>

        {/* ─── MOBILITÉ ─── */}
        <Section
          icon={<MapPin size={18} className="text-emerald-500" />}
          title="Zone géographique"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="flex items-start gap-2">
              <Briefcase size={13} className="text-sky-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-800">Périodes entreprise</div>
                <div className="text-slate-600">Présentiel chez vous, idéalement 1 h max de trajet depuis Lannion ou Dinan.</div>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <GraduationCap size={13} className="text-sky-500 shrink-0 mt-0.5" />
              <div>
                <div className="font-semibold text-slate-800">Périodes école</div>
                <div className="text-slate-600">ENSSAT, Lannion (22). Logement étudiant déjà prévu.</div>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── ACTIONS ─── */}
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
          <button
            onClick={() => openPdf('/alternance/notice-cfai-2026.pdf', 'Notice CFAI 2026 (CERFA)')}
            className="px-4 py-2 text-sm font-semibold rounded-full flex items-center gap-1.5 transition-all hover:brightness-105 active:scale-95"
            style={{
              background: 'rgba(255,255,255,0.85)',
              border: '1px solid rgba(124,58,237,0.4)',
              color: '#6d28d9',
              boxShadow: '0 2px 6px rgba(124,58,237,0.15)',
            }}
          >
            <FolderDown size={14} /> Notice CFAI (CERFA)
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
