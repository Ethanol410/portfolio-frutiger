'use client';

import React, { useEffect, useState } from 'react';
import { ExternalLink, Github, Star, GitFork, RefreshCw } from 'lucide-react';

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

const LANG_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-green-500',
  PHP: 'bg-purple-500',
  Dart: 'bg-cyan-500',
  'C#': 'bg-indigo-600',
  HTML: 'bg-orange-500',
  CSS: 'bg-pink-500',
  Rust: 'bg-orange-700',
  Go: 'bg-cyan-600',
};

const LANG_DOT_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-400',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-green-400',
  PHP: 'bg-purple-400',
  Dart: 'bg-cyan-400',
  'C#': 'bg-indigo-400',
  HTML: 'bg-orange-400',
  CSS: 'bg-pink-400',
  Rust: 'bg-orange-600',
  Go: 'bg-cyan-500',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function RepoCard({ repo }: { repo: GithubRepo }) {
  const bgColor = repo.language ? (LANG_COLORS[repo.language] ?? 'bg-gray-500') : 'bg-gray-500';
  const dotColor = repo.language ? (LANG_DOT_COLORS[repo.language] ?? 'bg-gray-400') : 'bg-gray-400';

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Thumbnail */}
      <div className={`h-24 ${bgColor} flex items-center justify-center text-white font-mono text-sm font-bold px-4 text-center`}>
        {repo.name}
      </div>

      <div className="p-3 flex-1 flex flex-col gap-2">
        <p className="text-xs text-gray-500 line-clamp-2 min-h-[2rem]">
          {repo.description ?? 'Pas de description'}
        </p>

        {/* Topics */}
        {repo.topics.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {repo.topics.slice(0, 3).map(t => (
              <span key={t} className="px-1.5 py-0.5 bg-blue-50 text-blue-600 text-[9px] rounded border border-blue-100">
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Meta */}
        <div className="flex items-center gap-3 mt-auto text-[10px] text-gray-400">
          {repo.language && (
            <span className="flex items-center gap-1">
              <span className={`w-2 h-2 rounded-full ${dotColor}`} />
              {repo.language}
            </span>
          )}
          {repo.stars > 0 && (
            <span className="flex items-center gap-0.5">
              <Star size={10} /> {repo.stars}
            </span>
          )}
          {repo.forks > 0 && (
            <span className="flex items-center gap-0.5">
              <GitFork size={10} /> {repo.forks}
            </span>
          )}
          <span className="ml-auto">{formatDate(repo.updatedAt)}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-1 bg-gray-900 text-white text-xs py-1.5 rounded hover:bg-gray-800 transition-colors"
          >
            <Github size={11} /> Code
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1 border border-gray-300 text-gray-700 text-xs py-1.5 rounded hover:bg-gray-50 transition-colors"
            >
              <ExternalLink size={11} /> Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export const ProjectsApp = () => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRepos = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/github');
      if (!res.ok) throw new Error('Erreur lors du chargement');
      const data = await res.json();
      setRepos(data);
    } catch {
      setError('Impossible de charger les dépôts GitHub.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchRepos(); }, []);

  if (loading) {
    return (
      <div className="h-full bg-gray-100 flex items-center justify-center">
        <div className="text-center text-gray-500">
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

  return (
    <div className="h-full bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 bg-white border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Github size={16} className="text-gray-700" />
          <span className="text-sm font-semibold text-gray-800">Ethanol410</span>
          <span className="text-xs text-gray-400">· {repos.length} dépôts publics</span>
        </div>
        <button
          onClick={fetchRepos}
          className="p-1 hover:bg-gray-100 rounded transition-colors text-gray-500"
          title="Rafraîchir"
        >
          <RefreshCw size={13} />
        </button>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repos.map(repo => (
            <RepoCard key={repo.id} repo={repo} />
          ))}
        </div>
      </div>
    </div>
  );
};
