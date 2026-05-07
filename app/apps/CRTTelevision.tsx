'use client';

import { useState } from 'react';
import { Tv2, Power } from 'lucide-react';

const CHANNELS = [
  // Lofi Girl 24/7 live stream — always on
  { id: 'lo-fi',  label: '📡 Lo-Fi',  url: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=0&rel=0' },
  // Relaxing nature / forest sounds
  { id: 'nature', label: '🌿 Nature', url: 'https://www.youtube.com/embed/eKFTSSKCzWA?autoplay=1&mute=1&controls=0&rel=0' },
  // Heavy rain on window sounds
  { id: 'rain',   label: '🌧️ Pluie',  url: 'https://www.youtube.com/embed/nDq6TstdEi8?autoplay=1&mute=1&controls=0&rel=0' },
  // Tokyo Shibuya Crossing night walk 4K
  { id: 'city',   label: '🏙️ Ville',  url: 'https://www.youtube.com/embed/wKimU8uegZQ?autoplay=1&mute=1&controls=0&rel=0' },
];

export const CRTTelevisionApp = () => {
  const [on, setOn] = useState(false);
  const [channel, setChannel] = useState(0);
  const [scanlines, setScanlines] = useState(true);
  const [vhsEffect, setVhsEffect] = useState(false);

  return (
    <div className="h-full flex flex-col aero-app overflow-hidden">
      {/* Header aqua */}
      <div
        className="px-4 py-2.5 shrink-0 flex items-center gap-3"
        style={{
          background: 'linear-gradient(180deg, #cce9ff 0%, #a8d8f8 50%, #7fc4f0 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.7)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.9), 0 1px 4px rgba(80,160,220,0.2)',
        }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 relative overflow-hidden"
          style={{
            background: 'linear-gradient(160deg,#5bbef5 0%,#2196f3 55%,#0d6fba 100%)',
            boxShadow: '0 2px 8px rgba(30,100,200,0.35), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          <div className="absolute top-0 left-0 right-0 h-1/2 rounded-full"
            style={{ background: 'linear-gradient(180deg,rgba(255,255,255,0.55) 0%,transparent 100%)' }} />
          <Tv2 size={13} className="text-white relative z-10" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-[13px] text-blue-950">Télévision CRT</div>
          <div className="text-[10px] text-blue-700/70">{on ? CHANNELS[channel].label : 'Hors tension'}</div>
        </div>
        <button
          onClick={() => setOn(p => !p)}
          title={on ? 'Éteindre' : 'Allumer'}
          className="p-1.5 rounded-full transition-colors"
          style={on ? {
            background: 'linear-gradient(180deg, #5cd683, #2d8a4a)',
            boxShadow: '0 0 8px rgba(92,214,131,0.6)',
            color: 'white',
          } : {
            background: 'rgba(0,0,0,0.15)',
            color: '#555',
          }}
        >
          <Power size={13} />
        </button>
      </div>

      {/* Main CRT area */}
      <div className="flex-1 flex flex-col items-center justify-center min-h-0 p-3 gap-3">
        {/* TV bezel */}
        <div
          className="relative flex-1 w-full max-h-full"
          style={{
            background: 'linear-gradient(145deg, #3a3a3a 0%, #1a1a1a 60%, #2a2a2a 100%)',
            borderRadius: 18,
            padding: '14px 14px 20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6), inset 0 2px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(0,0,0,0.8)',
            minHeight: 0,
          }}
        >
          {/* Screen area */}
          <div
            className="relative w-full h-full overflow-hidden"
            style={{
              borderRadius: 10,
              background: on ? '#000' : '#111',
              boxShadow: 'inset 0 0 20px rgba(0,0,0,0.9), 0 0 0 2px #0a0a0a',
            }}
          >
            {on ? (
              <>
                <iframe
                  key={`${channel}-${on}`}
                  src={CHANNELS[channel].url}
                  title={`Chaîne ${CHANNELS[channel].label}`}
                  className="absolute inset-0 w-full h-full border-0"
                  allow="autoplay; encrypted-media"
                  style={{
                    filter: `blur(0.3px) saturate(1.15) contrast(1.05) ${vhsEffect ? 'hue-rotate(5deg)' : ''}`,
                    transform: 'scale(1.04)',
                  }}
                />
                {/* Scanlines overlay */}
                {scanlines && (
                  <div
                    aria-hidden
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 4px)',
                      zIndex: 2,
                    }}
                  />
                )}
                {/* Glass reflection */}
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(145deg, rgba(255,255,255,0.07) 0%, transparent 50%)',
                    zIndex: 3,
                    borderRadius: 10,
                  }}
                />
              </>
            ) : (
              /* Static noise when off */
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  background: 'radial-gradient(ellipse at 40% 35%, rgba(60,60,60,0.7) 0%, #000 70%)',
                }}
              >
                <div className="text-gray-600 text-xs font-mono opacity-50">NO SIGNAL</div>
              </div>
            )}
          </div>

          {/* Brand plate */}
          <div className="absolute bottom-2 right-4 text-[8px] text-gray-500 font-bold tracking-widest uppercase opacity-40">
            EthanOS CRT-29
          </div>
        </div>

        {/* Controls */}
        <div
          className="w-full shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{
            background: 'rgba(255,255,255,0.5)',
            border: '1px solid rgba(186,230,253,0.5)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.8)',
          }}
        >
          {/* Channels */}
          <div className="flex gap-1 flex-wrap flex-1">
            {CHANNELS.map((ch, i) => (
              <button
                key={ch.id}
                onClick={() => { setChannel(i); if (!on) setOn(true); }}
                className="px-2 py-1 text-[10px] rounded-md font-medium transition-all"
                style={channel === i && on ? {
                  background: 'linear-gradient(180deg,#5cd683 0%,#4ecb71 49.9%,#2d8a4a 50%,#1f6e36 100%)',
                  color: 'white',
                  boxShadow: '0 2px 6px rgba(45,138,74,0.4)',
                } : {
                  background: 'rgba(255,255,255,0.6)',
                  color: '#374151',
                  border: '1px solid rgba(186,230,253,0.6)',
                }}
              >
                {ch.label}
              </button>
            ))}
          </div>

          {/* Toggles */}
          <div className="flex gap-1 shrink-0">
            <button
              onClick={() => setScanlines(p => !p)}
              title="Scanlines"
              className="px-2 py-1 text-[10px] rounded-md font-medium transition-all"
              style={scanlines ? {
                background: 'rgba(14,165,233,0.15)',
                color: '#0369a1',
                border: '1px solid rgba(125,211,252,0.5)',
              } : {
                background: 'rgba(255,255,255,0.4)',
                color: '#9ca3af',
                border: '1px solid rgba(186,230,253,0.4)',
              }}
            >
              Scan
            </button>
            <button
              onClick={() => setVhsEffect(p => !p)}
              title="Effet VHS"
              className="px-2 py-1 text-[10px] rounded-md font-medium transition-all"
              style={vhsEffect ? {
                background: 'rgba(139,92,246,0.15)',
                color: '#7c3aed',
                border: '1px solid rgba(167,139,250,0.5)',
              } : {
                background: 'rgba(255,255,255,0.4)',
                color: '#9ca3af',
                border: '1px solid rgba(186,230,253,0.4)',
              }}
            >
              VHS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
