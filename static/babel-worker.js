importScripts('babel.min.js');

const transform = (input) => Babel.transform(input, { presets: ['es2015'] }).code;

const isRequestJS = (request) => {
  if (request && request.url) {
    const url = request.url;
    return url.slice(url.length - 2) === 'js' ? true : false;
  }

  return false;
}


this.oninstall =  () => self.skipWaiting();

this.onactivate = () => self.clients.claim();

this.onfetch = (event) => {
  // const isJS = isRequestJS(event.request);
  // if (isJS) {
  //  return fetch(event.request)
  //   .then(function(response) {
  //     return response.blob();
  //   })
  //   .then(function(response) {
  //     const reader = new FileReader();

  //     reader.onload = ({target: {result}}) => {

  //       const res = transform(result);
  //       event.respondWith(new Response(res));
  //     }
  //     reader.readAsText(response);
  //   });

  // }

  // Pass request through
  event.respondWith(fetch(event.request).then(response => response));
};
