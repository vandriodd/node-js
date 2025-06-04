// Process -> it's a global object that provides information and control over the current Node.js process

// Input arguments
console.log(process.argv) // <-- returns an array with the arguments

// We can also control the process and its exit
// process.exit(0); // <-- everything is ok
// process.exit(1); // <-- something went wrong
process.on('exit', () => {
  // Do something before the process exits, like closing connections, etc
})

// Current working directory
console.log(process.cwd())

// Platform
console.log(process.env.PEPITO) // <--- we can access environment variables (write before in the terminal "PEPITO=123 node 7.process.js")
