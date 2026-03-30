'use client';

import React, { useEffect, useState, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Github, ExternalLink, Star, GitFork, RefreshCw,
  Search, Pin, BookOpen, X, ArrowUpDown, Folder,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stars: number;
  forks: number;
  url: string;
  homepage: string | null;
  updatedAt: string;
  topics: string[];
}

type SortKey = 'updated' | 'stars' | 'name';

// ─── Config ───────────────────────────────────────────────────────────────────

const PINNED = ['portfolio-frutiger', 'weight-tracker-mvp', 'poc-interface-audio'];

// Frutiger Aero palette — vibrant aqua/sky/teal/emerald gradients
const GRADIENT_PAIRS: [string, string][] = [
  ['#0284c7', '#38bdf8'],
  ['#0891b2', '#22d3ee'],
  ['#059669', '#34d399'],
  ['#7c3aed', '#a78bfa'],
  ['#0ea5e9', '#67e8f9'],
  ['#0d9488', '#2dd4bf'],
  ['#2563eb', '#7dd3fc'],
  ['#6d28d9', '#818cf8'],
  ['#0369a1', '#38bdf8'],
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3b82f6',
  JavaScript: '#eab308',
  Python: '#22c55e',
  PHP: '#a855f7',
  Dart: '#06b6d4',
  'C#': '#6366f1',
  HTML: '#f97316',
  CSS: '#ec4899',
  Rust: '#ea580c',
  Go: '#06b6d4',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGradient(name: string): string {
  let hash = 0;
  for (const c of name) hash = ((hash * 31) + c.charCodeAt(0)) | 0;
  const [from, to] = GRADIENT_PAIRS[Math.abs(hash) % GRADIENT_PAIRS.length];
  return `linear-gradient(135deg, ${from}, ${to})`;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ─── StatsBar ─────────────────────────────────────────────────────────────────

function StatsBar({ repos, onRefresh }: { repos: GithubRepo[]; onRefresh: () => void }) {
  const totalStars = repos.reduce((s, r) => s + r.stars, 0);

  const langMap: Record<string, number> = {};
  for (const r of repos) {
    if (r.language) langMap[r.language] = (langMap[r.language] ?? 0) + 1;
  }
  const langs = Object.entries(langMap).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const total = langs.reduce((s, [, n]) => s + n, 0);

  return (
    <div
      className="px-5 py-3 flex items-center gap-6 flex-wrap shrink-0 border-b"
      style={{
        background: 'linear-gradient(90deg, rgba(14,165,233,0.18) 0%, rgba(6,182,212,0.12) 100%)',
        backdropFilter: 'blur(8px)',
        borderColor: 'rgba(125,211,252,0.35)',
      }}
    >
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm" style={{ background: 'linear-gradient(135deg,#0ea5e9,#38bdf8)' }}>
          <Folder size={15} className="text-white" />
        </div>
        <div>
          <div className="text-[10px] text-sky-600 uppercase tracking-wider font-semibold">Repos</div>
          <div className="font-bold text-lg leading-none mt-0.5 text-sky-900">{repos.length}</div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center shadow-sm" style={{ background: 'linear-gradient(135deg,#f59e0b,#fbbf24)' }}>
          <Star size={15} className="text-white" />
        </div>
        <div>
          <div className="text-[10px] text-sky-600 uppercase tracking-wider font-semibold">Stars</div>
          <div className="font-bold text-lg leading-none mt-0.5 text-sky-900">{totalStars}</div>
        </div>
      </div>

      {langs.length > 0 && (
        <div className="flex-1 min-w-[160px]">
          <div className="text-[10px] text-sky-600 uppercase tracking-wider font-semibold mb-1.5">Langages</div>
          <div className="flex rounded-full overflow-hidden h-2 gap-px">
            {langs.map(([lang, count]) => (
              <div
                key={lang}
                style={{ flex: count, background: LANG_COLORS[lang] ?? '#64748b' }}
                title={`${lang}: ${Math.round((count / total) * 100)}%`}
              />
            ))}
          </div>
          <div className="flex gap-3 mt-1.5 flex-wrap">
            {langs.map(([lang]) => (
              <span key={lang} className="text-[10px] text-sky-700 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full inline-block" style={{ background: LANG_COLORS[lang] ?? '#64748b' }} />
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onRefresh}
        className="ml-auto text-sky-400 hover:text-sky-600 transition-colors p-1.5 rounded-lg hover:bg-white/40"
        title="Rafraîchir"
      >
        <RefreshCw size={15} />
      </button>
    </div>
  );
}

// ─── FiltersBar ───────────────────────────────────────────────────────────────

interface FiltersBarProps {
  search: string;
  onSearch: (v: string) => void;
  sort: SortKey;
  onSort: (v: SortKey) => void;
  langs: string[];
  activeLang: string | null;
  onLang: (l: string | null) => void;
}

function FiltersBar({ search, onSearch, sort, onSort, langs, activeLang, onLang }: FiltersBarProps) {
  const sortLabels: Record<SortKey, string> = { updated: 'Date ↓', stars: 'Stars ↓', name: 'A → Z' };

  return (
    <div
      className="px-4 py-3 flex flex-col gap-2.5 shrink-0 border-b"
      style={{
        background: 'rgba(255,255,255,0.55)',
        backdropFilter: 'blur(12px)',
        borderColor: 'rgba(186,230,253,0.5)',
      }}
    >
      <div className="flex gap-2.5 items-center">
        <div
          className="flex-1 flex items-center gap-2.5 px-3 py-2 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(125,211,252,0.4)', boxShadow: '0 1px 4px rgba(14,165,233,0.08)' }}
        >
          <Search size={14} className="text-sky-400 shrink-0" />
          <input
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Rechercher un repo..."
            className="flex-1 bg-transparent text-sm outline-none text-sky-900 placeholder:text-sky-300"
          />
        </div>
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(125,211,252,0.4)', boxShadow: '0 1px 4px rgba(14,165,233,0.08)' }}
        >
          <ArrowUpDown size={13} className="text-sky-400 shrink-0" />
          <select
            value={sort}
            onChange={e => onSort(e.target.value as SortKey)}
            className="bg-transparent outline-none text-sm text-sky-700 cursor-pointer"
          >
            {(['updated', 'stars', 'name'] as SortKey[]).map(k => (
              <option key={k} value={k}>{sortLabels[k]}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => onLang(null)}
          className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
          style={
            activeLang === null
              ? { background: 'linear-gradient(135deg,#0ea5e9,#38bdf8)', color: '#fff', boxShadow: '0 2px 8px rgba(14,165,233,0.35)' }
              : { background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(125,211,252,0.4)', color: '#0284c7' }
          }
        >
          Tous
        </button>
        {langs.map(l => (
          <button
            key={l}
            onClick={() => onLang(l === activeLang ? null : l)}
            className="px-3 py-1 rounded-full text-xs font-semibold transition-all"
            style={
              activeLang === l
                ? { background: LANG_COLORS[l] ?? '#38bdf8', color: '#fff', boxShadow: `0 2px 8px ${LANG_COLORS[l] ?? '#38bdf8'}55` }
                : { background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(125,211,252,0.4)', color: '#0284c7' }
            }
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── RepoCard ─────────────────────────────────────────────────────────────────

function RepoCard({ repo, pinned, onClick }: { repo: GithubRepo; pinned?: boolean; onClick: () => void }) {
  const gradient = getGradient(repo.name);
  const initial = repo.name[0].toUpperCase();

  return (
    <div
      onClick={onClick}
      className="rounded-xl overflow-hidden cursor-pointer flex flex-col transition-all hover:scale-[1.02] hover:-translate-y-0.5"
      style={{
        background: 'rgba(255,255,255,0.72)',
        border: '1px solid rgba(186,230,253,0.55)',
        boxShadow: '0 2px 10px rgba(14,165,233,0.09), inset 0 1px 0 rgba(255,255,255,0.9)',
      }}
    >
      {/* Banner */}
      <div
        className="relative flex items-center justify-center overflow-hidden shrink-0"
        style={{ height: pinned ? 110 : 80, background: gradient }}
      >
        {/* Shine overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.22) 0%, transparent 60%)' }}
        />
        <span
          className="absolute text-white/15 font-black font-mono select-none"
          style={{ fontSize: pinned ? 96 : 68 }}
        >
          {initial}
        </span>
        <span
          className="relative z-10 text-white text-xs font-bold px-4 text-center"
          style={{ textShadow: '0 1px 4px rgba(0,0,0,0.3)' }}
        >
          {repo.name}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col gap-2">
        <p className="text-xs text-sky-800/70 line-clamp-2 leading-relaxed">
          {repo.description ?? <span className="italic text-sky-300">Pas de description</span>}
        </p>

        {repo.topics.length > 0 && (
          <div className="flex gap-1.5 flex-wrap">
            {repo.topics.slice(0, 3).map(t => (
              <span
                key={t}
                className="px-2 py-0.5 text-[10px] rounded-full font-medium"
                style={{ background: 'rgba(14,165,233,0.1)', color: '#0284c7', border: '1px solid rgba(14,165,233,0.2)' }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-3 text-[11px] text-sky-600/70 mt-auto">
          {repo.language && (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ background: LANG_COLORS[repo.language] ?? '#94a3b8' }} />
              {repo.language}
            </span>
          )}
          {repo.stars > 0 && (
            <span className="flex items-center gap-1">
              <Star size={11} /> {repo.stars}
            </span>
          )}
          {repo.forks > 0 && (
            <span className="flex items-center gap-1">
              <GitFork size={11} /> {repo.forks}
            </span>
          )}
          <span className="ml-auto text-[10px]">{formatDate(repo.updatedAt)}</span>
        </div>

        <div className="flex gap-2 mt-1">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1.5 text-white text-xs py-2 rounded-lg transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#0284c7,#38bdf8)', boxShadow: '0 2px 8px rgba(14,165,233,0.35)' }}
          >
            <Github size={12} /> Code
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1.5 text-sky-600 text-xs py-2 rounded-lg transition-all hover:bg-white/80"
              style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(125,211,252,0.5)' }}
            >
              <ExternalLink size={12} /> Demo
            </a>
          )}
          <button
            onClick={e => { e.stopPropagation(); onClick(); }}
            className="flex items-center justify-center px-3 rounded-lg transition-all hover:bg-white/80"
            style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(125,211,252,0.5)', color: '#0284c7' }}
            title="Voir le README"
          >
            <BookOpen size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── ReadmePanel ──────────────────────────────────────────────────────────────

function ReadmePanel({ repo, onClose }: { repo: GithubRepo; onClose: () => void }) {
  const [content, setContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setContent(null);
    fetch(`/api/github/readme?repo=${repo.name}`)
      .then(r => (r.ok ? r.json() : null))
      .then(data => setContent(data?.content ?? null))
      .finally(() => setLoading(false));
  }, [repo.name]);

  return (
    <div
      className="absolute inset-0 md:left-auto md:w-1/2 flex flex-col z-10 shadow-2xl"
      style={{ background: 'linear-gradient(160deg,#f0f7ff,#e8f4fd)', borderLeft: '1px solid rgba(125,211,252,0.4)' }}
    >
      <div
        className="flex items-center gap-2 px-4 py-3 shrink-0"
        style={{
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid rgba(186,230,253,0.5)',
        }}
      >
        <BookOpen size={15} className="text-sky-500" />
        <span className="text-sm font-semibold text-sky-800 flex-1 truncate">{repo.name}</span>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 hover:text-sky-600 transition-colors p-1.5 rounded-lg hover:bg-white/50"
          title="Ouvrir sur GitHub"
        >
          <Github size={15} />
        </a>
        <button
          onClick={onClose}
          className="text-sky-400 hover:text-sky-600 transition-colors p-1.5 rounded-lg hover:bg-white/50"
        >
          <X size={15} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-5 text-sm text-sky-900 leading-relaxed prose prose-sm max-w-none">
        {loading && (
          <div className="flex items-center gap-2 text-sky-400 mt-4">
            <RefreshCw size={14} className="animate-spin" />
            <span>Chargement du README...</span>
          </div>
        )}
        {!loading && content === null && (
          <p className="text-sky-400 italic mt-4">Pas de README pour ce repo.</p>
        )}
        {!loading && content && (
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-lg font-bold mb-3 mt-4 text-sky-900">{children}</h1>,
              h2: ({ children }) => <h2 className="text-base font-bold mb-2 mt-4 text-sky-800">{children}</h2>,
              h3: ({ children }) => <h3 className="text-sm font-bold mb-1.5 mt-3 text-sky-700">{children}</h3>,
              p: ({ children }) => <p className="mb-3 leading-relaxed text-sky-900/80">{children}</p>,
              code: ({ children }) => (
                <code className="bg-sky-50 border border-sky-100 px-1.5 py-0.5 rounded font-mono text-xs text-sky-700">{children}</code>
              ),
              pre: ({ children }) => (
                <pre className="bg-sky-50 border border-sky-100 p-3 rounded-lg text-xs overflow-x-auto mb-3">{children}</pre>
              ),
              ul: ({ children }) => <ul className="list-disc ml-5 mb-3 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal ml-5 mb-3 space-y-1">{children}</ol>,
              li: ({ children }) => <li className="text-sm text-sky-900/80">{children}</li>,
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-sky-500 underline hover:text-sky-700">
                  {children}
                </a>
              ),
              img: () => null,
            }}
          >
            {content}
          </ReactMarkdown>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export const ProjectsApp = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortKey>('updated');
  const [activeLang, setActiveLang] = useState<string | null>(null);
  const [selectedRepo, setSelectedRepo] = useState<GithubRepo | null>(null);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/github');
      if (!res.ok) throw new Error('Erreur');
      setRepos(await res.json());
    } catch {
      setError('Impossible de charger les dépôts GitHub.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRepos(); }, []);

  const langs = useMemo(() => {
    const set = new Set(repos.map(r => r.language).filter(Boolean) as string[]);
    return [...set].sort();
  }, [repos]);

  const pinned = useMemo(
    () => PINNED.map(n => repos.find(r => r.name === n)).filter(Boolean) as GithubRepo[],
    [repos]
  );

  const filtered = useMemo(() => {
    let list = repos.filter(r => !PINNED.includes(r.name));
    if (search) list = list.filter(r => r.name.toLowerCase().includes(search.toLowerCase()));
    if (activeLang) list = list.filter(r => r.language === activeLang);
    if (sort === 'updated') return [...list].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
    if (sort === 'stars') return [...list].sort((a, b) => b.stars - a.stars);
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [repos, search, activeLang, sort]);

  if (loading) {
    return (
      <div className="h-full aero-app flex items-center justify-center">
        <div className="text-center text-sky-400">
          <Github size={32} className="mx-auto mb-2 animate-pulse" />
          <p className="text-sm">Chargement des projets GitHub...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full aero-app flex items-center justify-center">
        <div className="text-center text-sky-600">
          <p className="text-sm mb-3">{error}</p>
          <button
            onClick={fetchRepos}
            className="flex items-center gap-2 mx-auto px-4 py-2 text-white text-xs rounded-lg transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg,#0284c7,#38bdf8)', boxShadow: '0 2px 8px rgba(14,165,233,0.35)' }}
          >
            <RefreshCw size={12} /> Réessayer
          </button>
        </div>
      </div>
    );
  }

  const showPinned = pinned.length > 0 && !search && !activeLang;

  return (
    <div className="h-full flex flex-col aero-app overflow-hidden">
      <StatsBar repos={repos} onRefresh={fetchRepos} />
      <FiltersBar
        search={search}
        onSearch={setSearch}
        sort={sort}
        onSort={setSort}
        langs={langs}
        activeLang={activeLang}
        onLang={setActiveLang}
      />

      <div className="flex-1 relative overflow-hidden">
        <div className={`h-full overflow-y-auto p-4 transition-all ${selectedRepo ? 'hidden md:block md:pr-[52%]' : ''}`}>

          {showPinned && (
            <section className="mb-5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-sky-500 uppercase tracking-widest mb-3">
                <Pin size={12} /> Projets mis en avant
              </div>
              <div className="grid grid-cols-2 gap-3">
                {pinned.map(r => (
                  <RepoCard key={r.id} repo={r} pinned onClick={() => setSelectedRepo(r)} />
                ))}
              </div>
            </section>
          )}

          {filtered.length > 0 ? (
            <section>
              {showPinned && (
                <div className="text-xs font-bold text-sky-500 uppercase tracking-widest mb-3">
                  Tous les repos · {filtered.length}
                </div>
              )}
              <div className="grid grid-cols-2 gap-3">
                {filtered.map(r => (
                  <RepoCard key={r.id} repo={r} onClick={() => setSelectedRepo(r)} />
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center text-sky-400 py-10">
              <Search size={22} className="mx-auto mb-2 opacity-40" />
              <p className="text-xs">Aucun repo trouvé</p>
            </div>
          )}
        </div>

        {selectedRepo && (
          <ReadmePanel repo={selectedRepo} onClose={() => setSelectedRepo(null)} />
        )}
      </div>
    </div>
  );
};
