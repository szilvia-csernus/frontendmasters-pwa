// v1

const assets = [
	'/',
	'styles.css',
	'app.js',
	'sw-register.js',
	'https://fonts.gstatic.com/s/materialicons/v67/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2',
];

// 'self' used instead of 'this', it's safer to use
// self is the service worker itself
self.addEventListener('install', function(event) {
    caches.open('assets').then(function(cache) {
      return cache.addAll(assets);
    })
});
