import { NextResponse } from 'next/server';

/**
 * Callback du flow OAuth Spotify.
 *
 * URI fixe utilisée à la fois en local et sur Vercel prod, alignée avec la
 * Redirect URI configurée côté Spotify Developer Dashboard :
 *   https://portfolio-frutiger.vercel.app/api/callback
 *   http://localhost:3000/api/callback
 *
 * Spotify nous renvoie un `code` à échanger contre un access_token et un
 * refresh_token. Le refresh_token est ce que l'on stocke dans .env.local
 * (et dans les variables d'environnement Vercel) pour pouvoir générer de
 * nouveaux access_token côté serveur via les routes utilitaires.
 *
 * Cette route affiche le refresh_token en clair dans la page de réponse pour
 * permettre à l'administrateur de le copier dans .env.local et dans Vercel.
 * À supprimer ou protéger avant de laisser le flow en libre-service public.
 */

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

function getRedirectUri(req: Request): string {
  if (process.env.SPOTIFY_REDIRECT_URI) return process.env.SPOTIFY_REDIRECT_URI;
  const url = new URL(req.url);
  return `${url.protocol}//${url.host}/api/callback`;
}

function htmlResponse(body: string, status = 200) {
  return new NextResponse(body, {
    status,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');
  const error = url.searchParams.get('error');

  if (error) {
    return htmlResponse(`<h1>Spotify OAuth, refus</h1><p>${escapeHtml(error)}</p>`, 400);
  }
  if (!code) {
    return htmlResponse('<h1>Code manquant</h1><p>Reviens via /api/spotify/login.</p>', 400);
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return htmlResponse('<h1>Config Spotify manquante</h1><p>SPOTIFY_CLIENT_ID ou SPOTIFY_CLIENT_SECRET absent.</p>', 500);
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const tokenResp = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: getRedirectUri(req),
    }),
  });

  if (!tokenResp.ok) {
    const text = await tokenResp.text();
    return htmlResponse(
      `<h1>Échange code, token échoué (${tokenResp.status})</h1><pre>${escapeHtml(text)}</pre>`,
      502,
    );
  }

  const data = await tokenResp.json() as {
    access_token?: string;
    refresh_token?: string;
    scope?: string;
    expires_in?: number;
  };

  if (!data.refresh_token) {
    return htmlResponse(
      `<h1>Pas de refresh_token retourné</h1><pre>${escapeHtml(JSON.stringify(data, null, 2))}</pre>`,
      500,
    );
  }

  const scopeOk = data.scope?.includes('user-read-recently-played') ?? false;

  return htmlResponse(`<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>Spotify, refresh token généré</title>
  <style>
    body { font-family: system-ui, sans-serif; background: linear-gradient(160deg,#f0f9ff,#e0f2fe); padding: 40px; max-width: 720px; margin: 0 auto; color: #0f172a; }
    h1 { color: #1db954; margin-top: 0; }
    code, pre { background: rgba(255,255,255,0.7); border: 1px solid rgba(125,211,252,0.4); padding: 4px 8px; border-radius: 6px; font-family: ui-monospace, monospace; word-break: break-all; }
    pre { padding: 12px; cursor: text; }
    ol li { margin: 8px 0; line-height: 1.55; }
    .scope-ok { color: #15803d; font-weight: 600; }
    .scope-warn { color: #b91c1c; font-weight: 600; }
  </style>
</head>
<body>
  <h1>Refresh token Spotify généré [OK]</h1>

  <p>Scopes accordés : <code>${escapeHtml(data.scope ?? 'inconnu')}</code></p>
  ${scopeOk
    ? '<p class="scope-ok">[OK] Le scope user-read-recently-played est bien présent.</p>'
    : '<p class="scope-warn">[WARN] Le scope user-read-recently-played est ABSENT. La route recently-played continuera à renvoyer un corpus vide.</p>'}

  <h2>Étapes à suivre maintenant</h2>
  <ol>
    <li>Copie ce refresh_token (cliquer pour le sélectionner intégralement) :
      <pre id="token">${escapeHtml(data.refresh_token)}</pre>
    </li>
    <li><strong>En local</strong> : ouvre <code>D:\\portfolio-frutiger\\.env.local</code>, remplace la valeur de
      <code>SPOTIFY_REFRESH_TOKEN=</code> par celle ci-dessus, sauvegarde, redémarre <code>npm run dev</code>.</li>
    <li><strong>En prod (Vercel)</strong> : va sur
      <code>https://vercel.com/&lt;ton-team&gt;/portfolio-frutiger/settings/environment-variables</code>,
      mets à jour <code>SPOTIFY_REFRESH_TOKEN</code> pour Production (et Preview si tu veux),
      puis redéploie le projet (Deployments, ... → Redeploy).</li>
    <li>Recharge le portfolio, ouvre l'app Musique, onglet Spotify : tu dois maintenant voir les stats,
      les genres, les pistes récentes, et le bouton "Demander" du panneau Reco IA est actif.</li>
  </ol>

  <p style="margin-top: 20px; color: #64748b; font-size: 13px;">
    [WARN] Une fois la mise à jour faite côté env vars, pense à supprimer (ou protéger derrière une auth)
    les routes <code>/api/spotify/login</code> et <code>/api/callback</code> avant que le portfolio
    ne reste en libre-service public sur Internet.
  </p>

  <script>
    const pre = document.getElementById('token');
    pre.addEventListener('click', () => {
      const r = document.createRange(); r.selectNodeContents(pre);
      const sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(r);
    });
  </script>
</body>
</html>`);
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
