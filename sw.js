const CACHE_NAME = 'sanbytez-cache-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/assets/css/lineicons.css',
  '/assets/css/cookie-consent.css',
  '/assets/js/services-data.js',
  '/assets/js/main.js',
  '/assets/js/contact-form.js',
  '/assets/js/cookie-consent.js',
  '/assets/images/logo/SanBytez-horizontal.png',
  '/assets/images/favicon.svg',
  '/assets/images/favicon-32x32.png',
  '/assets/images/favicon-16x16.png',
  '/assets/images/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await Promise.allSettled(urlsToCache.map((url) => cache.add(url)));
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => (key !== CACHE_NAME ? caches.delete(key) : Promise.resolve())));
      await self.clients.claim();
    })()
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;

  // Navigation: serve cached shell if available
  if (request.mode === 'navigate') {
    event.respondWith(
      (async () => {
        try {
          const network = await fetch(request);
          return network;
        } catch (_) {
          const cached = await caches.match('/index.html');
          return cached || Response.error();
        }
      })()
    );
    return;
  }

  // Only cache same-origin assets; let cross-origin requests pass through
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) return cached;

      const response = await fetch(request);
      if (!response || response.status !== 200) return response;

      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
      return response;
    })()
  );
});
