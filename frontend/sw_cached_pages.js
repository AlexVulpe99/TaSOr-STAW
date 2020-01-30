const cacheName = 'v2';

const cacheAssets = [
    './src/pages/home.html',
    './src/pages/footer.html',
    './src/pages/navbar.html',
    './src/pages/new-task.html',
    './src/pages/statistics.html',
    './src/css/footer.css',
    './src/css/home.css',
    './src/css/login.css',
    './src/css/main.css',
    './src/css/navbar.css',
    './src/css/new-task.css',
    './src/css/statistics.css',
    './src/js/home.js',
    './src/js/main.js',
    './src/js/new-task.js',
    './src/js/statistics.js',
    './src/index.js'
];

self.addEventListener('install', async e => {
    const cache = await caches.open(cacheName);
    await cache.addAll(cacheAssets);
    return self.skipWaiting();
});

self.addEventListener('activate', e => {
    self.clients.claim();
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function onFetch(event) {
    if (event.request.url.indexOf(location.origin) === 0) {
        event.respondWith(cacheOrNetwork(event));
    }
});

function cacheOrNetwork(event) {
    const clonedRequest = event.request.clone();
    return caches.match(event.request).then(resp => resp || fetch(clonedRequest));
}

function networkOrCache(event) {
    const clonedRequest = event.request.clone();
    return fetch(event.request).catch(err => caches.match(clonedRequest));
}