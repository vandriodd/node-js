// Native module HTTP -> allows us to create connections (servers)
const http = require('node:http')
const { findAvailablePort } = require('./10.free-port.js')

const desiredPort = process.env.PORT ?? 3000

// A server can do only 2 things: receive requests and send responses
const server = http.createServer((req, res) => {
  console.log('Request received') // <--- When this callback is called, it means that a request has been received
  res.end('Bye World')
})

// Server, to work, always need to listen to a port
// But sometimes the port that we like to listen, it's already in use
// So, we need to handle this case

// server.listen(3000, () => {
//   console.log('Server is listening on port 3000')
// })

// This interesting thing there, is that we can let Node.js choose the port for us
// server.listen(0, () => {
//   console.log(`Server is listening to port http://localhost:${server.address().port}`)
// })

// Oooor do it in a more cooler way, such as custom module

// findAvailablePort(3000).then(port => {
findAvailablePort(desiredPort).then(port => {
  server.listen(port, () => {
    console.log(`Server listening on port http://localhost:${port}`)
  })
})
