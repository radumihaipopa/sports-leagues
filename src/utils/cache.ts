type CacheStore = Record<string, unknown>;

const store: CacheStore = {};

/**
 * Get a cached value by key.
 * Returns null if the key does not exist.
 */
export const getCache = <T>(key: string): T | null => {
    if (key in store) {
        return store[key] as T;
    }
    return null;
};

/**
 * Set a value in the cache.
 */
export const setCache = <T>(key: string, value: T): void => {
    store[key] = value;
};

/**
 * Check if a key exists in the cache.
 */
export const hasCache = (key: string): boolean => {
    return key in store;
};