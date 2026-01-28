import React from 'react';
import { useOSStore } from '@/app/store/useOSStore';
import { User, Monitor, Image as ImageIcon } from 'lucide-react';

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
          <div className="text-center mt-10 text-gray-500">
            <User size={48} className="mx-auto mb-2 opacity-50" />
            <p>Gestion du profil utilisateur à venir...</p>
          </div>
        )}
      </div>
    </div>
  );
};