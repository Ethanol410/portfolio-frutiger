import { NextResponse } from 'next/server';

const REDIRECT_URI = 'https://portfolio-frutiger.vercel.app/api/callback';
const SCOPES = 'user-read-currently-playing user-read-playback-state user-top-read';

export async function GET() {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.SPOTIFY_CLIENT_ID!,
    scope: SCOPES,
    redirect_uri: REDIRECT_URI,
  });

  return NextResponse.redirect(
    `https://accounts.spotify.com/authorize?${params.toString()}`
  );
}
