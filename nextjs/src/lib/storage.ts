"use client";

const STORAGE_VERSION = "v1";

const getLocalStorage = () => {
  if (typeof window === "undefined") return null;
  return window.localStorage;
};

export const storage = {
  get: (key: string) => {
    try {
      return getLocalStorage()?.getItem(`${key}:${STORAGE_VERSION}`) ?? null;
    } catch {
      return null;
    }
  },
  set: (key: string, value: string) => {
    try {
      getLocalStorage()?.setItem(`${key}:${STORAGE_VERSION}`, value);
    } catch {
      // Ignore unavailable localStorage.
    }
  },
  remove: (key: string) => {
    try {
      getLocalStorage()?.removeItem(`${key}:${STORAGE_VERSION}`);
    } catch {
      // Ignore unavailable localStorage.
    }
  },
};
