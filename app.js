'use strict';

const restify = require('restify');
const fs = require('fs');

const server = restify.createServer();

server.get(/.*/, restify.serveStatic({
  'directory': 'static',
  'default': 'index.html'
}));

const WebSocketServer = require('ws').Server;
const wss = new WebSocketServer({ port: 8082 });

// console.log('Socket server listening at 8082');
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    //console.log('received: %s', message);
  });
  let n = 1;
  setInterval(() => {
    n +=1;
    ws.send(`${n}`, () => {
      console.log(`sent ${n}`)
    });
  }, 1000);
});

server.listen(8081, function() {
  console.log('%s listening at %s', server.name, server.url);
});

