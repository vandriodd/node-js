const fs = require("node:fs");

// Synchronous
// If we don't need to do other things while reading the file, we can use the synchronous version, otherwise, it blocks the thread
// Everything is done in a sequential way

// const text = fs.readFileSync("./file.txt"); // <--- If we don't specificate the encoding, it will return a Buffer

// console.log("Reading first file...");
// const text = fs.readFileSync("./file.txt", "utf-8");

// console.log(text);

// console.log("Reading second file...");
// const secondText = fs.readFileSync("./file2.txt", "utf-8");

// console.log(secondText);

// Asynchronous (with callbacks)
// As it's asynchronous, we need to know when the file is read
// We can use callbacks -> functions that are called when one task has finished

console.log("Reading first file...");
fs.readFile("./file.txt", "utf-8", (err, text) => {
  console.log(text); // <--- Executes this function when the file is readed
});

console.log("Do something else...");

console.log("Reading second file...");
fs.readFile("./file2.txt", "utf-8", (err, text) => {
  console.log(text);
});
