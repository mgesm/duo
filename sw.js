const CACHE_NAME = 'donde-comemos-v57';
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
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First para assets de la aplicación (evita que la PWA se quede congelada en versiones antiguas)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);
  const isAppAsset = url.pathname.endsWith('index.html') || 
                     url.pathname.endsWith('bundle.js') || 
                     url.pathname.endsWith('style.css') ||
                     url.pathname.endsWith('/');

  if (isAppAsset) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Cache-first con fallback a red para imágenes y recursos estáticos
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        }).catch(() => {
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        })
      );
    })
  );
});
