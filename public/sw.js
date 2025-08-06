// Simple Service Worker for PWA
const CACHE_NAME = 'pwa-cache-v1';
const urlsToCache = [
    '/',
    '/build/assets/app.css',
    '/build/assets/app.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Install event
self.addEventListener('install', (event) => {
    console.log('Service Worker installing');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Caching app shell');
                return cache.addAll(urlsToCache);
            })
    );
});

// Activate event
self.addEventListener('activate', (event) => {
    console.log('Service Worker activating');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Fetch event
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // If found in cache, return it (for static assets and navigation requests)
            if (response) {
                return response;
            }
            // Otherwise, try to fetch from network and cache it if successful
            return fetch(event.request)
                .then((networkResponse) => {
                    // Only cache successful, basic (same-origin) responses
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        return networkResponse;
                    }
                    const responseToCache = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseToCache);
                    });
                    return networkResponse;
                })
                .catch(() => {
                    // If offline and request is for a navigation or static asset, return cached index.html or fallback
                    if (event.request.mode === 'navigate') {
                        return caches.match('/');
                    }
                    // Optionally, handle other asset types (e.g. images) with a fallback
                });
        })
    );
});