import mysql from "mysql2/promise"

const DEFAULT_CONFIG = {
  host: "localhost",
  user: "root",
  port: 3306,
  password: "",
  database: "moviesdb"
}

const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

const connection = await mysql.createConnection(connectionString)

export class MovieModel {
  static async getAll ({ genre }) {
    if (genre) {
      const lowerCaseGenre = genre.toLowerCase()

      // TODO:
      // Get genre ids from db table using genre names
      const [genres] = await connection.query("SELECT id, name FROM genre WHERE LOWER(name) = ?;", [lowerCaseGenre]) // <-- "?" makes an interpolation

      // NEVER DO THIS (SQL Injection)
      // const [genres] = await connection.query(`SELECT id, name FROM genre WHERE LOWER(name) = ${lowerCaseGenre}`)

      // No genre found
      if (genres.length === 0) return []

      // Get the id from the first genre result
      const [{ id }] = genres

      // Get all movies ids from db table
      // Query to movie_genres table
      // Join
      // Return results
      return []
    }

    const [movies] = await connection.query("SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie;") // <-- The result is an array with two elements (tuple), the first is the result and the second is the metadata

    return movies
  }

  static async getById ({ id }) {
    const [movies] = await connection.query("SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM moview WHERE BIN_TO_UUID(id) = ?", [id])

    if (movies.length === 0) return null

    return movies[0]
  }

  static async create ({ input }) {
    const {
      genre: genreInput, // <-- Genre is an array
      title,
      year,
      director,
      duration,
      poster,
      rate,
    } = input

    // Create connection with genre

    const [uuidResult] = await connection.query("SELECT UUID() uuid;")
    const [{ uuid }] = uuidResult

    // const result = await connection.query("INSERT INTO movie (id, title, year, direction, duration, poster, rate) VALUES (UUID_TO_BIN(?), ?, ?, ?, ?, ?, ?)", [uuid, title, year, director, duration, poster, rate])

    // Here (and because we dominate uuid in back), we can use:

    try {
      await connection.query(`INSERT INTO movie (id, title, year, direction, duration, poster, rate) VALUES (UUID_TO_BIN("${uuid}"), ?, ?, ?, ?, ?, ?);`, [title, year, director, duration, poster, rate])
    } catch (err) {
      // Never let the user know what went wrong, error message can be send sensitive information
      throw new Error("Error creating Movie")
      // Send the error to a internal service
      // sendLog(err)
    }

    const [movies] = await connection.query("SELECT BIN_TO_UUID(id) id, title, year, director, duration, poster, rate FROM movie WHERE id = UUID_TO_BIN(?);", [uuid])

    return movies[0]
  }

  static async delete ({ id }) {
    // TODO create delete connection
  }

  static async update ({ id, input }) {
    // TODO create update connection
  }
}
