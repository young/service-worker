/**
 * The cache name
 * @type {String}
 */
const CACHE_NAME = 'v7';

/**
 * Things to cache
 * @type {Array}
 */
const catCache = [
  '/service-worker/',
  '/service-worker/index.html',
  '/service-worker/manifest.json',
  '/service-worker/logo.png',
  '/service-worker/static/images/cat1.jpg',
  '/service-worker/static/images/cat2.jpg',
  '/service-worker/static/images/cat3.jpg',
  '/service-worker/static/images/cat4.jpg'
];

this.oninstall = (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(catCache);
      })
  );
};

this.onfetch = (event) => {
  event.respondWith(
    caches.open(CACHE_NAME)
    .then(cache => cache.match(event.request))
      .then(response => {
        if (response) {
          return response;
        }

        return fetch(event.request)
          .then((res) => {
            const r = res.clone();
            cache.put(event.request, r);
          return res; // Don't wait for the request to cache
          });
      })
    )
};

