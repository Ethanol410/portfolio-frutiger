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
        <div style={{ fontSize: 36, opacity: 0.9, textAlign: 'center', lineHeight: 1.25 }}>
          Apprenti ingénieur IA & interfaces intelligentes
        </div>
        <div style={{ fontSize: 22, opacity: 0.75, marginTop: 18, textAlign: 'center' }}>
          Co-auteur d&apos;un projet de recherche soumis à ACM UIST 2026
        </div>
        <div style={{ fontSize: 22, opacity: 0.75, marginTop: 4, textAlign: 'center' }}>
          Alternance ingénieur IA, septembre 2026, Lannion ou Dinan
        </div>
        <div style={{ fontSize: 20, opacity: 0.55, marginTop: 28, textAlign: 'center' }}>
          portfolio-frutiger.vercel.app
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
