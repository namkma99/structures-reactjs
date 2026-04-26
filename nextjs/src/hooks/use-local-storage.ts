"use client";

import { useEffect, useState } from "react";

const STORAGE_VERSION = "v1";
const versionedKey = (key: string) => `${key}:${STORAGE_VERSION}`;

export function useLocalStorage<T>(key: string, initialValue: T) {
  const storageKey = versionedKey(key);
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(storageKey);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(storedValue));
    } catch {
      // Storage can be unavailable in private browsing or quota-limited contexts.
    }
  }, [storageKey, storedValue]);

  return [storedValue, setStoredValue] as const;
}
