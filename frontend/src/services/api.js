import axios from "axios";

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:4001";

const CACHE_PREFIX = "citybuddy:cache:";
const CACHE_MISS = Symbol("cache-miss");
const memoryCache = new Map();

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("authToken");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

const buildCacheKey = (endpoint, params = {}) => {
  const searchParams = new URLSearchParams();

  Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey))
    .forEach(([key, value]) => {
      searchParams.set(key, String(value));
    });

  const query = searchParams.toString();
  return `${CACHE_PREFIX}${endpoint}${query ? `?${query}` : ""}`;
};

const readSessionEntry = (cacheKey) => {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const rawValue = window.sessionStorage.getItem(cacheKey);
    return rawValue ? JSON.parse(rawValue) : null;
  } catch {
    return null;
  }
};

const writeCacheEntry = (cacheKey, data) => {
  const entry = {
    timestamp: Date.now(),
    data,
  };

  memoryCache.set(cacheKey, entry);

  if (typeof window === "undefined") {
    return;
  }

  try {
    window.sessionStorage.setItem(cacheKey, JSON.stringify(entry));
  } catch {
    // Ignore storage quota failures and continue with in-memory caching.
  }
};

const removeCacheEntry = (cacheKey) => {
  memoryCache.delete(cacheKey);

  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.removeItem(cacheKey);
};

const readFreshCache = (cacheKey, ttl) => {
  const now = Date.now();
  const memoryEntry = memoryCache.get(cacheKey);

  if (memoryEntry && now - memoryEntry.timestamp < ttl) {
    return memoryEntry.data;
  }

  const sessionEntry = readSessionEntry(cacheKey);
  if (sessionEntry && now - sessionEntry.timestamp < ttl) {
    memoryCache.set(cacheKey, sessionEntry);
    return sessionEntry.data;
  }

  if (memoryEntry || sessionEntry) {
    removeCacheEntry(cacheKey);
  }

  return CACHE_MISS;
};

export const getCached = async (
  endpoint,
  { params = {}, ttl = 60_000, signal } = {}
) => {
  const cacheKey = buildCacheKey(endpoint, params);
  const cachedValue = readFreshCache(cacheKey, ttl);

  if (cachedValue !== CACHE_MISS) {
    return cachedValue;
  }

  const response = await api.get(endpoint, { params, signal });
  writeCacheEntry(cacheKey, response.data);

  return response.data;
};

export const invalidateCache = (...prefixes) => {
  const matchesPrefix = (cacheKey) =>
    prefixes.length === 0 ||
    prefixes.some((prefix) => cacheKey.startsWith(`${CACHE_PREFIX}${prefix}`));

  Array.from(memoryCache.keys())
    .filter(matchesPrefix)
    .forEach((cacheKey) => {
      removeCacheEntry(cacheKey);
    });

  if (typeof window === "undefined") {
    return;
  }

  Object.keys(window.sessionStorage)
    .filter((cacheKey) => cacheKey.startsWith(CACHE_PREFIX))
    .filter(matchesPrefix)
    .forEach((cacheKey) => {
      window.sessionStorage.removeItem(cacheKey);
    });
};
