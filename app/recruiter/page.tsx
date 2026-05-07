import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { portfolio } from "@/app/data/portfolio";

export const metadata: Metadata = {
  title: `${portfolio.fullName}, mode recruteur`,
  description: portfolio.tagline,
  robots: { index: true, follow: true },
};

/* ─── Frutiger Aero colour constants ─── */
const AQ  = "#0096c7";
const AQD = "#0077b6";
const AQL = "#48cae4";

const GLASS: React.CSSProperties = {
  background: "rgba(255,255,255,0.48)",
  backdropFilter: "blur(18px) saturate(190%)",
  WebkitBackdropFilter: "blur(18px) saturate(190%)",
  border: "1px solid rgba(255,255,255,0.72)",
  boxShadow: "0 6px 32px rgba(0,100,180,0.13), 0 1px 3px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.92)",
};

const GLASS_CARD: React.CSSProperties = {
  ...GLASS,
  borderRadius: "14px",
};

const PROJECT_COLORS: Record<string, { accent: string }> = {
  "bg-violet-600":  { accent: "#7c3aed" },
  "bg-emerald-600": { accent: "#059669" },
  "bg-blue-500":    { accent: "#3b82f6" },
  "bg-fuchsia-600": { accent: "#c026d3" },
  "bg-orange-500":  { accent: "#f97316" },
  "bg-cyan-600":    { accent: "#0891b2" },
  "bg-rose-500":    { accent: "#f43f5e" },
  "bg-indigo-600":  { accent: "#4f46e5" },
  "bg-amber-500":   { accent: "#f59e0b" },
};

const SKILL_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  ia:           { bg: "rgba(0,119,182,.12)",  text: AQD,      border: "rgba(0,119,182,.35)"  },
  multimedia:   { bg: "rgba(8,145,178,.12)",  text: "#0e7490", border: "rgba(8,145,178,.35)" },
  web:          { bg: "rgba(72,202,228,.14)",  text: "#0077a8", border: "rgba(72,202,228,.4)" },
  backend:      { bg: "rgba(2,119,189,.12)",   text: "#015f7a", border: "rgba(2,119,189,.35)" },
  architecture: { bg: "rgba(0,150,199,.1)",    text: "#005f7a", border: "rgba(0,150,199,.3)"  },
  devops:       { bg: "rgba(100,160,190,.12)", text: "#1e4d6b", border: "rgba(100,160,190,.35)"},
  soft:         { bg: "rgba(14,165,233,.1)",   text: "#075985", border: "rgba(14,165,233,.3)" },
};

const SECTION_TITLES: Record<string, string> = {
  ia: "IA & Machine Learning",
  multimedia: "Multimédia",
  web: "Développement web",
  backend: "Backend & API",
  architecture: "Architecture & patterns",
  devops: "DevOps & outils",
  soft: "Soft skills",
};

const BIO_BLOCKS = [
  {
    num: "01",
    headline: "Concevoir sous contraintes réelles",
    text: "À 20 ans, reprise en solo de la plateforme e-commerce d'Ici Carte Grise (plusieurs milliers de transactions par mois, PHP 8, MySQL, API métier) après le départ du tuteur. Tenu en prod deux ans, tout en encadrant une nouvelle alternante.",
  },
  {
    num: "02",
    headline: "Recherche et publication",
    text: "Projet de recherche IA & interaction humain-machine à l'IUT MMI de Lannion, encadré par un chercheur de l'IRISA. Co-auteur d'un article soumis à ACM UIST 2026. Lauréat du Prix Pépite Campus 2024 pour Modall.",
  },
  {
    num: "03",
    headline: "Je transforme les constats en action",
    text: "Conscient d'un bagage maths à renforcer, j'ai construit MathQuest, une PWA d'auto-formation utilisée 15 min chaque soir. En septembre 2026, cycle ingénieur ENSSAT IAM en alternance à Lannion ou Dinan.",
  },
];

const NUNITO = "var(--font-nunito, 'Segoe UI', system-ui, sans-serif)";
const MONO   = "var(--font-geist-mono, ui-monospace, monospace)";

/* Bokeh orb definitions */
const BOKEH_ORBS = [
  { left: "8%",  top: "12%", w: 360, dur: "8s",   delay: "0s",   color: "rgba(72,202,228,.16)"  },
  { left: "80%", top: "8%",  w: 240, dur: "11s",  delay: "1.5s", color: "rgba(0,180,216,.12)"   },
  { left: "55%", top: "70%", w: 400, dur: "13s",  delay: "3s",   color: "rgba(100,220,180,.10)" },
  { left: "88%", top: "52%", w: 180, dur: "9s",   delay: "0.8s", color: "rgba(0,150,200,.14)"   },
  { left: "22%", top: "85%", w: 300, dur: "10s",  delay: "4s",   color: "rgba(48,210,220,.10)"  },
  { left: "3%",  top: "48%", w: 140, dur: "7s",   delay: "2s",   color: "rgba(160,220,255,.18)" },
  { left: "62%", top: "28%", w: 220, dur: "12s",  delay: "5s",   color: "rgba(0,120,200,.08)"   },
  { left: "40%", top: "3%",  w: 190, dur: "9.5s", delay: "1s",   color: "rgba(100,200,230,.13)" },
];

/* Rising bubble definitions */
const BUBBLES = [
  { left: "12%",  size: 28, dur: "18s",  delay: "0s"   },
  { left: "28%",  size: 18, dur: "24s",  delay: "4s"   },
  { left: "45%",  size: 34, dur: "21s",  delay: "7s"   },
  { left: "62%",  size: 22, dur: "19s",  delay: "2s"   },
  { left: "78%",  size: 14, dur: "26s",  delay: "9s"   },
  { left: "88%",  size: 30, dur: "22s",  delay: "5s"   },
  { left: "6%",   size: 20, dur: "28s",  delay: "12s"  },
  { left: "55%",  size: 16, dur: "20s",  delay: "16s"  },
];

/* Decorative 3D glossy orbs */
const GLOSS_ORBS = [
  {
    right: "3%", bottom: "18%", size: 52,
    colors: ["rgba(255,255,255,.85) 0%, rgba(255,255,255,.3) 22%, transparent 50%", "rgba(0,60,140,.18) 0%, transparent 44%", "#5cd0ea 0%, #0096c7 42%, #0077b6 68%, #023e8a 100%"],
    glow: "rgba(72,202,228,.5)",
  },
  {
    left: "1%", top: "38%", size: 36,
    colors: ["rgba(255,255,255,.80) 0%, rgba(255,255,255,.25) 20%, transparent 50%", "rgba(0,40,120,.15) 0%, transparent 40%", "#80d8ee 0%, #48cae4 40%, #0096c7 65%, #0077b6 100%"],
    glow: "rgba(100,210,235,.45)",
  },
];

export default function RecruiterPage() {
  const starProjects      = portfolio.projects.filter(p => p.classement === "star");
  const secondaryProjects = portfolio.projects.filter(p => p.classement === "secondary");

  return (
    <main
      className="fixed inset-0 overflow-y-auto overflow-x-hidden"
      style={{
        fontFamily: NUNITO,
        background: [
          "radial-gradient(ellipse 900px 700px at 50% -5%, rgba(255,255,255,0.72) 0%, transparent 55%)",
          /* aurora green */
          "radial-gradient(ellipse 600px 450px at 15% 65%, rgba(80,220,140,.07) 0%, transparent 65%)",
          /* aurora violet */
          "radial-gradient(ellipse 500px 380px at 88% 22%, rgba(160,100,220,.055) 0%, transparent 65%)",
          "radial-gradient(ellipse 400px 300px at 85% 90%, rgba(0,180,216,.18) 0%, transparent 60%)",
          "linear-gradient(170deg, #b8e8f5 0%, #caf0f8 28%, #ddf6ff 55%, #eef9ff 80%, #f5fbff 100%)",
        ].join(", "),
        WebkitOverflowScrolling: "touch",
      }}
    >
      <style>{`
        @keyframes r-up {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0);    }
        }
        .r-s { animation: r-up .5s cubic-bezier(.22,1,.36,1) both; }

        @keyframes bokeh-float {
          0%   { transform: translate(-50%,-50%) scale(1);    opacity: 1; }
          50%  { transform: translate(-50%,-50%) scale(1.08); opacity: 0.7; }
          100% { transform: translate(-50%,-50%) scale(1);    opacity: 1; }
        }

        @keyframes bubble-rise {
          0%   { transform: translateY(0)      scale(1);    opacity: 0; }
          5%   { opacity: 0.55; }
          85%  { opacity: 0.35; }
          100% { transform: translateY(-105vh) scale(0.75); opacity: 0; }
        }

        .btn-aqua {
          background:
            linear-gradient(180deg,
              rgba(255,255,255,.45) 0%,
              rgba(255,255,255,.05) 50%,
              rgba(0,80,140,.12)   100%
            ),
            linear-gradient(180deg, ${AQL} 0%, ${AQD} 100%);
          box-shadow:
            0 2px 18px rgba(0,119,182,.45),
            inset 0 1px 0 rgba(255,255,255,.65),
            inset 0 -1px 0 rgba(0,60,120,.15);
          color: #fff;
          font-weight: 700;
          border-radius: 999px;
          padding: .6rem 1.4rem;
          font-size: .875rem;
          transition: filter .15s;
          white-space: nowrap;
        }
        .btn-aqua:hover { filter: brightness(1.06); }

        .btn-glass {
          background: rgba(255,255,255,.45);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0,150,200,.45);
          color: ${AQD};
          font-weight: 600;
          border-radius: 999px;
          padding: .6rem 1.4rem;
          font-size: .875rem;
          transition: background .15s;
          white-space: nowrap;
        }
        .btn-glass:hover { background: rgba(255,255,255,.65); }
      `}</style>

      {/* ── BOKEH ORBS + BUBBLES + GLOSSY ORBS (fixed behind content) ── */}
      <div
        aria-hidden="true"
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}
      >
        {/* Bokeh soft blurs */}
        {BOKEH_ORBS.map((o, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: o.left,
              top: o.top,
              width: o.w,
              height: o.w,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${o.color} 0%, transparent 68%)`,
              transform: "translate(-50%, -50%)",
              animation: `bokeh-float ${o.dur} ${o.delay} ease-in-out infinite`,
            }}
          />
        ))}

        {/* Rising bubbles */}
        {BUBBLES.map((b, i) => (
          <div
            key={`b${i}`}
            style={{
              position: "absolute",
              left: b.left,
              bottom: "-60px",
              width: b.size,
              height: b.size,
              borderRadius: "50%",
              background: [
                "radial-gradient(circle at 35% 30%, rgba(255,255,255,.75) 0%, rgba(255,255,255,.2) 25%, transparent 52%)",
                "radial-gradient(circle at 60% 68%, rgba(0,100,180,.12) 0%, transparent 45%)",
                "radial-gradient(circle, rgba(200,240,255,.35) 0%, rgba(150,220,245,.15) 60%, transparent 100%)",
              ].join(", "),
              border: "1px solid rgba(255,255,255,.55)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,.6), 0 2px 6px rgba(0,100,180,.08)",
              animation: `bubble-rise ${b.dur} ${b.delay} ease-in infinite`,
            }}
          />
        ))}

        {/* 3D Glossy decorative orbs */}
        {GLOSS_ORBS.map((o, i) => (
          <div
            key={`g${i}`}
            style={{
              position: "absolute",
              ...(o.right ? { right: o.right } : { left: (o as { left: string }).left }),
              ...(o.bottom ? { bottom: o.bottom } : { top: (o as { top: string }).top }),
              width: o.size,
              height: o.size,
              borderRadius: "50%",
              background: [
                `radial-gradient(circle at 36% 30%, ${o.colors[0]})`,
                `radial-gradient(circle at 64% 70%, ${o.colors[1]})`,
                `radial-gradient(circle at 50% 50%, ${o.colors[2]})`,
              ].join(", "),
              boxShadow: `0 0 ${o.size * 0.6}px ${o.glow}, 0 4px 12px rgba(0,50,120,.2), inset 0 -2px 8px rgba(0,40,100,.15)`,
              animation: `bokeh-float ${14 + i * 3}s ${i * 2}s ease-in-out infinite`,
            }}
          />
        ))}

        {/* Swoosh / ribbon shapes Vista */}
        <svg
          aria-hidden="true"
          viewBox="0 0 1200 900"
          preserveAspectRatio="xMidYMid slice"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
        >
          <defs>
            <linearGradient id="sw1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="rgba(72,202,228,0)"   />
              <stop offset="30%"  stopColor="rgba(72,202,228,.16)" />
              <stop offset="65%"  stopColor="rgba(0,150,200,.12)"  />
              <stop offset="100%" stopColor="rgba(0,150,200,0)"    />
            </linearGradient>
            <linearGradient id="sw2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="rgba(100,220,200,0)"   />
              <stop offset="35%"  stopColor="rgba(100,220,200,.10)" />
              <stop offset="68%"  stopColor="rgba(72,200,220,.08)"  />
              <stop offset="100%" stopColor="rgba(72,200,220,0)"    />
            </linearGradient>
            <linearGradient id="sw3" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%"   stopColor="rgba(160,230,255,0)"   />
              <stop offset="40%"  stopColor="rgba(160,230,255,.09)" />
              <stop offset="75%"  stopColor="rgba(80,190,230,.07)"  />
              <stop offset="100%" stopColor="rgba(80,190,230,0)"    />
            </linearGradient>
          </defs>
          {/* Main swoosh : diagonale montante */}
          <path
            d="M-150,720 C100,590 320,360 640,235 C860,150 1060,162 1350,218 L1350,262 C1060,206 860,194 640,278 C320,403 100,633 -150,764 Z"
            fill="url(#sw1)"
          />
          {/* Secondary swoosh : haut */}
          <path
            d="M-150,185 C80,228 280,308 520,278 C720,252 940,168 1350,212 L1350,240 C940,196 720,280 520,306 C280,336 80,256 -150,213 Z"
            fill="url(#sw2)"
          />
          {/* Accent swoosh : milieu droit */}
          <path
            d="M650,820 C780,740 900,620 1100,520 C1200,468 1300,460 1350,462 L1350,488 C1300,486 1200,494 1100,546 C900,646 780,766 650,846 Z"
            fill="url(#sw3)"
          />
        </svg>
      </div>

      {/* ── Availability banner ── */}
      <div
        className="sticky top-0 z-40 w-full px-5 py-2.5 flex items-center justify-between gap-4"
        style={{
          background: "rgba(5,150,105,.88)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(255,255,255,.25)",
          boxShadow: "0 1px 8px rgba(0,100,60,.2), inset 0 1px 0 rgba(255,255,255,.25)",
        }}
      >
        <div className="flex items-center gap-2.5 text-white text-sm font-bold" style={{ fontFamily: NUNITO }}>
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          {portfolio.availability.label}
        </div>
        <Link href="/" className="text-xs font-semibold text-white/75 hover:text-white transition-colors">
          Portfolio OS ↗
        </Link>
      </div>

      <div
        className="mx-auto max-w-3xl px-5 py-10 flex flex-col gap-9"
        style={{ position: "relative", zIndex: 1 }}
      >

        {/* ── HERO ── */}
        <section className="r-s" style={{ animationDelay: "0ms" }}>
          <div
            className="rounded-2xl p-6"
            style={{
              ...GLASS,
              borderRadius: "20px",
              position: "relative",
              overflow: "hidden",
              boxShadow: "0 8px 40px rgba(0,100,180,.14), 0 1px 3px rgba(0,0,0,.06), inset 0 1px 0 rgba(255,255,255,.95), inset 0 -1px 0 rgba(0,100,180,.06)",
            }}
          >
            {/* Lens flare */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-40px",
                right: "50px",
                width: "220px",
                height: "220px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,.78) 0%, rgba(255,255,255,.22) 28%, transparent 68%)",
                pointerEvents: "none",
              }}
            />
            {/* Secondary smaller flare */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "20px",
                right: "180px",
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(255,255,255,.5) 0%, rgba(200,240,255,.2) 40%, transparent 70%)",
                pointerEvents: "none",
              }}
            />

            <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
              {/* Avatar with aqua ring + glow */}
              <div className="shrink-0 relative">
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    transform: "scale(1.2)",
                    background: `radial-gradient(circle, ${AQL}55 0%, transparent 70%)`,
                  }}
                />
                <div
                  className="relative rounded-full overflow-hidden"
                  style={{
                    boxShadow: `0 0 0 3px rgba(255,255,255,.9), 0 0 0 5px ${AQL}, 0 6px 24px rgba(0,150,200,.35)`,
                  }}
                >
                  <Image
                    src={portfolio.avatar}
                    alt={portfolio.fullName}
                    width={108}
                    height={108}
                    className="object-cover block"
                    priority
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h1
                  className="text-4xl leading-tight"
                  style={{ fontFamily: NUNITO, fontWeight: 900, color: "#012a4a", letterSpacing: "-.02em" }}
                >
                  {portfolio.fullName}
                </h1>
                <p className="text-base font-bold mt-1" style={{ color: AQ }}>
                  {portfolio.title}
                </p>
                <p className="text-sm font-medium text-slate-500 mt-0.5">{portfolio.subtitle}</p>
                <p className="text-xs mt-0.5 font-semibold text-slate-400" style={{ fontFamily: MONO }}>
                  {portfolio.location}
                </p>
              </div>
            </div>

            <p className="mt-5 text-[15px] leading-relaxed font-semibold" style={{ color: "#1e3a5f" }}>
              {portfolio.tagline}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a href="/cv_ethan_collin.pdf" download="cv_ethan_collin.pdf" className="btn-aqua">
                ↓ Télécharger le CV
              </a>
              <a href={`mailto:${portfolio.email}`} className="btn-glass">
                {portfolio.email}
              </a>
              <div className="flex items-center gap-3 text-sm font-semibold" style={{ color: AQD, fontFamily: MONO }}>
                <a href={portfolio.github} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">GitHub ↗</a>
                <span style={{ color: AQL }}>·</span>
                <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity">LinkedIn ↗</a>
                <span style={{ color: AQL }}>·</span>
                <a href={`tel:${portfolio.phone.replace(/\s/g, "")}`} className="hover:opacity-70 transition-opacity">{portfolio.phone}</a>
              </div>
            </div>
          </div>
        </section>

        {/* À PROPOS : 3 blocks */}
        <section className="r-s" style={{ animationDelay: "80ms" }}>
          <AeroLabel>À propos</AeroLabel>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {BIO_BLOCKS.map((b, i) => (
              <div key={b.num} style={GLASS_CARD} className="p-4 aero-dewdrop">
                <div
                  className="text-lg font-black mb-1.5"
                  style={{ color: i === 0 ? AQD : i === 1 ? "#7c3aed" : "#059669", fontFamily: MONO, lineHeight: 1 }}
                >
                  {b.num}
                </div>
                <h3 className="text-sm font-bold mb-2 leading-snug" style={{ color: "#012a4a" }}>
                  {b.headline}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: "#2d4a62" }}>{b.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── PROJETS PHARES ── */}
        <section className="r-s" style={{ animationDelay: "160ms" }}>
          <AeroLabel>Projets phares</AeroLabel>
          <div className="flex flex-col gap-3">
            {starProjects.map((p) => {
              const accent = PROJECT_COLORS[p.color]?.accent ?? AQ;
              return (
                <article
                  key={p.id}
                  className="aero-dewdrop"
                  style={{
                    ...GLASS_CARD,
                    borderLeft: `3px solid ${accent}`,
                    padding: "1.25rem 1.25rem 1.25rem 1rem",
                  }}
                >
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <h3 className="font-bold text-base leading-tight" style={{ color: "#012a4a" }}>{p.title}</h3>
                    {p.paperVenue && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0"
                        style={{
                          background: `${accent}18`,
                          color: accent,
                          border: `1px solid ${accent}35`,
                          fontFamily: MONO,
                        }}
                      >
                        {p.paperVenue}
                      </span>
                    )}
                  </div>
                  {p.subtitle && (
                    <p className="text-xs font-semibold mt-0.5" style={{ color: accent }}>{p.subtitle}</p>
                  )}
                  <p className="text-sm leading-relaxed mt-2" style={{ color: "#2d4a62" }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] rounded-full font-semibold"
                        style={{
                          background: "rgba(255,255,255,.6)",
                          color: accent,
                          border: `1px solid ${accent}30`,
                          backdropFilter: "blur(6px)",
                          fontFamily: MONO,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  {(p.githubUrl || (p.demoUrl && p.demoUrl !== "#")) && (
                    <div className="flex gap-3 mt-2.5 text-xs font-bold">
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2" style={{ color: accent }}>
                          Code GitHub ↗
                        </a>
                      )}
                      {p.demoUrl && p.demoUrl !== "#" && (
                        <a href={p.demoUrl} target={p.demoUrl.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hover:underline underline-offset-2" style={{ color: accent }}>
                          Démo ↗
                        </a>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* ── COMPÉTENCES ── */}
        <section className="r-s" style={{ animationDelay: "240ms" }}>
          <AeroLabel>Compétences</AeroLabel>
          <div style={GLASS_CARD} className="p-5 aero-dewdrop">
            <div className="flex flex-col gap-4">
              {Object.entries(portfolio.skills).map(([cat, items]) => {
                const c = SKILL_COLORS[cat] ?? SKILL_COLORS.devops;
                return (
                  <div key={cat}>
                    <div
                      className="text-[10px] font-bold uppercase tracking-[.13em] mb-2"
                      style={{ color: c.text, fontFamily: MONO }}
                    >
                      {SECTION_TITLES[cat] ?? cat}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {items.map((s) => (
                        <span
                          key={s}
                          className="px-2.5 py-1 text-xs rounded-full font-semibold"
                          style={{
                            background: c.bg,
                            color: c.text,
                            border: `1px solid ${c.border}`,
                            backdropFilter: "blur(8px)",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── PARCOURS ── */}
        <section className="r-s" style={{ animationDelay: "320ms" }}>
          <AeroLabel>Parcours</AeroLabel>
          <div style={GLASS_CARD} className="p-5 aero-dewdrop">
            <div className="flex flex-col divide-y" style={{ borderColor: "rgba(0,150,200,.12)" }}>
              {portfolio.experience.map((exp, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 ${i > 0 ? "pt-4" : ""} ${i < portfolio.experience.length - 1 ? "pb-4" : ""}`}
                >
                  <div
                    className="shrink-0 rounded-full mt-[7px]"
                    style={{ width: 7, height: 7, background: `linear-gradient(135deg, ${AQL}, ${AQD})`, boxShadow: `0 0 6px ${AQL}` }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm" style={{ color: "#012a4a" }}>{exp.role}</div>
                    <div className="text-xs font-bold mt-0.5" style={{ color: AQ, fontFamily: MONO }}>
                      {exp.company} · {exp.period}
                    </div>
                    <p className="text-xs leading-relaxed mt-1" style={{ color: "#2d4a62" }}>{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── RECOMMANDATIONS ── */}
        {portfolio.recommendations.length > 0 && (
          <section className="r-s" style={{ animationDelay: "400ms" }}>
            <AeroLabel>Recommandations</AeroLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {portfolio.recommendations.map((r, i) => (
                <blockquote key={i} style={GLASS_CARD} className="p-5 flex flex-col aero-dewdrop">
                  <div
                    className="leading-none mb-2 select-none"
                    style={{
                      fontSize: "3rem",
                      fontWeight: 900,
                      color: `${AQL}70`,
                      fontFamily: NUNITO,
                      lineHeight: "0.8",
                    }}
                  >
                    &ldquo;
                  </div>
                  <p className="text-sm leading-relaxed flex-1 italic" style={{ color: "#1e3a5f" }}>
                    {r.quote}
                  </p>
                  <footer className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(0,150,200,.18)" }}>
                    <span className="text-sm font-bold block" style={{ color: "#012a4a" }}>{r.name}</span>
                    <span className="text-xs font-medium" style={{ color: AQ }}>{r.role}</span>
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {/* ── DISTINCTIONS ── */}
        {portfolio.awards.length > 0 && (
          <section className="r-s" style={{ animationDelay: "480ms" }}>
            <AeroLabel>Distinctions</AeroLabel>
            {portfolio.awards.map((a, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 aero-dewdrop"
                style={{
                  ...GLASS_CARD,
                  background: "rgba(255,255,255,.52)",
                  border: "1px solid rgba(255,200,50,.4)",
                  boxShadow: "0 4px 20px rgba(200,160,0,.1), inset 0 1px 0 rgba(255,255,255,.9)",
                }}
              >
                <div className="shrink-0 mt-0.5"><Trophy size={24} style={{ color: "#c77c00" }} /></div>
                <div>
                  <div className="font-bold text-sm" style={{ color: "#012a4a" }}>
                    {a.title}
                    <span className="ml-2 text-xs font-semibold" style={{ color: "#c77c00", fontFamily: MONO }}>{a.year}</span>
                  </div>
                  <p className="text-xs leading-relaxed mt-1" style={{ color: "#2d4a62" }}>{a.desc}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* ── AUTRES PROJETS ── */}
        <section className="r-s" style={{ animationDelay: "560ms" }}>
          <AeroLabel>Autres projets</AeroLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {secondaryProjects.map((p) => {
              const accent = PROJECT_COLORS[p.color]?.accent ?? AQ;
              return (
                <article
                  key={p.id}
                  style={{ ...GLASS_CARD, borderTop: `3px solid ${accent}` }}
                  className="p-4 aero-dewdrop"
                >
                  <h3 className="font-bold text-sm" style={{ color: "#012a4a" }}>{p.title}</h3>
                  {p.subtitle && (
                    <p className="text-[11px] font-medium mt-0.5 leading-snug" style={{ color: "#5a8098" }}>{p.subtitle}</p>
                  )}
                  <p className="text-xs leading-relaxed mt-1.5" style={{ color: "#2d4a62" }}>{p.desc}</p>
                  <div className="flex flex-wrap gap-1 mt-2.5">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-1.5 py-0.5 text-[10px] rounded font-semibold"
                        style={{
                          background: "rgba(255,255,255,.55)",
                          color: accent,
                          backdropFilter: "blur(6px)",
                          fontFamily: MONO,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                    {p.tech.length > 4 && (
                      <span className="px-1.5 py-0.5 text-[10px] rounded font-semibold" style={{ background: "rgba(0,150,200,.1)", color: AQ, fontFamily: MONO }}>
                        +{p.tech.length - 4}
                      </span>
                    )}
                  </div>
                  {(p.githubUrl || (p.demoUrl && p.demoUrl !== "#")) && (
                    <div className="flex gap-3 mt-2.5 text-[11px] font-bold">
                      {p.githubUrl && (
                        <a href={p.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2" style={{ color: accent }}>GitHub ↗</a>
                      )}
                      {p.demoUrl && p.demoUrl !== "#" && (
                        <a href={p.demoUrl} target={p.demoUrl.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hover:underline underline-offset-2" style={{ color: accent }}>Démo ↗</a>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </section>

        {/* ── ENGAGEMENT ── */}
        {portfolio.engagements.length > 0 && (
          <section className="r-s" style={{ animationDelay: "640ms" }}>
            <AeroLabel>Engagement</AeroLabel>
            <div style={GLASS_CARD} className="p-5 aero-dewdrop">
              {portfolio.engagements.map((eng, i) => (
                <div key={i}>
                  <div className="font-bold text-sm" style={{ color: "#012a4a" }}>{eng.title}</div>
                  <div className="text-xs font-bold mt-0.5" style={{ color: "#059669", fontFamily: MONO }}>
                    {eng.role} · {eng.period}
                  </div>
                  <p className="text-xs leading-relaxed mt-1" style={{ color: "#2d4a62" }}>{eng.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── FOOTER ── */}
        <footer className="r-s pb-12 flex flex-col items-center gap-4" style={{ animationDelay: "720ms" }}>
          <div
            className="px-8 py-5 text-center aero-dewdrop"
            style={{
              ...GLASS_CARD,
              background: "rgba(0,150,200,.1)",
              border: `1px solid rgba(0,150,200,.3)`,
              boxShadow: `0 4px 20px rgba(0,100,180,.12), inset 0 1px 0 rgba(255,255,255,.8)`,
            }}
          >
            <p className="text-[10px] font-bold uppercase tracking-[.14em] mb-2" style={{ color: AQ, fontFamily: MONO }}>
              Contact direct
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
              <a href={`mailto:${portfolio.email}`} className="font-bold hover:underline underline-offset-2" style={{ color: AQD }}>
                {portfolio.email}
              </a>
              <span style={{ color: AQL }}>·</span>
              <a href={`tel:${portfolio.phone.replace(/\s/g, "")}`} className="font-bold hover:underline underline-offset-2" style={{ color: AQD }}>
                {portfolio.phone}
              </a>
            </div>
          </div>
          <p className="text-xs font-semibold text-center" style={{ color: "#5a8098" }}>
            Portfolio complet (EthanOS, OS simulé Frutiger Aero) :{" "}
            <Link href="/" className="hover:underline underline-offset-2" style={{ color: AQ }}>
              portfolio-frutiger.vercel.app
            </Link>
          </p>
        </footer>

      </div>
    </main>
  );
}

function AeroLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="text-[10px] font-bold uppercase tracking-[.16em] mb-3"
      style={{
        color: AQ,
        fontFamily: "var(--font-geist-mono, ui-monospace, monospace)",
        textShadow: "0 0 12px rgba(0,180,216,.3)",
      }}
    >
      {children}
    </h2>
  );
}

