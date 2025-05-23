const CACHE_NAME = 'job-tracker-cache-v2'; // Incremented version for updates
const URLS_TO_PRECACHE = [
  '/',
  '/index.html',
  '/public/output.css',
  '/manifest.json',
//   '/public/icons/icon-192.svg',
//   '/public/icons/icon-512.svg',
  // Placeholder images - they will be cached on first load by the fetch handler
  // 'https://picsum.photos/seed/emptycompanies/300/200',
  // 'https://picsum.photos/seed/emptyapps/300/200',
  // 'https://picsum.photos/seed/emptyreferences/300/200',
  // 'https://picsum.photos/seed/dashboardjobtracker/600/300',
];

// Install event: cache core assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Service Worker: Caching app shell');
        return cache.addAll(URLS_TO_PRECACHE);
      })
      .then(() => {
        return self.skipWaiting(); // Force activation of new SW
      })
      .catch(error => {
        console.error('Service Worker: Pre-caching failed:', error);
      })
  );
});

// Activate event: clean up old caches and take control
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('Service Worker: Clearing old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => {
      return self.clients.claim(); // Take control of all clients
    })
  );
});

// Fetch event: serve from cache or network, and cache new assets
self.addEventListener('fetch', event => {
  // We only want to cache GET requests.
  if (event.request.method !== 'GET') {
    return;
  }

  // For HTML navigation requests, try network first, then cache, then fallback to /index.html
  if (event.request.mode === 'navigate' && event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      fetch(event.request)
        .then(networkResponse => {
          // If fetch is successful, clone and cache it
          if (networkResponse && networkResponse.ok) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // If network fails, try to serve from cache
          return caches.match(event.request)
            .then(cachedResponse => {
              return cachedResponse || caches.match('/index.html'); // Fallback to root index.html
            });
        })
    );
    return;
  }

  // For other requests (CSS, JS, images, etc.), use a cache-first, then network strategy
  // And cache successful network responses.
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        if (cachedResponse) {
          // console.log('Service Worker: Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // console.log('Service Worker: Fetching from network:', event.request.url);
        return fetch(event.request).then(
          networkResponse => {
            if (!networkResponse || networkResponse.status !== 200) {
              // For esm.sh, type opaque is also fine, but we want to cache 'basic' or 'cors'
              if (networkResponse && (networkResponse.type === 'opaque' && event.request.url.includes('esm.sh'))) {
                // Allow opaque responses from esm.sh to be cached
              } else if (!networkResponse || networkResponse.status !== 200 || (networkResponse.type !== 'basic' && networkResponse.type !== 'cors')) {
                return networkResponse; // Don't cache errors or non-cors/basic types unless specifically handled
              }
            }
            
            const responseToCache = networkResponse.clone();
            const requestUrl = event.request.url;

            // Cache responses from our origin, esm.sh, and picsum.photos
            if (requestUrl.startsWith(self.location.origin) || 
                requestUrl.startsWith('https://esm.sh/') ||
                requestUrl.startsWith('https://picsum.photos/')) {
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                  // console.log('Service Worker: Cached new resource:', event.request.url);
                });
            }
            return networkResponse;
          }
        ).catch(error => {
          console.error('Service Worker: Fetching failed:', event.request.url, error);
          // REVIEW: provide a fallback for specific asset types, e.g., an offline image
        });
      })
  );
});
