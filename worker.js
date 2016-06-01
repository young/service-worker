/**
 * The cache name
 * @type {String}
 */
const cacheName = 'v4';

/**
 * Things to cache
 * @type {Array}
 */
const catCache = [
  '/service-worker/',
  '/service-worker/index.html',
  '/service-worker/static/images/cat1.jpg',
  '/service-worker/static/images/cat2.jpg',
  '/service-worker/static/images/cat3.jpg',
  '/service-worker/static/images/cat4.jpg',
  '/service-worker/manifest.json'
];

this.oninstall = (event) => {
  event.waitUntil(
    caches.open(cacheName)
      .then((cache) => {
        return cache.addAll(catCache);
      })
  );
};

this.onfetch = (event) => {
  const response =
    caches.match(event.request)
      .catch(() =>
        fetch(event.request)
          .then((res) => {
            const r = res.clone();
            caches.open(cacheName).then((cache) => {
              cache.put(event.request, r);
            });
          return res;
          }))
      .then((res) => res);

  event.respondWith(response);
};

