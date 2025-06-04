const express = require("express")
const crypto = require("node:crypto")
const movies = require("./movies.json")
const cors = require("cors") // <-- IMPORTANT this middleware puts * in the Access-Control-Allow-Origin header
const { validateMovie, validatePartialMovie } = require("./movies.js")

// Normal methods:GET/HEAD/POST
// Complex ones: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS

const app = express()
app.use(express.json())
app.use(cors({
  origin: (origin, callback) => {
    const ACCEPTED_ORIGINS = [
      "http://localhost:8080",
      "http://localhost:1234",
      "https://movies.com"
    ]

    if (ACCEPTED_ORIGINS.includes(origin)) {
      callback(null, true)
    }

    if (!origin) {
      return callback(null, true)
    }

    return callback(new Error("Not allowed by CORS"))
  }
}))
app.disable("x-powered-by")

app.get("/", (req, res) => {
  res.json({ message: "Hello World" })
})

// ENDPOINT -> path where we retrieve information
// All resources that are movies are going to be identified by /movies
app.get("/movies", (req, res) => {
  // CORS

  // Solution 1 - Allows all origins
  // res.header("Access-Control-Allow-Origin", "*")

  // Solution 2 - Allows specific origin
  // res.header("Access-Control-Allow-Origin", "http://localhost:8080")

  // const origin = req.header("origin")
  // When the request is made from the same origin, the origin header is not sent
  // if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
  //   res.header("Access-Control-Allow-Origin", origin)
  // }

  const { genre } = req.query
  if (genre) {
    // const filteredMovies = movies.filter(movie => movie.genre.includes(genre))
    const filteredMovies = movies.filter(movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    return res.json(filteredMovies)
  }
  res.json(movies)
})

// ":id" -> dynamic segment, means that it can be any value
app.get("/movies/:id", (req, res) => {
  const { id } = req.params

  const movie = movies.find(movie => movie.id === id)
  if (movie) return res.json(movie)
  res.status(404).json({ message: "Movie not found" })
})

app.post("/movies", (req, res) => {
  const result = validateMovie(req.body)

  if (result.error) {
    // Can be also status 422 Unprocessable Entity
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...req.body // <--- NEVER put this if you not validate the data
    // title,
    // genre,
    // director,
    // year,
    // duration,
    // rate: rate ?? 0,
    // poster,
  }

  // That ISN'T REST, because we are storing the state of the app in the memory
  movies.push(newMovie)
  // Here we can return the new movie to update the cache of client, or we can return a link to the new resource
  res.status(201).json(newMovie)
})

app.patch("/movies/:id", (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  // const movie = movies.find(movie => movie.id === id)
  const movieIndex = movies.findIndex(movie => movie.id === id) // <-- Using findIndex to retrieve the index of the movie, know if exists

  if (movieIndex === -1) return res.status(404).json({ message: "Movie not found" })

  const updateMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updateMovie

  return res.json(updateMovie)
})

app.delete("/movies/:id", (req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) return res.status(404).json({ message: "Movie not found" })

  movies.splice(movieIndex, 1)

  return res.json({ message: "Movie deleted" })
})

// app.options("/movies/:id", (req, res) => {
//   const origin = req.header("origin")
//   if (ACCEPTED_ORIGINS.includes(origin) || !origin) {
//     res.header("Access-Control-Allow-Origin", origin)
//     res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE")
//   }
//   res.status(200).send()
// })

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server listen to port http://localhost:${PORT}`)
})
