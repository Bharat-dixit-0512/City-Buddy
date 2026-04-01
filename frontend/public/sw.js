const STATIC_CACHE = "citybuddy-static-v1";
const RUNTIME_CACHE = "citybuddy-runtime-v1";
const API_CACHE = "citybuddy-api-v1";
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.webmanifest",
  "/citybuddylogo.png",
  "/cityWallpaper.jpg",
  "/cityWallpaper2.jpg",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  const allowedCaches = [STATIC_CACHE, RUNTIME_CACHE, API_CACHE];

  event.waitUntil(
    caches
      .keys()
      .then((cacheKeys) =>
        Promise.all(
          cacheKeys
            .filter((cacheKey) => !allowedCaches.includes(cacheKey))
            .map((cacheKey) => caches.delete(cacheKey))
        )
      )
      .then(() => self.clients.claim())
  );
});

const cacheResponse = async (cacheName, request, response) => {
  if (!response || (!response.ok && response.type !== "opaque")) {
    return response;
  }

  const cache = await caches.open(cacheName);
  cache.put(request, response.clone());
  return response;
};

const staleWhileRevalidate = async (request, cacheName) => {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  const networkResponsePromise = fetch(request)
    .then((response) => cacheResponse(cacheName, request, response))
    .catch(() => null);

  if (cachedResponse) {
    networkResponsePromise;
    return cachedResponse;
  }

  return (await networkResponsePromise) || Response.error();
};

const networkFirstNavigation = async (request) => {
  const cache = await caches.open(STATIC_CACHE);

  try {
    const response = await fetch(request);
    await cacheResponse(STATIC_CACHE, request, response);
    return response;
  } catch {
    return (
      (await cache.match(request)) ||
      (await cache.match("/index.html")) ||
      Response.error()
    );
  }
};

const isApiRequest = (requestUrl, request) =>
  request.method === "GET" &&
  ["/home", "/places", "/search"].some((path) =>
    requestUrl.pathname.startsWith(path)
  );

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method !== "GET") {
    return;
  }

  const requestUrl = new URL(request.url);

  if (request.mode === "navigate") {
    event.respondWith(networkFirstNavigation(request));
    return;
  }

  if (request.destination === "image") {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
    return;
  }

  if (isApiRequest(requestUrl, request)) {
    event.respondWith(staleWhileRevalidate(request, API_CACHE));
    return;
  }

  if (requestUrl.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(request, RUNTIME_CACHE));
  }
});
