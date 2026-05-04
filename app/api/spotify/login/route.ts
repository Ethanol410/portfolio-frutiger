import { NextResponse } from 'next/server';

/**
 * Démarre le flow OAuth Spotify Authorization Code.
 *
 * Scopes demandés (à aligner avec ce dont l'app a besoin) :
 *  - user-read-currently-playing : pour /api/spotify/now-playing
 *  - user-top-read               : pour /api/spotify/top-tracks
 *  - user-read-recently-played   : pour /api/spotify/recently-played
 *
 * Redirect URI alignée avec ce qui est configuré dans le Spotify Developer
 * Dashboard, à la racine /api/callback (et non /api/spotify/callback) pour
 * matcher la config historique du projet :
 *  - http://localhost:3000/api/callback (dev)
 *  - https://portfolio-frutiger.vercel.app/api/callback (prod)
 */
const SCOPES = [
  'user-read-currently-playing',
  'user-top-read',
  'user-read-recently-played',
].join(' ');

function getRedirectUri(req: Request): string {
  if (process.env.SPOTIFY_REDIRECT_URI) return process.env.SPOTIFY_REDIRECT_URI;
  const url = new URL(req.url);
  return `${url.protocol}//${url.host}/api/callback`;
}

export function GET(req: Request) {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json({ error: 'SPOTIFY_CLIENT_ID manquant.' }, { status: 500 });
  }

  const redirectUri = getRedirectUri(req);
  const state = Math.random().toString(36).slice(2);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: clientId,
    scope: SCOPES,
    redirect_uri: redirectUri,
    state,
    show_dialog: 'true',
  });

  return NextResponse.redirect(`https://accounts.spotify.com/authorize?${params.toString()}`);
}
