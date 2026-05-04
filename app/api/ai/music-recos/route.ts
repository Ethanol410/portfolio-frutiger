import { NextResponse } from 'next/server';
import Groq from 'groq-sdk';

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export interface MusicReco {
  title: string;
  artist: string;
  reason: string;
}

interface RecentlyPlayedSnapshot {
  tracks: Array<{ title: string; artist: string }>;
  topGenres: Array<{ name: string; count: number }>;
  topArtists: Array<{ name: string; count: number }>;
}

// Cache mémoire simple. Clé : signature du payload (top 5 artistes + top 5 genres).
// Permet de ne pas refaire l'appel Groq à chaque visiteur, et fait office de
// "shared cache" pour la même session de listening.
type CacheEntry = { recos: MusicReco[]; expiresAt: number };
const cache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 30 * 60 * 1000; // 30 min
const CACHE_MAX_ENTRIES = 50;

function buildCacheKey(snap: RecentlyPlayedSnapshot): string {
  const a = snap.topArtists.slice(0, 5).map((x) => x.name).sort().join('|');
  const g = snap.topGenres.slice(0, 5).map((x) => x.name).sort().join('|');
  return `${a}::${g}`;
}

function pruneCache() {
  if (cache.size <= CACHE_MAX_ENTRIES) return;
  // FIFO simple : on enlève le plus vieux
  const firstKey = cache.keys().next().value;
  if (firstKey) cache.delete(firstKey);
}

export async function POST(req: Request) {
  let body: RecentlyPlayedSnapshot;
  try {
    body = (await req.json()) as RecentlyPlayedSnapshot;
  } catch {
    return NextResponse.json({ error: 'Corps invalide.' }, { status: 400 });
  }

  if (!Array.isArray(body.tracks) || body.tracks.length === 0) {
    return NextResponse.json({ error: 'Aucune piste fournie.' }, { status: 400 });
  }

  // Bornage défensif pour ne pas envoyer un payload énorme à Groq
  const tracks = body.tracks.slice(0, 50);
  const topGenres = (body.topGenres ?? []).slice(0, 8);
  const topArtists = (body.topArtists ?? []).slice(0, 8);

  const snap: RecentlyPlayedSnapshot = { tracks, topGenres, topArtists };
  const cacheKey = buildCacheKey(snap);
  const now = Date.now();

  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > now) {
    return NextResponse.json({ recos: cached.recos, cached: true });
  }

  // Construction du prompt
  const tracksList = tracks.slice(0, 25).map((t) => `- ${t.artist}, ${t.title}`).join('\n');
  const genresList = topGenres.map((g) => `${g.name} (${g.count})`).join(', ') || 'inconnu';
  const artistsList = topArtists.map((a) => `${a.name} (${a.count})`).join(', ') || 'inconnu';

  const userPrompt = `Voici un extrait de mes 50 dernières pistes écoutées sur Spotify :

${tracksList}

Top genres détectés : ${genresList}
Top artistes détectés : ${artistsList}

Donne-moi exactement 5 recommandations de pistes que je n'ai PAS dans cette liste, dans le même esprit musical, en variant un peu les sources d'inspiration.

Format de réponse OBLIGATOIRE : un objet JSON unique, sans préfixe ni texte autour, exactement de la forme suivante :

{
  "recos": [
    { "title": "Nom de la piste", "artist": "Nom de l'artiste", "reason": "Pourquoi je devrais aimer en 1 phrase concrète" },
    ...
  ]
}

Contraintes :
- 5 entrées exactement, ni plus ni moins
- "reason" en français, max 15 mots, factuelle (ex : "même groove disco français", "voix chaude similaire à X")
- Pas de tirets cadratin (—) dans les textes, utiliser virgules ou parenthèses
- Aucun texte hors du JSON`;

  try {
    const completion = await client.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 600,
      temperature: 0.7,
      response_format: { type: 'json_object' },
      messages: [
        {
          role: 'system',
          content:
            "Tu es un expert en recommandation musicale qui répond UNIQUEMENT en JSON valide selon le schéma demandé, sans aucun texte autour.",
        },
        { role: 'user', content: userPrompt },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? '';
    let parsed: { recos?: unknown };
    try {
      parsed = JSON.parse(raw) as { recos?: unknown };
    } catch {
      return NextResponse.json({ error: 'Réponse IA invalide.' }, { status: 502 });
    }

    if (!Array.isArray(parsed.recos)) {
      return NextResponse.json({ error: 'Réponse IA mal formée.' }, { status: 502 });
    }

    const recos: MusicReco[] = parsed.recos
      .filter((r): r is MusicReco => {
        if (typeof r !== 'object' || r === null) return false;
        const obj = r as Record<string, unknown>;
        return typeof obj.title === 'string' && typeof obj.artist === 'string' && typeof obj.reason === 'string';
      })
      .slice(0, 5);

    if (recos.length === 0) {
      return NextResponse.json({ error: 'Aucune recommandation exploitable.' }, { status: 502 });
    }

    cache.set(cacheKey, { recos, expiresAt: now + CACHE_TTL_MS });
    pruneCache();

    return NextResponse.json({ recos, cached: false });
  } catch {
    return NextResponse.json({ error: 'Erreur LLM.' }, { status: 502 });
  }
}
