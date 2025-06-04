// Sequential Asynchronous
const fs = require('node:fs/promises');
// import { readFile } from "node:fs/promises";

// This way doesn't work with CommonJS
// Because CommonJS doesn't support await in the body of the file (top level JS)
// So, we have two options to solve this problem:

// console.log("Reading the first file...");
// const text = await fs.readFile("./file.txt", "utf-8");
// console.log("First text:", text);

// console.log("Do something else...");

// console.log("Reading the second file...");
// const secondText = await fs.readFile("./file2.txt", "utf-8");
// console.log("Second text:", secondText);

// 1. Change to ES Modules

// 2. Need to wrap it in an autoinvoked async function, basically a function that calls itself where it's created

// IIFE -> Immediatly Invoked Function Expression
(async () => {
  console.log('Reading the first file...')
  const text = await fs.readFile('./file.txt', 'utf-8')
  console.log('First text:', text)

  console.log('Do something else...')

  console.log('Reading the second file...')
  const secondText = await fs.readFile('./file2.txt', 'utf-8')
  console.log('Second text:', secondText)
})()

// The code above is the same as this

// async function init() {
//   console.log("Reading the first file...");
//   const text = await fs.readFile("./file.txt", "utf-8");
//   console.log("First text:", text);

//   console.log("Do something else...");

//   console.log("Reading the second file...");
//   const secondText = await fs.readFile("./file2.txt", "utf-8");
//   console.log("Second text:", secondText);
// }

// init();
