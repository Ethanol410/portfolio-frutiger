import { useEffect, useState } from "react";
import { useOSStore } from "@/app/store/useOSStore";

const wallpapers = [
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80",
  "https://images.unsplash.com/photo-1477346611705-65d1883cee1e?q=80",
  "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80",
  "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80",
];

export const ContextMenu = () => {
  const { setWallpaper, addNotification } = useOSStore();
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setVisible(true);
      setPosition({ x: e.pageX, y: e.pageY });
    };

    const handleClick = () => setVisible(false);

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleNewFolder = () => {
    addNotification({
      title: "Permission refusée",
      message: "Vous n'avez pas les droits pour créer un dossier ici.",
      type: 'error'
    });
  };

  const handleChangeWallpaper = () => {
    const random = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    setWallpaper(random);
  };

  const handleProperties = () => {
    addNotification({
      title: "Propriétés du système",
      message: "EthanOS v1.1.0 · React 19 · Next.js 16 · Framer Motion",
      type: 'info'
    });
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bg-white/90 backdrop-blur border border-gray-400 shadow-xl rounded py-1 w-48 z-[9999] text-gray-800"
      style={{ top: position.y, left: position.x }}
    >
      <div onClick={handleRefresh} className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-pointer text-sm">Actualiser</div>
      <div className="border-t border-gray-300 my-1" />
      <div onClick={handleNewFolder} className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-pointer text-sm">Nouveau dossier</div>
      <div onClick={handleChangeWallpaper} className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-pointer text-sm">Changer le fond d'écran</div>
      <div className="border-t border-gray-300 my-1" />
      <div onClick={handleProperties} className="px-4 py-1 hover:bg-blue-500 hover:text-white cursor-pointer text-sm">Propriétés</div>
    </div>
  );
};
