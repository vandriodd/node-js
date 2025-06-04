const fs = require('node:fs/promises')

// This is ONLY for native modules that don't support promises
// Otherwise, require like at the top of the file

// const fs = require("node:fs");
// const { promisify } = require("node:util");
// const readFilePromise = promisify(fs.readFile);

console.log('Reading the first file...')
fs.readFile('./file.txt', 'utf-8').then((text) => {
  console.log('First text:', text)
})

console.log('Do something else...')

console.log('Reading the second file...')
fs.readFile('./file2.txt', 'utf-8').then((text) => {
  console.log('Second text:', text)
})
