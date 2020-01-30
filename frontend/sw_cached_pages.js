const cacheName = 'v2';

const cacheAssets = [
    './src/pages/home.html',
    './src/pages/index.html',
    './src/pages/footer.html',
    './src/pages/login.html',
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
    './src/js/login.js',
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
    // Remove unwanted caches
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        // console.log('Service Worker: Clearing Old Cache');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', async e => {
    const req = e.request;
    const url = new URL(req.url);

    if (url.origin === location.origin) {
        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkAndCache(req));
    }
});

async function cacheFirst(req) {
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req) {
    const cache = await caches.open(cacheName);
    try {
        const fresh = await fetch(req);
        await cache.put(req, fresh.clone());
        return fresh;
    } catch (e) {
        const cached = await cache.match(req);
        return cached;
    }
}