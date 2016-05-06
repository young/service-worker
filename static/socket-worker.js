this.addEventListener('install', () => {
  return self.skipWaiting();
});

this.onactivate = () => {
  const ws = new WebSocket("ws://localhost:8082");
  ws.onopen = function() {
    // the socket is open
    ws.send("connected");
  };
  ws.onmessage = function (evt){
    // message received
    console.log(`received ${evt.data}`);
  };
  ws.onclose = function(e) {
    // websocket is closed.
    console.log('closed for', e);
  };
};


