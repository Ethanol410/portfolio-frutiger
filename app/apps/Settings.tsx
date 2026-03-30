import React from 'react';
import { useOSStore } from '@/app/store/useOSStore';
import { User, Monitor, Image as ImageIcon, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { portfolio } from '@/app/data/portfolio';

const ARCHIVE_BASE = "https://frutigeraeroarchive.org/images/wallpapers";

const wallpapers = [
  // Frutiger Aero — Asadal Stock
  { id: 1, url: `${ARCHIVE_BASE}/asadal_stock/asadal_stock_1.jpg`, name: "Asadal 1", tag: "aero" },
  { id: 2, url: `${ARCHIVE_BASE}/asadal_stock/asadal_stock_2.jpg`, name: "Asadal 2", tag: "aero" },
  { id: 3, url: `${ARCHIVE_BASE}/asadal_stock/asadal_stock_5.jpg`, name: "Asadal 5", tag: "aero" },
  { id: 4, url: `${ARCHIVE_BASE}/asadal_stock/asadal_stock_6.jpg`, name: "Asadal 6", tag: "aero" },
  // Windows 7 — Frutiger Aero Archive
  { id: 5, url: `${ARCHIVE_BASE}/windows_7/windows_7_1.jpg`, name: "Windows 7 - 1", tag: "win7" },
  { id: 6, url: `${ARCHIVE_BASE}/windows_7/windows_7_2.jpg`, name: "Windows 7 - 2", tag: "win7" },
  { id: 7, url: `${ARCHIVE_BASE}/windows_7/windows_7_3.jpg`, name: "Windows 7 - 3", tag: "win7" },
  { id: 8, url: `${ARCHIVE_BASE}/windows_7/windows_7_4.jpg`, name: "Windows 7 - 4", tag: "win7" },
  // Sombre
  { id: 9, url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1920", name: "Abstrait Bleu", tag: "dark" },
  { id: 10, url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1920", name: "Galaxie", tag: "dark" },
];

export const SettingsApp = () => {
  const { wallpaper, setWallpaper } = useOSStore();
  const [activeTab, setActiveTab] = React.useState('display');

  return (
    <div className="flex h-full bg-gray-100">
      {/* Sidebar */}
      <div className="w-48 bg-gray-200 border-r border-gray-300 flex flex-col pt-4 gap-1 px-2">
        <button
          onClick={() => setActiveTab('display')}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded ${activeTab === 'display' ? 'bg-white shadow-sm font-medium' : 'hover:bg-gray-300/50'}`}
        >
          <Monitor size={16} /> Affichage
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-3 py-2 text-sm rounded ${activeTab === 'profile' ? 'bg-white shadow-sm font-medium' : 'hover:bg-gray-300/50'}`}
        >
          <User size={16} /> Profil
        </button>
      </div>

      {/* Contenu */}
      <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'display' && (
          <div>
            <h2 className="text-xl font-bold mb-1 flex items-center gap-2"><ImageIcon /> Fonds d'écran</h2>
            <p className="text-xs text-gray-400 mb-4">Cliquez pour appliquer · Pour plus de fonds Frutiger Aero : frutigeraeroarchive.org</p>

            {(['aero', 'win7', 'dark'] as const).map(tag => (
              <div key={tag}>
                <div className="mb-3 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  {tag === 'aero' ? 'Frutiger Aero — Asadal Stock' : tag === 'win7' ? 'Windows 7' : 'Sombre'}
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {wallpapers.filter(w => w.tag === tag).map((wp) => (
                    <div key={wp.id} onClick={() => setWallpaper(wp.url)}
                      className={`aspect-video rounded-lg overflow-hidden cursor-pointer border-4 transition-all hover:scale-105 ${wallpaper === wp.url ? 'border-blue-500 shadow-xl scale-105' : 'border-transparent hover:border-gray-300'}`}
                    >
                      <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" loading="lazy" />
                      <div className="text-xs text-center mt-1 font-medium text-gray-600">{wp.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="flex flex-col items-center gap-4">
            <img
              src={portfolio.avatar}
              alt={portfolio.fullName}
              className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-blue-100 mt-2"
            />
            <div className="text-center">
              <h2 className="text-xl font-bold text-gray-800">{portfolio.fullName}</h2>
              <p className="text-blue-600 text-sm">{portfolio.title}</p>
              <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mt-1">
                <MapPin size={12} /> {portfolio.location}
              </div>
            </div>

            <div className="w-full max-w-sm bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col gap-2">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Infos système</div>
              <div className="text-xs text-gray-600 flex justify-between">
                <span>Système</span><span className="font-mono">EthanOS v1.1.0</span>
              </div>
              <div className="text-xs text-gray-600 flex justify-between">
                <span>Framework</span><span className="font-mono">Next.js 16</span>
              </div>
              <div className="text-xs text-gray-600 flex justify-between">
                <span>UI</span><span className="font-mono">React 19</span>
              </div>
              <div className="text-xs text-gray-600 flex justify-between">
                <span>Animations</span><span className="font-mono">Framer Motion</span>
              </div>
            </div>

            <div className="flex gap-3">
              <a href={portfolio.github} target="_blank" rel="noopener noreferrer"
                className="p-2 bg-gray-800 text-white rounded-full hover:scale-110 transition-transform"
                aria-label="GitHub">
                <Github size={18} />
              </a>
              <a href={portfolio.linkedin} target="_blank" rel="noopener noreferrer"
                className="p-2 bg-blue-700 text-white rounded-full hover:scale-110 transition-transform"
                aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href={`mailto:${portfolio.email}`}
                className="p-2 bg-red-500 text-white rounded-full hover:scale-110 transition-transform"
                aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
