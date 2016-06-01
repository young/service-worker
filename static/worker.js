
this.oninstall = (event) => {
  event.waitUntil(
    caches.open('v1')
      .then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/static/service-worker/images/cat1.jpg',
          '/static/service-worker/images/cat2.jpg',
          '/static/service-worker/images/cat3.jpg',
          '/static/service-worker/images/cat4.jpg',
        ]);
      }).then(self.skipWaiting)
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

