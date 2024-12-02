const WebSocket = require('ws')
const http = require('http')
const { setupWSConnection } = require('y-websocket/bin/utils')

require('dotenv').config()

// Set default port to 1234 if not specified in environment
const port = process.env.PORT || 1234

// Define allowed origins for CORS - only allowing pncode.site domains
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://pncode.site',
]

// Create HTTP server with CORS headers
// This server handles the initial HTTP upgrade request for WebSocket connections
const server = http.createServer((request, response) => {
  const origin = request.headers.origin
  
  // Add CORS headers if origin matches allowed domains
  if (allowedOrigins.includes(origin)) {
    response.setHeader('Access-Control-Allow-Origin', origin)
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept, Origin, X-Requested-With')
    response.setHeader('Access-Control-Allow-Credentials', 'true')
  }

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.writeHead(200)
    response.end()
    return
  }

  response.writeHead(200, { 'Content-Type': 'text/plain' })
  response.end('y-websocket server running')
})

// Initialize WebSocket server with origin verification
const wss = new WebSocket.Server({ 
  server,
  verifyClient: ({ origin }) => allowedOrigins.includes(origin)
})

// Handle Yjs collaboration setup
wss.on('connection', setupWSConnection)

server.listen(port, () => {
  console.log(`y-websocket server running on port ${port}`)
})

//* y-websocket.d.ts
// declare module 'y-websocket/bin/utils' {
//   export function setupWSConnection(conn: any, req: any, options?: any): void;
// }