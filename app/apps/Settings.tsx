import React from 'react';
import { useOSStore } from '@/app/store/useOSStore';
import { User, Monitor, Image as ImageIcon, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { portfolio } from '@/app/data/portfolio';

const wallpapers = [
  { id: 1, url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80", name: "Abstrait Bleu" },
  { id: 2, url: "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80", name: "Montagnes Dark" },
  { id: 3, url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80", name: "Alpin" },
  { id: 4, url: "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80", name: "Espace" },
  { id: 5, url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80", name: "Synthwave" },
  { id: 6, url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80", name: "Nature" },
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
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><ImageIcon /> Fonds d'écran</h2>
            <div className="grid grid-cols-3 gap-4">
              {wallpapers.map((wp) => (
                <div
                  key={wp.id}
                  onClick={() => setWallpaper(wp.url)}
                  className={`
                    aspect-video rounded-lg overflow-hidden cursor-pointer border-4 transition-all hover:scale-105
                    ${wallpaper === wp.url ? 'border-blue-500 shadow-xl scale-105' : 'border-transparent hover:border-gray-300'}
                  `}
                >
                  <img src={wp.url} alt={wp.name} className="w-full h-full object-cover" />
                  <div className="text-xs text-center mt-1 font-medium text-gray-600">{wp.name}</div>
                </div>
              ))}
            </div>
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
