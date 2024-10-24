const CACHE_NAME = 'offline-cache-v1';
const OFFLINE_URL = 'index.html';

// Files to cache
const FILES_TO_CACHE = [
    OFFLINE_URL,
    'styles.css',
    'script.js',
];

// Install event - cache files
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

// Fetch event - serve cached files
self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        // Navigate requests (page reloads)
        event.respondWith(
            fetch(event.request).catch(() => {
                return caches.match(OFFLINE_URL);
            })
        );
    } else {
        // Other requests
        event.respondWith(
            caches.match(event.request).then((response) => {
                return response || fetch(event.request);
            })
        );
    }
});