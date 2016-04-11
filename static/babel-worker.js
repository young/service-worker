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
  const isJS = isRequestJS(event.request);
  if (isJS) {
   event.waitUntil(fetch(event.request)
    .then(response => response.blob())
    .then((response) => {
      const reader = new FileReader();
      const p = Promise.resolve(true);
      reader.onload = ({target: {result}}) => {
        const res = transform(result);
        p.then(() =>{
          return res;
        }) 
      }
      debugger;
      reader.readAsText(response);
      return p;
    })
    .then(res => new Response(res))
    )

  } else {
    // Pass request through
    event.respondWith(fetch(event.request).then(response => response));
  }


};
