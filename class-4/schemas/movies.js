import { z } from "zod"

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

export function validateMovie(input) {
  return movieSchema.safeParse(input)
}

export function validatePartialMovie(input) {
  return movieSchema.partial().safeParse(input)
}
