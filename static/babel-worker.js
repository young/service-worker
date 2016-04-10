importScripts('babel.min.js');

const transform = (input) => Babel.transform(input, { presets: ['es2015'] }).code;

const isRequestJS = (request) => {
  if (request && request.url) {
    const url = request.url;
    return url.slice(url.length - 2) === 'js' ? true : false;
  }

  return false;
}
// this.oninstall =  (event) => {
//   event.waitUntil(
//     caches.open('v1')
//       .then((cache) => {
//         return cache.addAll([
//           '/index.html'
//         ]);
//       })
//       .then(()=>{ console.log('service worker installed')})
//       .then(()=> self.skipWaiting())
//   );
// };


this.onactivate = () => self.clients.claim();

this.onfetch = (event) => {
  const isJS = isRequestJS(event.request);
  if (isJS) {
    return fetch(event.request).then(function(response) {
      return response.blob();
    }).then(function(response) {
      const reader = new FileReader();
      reader.onload = ({target: {result}}) => {
        const foo = transform(result);
        console.log(foo);
      };
      reader.readAsText(response);
    });
  }

  // Pass request through
  return fetch(event.request);
};
