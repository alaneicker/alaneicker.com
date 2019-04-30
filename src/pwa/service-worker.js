(function () {

  'use strict';

  var cacheName = 'node-alaneicker-com';
  var filesToCache = [
    './',
    '/styles/app.css',
    '/scripts/app.js',
    '/images/brew-review-home-min.png'
  ];

  self.addEventListener('install', e => {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
    );
  });

  self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    var dataUrl = 'https://alaneicker.com';
    if (e.request.url.indexOf(dataUrl) === 0) {
      e.respondWith(
        fetch(e.request)
          .then(function(response) {
            return caches.open(cacheName).then(function(cache) {
              cache.put(e.request.url, response.clone());
              console.log('[ServiceWorker] Fetched & Cached Data');
              return response;
            });
          })
      );
    } else {
      e.respondWith(
        caches.match(e.request).then(function(response) {
          return response || fetch(e.request);
        })
      );
    }
  });

}());