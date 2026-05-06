import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { portfolio } from "@/app/data/portfolio";

export const metadata: Metadata = {
  title: `${portfolio.fullName}, mode recruteur`,
  description: portfolio.tagline,
  robots: { index: true, follow: true },
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

export default function RecruiterPage() {
  return (
    <main
      // Conteneur en position fixe sur toute la viewport, avec son propre
      // scroll vertical. Cette approche est immune au `overflow: hidden`
      // imposé sur html/body par globals.css (pour la simulation OS).
      className="fixed inset-0 overflow-y-auto overflow-x-hidden"
      style={{
        background: "linear-gradient(160deg, #f0f9ff 0%, #e0f2fe 50%, #f8fafc 100%)",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* Bandeau dispo, en haut, toujours visible */}
      <div
        className="sticky top-0 z-40 w-full px-6 py-2.5 flex items-center justify-between gap-4"
        style={{
          background: "rgba(16,185,129,0.92)",
          borderBottom: "1px solid rgba(16,185,129,0.55)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex items-center gap-2 text-white text-sm font-semibold">
          <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
          {portfolio.availability.label}
        </div>
        <Link
          href="/"
          className="text-xs text-white/90 hover:text-white underline-offset-2 hover:underline"
        >
          Voir la version OS interactive
        </Link>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10 flex flex-col gap-8">
        {/* Hero */}
        <header className="flex flex-col md:flex-row gap-6 items-start">
          <div className="shrink-0">
            <div
              className="rounded-full overflow-hidden border-4 border-white"
              style={{ boxShadow: "0 6px 24px rgba(80,150,220,0.25)" }}
            >
              <Image
                src={portfolio.avatar}
                alt={portfolio.fullName}
                width={120}
                height={120}
                className="object-cover"
                priority
              />
            </div>
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-black text-slate-900 leading-tight">
              {portfolio.fullName}
            </h1>
            <p className="text-lg text-sky-700 font-semibold mt-1">{portfolio.title}</p>
            <p className="text-sm text-slate-600 mt-1">{portfolio.subtitle}</p>
            <p className="text-sm text-slate-500 mt-1">{portfolio.location}</p>

            <p className="mt-4 text-[15px] text-slate-700 leading-relaxed">
              {portfolio.tagline}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href="/cv_ethan_collin.pdf"
                download="cv_ethan_collin.pdf"
                className="px-4 py-2 text-sm font-semibold text-white rounded-full"
                style={{
                  background: "linear-gradient(180deg, #1976d2 0%, #1254a0 100%)",
                  boxShadow: "0 3px 8px rgba(25,118,210,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                Télécharger mon CV
              </a>
              <a
                href="/cv_ethan_collin.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-semibold text-white rounded-full"
                style={{
                  background: "linear-gradient(180deg, #0891b2 0%, #0e7490 100%)",
                  boxShadow: "0 3px 8px rgba(14,116,144,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                Voir le CV
              </a>
              <a
                href={`mailto:${portfolio.email}`}
                className="px-4 py-2 text-sm font-semibold text-white rounded-full"
                style={{
                  background: "linear-gradient(180deg, #16a34a 0%, #15803d 100%)",
                  boxShadow: "0 3px 8px rgba(22,163,74,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                {portfolio.email}
              </a>
              <a
                href={portfolio.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-semibold text-slate-800 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.92)",
                  border: "1px solid rgba(150,200,255,0.6)",
                  boxShadow: "0 2px 6px rgba(80,150,220,0.1)",
                }}
              >
                GitHub
              </a>
              <a
                href={portfolio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm font-semibold text-white rounded-full"
                style={{
                  background: "linear-gradient(180deg, #2563eb 0%, #1d4ed8 100%)",
                  boxShadow: "0 3px 8px rgba(29,78,216,0.3), inset 0 1px 0 rgba(255,255,255,0.3)",
                }}
              >
                LinkedIn
              </a>
            </div>
          </div>
        </header>

        {/* Bio */}
        <section
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(186,230,253,0.55)",
            boxShadow: "0 2px 10px rgba(14,165,233,0.08)",
          }}
        >
          <h2 className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-3">À propos</h2>
          <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {portfolio.bio}
          </p>
        </section>

        {/* Projets phares */}
        <section
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(186,230,253,0.55)",
            boxShadow: "0 2px 10px rgba(14,165,233,0.08)",
          }}
        >
          <h2 className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-4">Projets phares</h2>
          <div className="flex flex-col gap-5">
            {portfolio.projects
              .filter(p => p.classement === "star")
              .map(p => (
                <article key={p.id} className="border-l-2 border-violet-300 pl-4">
                  <h3 className="font-bold text-slate-900 text-base">{p.title}</h3>
                  {p.subtitle && (
                    <p className="text-xs text-violet-700 font-medium mt-0.5">{p.subtitle}</p>
                  )}
                  {p.paperVenue && (
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full text-violet-700 bg-violet-50 border border-violet-200">
                      {p.paperVenue}
                    </span>
                  )}
                  <p className="text-sm text-slate-700 leading-relaxed mt-2">{p.desc}</p>
                  <div className="flex gap-1.5 flex-wrap mt-2">
                    {p.tech.map(t => (
                      <span
                        key={t}
                        className="px-2 py-0.5 text-[10px] rounded-full font-medium bg-sky-50 text-sky-700 border border-sky-100"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-3 mt-2 text-xs">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:text-sky-800 underline-offset-2 hover:underline"
                      >
                        Code GitHub
                      </a>
                    )}
                    {p.demoUrl && p.demoUrl !== "#" && (
                      <a
                        href={p.demoUrl}
                        target={p.demoUrl.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:text-sky-800 underline-offset-2 hover:underline"
                      >
                        Démo
                      </a>
                    )}
                  </div>
                </article>
              ))}
          </div>
        </section>

        {/* Autres projets */}
        <section
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(186,230,253,0.55)",
            boxShadow: "0 2px 10px rgba(14,165,233,0.08)",
          }}
        >
          <h2 className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-4">Autres projets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portfolio.projects
              .filter(p => p.classement === "secondary")
              .map(p => (
                <article key={p.id}>
                  <h3 className="font-semibold text-slate-900 text-sm">{p.title}</h3>
                  {p.subtitle && (
                    <p className="text-[11px] text-slate-500 mt-0.5">{p.subtitle}</p>
                  )}
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{p.desc}</p>
                  <div className="flex gap-2 mt-2 text-[11px]">
                    {p.githubUrl && (
                      <a
                        href={p.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:underline"
                      >
                        GitHub
                      </a>
                    )}
                    {p.demoUrl && p.demoUrl !== "#" && (
                      <a
                        href={p.demoUrl}
                        target={p.demoUrl.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="text-sky-600 hover:underline"
                      >
                        Démo
                      </a>
                    )}
                  </div>
                </article>
              ))}
          </div>
        </section>

        {/* Expérience */}
        <section
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(186,230,253,0.55)",
            boxShadow: "0 2px 10px rgba(14,165,233,0.08)",
          }}
        >
          <h2 className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-4">Parcours</h2>
          <div className="flex flex-col gap-4">
            {portfolio.experience.map((exp, i) => (
              <div key={i}>
                <div className="font-semibold text-slate-900 text-sm">{exp.role}</div>
                <div className="text-xs text-sky-700 font-medium">
                  {exp.company} · {exp.period}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mt-1">{exp.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Compétences */}
        <section
          className="rounded-2xl p-6"
          style={{
            background: "rgba(255,255,255,0.85)",
            border: "1px solid rgba(186,230,253,0.55)",
            boxShadow: "0 2px 10px rgba(14,165,233,0.08)",
          }}
        >
          <h2 className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-4">Compétences</h2>
          <div className="flex flex-col gap-3">
            {Object.entries(portfolio.skills).map(([category, items]) => (
              <div key={category}>
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                  {SECTION_TITLES[category] ?? category}
                </div>
                <ul className="text-xs text-slate-700 leading-relaxed list-disc list-inside">
                  {items.map(s => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Engagement / Vie associative */}
        {portfolio.engagements.length > 0 && (
          <section
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(186,230,253,0.55)",
              boxShadow: "0 2px 10px rgba(14,165,233,0.08)",
            }}
          >
            <h2 className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-3">Engagement</h2>
            <div className="flex flex-col gap-3">
              {portfolio.engagements.map((eng, i) => (
                <div key={i}>
                  <div className="font-semibold text-slate-900 text-sm">{eng.title}</div>
                  <div className="text-xs text-emerald-700 font-medium">
                    {eng.role} · {eng.period}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed mt-1">{eng.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Distinctions */}
        {portfolio.awards.length > 0 && (
          <section
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(186,230,253,0.55)",
              boxShadow: "0 2px 10px rgba(14,165,233,0.08)",
            }}
          >
            <h2 className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-3">Distinctions</h2>
            <div className="flex flex-col gap-3">
              {portfolio.awards.map((a, i) => (
                <div key={i}>
                  <div className="font-semibold text-slate-900 text-sm">
                    {a.title} <span className="text-yellow-600 font-normal text-xs">· {a.year}</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-0.5">{a.desc}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Recommandations (extraits courts) */}
        {portfolio.recommendations.length > 0 && (
          <section
            className="rounded-2xl p-6"
            style={{
              background: "rgba(255,255,255,0.85)",
              border: "1px solid rgba(186,230,253,0.55)",
              boxShadow: "0 2px 10px rgba(14,165,233,0.08)",
            }}
          >
            <h2 className="text-xs font-bold text-sky-600 uppercase tracking-widest mb-3">Recommandations</h2>
            <div className="flex flex-col gap-3">
              {portfolio.recommendations.map((r, i) => (
                <blockquote key={i} className="border-l-2 border-sky-200 pl-3">
                  <p className="text-xs text-slate-700 italic leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
                  <footer className="mt-1 text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">{r.name}</span>, {r.role}
                  </footer>
                </blockquote>
              ))}
            </div>
          </section>
        )}

        {/* Contact final */}
        <section className="text-center text-xs text-slate-500 mt-4 mb-12">
          <p>
            Contact direct :{" "}
            <a href={`mailto:${portfolio.email}`} className="text-sky-700 hover:underline">
              {portfolio.email}
            </a>
            {" · "}
            <a href={`tel:${portfolio.phone.replace(/\s/g, "")}`} className="text-sky-700 hover:underline">
              {portfolio.phone}
            </a>
          </p>
          <p className="mt-2 text-slate-400">
            Vous lisez la version plate. La version interactive est sur{" "}
            <Link href="/" className="text-sky-700 hover:underline">
              portfolio-frutiger.vercel.app
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
