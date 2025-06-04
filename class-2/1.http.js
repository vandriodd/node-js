const http = require('node:http')
const fs = require('node:fs')

const desiredPort = process.env.PORT ?? 3000

const processRequest = (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')

  if (req.url === '/') {
    res.end('<h1>Welcome to my server!</h1>')
  } else if (req.url === '/super-pretty-image.png') {
    fs.readFile('./place.png', (err, data) => {
      if (err) {
        res.statusCode = 500
        res.end('<h1>500 Internal Server Error</h1>')
      } else {
        res.setHeader('Content-Type', 'image/png') // <-- The header should be here to avoid a bug, because if the request doesn't resolve properly, the header will be sent anyway (with wrong content type)
        res.end(data)
      }
    })
  } else {
    res.statusCode = 404
    res.end('<h1>Not found</h1>')
  }
}

const server = http.createServer(processRequest)

server.listen(desiredPort, () => {
  console.log(`Server listening on port http://localhost:${desiredPort}`)
})
