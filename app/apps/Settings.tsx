import React from 'react';
import { useOSStore } from '@/app/store/useOSStore';
import { User, Monitor, Image as ImageIcon, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { portfolio } from '@/app/data/portfolio';

const ARCHIVE_BASE = "https://frutigeraeroarchive.org/images/wallpapers";

const wallpapers = [
  { id: 1, url: `${ARCHIVE_BASE}/asadal_stock/asadal_stock_1.jpg`, name: "Asadal 1", tag: "aero" },
  { id: 2, url: `${ARCHIVE_BASE}/asadal_stock/asadal_stock_2.jpg`, name: "Asadal 2", tag: "aero" },
  { id: 3, url: `${ARCHIVE_BASE}/asadal_stock/asadal_stock_5.jpg`, name: "Asadal 5", tag: "aero" },
  { id: 4, url: `${ARCHIVE_BASE}/asadal_stock/asadal_stock_6.jpg`, name: "Asadal 6", tag: "aero" },
  { id: 5, url: `${ARCHIVE_BASE}/windows_7/windows_7_1.jpg`, name: "Windows 7 - 1", tag: "win7" },
  { id: 6, url: `${ARCHIVE_BASE}/windows_7/windows_7_2.jpg`, name: "Windows 7 - 2", tag: "win7" },
  { id: 7, url: `${ARCHIVE_BASE}/windows_7/windows_7_3.jpg`, name: "Windows 7 - 3", tag: "win7" },
  { id: 8, url: `${ARCHIVE_BASE}/windows_7/windows_7_4.jpg`, name: "Windows 7 - 4", tag: "win7" },
  { id: 9, url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920", name: "Abstrait Bleu", tag: "dark" },
  { id: 10, url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920", name: "Galaxie", tag: "dark" },
];

const TAG_LABELS: Record<string, string> = {
  aero: 'Frutiger Aero (Asadal Stock)',
  win7: 'Windows 7',
  dark: 'Sombre',
};

export const SettingsApp = () => {
  const { wallpaper, setWallpaper } = useOSStore();
  const [activeTab, setActiveTab] = React.useState('display');

  const tabs = [
    { id: 'display', label: 'Affichage', icon: Monitor },
    { id: 'profile', label: 'Profil', icon: User },
  ];

  return (
    <div className="flex h-full aero-app overflow-hidden">
      {/* Sidebar */}
      <div
        className="w-44 flex flex-col pt-3 gap-0.5 px-2 shrink-0"
        style={{
          background: 'linear-gradient(180deg,rgba(255,255,255,0.6) 0%,rgba(219,234,254,0.5) 100%)',
          backdropFilter: 'blur(10px)',
          borderRight: '1px solid rgba(186,230,253,0.5)',
        }}
      >
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-all text-left"
            style={
              activeTab === id
                ? {
                    background: 'rgba(255,255,255,0.8)',
                    color: '#0284c7',
                    fontWeight: 600,
                    boxShadow: '0 1px 4px rgba(14,165,233,0.15)',
                    border: '1px solid rgba(125,211,252,0.4)',
                  }
                : { color: '#475569' }
            }
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* Contenu */}
      <div className="flex-1 overflow-auto p-5">
        {activeTab === 'display' && (
          <div>
            <h2 className="text-base font-bold text-sky-900 mb-0.5 flex items-center gap-2">
              <ImageIcon size={16} className="text-sky-500" /> Fonds d'écran
            </h2>
            <p className="text-xs text-sky-500/70 mb-5">
              Cliquez pour appliquer · Plus de fonds : frutigeraeroarchive.org
            </p>

            {(['aero', 'win7', 'dark'] as const).map(tag => (
              <div key={tag} className="mb-6">
                <div
                  className="mb-3 text-[11px] font-bold uppercase tracking-wider px-2 py-1 rounded-lg inline-block"
                  style={{ background: 'rgba(14,165,233,0.1)', color: '#0284c7', border: '1px solid rgba(14,165,233,0.2)' }}
                >
                  {TAG_LABELS[tag]}
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {wallpapers.filter(w => w.tag === tag).map(wp => (
                    <div
                      key={wp.id}
                      onClick={() => setWallpaper(wp.url)}
                      className="cursor-pointer rounded-xl overflow-hidden transition-all hover:scale-105"
                      style={{
                        border: wallpaper === wp.url
                          ? '3px solid #0ea5e9'
                          : '2px solid rgba(186,230,253,0.4)',
                        boxShadow: wallpaper === wp.url
                          ? '0 0 0 1px rgba(14,165,233,0.3), 0 4px 12px rgba(14,165,233,0.25)'
                          : '0 2px 6px rgba(0,0,0,0.06)',
                      }}
                    >
                      <div className="aspect-video overflow-hidden">
                        <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                      <div
                        className="text-[10px] text-center py-1 font-medium"
                        style={{
                          background: 'rgba(255,255,255,0.7)',
                          color: wallpaper === wp.url ? '#0284c7' : '#475569',
                        }}
                      >
                        {wp.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="flex flex-col items-center gap-5">
            <div
              className="w-24 h-24 rounded-full overflow-hidden mt-2"
              style={{
                border: '4px solid rgba(255,255,255,0.9)',
                boxShadow: '0 4px 16px rgba(14,165,233,0.25), 0 0 0 1px rgba(14,165,233,0.2)',
              }}
            >
              <img src={portfolio.avatar} alt={portfolio.fullName} className="w-full h-full object-cover" />
            </div>
            <div className="text-center">
              <h2 className="text-xl font-bold text-sky-900">{portfolio.fullName}</h2>
              <p className="text-sky-600 text-sm font-medium">{portfolio.title}</p>
              <div className="flex items-center justify-center gap-1 text-sky-500/70 text-xs mt-1">
                <MapPin size={11} /> {portfolio.location}
              </div>
            </div>

            <div
              className="w-full max-w-sm rounded-2xl p-4 flex flex-col gap-2"
              style={{
                background: 'rgba(255,255,255,0.7)',
                border: '1px solid rgba(186,230,253,0.5)',
                boxShadow: '0 2px 10px rgba(14,165,233,0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
              }}
            >
              <div className="text-[11px] font-bold text-sky-500 uppercase tracking-wider mb-1">Infos système</div>
              {[
                ['Système', 'EthanOS v1.1.0'],
                ['Framework', 'Next.js 16'],
                ['UI', 'React 19'],
                ['Animations', 'Framer Motion'],
              ].map(([label, value]) => (
                <div key={label} className="text-xs flex justify-between text-sky-800/80">
                  <span className="text-sky-500/70">{label}</span>
                  <span className="font-mono">{value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <a href={portfolio.github} target="_blank" rel="noopener noreferrer"
                className="p-2.5 text-white rounded-full transition-transform hover:scale-110"
                style={{ background: 'linear-gradient(135deg,#374151,#111827)', boxShadow: '0 2px 8px rgba(0,0,0,0.25)' }}
                aria-label="GitHub"
              >
                <Github size={17} />
              </a>
              <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-2.5 text-white rounded-full transition-transform hover:scale-110"
                style={{ background: 'linear-gradient(135deg,#2563eb,#1d4ed8)', boxShadow: '0 2px 8px rgba(37,99,235,0.35)' }}
                aria-label="LinkedIn"
              >
                <Linkedin size={17} />
              </a>
              <a href={`mailto:${portfolio.email}`}
                className="p-2.5 text-white rounded-full transition-transform hover:scale-110"
                style={{ background: 'linear-gradient(135deg,#ef4444,#dc2626)', boxShadow: '0 2px 8px rgba(239,68,68,0.35)' }}
                aria-label="Email"
              >
                <Mail size={17} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
