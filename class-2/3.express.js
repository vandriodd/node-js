const express = require('express')
const ditto = require('./pokemon/ditto.json')
const app = express()

app.disable('x-powered-by')

const PORT = process.env.PORT ?? 3000

// app.use(express.json())

app.use((req, res, next) => {
  console.log('Middleware')
  // Here we can track the requests to our server
  // Check is the user has cookies, etc
  // next() // <--- This is important to call next, otherwise the request will be blocked

  // examples...

  // 1. Only accept POST request with application/json content-type
  if (req.method !== 'POST') return next()
  if (req.header['content-type'] !== 'application/json') return next()

  let body = ''

  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()

    // Mutate the request and add the information to the body
    req.body = data
    next()
  })
  next()
})

// It´s more based on the routes
// "When you receive a request in "/" route, execute this function"
app.get('/', (req, res) => {
  // res.status(200).send('<h1>Welcome to my server!</h1>')
  // res.send('<h1>Welcome to my server!</h1>') // <--- Express automatically sets the Content-Type header to text/html (or what we send)

  res.json(ditto)
})

app.post('/pokemon', (req, res) => {
  // let body = ''

  // req.on('data', chunk => {
  //   body += chunk.toString()
  // })

  // req.on('end', () => {
  //   const data = JSON.parse(body)
  //   // res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
  //   data.timestamp = Date.now()
  //   res.status(201).json(data)
  // })

  // Eveything above can be summarized as:
  res.status(201).json(req.body)
})

// Important to define this at the end, because it will catch all the requests that are not defined before
// "use" es like writing an asterisk (every method)
app.use((req, res) => {
  res.status(404).send('<h1>Not found</h1>')
})

app.listen(PORT, () => {
  console.log(`Server listening on port http://localhost:${PORT}`)
})
