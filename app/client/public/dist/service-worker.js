var cacheName = "TargetApp-v1";
var contentToCache = [
    './logo-speedrace.png',
    './192.png',
    './512.png',
    './4f0283c6ce28e888000e978e537a6a56.png',
    './44a526eed258222515aa21eaffd14a96.png',
    './401d815dc206b8dc1b17cd0e37695975.png',
    './2273e3d8ad9264b7daa5bdbf8e6b47f8.png',
    './a6137456ed160d7606981aa57c559898.png',
    './index.html'
]

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil(
        caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching all: app shell and content');
            return cache.addAll(contentToCache);
        })
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
      caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
          if(key !== cacheName) {
            return caches.delete(key);
          }
        }));
      })
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
      caches.match(e.request).then((r) => {
            console.log('[Service Worker] Fetching resource: '+e.request.url);
        return r || fetch(e.request).then((response) => {
                  return caches.open(cacheName).then((cache) => {
            console.log('[Service Worker] Caching new resource: '+e.request.url);
            cache.put(e.request, response.clone());
            return response;
          });
        });
      })
    );
});