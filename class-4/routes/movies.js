import { Router } from "express"
import { MovieController } from '../controllers/movies.js'

export const moviesRouter = Router() // <-- Router is a class that allows us to create a router which responses to different routes

moviesRouter.get("/", MovieController.getAll)

moviesRouter.get("/:id", MovieController.getById)

moviesRouter.post("/", MovieController.create)

moviesRouter.patch("/:id", MovieController.update)

moviesRouter.delete("/:id", MovieController.delete)
