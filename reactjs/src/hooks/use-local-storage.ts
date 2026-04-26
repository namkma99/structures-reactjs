import { useState, useEffect } from 'react';

const STORAGE_VERSION = 'v1';
const versionedKey = (key: string) => `${key}:${STORAGE_VERSION}`;

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const storageKey = versionedKey(key);

  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(storedValue));
    } catch (error) {
      console.error(error);
    }
  }, [storageKey, storedValue]);

  return [storedValue, setStoredValue] as const;
};
