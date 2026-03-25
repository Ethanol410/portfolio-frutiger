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

const GRADIENT_PAIRS: [string, string][] = [
  ['#0f172a', '#3b82f6'],
  ['#052e16', '#16a34a'],
  ['#2e1065', '#7c3aed'],
  ['#431407', '#ea580c'],
  ['#4a044e', '#db2777'],
  ['#083344', '#06b6d4'],
  ['#1c1917', '#d97706'],
  ['#1e1b4b', '#6366f1'],
  ['#0c0a09', '#ef4444'],
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
    <div className="bg-slate-800 text-slate-100 px-4 py-2 flex items-center gap-5 flex-wrap text-xs shrink-0">
      <div className="flex items-center gap-2">
        <Folder size={14} className="text-slate-400" />
        <div>
          <div className="text-[9px] text-slate-400 uppercase tracking-wider">Repos</div>
          <div className="font-bold text-sm leading-none mt-0.5">{repos.length}</div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Star size={14} className="text-yellow-400" />
        <div>
          <div className="text-[9px] text-slate-400 uppercase tracking-wider">Stars</div>
          <div className="font-bold text-sm leading-none mt-0.5">{totalStars}</div>
        </div>
      </div>

      {langs.length > 0 && (
        <div className="flex-1 min-w-[140px]">
          <div className="text-[9px] text-slate-400 uppercase tracking-wider mb-1">Langages</div>
          <div className="flex rounded overflow-hidden h-1.5 gap-px">
            {langs.map(([lang, count]) => (
              <div
                key={lang}
                style={{ flex: count, background: LANG_COLORS[lang] ?? '#64748b' }}
                title={`${lang}: ${Math.round((count / total) * 100)}%`}
              />
            ))}
          </div>
          <div className="flex gap-3 mt-1 flex-wrap">
            {langs.map(([lang]) => (
              <span key={lang} className="text-[9px] text-slate-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: LANG_COLORS[lang] ?? '#64748b' }} />
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onRefresh}
        className="ml-auto text-slate-400 hover:text-slate-200 transition-colors p-1 rounded"
        title="Rafraîchir"
      >
        <RefreshCw size={13} />
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
    <div className="bg-white border-b border-gray-200 px-3 py-2 flex flex-col gap-2 shrink-0">
      <div className="flex gap-2 items-center">
        <div className="flex-1 flex items-center gap-2 border border-gray-200 rounded-md px-2.5 py-1.5 bg-gray-50">
          <Search size={12} className="text-gray-400 shrink-0" />
          <input
            value={search}
            onChange={e => onSearch(e.target.value)}
            placeholder="Rechercher un repo..."
            className="flex-1 bg-transparent text-xs outline-none text-gray-700 placeholder:text-gray-400"
          />
        </div>
        <div className="flex items-center gap-1.5 border border-gray-200 rounded-md px-2.5 py-1.5 bg-gray-50">
          <ArrowUpDown size={11} className="text-gray-400 shrink-0" />
          <select
            value={sort}
            onChange={e => onSort(e.target.value as SortKey)}
            className="bg-transparent outline-none text-xs text-gray-600 cursor-pointer"
          >
            {(['updated', 'stars', 'name'] as SortKey[]).map(k => (
              <option key={k} value={k}>{sortLabels[k]}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        <button
          onClick={() => onLang(null)}
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
            activeLang === null
              ? 'bg-slate-800 text-white'
              : 'border border-gray-200 text-gray-500 hover:border-gray-400'
          }`}
        >
          Tous
        </button>
        {langs.map(l => (
          <button
            key={l}
            onClick={() => onLang(l === activeLang ? null : l)}
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-medium transition-colors ${
              activeLang === l ? 'text-white' : 'border border-gray-200 text-gray-500 hover:border-gray-400'
            }`}
            style={activeLang === l ? { background: LANG_COLORS[l] ?? '#64748b' } : {}}
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
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-all cursor-pointer flex flex-col"
    >
      <div
        className="relative flex items-center justify-center overflow-hidden shrink-0"
        style={{ height: pinned ? 88 : 64, background: gradient }}
      >
        <span
          className="absolute text-white/10 font-black font-mono select-none"
          style={{ fontSize: pinned ? 80 : 56 }}
        >
          {initial}
        </span>
        <span className="relative z-10 text-white text-[11px] font-bold px-3 text-center drop-shadow">
          {repo.name}
        </span>
      </div>

      <div className="p-3 flex-1 flex flex-col gap-1.5">
        <p className="text-[10px] text-gray-500 line-clamp-2 leading-relaxed">
          {repo.description ?? <span className="italic text-gray-300">Pas de description</span>}
        </p>

        {repo.topics.length > 0 && (
          <div className="flex gap-1 flex-wrap">
            {repo.topics.slice(0, 3).map(t => (
              <span key={t} className="px-1.5 py-px bg-blue-50 text-blue-600 text-[9px] rounded border border-blue-100">
                {t}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center gap-2.5 text-[9px] text-gray-400 mt-auto">
          {repo.language && (
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: LANG_COLORS[repo.language] ?? '#94a3b8' }} />
              {repo.language}
            </span>
          )}
          {repo.stars > 0 && (
            <span className="flex items-center gap-0.5">
              <Star size={9} /> {repo.stars}
            </span>
          )}
          {repo.forks > 0 && (
            <span className="flex items-center gap-0.5">
              <GitFork size={9} /> {repo.forks}
            </span>
          )}
          <span className="ml-auto">{formatDate(repo.updatedAt)}</span>
        </div>

        <div className="flex gap-1.5 mt-1">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex-1 flex items-center justify-center gap-1 bg-gray-900 text-white text-[10px] py-1.5 rounded hover:bg-gray-700 transition-colors"
          >
            <Github size={10} /> Code
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className="flex-1 flex items-center justify-center gap-1 border border-gray-200 text-gray-600 text-[10px] py-1.5 rounded hover:bg-gray-50 transition-colors"
            >
              <ExternalLink size={10} /> Demo
            </a>
          )}
          <button
            onClick={e => { e.stopPropagation(); onClick(); }}
            className="flex items-center justify-center px-2 border border-gray-200 text-gray-500 rounded hover:bg-gray-50 transition-colors"
            title="Voir le README"
          >
            <BookOpen size={10} />
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
    <div className="absolute top-0 right-0 bottom-0 w-1/2 flex flex-col bg-white border-l border-gray-200 z-10 shadow-lg">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-200 bg-gray-50 shrink-0">
        <BookOpen size={13} className="text-gray-500" />
        <span className="text-xs font-semibold text-gray-700 flex-1 truncate">{repo.name}</span>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-600 transition-colors p-1"
          title="Ouvrir sur GitHub"
        >
          <Github size={13} />
        </a>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
        >
          <X size={13} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 text-xs text-gray-700 leading-relaxed prose prose-xs max-w-none">
        {loading && (
          <div className="flex items-center gap-2 text-gray-400 mt-4">
            <RefreshCw size={12} className="animate-spin" />
            <span>Chargement du README...</span>
          </div>
        )}
        {!loading && content === null && (
          <p className="text-gray-400 italic mt-4">Pas de README pour ce repo.</p>
        )}
        {!loading && content && (
          <ReactMarkdown
            components={{
              h1: ({ children }) => <h1 className="text-base font-bold mb-2 mt-4">{children}</h1>,
              h2: ({ children }) => <h2 className="text-sm font-bold mb-1.5 mt-3">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xs font-bold mb-1 mt-2">{children}</h3>,
              p: ({ children }) => <p className="mb-2 leading-relaxed">{children}</p>,
              code: ({ children }) => (
                <code className="bg-gray-100 px-1 py-0.5 rounded font-mono text-[10px]">{children}</code>
              ),
              pre: ({ children }) => (
                <pre className="bg-gray-100 p-2 rounded text-[10px] overflow-x-auto mb-2">{children}</pre>
              ),
              ul: ({ children }) => <ul className="list-disc ml-4 mb-2 space-y-0.5">{children}</ul>,
              ol: ({ children }) => <ol className="list-decimal ml-4 mb-2 space-y-0.5">{children}</ol>,
              li: ({ children }) => <li className="text-[10px]">{children}</li>,
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
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
      <div className="h-full bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-400">
          <Github size={32} className="mx-auto mb-2 animate-pulse" />
          <p className="text-sm">Chargement des projets GitHub...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p className="text-sm mb-3">{error}</p>
          <button
            onClick={fetchRepos}
            className="flex items-center gap-2 mx-auto px-4 py-2 bg-gray-800 text-white text-xs rounded hover:bg-gray-700 transition-colors"
          >
            <RefreshCw size={12} /> Réessayer
          </button>
        </div>
      </div>
    );
  }

  const showPinned = pinned.length > 0 && !search && !activeLang;

  return (
    <div className="h-full flex flex-col bg-gray-100 overflow-hidden">
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
        <div className={`h-full overflow-y-auto p-4 transition-all ${selectedRepo ? 'pr-[52%]' : ''}`}>

          {showPinned && (
            <section className="mb-5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
                <Pin size={10} /> Projets mis en avant
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
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
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
            <div className="text-center text-gray-400 py-10">
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
