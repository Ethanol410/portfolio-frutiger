import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Ethanol410';

export async function GET() {
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=50`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
      next: { revalidate: 3600 },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: res.status }
    );
  }

  const repos = await res.json();

  const filtered = repos
    .filter((r: GitHubRepo) => !r.fork && !r.private && r.name !== GITHUB_USERNAME)
    .map((r: GitHubRepo) => ({
      id: r.id,
      name: r.name,
      description: r.description,
      language: r.language,
      stars: r.stargazers_count,
      forks: r.forks_count,
      url: r.html_url,
      homepage: r.homepage || null,
      updatedAt: r.updated_at,
      topics: r.topics ?? [],
    }));

  return NextResponse.json(filtered);
}

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  html_url: string;
  homepage: string | null;
  updated_at: string;
  topics?: string[];
  fork: boolean;
  private: boolean;
}
