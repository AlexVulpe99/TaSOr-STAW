const cacheName = 'v1';

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

// Call Install Event
self.addEventListener('install', e => {
    //console.log('Service Worker: Installed');

    e.waitUntil(
        caches
        .open(cacheName)
        .then(cache => {
            // console.log('Service Worker: Caching Files');
            cache.addAll(cacheAssets);
        })
        .then(() => self.skipWaiting())
    );
});

// Call Activate Event
self.addEventListener('activate', e => {
    // console.log('Service Worker: Activated');
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

// Call Fetch Event
self.addEventListener('fetch', (e) => {
    // console.log('Service Worker: Fetching')
    if (e.request.url.indexOf(location.origin) === 0) {
        const clonedRequest = e.request.clone();
        e.respondWith(
            caches.match(e.request)
            .then(resp => resp || fetch(clonedRequest))
        );
    }
});