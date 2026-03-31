import { NextResponse } from 'next/server';
import { getAccessToken } from '@/app/api/spotify/utils';

export interface NowPlayingData {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArt: string | null;
  progressMs: number;
  durationMs: number;
}

export async function GET() {
  try {
    const access_token = await getAccessToken();

    const response = await fetch(
      'https://api.spotify.com/v1/me/player/currently-playing',
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (response.status === 204 || response.status >= 400) {
      return NextResponse.json(null);
    }

    const song = await response.json();

    if (!song?.item) {
      return NextResponse.json(null);
    }

    const result: NowPlayingData = {
      isPlaying: song.is_playing as boolean,
      title: song.item.name as string,
      artist: (song.item.artists as Array<{ name: string }>)
        .map((a) => a.name)
        .join(', '),
      albumArt: (song.item.album.images as Array<{ url: string }>)[0]?.url ?? null,
      progressMs: song.progress_ms as number,
      durationMs: song.item.duration_ms as number,
    };

    return NextResponse.json(result);
  } catch {
    return NextResponse.json(null);
  }
}
