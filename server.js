const WebSocket = require('ws');
const http = require('http');
const { setupWSConnection } = require('y-websocket/bin/utils');
const url = require('url');
// require('dotenv').config();

const port = process.env.PORT || 1234;
// const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN; // Replace with your client's domain

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('y-websocket server running');
});

const wss = new WebSocket.Server({ noServer: true });

// server.on('upgrade', (request, socket, head) => {
//   const origin = request.headers.origin;

//   if (origin === ALLOWED_ORIGIN) {
//     wss.handleUpgrade(request, socket, head, (ws) => {
//       wss.emit('connection', ws, request);
//     });
//   } else {
//     socket.destroy();
//     console.log(`Rejected connection from disallowed origin: ${origin}`);
//   }
// });

wss.on('connection', setupWSConnection);

server.listen(port, () => {
  console.log(`y-websocket server running on port ${port}`);
});
