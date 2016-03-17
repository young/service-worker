// importScripts('socket.io.js');


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


  ws = new WebSocket("ws://localhost:8082");
  ws.onopen = function() {
    // the socket is open
    ws.send("foo");
  };
  ws.onmessage = function (evt){ 
    // message received
    console.log(evt.data);
  };
  ws.onclose = function() { 
    // websocket is closed.
  };

