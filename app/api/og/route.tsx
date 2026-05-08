import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  const origin = new URL(req.url).origin;
  const avatarUrl = `${origin}/people_31.png`;

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          position: 'relative',
          fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
          color: '#06294a',
          background:
            'linear-gradient(170deg, #b8e8f5 0%, #caf0f8 28%, #ddf6ff 55%, #eef9ff 80%, #f5fbff 100%)',
        }}
      >
        {/* Bokeh orbs (radial gradients) — Frutiger Aero signature */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            left: -120,
            top: -160,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background:
              'radial-gradient(circle at 50% 50%, rgba(72,202,228,0.55) 0%, rgba(72,202,228,0) 65%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            right: -200,
            top: -180,
            width: 620,
            height: 620,
            borderRadius: 9999,
            background:
              'radial-gradient(circle at 50% 50%, rgba(0,180,216,0.40) 0%, rgba(0,180,216,0) 65%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            right: 60,
            bottom: -240,
            width: 560,
            height: 560,
            borderRadius: 9999,
            background:
              'radial-gradient(circle at 50% 50%, rgba(100,220,180,0.35) 0%, rgba(100,220,180,0) 65%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            left: -80,
            bottom: -180,
            width: 460,
            height: 460,
            borderRadius: 9999,
            background:
              'radial-gradient(circle at 50% 50%, rgba(160,220,255,0.45) 0%, rgba(160,220,255,0) 65%)',
          }}
        />

        {/* Glossy 3D orb (top right) — accent Vista */}
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            right: 90,
            top: 70,
            width: 90,
            height: 90,
            borderRadius: 9999,
            background:
              'radial-gradient(circle at 36% 30%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.25) 22%, rgba(255,255,255,0) 50%), radial-gradient(circle at 64% 72%, rgba(0,60,140,0.30) 0%, rgba(0,60,140,0) 44%), radial-gradient(circle at 50% 50%, #80d8ee 0%, #48cae4 40%, #0096c7 70%, #023e8a 100%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            display: 'flex',
            left: 110,
            bottom: 90,
            width: 56,
            height: 56,
            borderRadius: 9999,
            background:
              'radial-gradient(circle at 36% 30%, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.20) 22%, rgba(255,255,255,0) 50%), radial-gradient(circle at 50% 50%, #5cd0ea 0%, #0096c7 60%, #0077b6 100%)',
          }}
        />

        {/* Glass card hero */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            alignItems: 'center',
            margin: 56,
            padding: 56,
            borderRadius: 28,
            background: 'rgba(255,255,255,0.55)',
            border: '1px solid rgba(255,255,255,0.85)',
            position: 'relative',
            gap: 56,
          }}
        >
          {/* Top inner highlight, simule reflet glossy supérieur */}
          <div
            style={{
              position: 'absolute',
              display: 'flex',
              top: 0,
              left: 0,
              right: 0,
              height: '45%',
              borderTopLeftRadius: 28,
              borderTopRightRadius: 28,
              background:
                'linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 100%)',
            }}
          />

          {/* Avatar circle with aqua ring */}
          <div
            style={{
              display: 'flex',
              width: 240,
              height: 240,
              borderRadius: 9999,
              background:
                'linear-gradient(180deg, #80d8ee 0%, #0096c7 60%, #0077b6 100%)',
              padding: 8,
              flexShrink: 0,
              position: 'relative',
            }}
          >
            <div
              style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                borderRadius: 9999,
                background: '#ffffff',
                padding: 6,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={avatarUrl}
                width={212}
                height={212}
                alt=""
                style={{
                  borderRadius: 9999,
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>

          {/* Right column : title + subtitle + meta */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
              minWidth: 0,
            }}
          >
            {/* Availability pill */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                gap: 10,
                padding: '6px 14px',
                borderRadius: 9999,
                background: 'rgba(16,185,129,0.18)',
                border: '1px solid rgba(16,185,129,0.55)',
                color: '#047857',
                fontSize: 18,
                fontWeight: 600,
                marginBottom: 18,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  width: 10,
                  height: 10,
                  borderRadius: 9999,
                  background: '#10b981',
                }}
              />
              Alternance ingénieur IA, sept. 2026 → 2029
            </div>

            <div
              style={{
                fontSize: 84,
                fontWeight: 900,
                color: '#012a4a',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: 12,
              }}
            >
              Ethan Collin
            </div>

            <div
              style={{
                fontSize: 32,
                fontWeight: 700,
                color: '#0077b6',
                lineHeight: 1.15,
                marginBottom: 10,
              }}
            >
              Apprenti ingénieur IA &amp; interfaces intelligentes
            </div>

            <div
              style={{
                fontSize: 22,
                fontWeight: 500,
                color: '#1e3a5f',
                lineHeight: 1.35,
                marginTop: 4,
              }}
            >
              Co-auteur publication ACM UIST 2026 · Lauréat Pépite Campus 2024
            </div>

            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                color: '#0096c7',
                marginTop: 24,
                fontFamily: 'monospace',
                letterSpacing: '0.04em',
              }}
            >
              ethan-collin.com
            </div>
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
