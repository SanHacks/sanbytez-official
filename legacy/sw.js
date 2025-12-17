const CACHE_NAME = 'sanbytez-cache-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/css/custom.css',
  '/assets/css/lineicons.css',
  '/assets/css/cookie-consent.css',
  '/assets/js/main.js',
  '/assets/js/services-data.js',
  '/assets/js/contact-form.js',
  '/assets/js/cookie-consent.js',
  '/assets/images/logo/SanBytez-horizontal.png',
  '/assets/images/favicon.svg',
  'https://cdn.tailwindcss.com'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });

            return response;
          });
      })
  );
});
