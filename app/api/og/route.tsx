import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #1e3a8a 100%)',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '60px',
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
          Ethan Collin
        </div>
        <div style={{ fontSize: 36, opacity: 0.85, textAlign: 'center' }}>
          Développeur Web FullStack & IA — BUT MMI
        </div>
        <div style={{ fontSize: 24, opacity: 0.55, marginTop: 32, textAlign: 'center' }}>
          portfolio-frutiger.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
