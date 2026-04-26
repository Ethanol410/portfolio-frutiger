import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

// VRAIE URL POUR LE TOKEN SPOTIFY
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });

  return response.json();
}

export async function GET() {
  const { access_token } = await getAccessToken();
  
  // Exemple : Récupérer les infos d'une musique spécifique (ex: Daft Punk - Get Lucky)
  // Tu peux trouver cet ID dans l'URL d'un son Spotify
  const trackId = '69kOkLUCkxIZYexIgSG8rq'; 
  const res = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  const data = await res.json();
  return NextResponse.json(data);
}