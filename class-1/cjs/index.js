// console.log("Hello World from Node.js! 💚");

// CommonJS require module
// const randomName = require("./sum");

// Or if we export the function like a prop in object, we have to destructure it:
const { sum } = require("./sum");
console.log(sum(2, 2));
