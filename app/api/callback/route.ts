import { NextRequest, NextResponse } from 'next/server';

const REDIRECT_URI = 'https://portfolio-frutiger.vercel.app/api/callback';

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  const basic = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString('base64');

  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: REDIRECT_URI,
    }),
  });

  const data = await response.json();

  return new NextResponse(
    `<!DOCTYPE html>
    <html>
      <body style="font-family:monospace;padding:40px;background:#1a1a1a;color:#fff">
        <h2 style="color:#1db954">✅ Spotify connecté !</h2>
        <p>Copie ce refresh_token dans ton <code>.env.local</code> et dans les env vars Vercel :</p>
        <pre style="background:#111;padding:20px;border-radius:8px;word-break:break-all;color:#1db954;font-size:13px">${data.refresh_token}</pre>
        <p style="color:#888;font-size:12px">SPOTIFY_REFRESH_TOKEN=${data.refresh_token}</p>
        <p style="color:#f87171;margin-top:24px">⚠️ Supprime les routes <code>/api/spotify/login</code> et <code>/api/callback</code> après avoir copié le token.</p>
      </body>
    </html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
