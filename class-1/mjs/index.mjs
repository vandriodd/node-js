// .js -> uses CommonJS as default
// .mjs -> uses ES Modules
// .cjs -> uses CommonJS

// ES Modules import
import { sum, sub, mul, div } from "./sum.mjs";

console.log(sum(2, 3));
console.log(sub(5, 3));
console.log(mul(12, 2));
console.log(div(100, 2));
