import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { ThemeMode, User } from '@/types/common';

interface AppState {
  theme: ThemeMode;
  toggleTheme: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'light',
        toggleTheme: () =>
          set(
            (state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' }),
            false,
            'toggleTheme'
          ),
        user: null,
        setUser: (user) => set({ user }, false, 'setUser'),
      }),
      {
        name: 'app-storage',
        version: 1,
        partialize: (state) => ({ theme: state.theme, user: state.user }),
      }
    ),
    {
      name: 'AppStore',
      // Only enable in development — Redux DevTools extension required
      enabled: import.meta.env.DEV,
    }
  )
);
