"use client";

import { create } from "zustand";
import {
  createJSONStorage,
  devtools,
  persist,
  type StateStorage,
} from "zustand/middleware";
import type { ThemeMode, User } from "@/types/common";

type AppState = {
  theme: ThemeMode;
  toggleTheme: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
};

const noopStorage: StateStorage = {
  getItem: () => null,
  removeItem: () => undefined,
  setItem: () => undefined,
};

const getClientStorage = () => {
  if (typeof window === "undefined") return noopStorage;
  return window.localStorage;
};

export const useAppStore = create<AppState>()(
  devtools(
    persist(
      (set) => ({
        theme: "light",
        toggleTheme: () =>
          set(
            (state) => ({ theme: state.theme === "light" ? "dark" : "light" }),
            false,
            "toggleTheme"
          ),
        user: null,
        setUser: (user) => set({ user }, false, "setUser"),
      }),
      {
        name: "app-storage",
        partialize: (state) => ({ theme: state.theme, user: state.user }),
        storage: createJSONStorage(getClientStorage),
        version: 1,
      }
    ),
    {
      enabled: process.env.NODE_ENV === "development",
      name: "AppStore",
    }
  )
);
