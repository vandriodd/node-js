// Parallel Asynchronous
import { readFile } from "node:fs/promises";

Promise.all([
  readFile("./file.txt", "utf-8"),
  readFile("file2.txt", "utf-8"),
]).then(([text, secondText]) => {
  console.log("First text:", text);
  console.log("Second text:", secondText);
}); // <--- Basically here we saying to Node.js "hey, do both and continue to something else when you finish"

// Instead of wasting the opportunity of doing something when it's free (sequential), we can do it in parallel
