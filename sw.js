const CACHE_NAME = 'donde-comemos-v41';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './bundle.js',
  './manifest.json',
  './duo_icon.svg',
  './mcdonalds.png',
  './burger_king.png',
  './kfc.png',
  './popeyes.png',
  './unica.png',
  './kebab.png',
  './telepizza.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        })
      );
    })
  );
});
