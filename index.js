//*Express module imports
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

//*Websocket module imports
const WebSocket = require('ws');

//*PORT the server will use
const PORT = process.env.PORT || 8080;

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('New WebSocket connection');

    ws.on('message', (message) => {
        // Forward the message to all clients without parsing
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port:${PORT}`);
});
