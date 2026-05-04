import React from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface SpotifyNowPlaying {
  isPlaying: boolean;
  title: string;
  artist: string;
  albumArt: string | null;
  progressMs: number;
  durationMs: number;
}

export interface SpotifyTopTrack {
  id: string;
  title: string;
  artist: string;
  albumArt: string | null;
}

export interface SpotifyRecentlyPlayedTrack {
  id: string;
  title: string;
  artist: string;
  albumArt: string | null;
  playedAt: string;
  durationMs: number;
}

export interface SpotifyRecentlyStats {
  topGenres: { name: string; count: number }[];
  topArtists: { name: string; count: number }[];
  totalMinutes: number;
  uniqueArtists: number;
}

export interface MusicReco {
  title: string;
  artist: string;
  reason: string;
}

export interface AppWindow {
  id: string;
  title: string;
  icon: React.ElementType;
  component: React.ReactNode;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
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

  // Spotify
  spotifyNowPlaying: SpotifyNowPlaying | null;
  spotifyTopTracks: SpotifyTopTrack[];
  spotifyIsListening: boolean;
  spotifyRecentlyPlayed: SpotifyRecentlyPlayedTrack[];
  spotifyRecentlyStats: SpotifyRecentlyStats | null;
  fetchNowPlaying: () => Promise<void>;
  fetchTopTracks: () => Promise<void>;
  fetchRecentlyPlayed: () => Promise<void>;
  tickSpotifyProgress: (deltaMs: number) => void;

  // Recommandations IA basées sur l'écoute récente
  musicRecos: MusicReco[];
  musicRecosLoading: boolean;
  musicRecosError: string | null;
  fetchMusicRecos: () => Promise<void>;
}

export const useOSStore = create<OSState>()(
  persist(
    (set, get) => ({
      windows: {},
      activeWindowId: null,
      maxZIndex: 10,
      wallpaper: 'https://frutigeraeroarchive.org/images/wallpapers/asadal_stock/asadal_stock_1.jpg',
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
                        component: window.component,
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

      // Spotify
      spotifyNowPlaying: null,
      spotifyTopTracks: [],
      spotifyIsListening: false,
      spotifyRecentlyPlayed: [],
      spotifyRecentlyStats: null,
      musicRecos: [],
      musicRecosLoading: false,
      musicRecosError: null,

      fetchNowPlaying: async () => {
        try {
          const res = await fetch('/api/spotify/now-playing');
          const data = await res.json();
          set({
            spotifyNowPlaying: data,
            spotifyIsListening: data?.isPlaying ?? false,
          });
        } catch {
          set({ spotifyNowPlaying: null, spotifyIsListening: false });
        }
      },

      fetchTopTracks: async () => {
        try {
          const res = await fetch('/api/spotify/top-tracks');
          const data = await res.json();
          set({ spotifyTopTracks: data ?? [] });
        } catch {
          set({ spotifyTopTracks: [] });
        }
      },

      // Avance la progression localement entre 2 fetchs pour fluidifier la barre.
      // Appelé toutes les secondes par le MusicPlayer quand isPlaying === true.
      // Le prochain fetchNowPlaying resync la valeur officielle.
      tickSpotifyProgress: (deltaMs: number) => set((state) => {
        if (!state.spotifyNowPlaying || !state.spotifyIsListening) return state;
        const np = state.spotifyNowPlaying;
        const next = Math.min(np.progressMs + deltaMs, np.durationMs);
        return { spotifyNowPlaying: { ...np, progressMs: next } };
      }),

      fetchRecentlyPlayed: async () => {
        try {
          const res = await fetch('/api/spotify/recently-played');
          const data = await res.json() as {
            tracks?: SpotifyRecentlyPlayedTrack[];
            topGenres?: { name: string; count: number }[];
            topArtists?: { name: string; count: number }[];
            totalMinutes?: number;
            uniqueArtists?: number;
          };
          set({
            spotifyRecentlyPlayed: data?.tracks ?? [],
            spotifyRecentlyStats: {
              topGenres: data?.topGenres ?? [],
              topArtists: data?.topArtists ?? [],
              totalMinutes: data?.totalMinutes ?? 0,
              uniqueArtists: data?.uniqueArtists ?? 0,
            },
          });
        } catch {
          set({ spotifyRecentlyPlayed: [], spotifyRecentlyStats: null });
        }
      },

      fetchMusicRecos: async () => {
        const state = get();
        if (state.spotifyRecentlyPlayed.length === 0 || !state.spotifyRecentlyStats) {
          set({ musicRecosError: "Pas d'historique d'écoute disponible." });
          return;
        }
        set({ musicRecosLoading: true, musicRecosError: null });
        try {
          const res = await fetch('/api/ai/music-recos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              tracks: state.spotifyRecentlyPlayed.map((t) => ({ title: t.title, artist: t.artist })),
              topGenres: state.spotifyRecentlyStats.topGenres,
              topArtists: state.spotifyRecentlyStats.topArtists,
            }),
          });
          if (!res.ok) {
            set({ musicRecosLoading: false, musicRecosError: 'Indisponible pour le moment.' });
            return;
          }
          const data = await res.json() as { recos?: MusicReco[]; error?: string };
          if (data.error || !Array.isArray(data.recos)) {
            set({ musicRecosLoading: false, musicRecosError: data.error ?? 'Réponse inattendue.' });
            return;
          }
          set({ musicRecos: data.recos, musicRecosLoading: false });
        } catch {
          set({ musicRecosLoading: false, musicRecosError: 'Erreur réseau.' });
        }
      },
    }),

    {
      name: 'ethanos-storage',
      partialize: (state) => ({ wallpaper: state.wallpaper }),
    }
  )
);