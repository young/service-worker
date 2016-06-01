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
];

this.oninstall = (event) => {
  event.waitUntil(
    caches.open('v1')
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
            caches.open('v1').then((cache) => {
              cache.put(event.request, r);
            });
          return res;
          }))
      .then((res) => res);

  event.respondWith(response);
};

