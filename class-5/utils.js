import { createRequire } from "node:module"
const require = createRequire(import.meta.url)
export const readJSON = (path) => require(path)

// How to read a .json file in ESModules

// 1. Using fs
// import fs from "node:fs"
// const movies = JSON.parse(fs.readFileSync("./movies.json", "utf-8"))

// 2. Create a require (Recommended)
// import { createRequire } from "node:module"
// const require = createRequire(import.meta.url)
// const movies = require("./movies.json")
