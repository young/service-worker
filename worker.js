/**
 * The cache name
 * @type {String}
 */
const CACHE_NAME = 'v7';

/**
 * Things to cache
 * @type {Array}
 */
const itemsToCache = [
  '/service-worker/',
  '/service-worker/index.html',
  '/service-worker/manifest.json',
  '/service-worker/logo.png',
  '/service-worker/static/images/cat1.jpg',
  '/service-worker/static/images/cat2.jpg',
  '/service-worker/static/images/cat3.jpg',
  '/service-worker/static/images/cat4.jpg'
];

/**
 * Handle install event
 */
this.oninstall = (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(itemsToCache);
      })
  );
};


/**
 * Handle fetch event
 *
 */
this.onfetch = (event) => {
  event.respondWith(
    caches.open(CACHE_NAME)
    .then((cache) =>
      cache.match(event.request)
        .then(response => {
          // Cache hit
          if (response) {
            return response;
          }
          
          // Cache miss
          // 1. Fetch data
          // 2. Clone response
          // 3. Cache response
          // 4. Return response
          return fetch(event.request)
            .then((res) => {
              const r = res.clone();
              caches.open(CACHE_NAME)
                .then((c) => {
                  c.put(event.request, r);
                });
              return res; // Don't wait for the request to cache
            }
          );
        }
      )
    )
  )
};

