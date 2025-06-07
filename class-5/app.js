import express, { json } from "express"
import { createMovieRouter } from './routes/movies.js'
import { corsMiddleware } from './middleware/cors.js'
import "dotenv/config"

export const createApp = ({ movieModel }) => {
  const app = express()
  app.use(json())
  app.use(corsMiddleware({ acceptedOrigins: ["http://localhost:8080", "http://localhost:1234", "https://movies.com"] }))
  app.disable("x-powered-by")

  app.use("/movies", createMovieRouter({ movieModel }))

  const PORT = process.env.PORT ?? 3000

  app.listen(PORT, () => {
    console.log(`Server listen to port http://localhost:${PORT}`)
  })
}

