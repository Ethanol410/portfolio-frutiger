import { NextResponse } from 'next/server';
import { getAccessToken } from '@/app/api/spotify/utils';

export interface RecentlyPlayedTrack {
  id: string;
  title: string;
  artist: string;
  artistIds: string[];
  albumArt: string | null;
  playedAt: string;
  durationMs: number;
}

export interface RecentlyPlayedResponse {
  tracks: RecentlyPlayedTrack[];
  topGenres: { name: string; count: number }[];
  topArtists: { name: string; count: number }[];
  totalMinutes: number;
  uniqueArtists: number;
}

interface SpotifyArtist {
  id: string;
  name: string;
}

interface SpotifyTrackItem {
  id: string;
  name: string;
  duration_ms: number;
  artists: SpotifyArtist[];
  album: { images: Array<{ url: string }> };
}

interface SpotifyRecentlyPlayedItem {
  track: SpotifyTrackItem;
  played_at: string;
}

interface SpotifyArtistDetails {
  id: string;
  name: string;
  genres: string[];
}

export async function GET() {
  try {
    const access_token = await getAccessToken();

    // 1. Récupérer les 50 dernières pistes écoutées
    const recentResp = await fetch(
      'https://api.spotify.com/v1/me/player/recently-played?limit=50',
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    if (!recentResp.ok) {
      return NextResponse.json({
        tracks: [],
        topGenres: [],
        topArtists: [],
        totalMinutes: 0,
        uniqueArtists: 0,
      } satisfies RecentlyPlayedResponse);
    }

    const recentData = await recentResp.json() as { items: SpotifyRecentlyPlayedItem[] };
    const items = recentData.items ?? [];

    const tracks: RecentlyPlayedTrack[] = items.map((item) => ({
      id: item.track.id,
      title: item.track.name,
      artist: item.track.artists.map((a) => a.name).join(', '),
      artistIds: item.track.artists.map((a) => a.id),
      albumArt: item.track.album.images[0]?.url ?? null,
      playedAt: item.played_at,
      durationMs: item.track.duration_ms,
    }));

    // 2. Top artistes (sur le corpus des 50 pistes)
    const artistCount = new Map<string, number>();
    for (const t of items) {
      for (const a of t.track.artists) {
        artistCount.set(a.name, (artistCount.get(a.name) ?? 0) + 1);
      }
    }
    const topArtists = [...artistCount.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // 3. Top genres : on récupère les détails des artistes uniques (max 50 par appel)
    const uniqueArtistIds = [...new Set(items.flatMap((t) => t.track.artists.map((a) => a.id)))].slice(0, 50);

    let topGenres: { name: string; count: number }[] = [];
    if (uniqueArtistIds.length > 0) {
      const artistsResp = await fetch(
        `https://api.spotify.com/v1/artists?ids=${uniqueArtistIds.join(',')}`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
      if (artistsResp.ok) {
        const artistsData = await artistsResp.json() as { artists: SpotifyArtistDetails[] };
        const genreCount = new Map<string, number>();
        for (const a of artistsData.artists ?? []) {
          for (const g of a.genres) {
            genreCount.set(g, (genreCount.get(g) ?? 0) + 1);
          }
        }
        topGenres = [...genreCount.entries()]
          .sort((a, b) => b[1] - a[1])
          .slice(0, 5)
          .map(([name, count]) => ({ name, count }));
      }
    }

    // 4. Stats globales
    const totalMs = items.reduce((sum, item) => sum + item.track.duration_ms, 0);
    const totalMinutes = Math.round(totalMs / 60000);
    const uniqueArtists = new Set(items.flatMap((t) => t.track.artists.map((a) => a.id))).size;

    const result: RecentlyPlayedResponse = {
      tracks,
      topGenres,
      topArtists,
      totalMinutes,
      uniqueArtists,
    };

    return NextResponse.json(result, {
      headers: {
        // Cache CDN court : on s'attend à un refresh côté client toutes les
        // ~10 min, mais on évite que chaque visiteur sollicite l'API Spotify.
        'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch {
    return NextResponse.json({
      tracks: [],
      topGenres: [],
      topArtists: [],
      totalMinutes: 0,
      uniqueArtists: 0,
    } satisfies RecentlyPlayedResponse);
  }
}
