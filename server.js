const WebSocket = require('ws')
const http = require('http')
const { setupWSConnection } = require('y-websocket/bin/utils')

const port = process.env.PORT || 1234
const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('y-websocket server running')
})

const wss = new WebSocket.Server({ server })

wss.on('connection', setupWSConnection)

server.listen(port, () => {
  console.log(`y-websocket server running on port ${port}`)
})
