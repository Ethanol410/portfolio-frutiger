import { useEffect, useState } from 'react';
import { useHaptics } from '@/app/hooks/useHaptics';

interface BootScreenProps {
  onComplete: () => void;
}

const STEPS = [
  { label: "Chargement du profil utilisateur…", pct: 30 },
  { label: "Initialisation de l'environnement…", pct: 65 },
  { label: "Système prêt.", pct: 100 },
];

export const BootScreen = ({ onComplete }: BootScreenProps) => {
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(8);
  const [fading, setFading] = useState(false);
  const { tap } = useHaptics();

  useEffect(() => {
    let delay = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    STEPS.forEach((s, i) => {
      delay += 380 + Math.random() * 220;
      const t = setTimeout(() => {
        setStepIdx(i);
        setProgress(s.pct);
        if (i === STEPS.length - 1) {
          const t2 = setTimeout(() => {
            setFading(true);
            const t3 = setTimeout(onComplete, 480);
            timers.push(t3);
          }, 420);
          timers.push(t2);
        }
      }, delay);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  useEffect(() => {
    const skip = () => { tap(); onComplete(); };
    document.addEventListener('keydown', skip, { once: true });
    return () => document.removeEventListener('keydown', skip);
  }, [onComplete, tap]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSkip = () => { tap(); onComplete(); };

  return (
    <div
      onClick={handleSkip}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: [
          'radial-gradient(ellipse 800px 600px at 50% -10%, rgba(255,255,255,0.8) 0%, transparent 55%)',
          'radial-gradient(ellipse 500px 400px at 80% 90%, rgba(72,202,228,0.15) 0%, transparent 60%)',
          'linear-gradient(160deg, #c8e8f5 0%, #d8f2ff 30%, #eaf8ff 60%, #f5fbff 100%)',
        ].join(', '),
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.48s ease',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <style>{`
        @keyframes boot-orb-pulse {
          0%, 100% { transform: scale(1);    box-shadow: 0 0 55px rgba(72,202,228,.55), 0 0 110px rgba(0,150,200,.22), 0 16px 40px rgba(0,80,160,.3); }
          50%       { transform: scale(1.05); box-shadow: 0 0 75px rgba(72,202,228,.75), 0 0 150px rgba(0,150,200,.35), 0 16px 40px rgba(0,80,160,.3); }
        }
        @keyframes boot-bokeh {
          0%, 100% { opacity: .28; transform: scale(1); }
          50%       { opacity: .45; transform: scale(1.06); }
        }
        @keyframes boot-bar-glow {
          0%, 100% { box-shadow: 0 0 6px rgba(72,202,228,.55), inset 0 1px 0 rgba(255,255,255,.5); }
          50%       { box-shadow: 0 0 14px rgba(72,202,228,.9),  inset 0 1px 0 rgba(255,255,255,.7); }
        }
        @keyframes boot-shine {
          0%   { transform: translateX(-100%) skewX(-15deg); }
          100% { transform: translateX(400%)  skewX(-15deg); }
        }
      `}</style>

      {/* ── Bokeh background ── */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div style={{ position: 'absolute', left: '8%',  top: '18%', width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(72,202,228,.14) 0%, transparent 70%)', animation: 'boot-bokeh 6s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', right: '6%', top: '12%', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(0,180,216,.10) 0%, transparent 70%)', animation: 'boot-bokeh 9s 1.2s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', left: '55%', bottom: '15%', width: 280, height: 280, borderRadius: '50%', background: 'radial-gradient(circle, rgba(100,220,180,.09) 0%, transparent 70%)', animation: 'boot-bokeh 7.5s 2.5s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', left: '30%', bottom: '25%', width: 160, height: 160, borderRadius: '50%', background: 'radial-gradient(circle, rgba(48,210,220,.10) 0%, transparent 70%)', animation: 'boot-bokeh 8s 0.5s ease-in-out infinite' }} />
      </div>

      {/* ── 3D Glossy Orb ── */}
      <div
        style={{
          width: 116,
          height: 116,
          borderRadius: '50%',
          background: [
            'radial-gradient(circle at 36% 30%, rgba(255,255,255,.90) 0%, rgba(255,255,255,.35) 22%, transparent 52%)',
            'radial-gradient(circle at 64% 70%, rgba(0,60,160,.18) 0%, transparent 45%)',
            'radial-gradient(circle at 50% 50%, #5cd0ea 0%, #0096c7 42%, #0077b6 68%, #023e8a 100%)',
          ].join(', '),
          animation: 'boot-orb-pulse 2.6s ease-in-out infinite',
          marginBottom: 30,
          flexShrink: 0,
        }}
      />

      {/* ── Label ── */}
      <div style={{ textAlign: 'center', marginBottom: 28 }}>
        <div
          style={{
            fontSize: 30,
            fontWeight: 900,
            color: '#012a4a',
            fontFamily: "var(--font-nunito, 'Segoe UI', system-ui, sans-serif)",
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            marginBottom: 8,
          }}
        >
          EthanOS
        </div>
        <div
          style={{
            fontSize: 12,
            color: '#3a6a8a',
            fontFamily: 'var(--font-geist-mono, ui-monospace, monospace)',
            fontWeight: 600,
            minHeight: 18,
            transition: 'opacity 0.3s',
          }}
        >
          {STEPS[stepIdx]?.label ?? ''}
        </div>
      </div>

      {/* ── Progress bar ── */}
      <div
        style={{
          width: 220,
          height: 8,
          borderRadius: 999,
          background: 'rgba(0,100,180,.1)',
          border: '1px solid rgba(0,150,200,.28)',
          overflow: 'hidden',
          backdropFilter: 'blur(4px)',
          position: 'relative',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${progress}%`,
            borderRadius: 999,
            background: 'linear-gradient(90deg, #48cae4 0%, #0096c7 55%, #0077b6 100%)',
            transition: 'width 0.42s cubic-bezier(.22,1,.36,1)',
            animation: 'boot-bar-glow 1.6s ease-in-out infinite',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* shine sweep */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,.55) 50%, transparent 100%)',
              animation: 'boot-shine 1.8s 0.3s ease-in-out infinite',
              width: '40%',
            }}
          />
        </div>
      </div>

      {/* ── Skip button ── */}
      <button
        onClick={(e) => { e.stopPropagation(); handleSkip(); }}
        style={{
          position: 'absolute',
          top: 18,
          right: 18,
          padding: '5px 16px',
          fontSize: 11,
          fontWeight: 700,
          color: '#0077b6',
          borderRadius: 999,
          background: 'rgba(255,255,255,.62)',
          border: '1px solid rgba(0,150,200,.38)',
          backdropFilter: 'blur(10px)',
          cursor: 'pointer',
          transition: 'background .15s',
          fontFamily: "var(--font-nunito, 'Segoe UI', system-ui, sans-serif)",
        }}
        aria-label="Passer l'intro"
      >
        Passer →
      </button>

      <div
        style={{
          position: 'absolute',
          bottom: 22,
          fontSize: 10,
          color: '#6a9ab4',
          fontFamily: 'var(--font-geist-mono, ui-monospace, monospace)',
          fontWeight: 500,
          textAlign: 'center',
        }}
      >
        Cliquez n&apos;importe où pour passer ·{' '}
        <code style={{ color: '#0096c7' }}>?recruiter=1</code> pour ignorer
      </div>
    </div>
  );
};
