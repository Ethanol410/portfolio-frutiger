import { NextResponse } from 'next/server';
import { getAccessToken } from '@/app/api/spotify/utils';

export interface TopTrack {
  id: string;
  title: string;
  artist: string;
  albumArt: string | null;
}

export async function GET() {
  try {
    const access_token = await getAccessToken();

    const response = await fetch(
      'https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=10',
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const data = await response.json();

    const tracks: TopTrack[] = (
      data.items as Array<{
        id: string;
        name: string;
        artists: Array<{ name: string }>;
        album: { images: Array<{ url: string }> };
      }>
    ).map((track) => ({
      id: track.id,
      title: track.name,
      artist: track.artists.map((a) => a.name).join(', '),
      albumArt: track.album.images[0]?.url ?? null,
    }));

    return NextResponse.json(tracks);
  } catch {
    return NextResponse.json([]);
  }
}
