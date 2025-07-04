const { z } = require("zod")

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: "Title must be a string",
    required_error: "Movie title is required"
  }),
  year: z.number().int().min(1900).max(2025),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.string().url({
    message: "Poster must be a valid URL"
  }),
  genre: z.array(z.enum(["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Horror", "Thriller", "Sci-Fi", "Crime"]), {
    required_error: "Movie genre is required",
    invalid_type_error: "Movie genre must be and array of enum Genre"
  })
})

function validateMovie(object) {
  return movieSchema.safeParse(object) // <--- Returns if has errors or data
}

function validatePartialMovie(object) {
  return movieSchema.partial().safeParse(object) // <-- partial() makes all the fields optional, but if a field is present, it will validate it
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
