
this.oninstall = (event) => {
  event.waitUntil(
    caches.open('v1')
      .then((cache) => {
        return cache.addAll([
          '/',
          '/index.html',
          '/images/cat1.jpg',
          '/images/cat2.jpg',
          '/images/cat3.jpg',
          '/images/cat4.jpg',
        ]);
      }).then(self.skipWaiting)
  );
};


this.addEventListener('activate',  () => self.clients.claim());

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

