import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AppWindow {
  id: string;
  title: string;
  icon: any; // Lucide Icon type
  component: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  defaultPosition?: { x: number; y: number };
}

interface OSState {
  windows: Record<string, AppWindow>;
  activeWindowId: string | null;
  maxZIndex: number;
  wallpaper: string;

  // Actions
  launchApp: (id: string) => void;
  closeApp: (id: string) => void;
  focusApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  toggleMaximizeApp: (id: string) => void;
  addWindow: (window: AppWindow) => void;
  setWallpaper: (url: string) => void;
}

export const useOSStore = create<OSState>()(
  persist(
    (set) => ({
      windows: {}, // Sera rempli par votre config initiale ou dynamique
      activeWindowId: null,
      maxZIndex: 10,
      wallpaper: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80', // Ton fond actuel par défaut

      launchApp: (id) => set((state) => {
        const win = state.windows[id];
        if (!win) return state; // Sécurité si l'ID n'existe pas
        return {
          activeWindowId: id,
          maxZIndex: state.maxZIndex + 1,
          windows: {
            ...state.windows,
            [id]: { ...win, isOpen: true, isMinimized: false, zIndex: state.maxZIndex + 1 }
          }
        };
      }),

      closeApp: (id) => set((state) => ({
        windows: { ...state.windows, [id]: { ...state.windows[id], isOpen: false, isMaximized: false } }
      })),

      focusApp: (id) => set((state) => ({
        activeWindowId: id,
        maxZIndex: state.maxZIndex + 1,
        windows: { 
          ...state.windows, 
          [id]: { 
            ...state.windows[id], 
            zIndex: state.maxZIndex + 1,
            isMinimized: false
          } 
        }
      })),

      minimizeApp: (id) => set((state) => ({
        activeWindowId: null,
        windows: { ...state.windows, [id]: { ...state.windows[id], isMinimized: true } }
      })),

      toggleMaximizeApp: (id) => set((state) => ({
        windows: { ...state.windows, [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized } }
      })),

      addWindow: (window) => set((state) => {
        // Si la fenêtre existe déjà (ex: ID unique pour le navigateur), on la met juste au premier plan
        if (state.windows[window.id]) {
            return {
                activeWindowId: window.id,
                maxZIndex: state.maxZIndex + 1,
                windows: {
                    ...state.windows,
                    [window.id]: { 
                        ...state.windows[window.id], 
                        isOpen: true, 
                        isMinimized: false, 
                        zIndex: state.maxZIndex + 1 
                    }
                }
            };
        }
        // Sinon on l'ajoute
        return {
          activeWindowId: window.id,
          maxZIndex: state.maxZIndex + 1,
          windows: {
            ...state.windows,
            [window.id]: { ...window, isOpen: true, zIndex: state.maxZIndex + 1 }
          }
        };
      }),

      setWallpaper: (url: string) => set({ wallpaper: url }),
    }),
    {
      name: 'ethanos-storage', // Nom unique pour le localStorage
      // IMPORTANT : On ne sauvegarde QUE le wallpaper. 
      // Sauvegarder 'windows' ferait planter l'app car on ne peut pas stocker de composants React (JSX) dans le localStorage.
      partialize: (state) => ({ wallpaper: state.wallpaper }),
    }
  )
);