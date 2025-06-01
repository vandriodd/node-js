const fs = require("node:fs");

// Synchronous
const stats = fs.statSync("./file.txt");

console.log(
  stats.isFile(),
  stats.isDirectory(),
  stats.isSymbolicLink(),
  stats.size
);
