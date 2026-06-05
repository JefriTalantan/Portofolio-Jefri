const CACHE_NAME = 'portfolio-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/vite.svg',
];

// Install event: pre-cache critical shell assets
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate event: clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event: serve cached content or fetch and cache dynamically
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Avoid caching non-HTTP/HTTPS requests (e.g. chrome-extension or external analytics)
  if (!url.protocol.startsWith('http')) return;

  // Caching Strategy:
  // - Images and Fonts: Cache First (very static, large assets)
  // - HTML/CSS/JS/JSON: Stale-While-Revalidate (always load fast, update in bg)
  if (
    e.request.destination === 'image' ||
    e.request.destination === 'font' ||
    url.pathname.includes('/image/')
  ) {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(e.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) return networkResponse;

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, responseToCache);
          });
          return networkResponse;
        });
      })
    );
  } else {
    // Stale-While-Revalidate for script, style, document, json
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        const fetchPromise = fetch(e.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, responseToCache);
            });
          }
          return networkResponse;
        }).catch(() => {
          // Silent catch for network offline
        });

        return cachedResponse || fetchPromise;
      })
    );
  }
});
