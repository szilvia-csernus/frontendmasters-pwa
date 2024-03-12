// v1

const assets = [
	'/',
	'styles.css',
	'app.js',
	'sw-register.js',
	'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
];

// Service Worker Installation
// 'self' used instead of 'this', it's safer to use
// self is the service worker itself
self.addEventListener("install", event => {
    // install the assets of my PWA
    event.waitUntil(
        caches.open("assets").then(cache => {
            return cache.addAll(assets);
        })
    );
    // self.skipWaiting(); // activate the service worker immediately
});


// Cache first strategy
// self.addEventListener("fetch", event => {
//   // respondWith accepts both a promise or a response
//     event.respondWith(
//         caches.match(event.request)  // searching in the cache
//             .then( response => {
//                 if (response) {
//                     // The request is in the cache 
//                     return response; // cache hit
//                 } else {
//                     // We need to go to the network  
//                     return fetch(event.request);  // cache miss
//                 }
//             })
//     );
// });

// Stale while revalidate strategy
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then( cachedResponse => {
                // Even if the response is in the cache, we fetch it
                // and update the cache for future usage
                const fetchPromise = fetch(event.request).then(
                     networkResponse => {
                        caches.open("assets").then( cache => {
                            cache.put(event.request, networkResponse.clone());
                        });
                    return networkResponse;
                    });
                // We use the currently cached version if it's there
                return cachedResponse || fetchPromise; // cached or a network fetch
            })
        );
    });