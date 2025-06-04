const http = require('node:http')

// CommonJS -> you can import .json automatically
const ditto = require('./pokemon/ditto.json')

// More imperative
const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/pokemon/ditto':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(ditto))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; urf-8')
          return res.end('<h1>Not found</h1>')
      }
    case 'POST':
      switch (url) {
        case '/pokemon': {
          // constants are block scoped, so we should declare it between curly brackets
          let body = ''

          // Listen to data events
          // So here we told to Node.js "hey, in the moment that you receive a chunk of data, add it to the body"
          req.on('data', chunk => {
            body += chunk.toString() // <--- chunk is actually a buffer, because is constantly retrieving binary data
          })

          req.on('end', () => {
            const data = JSON.parse(body)
            // we can do anything here, like call a db to store the info, etc
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            data.timestamp = Date.now()
            res.end(JSON.stringify(data))
          })

          break
        }
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; urf-8')
          return res.end('<h1>Not found</h1>')
      }
  }
}

const server = http.createServer(processRequest)

server.listen(3000, () => {
  console.log('Server listening on port http://localhost:3000')
})
