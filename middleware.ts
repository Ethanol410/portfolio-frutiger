import { NextRequest, NextResponse } from 'next/server';

type RateLimitEntry = { count: number; resetAt: number };

const store = new Map<string, RateLimitEntry>();

const LIMITS: { prefix: string; max: number; windowMs: number }[] = [
  { prefix: '/api/contact',  max: 5,  windowMs: 60_000 },
  { prefix: '/api/ai/chat', max: 10, windowMs: 60_000 },
  { prefix: '/api/github',  max: 30, windowMs: 60_000 },
  { prefix: '/api/spotify', max: 30, windowMs: 60_000 },
];

function getRateLimit(pathname: string) {
  return LIMITS.find(l => pathname.startsWith(l.prefix)) ?? null;
}

function checkRateLimit(
  key: string,
  max: number,
  windowMs: number
): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count >= max) {
    const retryAfter = Math.ceil((entry.resetAt - now) / 1000);
    return { allowed: false, retryAfter };
  }

  entry.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const limit = getRateLimit(pathname);

  if (!limit) return NextResponse.next();

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  const key = `${ip}:${limit.prefix}`;
  const { allowed, retryAfter } = checkRateLimit(key, limit.max, limit.windowMs);

  if (!allowed) {
    return new NextResponse(
      JSON.stringify({ error: 'Trop de requêtes. Réessayez dans quelques secondes.' }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(retryAfter),
        },
      }
    );
  }

  if (pathname.startsWith('/api/ai/chat')) {
    const token = request.headers.get('x-app-token');
    const expected = process.env.APP_TOKEN;

    if (!expected || token !== expected) {
      return new NextResponse(
        JSON.stringify({ error: 'Non autorisé.' }),
        { status: 401, headers: { 'Content-Type': 'application/json' } }
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
