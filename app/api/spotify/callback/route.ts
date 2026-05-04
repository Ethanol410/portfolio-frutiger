import { NextResponse } from 'next/server';

/**
 * Callback du flow OAuth Spotify.
 *
 * Spotify nous renvoie un `code` à échanger contre un access_token + refresh_token.
 * Le refresh_token est ce que l'on stocke dans .env.local pour pouvoir générer
 * de nouveaux access_token côté serveur via les routes utilitaires.
 *
 * Cette route affiche le refresh_token en clair dans la page de réponse pour
 * permettre à l'utilisateur de le copier dans .env.local. Ce n'est pas un
 * comportement à laisser en production publique : c'est un outil one-shot
 * d'admin local.
 */

const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

function getRedirectUri(req: Request): string {
  if (process.env.SPOTIFY_REDIRECT_URI) return process.env.SPOTIFY_REDIRECT_URI;
  const url = new URL(req.url);
  return `${url.protocol}//${url.host}/api/spotify/callback`;
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
    return htmlResponse(`<h1>Spotify OAuth, refus</h1><p>${error}</p>`, 400);
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
      `<h1>Échange code,token échoué (${tokenResp.status})</h1><pre>${escapeHtml(text)}</pre>`,
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

  return htmlResponse(`<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8" />
  <title>Spotify, refresh token généré</title>
  <style>
    body { font-family: system-ui, sans-serif; background: linear-gradient(160deg,#f0f9ff,#e0f2fe); padding: 40px; max-width: 720px; margin: 0 auto; color: #0f172a; }
    h1 { color: #1db954; margin-top: 0; }
    code, pre { background: rgba(255,255,255,0.7); border: 1px solid rgba(125,211,252,0.4); padding: 4px 8px; border-radius: 6px; font-family: ui-monospace, monospace; word-break: break-all; }
    pre { padding: 12px; }
    ol li { margin: 8px 0; line-height: 1.55; }
    .scope-ok { color: #15803d; font-weight: 600; }
    .scope-warn { color: #b91c1c; font-weight: 600; }
    .copy { display: inline-block; background: #1db954; color: white; padding: 6px 14px; border-radius: 999px; text-decoration: none; font-weight: 600; margin-top: 8px; }
  </style>
</head>
<body>
  <h1>Refresh token Spotify généré ✅</h1>

  <p>Scopes accordés : <code>${escapeHtml(data.scope ?? 'inconnu')}</code></p>
  ${data.scope?.includes('user-read-recently-played')
    ? '<p class="scope-ok">✅ Le scope user-read-recently-played est bien présent.</p>'
    : '<p class="scope-warn">⚠️ Le scope user-read-recently-played est ABSENT. La route recently-played continuera à renvoyer un corpus vide.</p>'}

  <h2>Étapes à suivre maintenant</h2>
  <ol>
    <li>Copie ce refresh_token (cliquer dessus pour sélectionner) :
      <pre id="token">${escapeHtml(data.refresh_token)}</pre>
    </li>
    <li>Ouvre <code>D:\\portfolio-frutiger\\.env.local</code> dans ton éditeur</li>
    <li>Remplace la valeur de <code>SPOTIFY_REFRESH_TOKEN=</code> par celle ci-dessus</li>
    <li>Sauvegarde le fichier</li>
    <li>Redémarre <code>npm run dev</code></li>
    <li>Recharge le portfolio, ouvre l'app Musique, onglet Spotify : tu dois maintenant voir les stats, les genres, les pistes récentes et le bouton de recommandation IA fonctionne.</li>
  </ol>

  <p style="margin-top: 20px; color: #64748b; font-size: 13px;">
    ⚠️ Une fois fait, supprime ces routes <code>/api/spotify/login</code> et <code>/api/spotify/callback</code>
    avant de déployer en prod publique, ou ajoute une protection (mot de passe, IP whitelist, désactivation conditionnelle).
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
