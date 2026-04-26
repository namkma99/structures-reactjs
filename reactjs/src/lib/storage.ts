const STORAGE_VERSION = 'v1';
const AUTH_TOKEN_KEY = `auth.token:${STORAGE_VERSION}`;
const LEGACY_AUTH_TOKEN_KEY = 'token';

const getLocalStorage = () => {
  if (typeof window === 'undefined') return null;
  return window.localStorage;
};

export const authTokenStorage = {
  get: () => {
    try {
      const storage = getLocalStorage();
      if (!storage) return null;

      const token = storage.getItem(AUTH_TOKEN_KEY);
      if (token) return token;

      const legacyToken = storage.getItem(LEGACY_AUTH_TOKEN_KEY);
      if (!legacyToken) return null;

      storage.setItem(AUTH_TOKEN_KEY, legacyToken);
      storage.removeItem(LEGACY_AUTH_TOKEN_KEY);
      return legacyToken;
    } catch {
      return null;
    }
  },

  set: (token: string) => {
    try {
      getLocalStorage()?.setItem(AUTH_TOKEN_KEY, token);
    } catch {
      // localStorage can be unavailable in private browsing or quota-limited contexts.
    }
  },

  clear: () => {
    try {
      const storage = getLocalStorage();
      storage?.removeItem(AUTH_TOKEN_KEY);
      storage?.removeItem(LEGACY_AUTH_TOKEN_KEY);
    } catch {
      // Ignore storage failures during auth cleanup.
    }
  },
};
