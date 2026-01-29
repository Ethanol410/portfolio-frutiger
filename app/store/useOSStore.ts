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

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'error';
}

interface OSState {
  windows: Record<string, AppWindow>;
  activeWindowId: string | null;
  maxZIndex: number;
  wallpaper: string;
  notifications: Notification[];
  isLocked: boolean;
  isCrashed: boolean; // <-- Nouveau

  // Actions
  launchApp: (id: string) => void;
  closeApp: (id: string) => void;
  focusApp: (id: string) => void;
  minimizeApp: (id: string) => void;
  toggleMaximizeApp: (id: string) => void;
  addWindow: (window: AppWindow) => void;
  setWallpaper: (url: string) => void;
  addNotification: (notif: Omit<Notification, 'id'>) => void; 
  removeNotification: (id: string) => void; 
  setLocked: (locked: boolean) => void;
  setCrashed: (crashed: boolean) => void; // <-- Nouveau
}

export const useOSStore = create<OSState>()(
  persist(
    (set) => ({
      windows: {},
      activeWindowId: null,
      maxZIndex: 10,
      wallpaper: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80',
      notifications: [],
      isLocked: true,
      isCrashed: false, // <-- Défaut

      launchApp: (id) => set((state) => {
        const win = state.windows[id];
        if (!win) return state;
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

      addNotification: (notif: Omit<Notification, 'id'>) => {
        const { title, message, type } = notif;
        const id = Math.random().toString(36).substring(7);
        set((state) => ({ notifications: [...state.notifications, { id, title, message, type }] }));
        setTimeout(() => {
          set((s) => ({ notifications: s.notifications.filter((n) => n.id !== id) }));
        }, 5000);
      },

      removeNotification: (id) => set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id)
      })),
      
      setLocked: (locked) => set({ isLocked: locked }),
      setCrashed: (crashed) => set({ isCrashed: crashed }), // <-- Action
    }),

    {
      name: 'ethanos-storage',
      partialize: (state) => ({ wallpaper: state.wallpaper }),
    }
  )
);