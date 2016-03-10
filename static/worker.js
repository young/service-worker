this.addEventListener('install', (event) => {

  event.waitUntil(
    caches.open('v1')
      .then((cache) => {
        return cache.addAll([
          '/index.html'
        ]);
      })
      .then(()=>{ console.log('service worker installed')})
  );
});

this.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .catch(() => {
        return fetch(event.request);
      })
  );
});
