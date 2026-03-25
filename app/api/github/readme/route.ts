import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Ethanol410';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const repo = searchParams.get('repo');

  if (!repo) {
    return NextResponse.json({ error: 'Missing repo parameter' }, { status: 400 });
  }

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_USERNAME}/${repo}/readme`,
    {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        ...(process.env.GITHUB_TOKEN
          ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
          : {}),
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json({ error: 'README not found' }, { status: 404 });
  }

  const data = await res.json();
  const content = Buffer.from(data.content, 'base64').toString('utf-8');

  return NextResponse.json({ content });
}
