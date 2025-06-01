// Over Node.js V16, we should use the "node:" prefix to import Node.js modules
const os = require('node:os')

console.log('Info about the Operation System:')
console.log('-----------------------------')

console.log('Name of the OS:', os.platform())
console.log('Version of the OS:', os.release())
console.log('Architecture of the OS:', os.arch())
console.log('CPUs:', os.cpus()) // <-- We can do some cool stuff with this information
console.log('Free memory:', os.freemem() / 1024 / 1024)
console.log('Total memory:', os.totalmem() / 1024 / 1024) // <-- 1st one converts bytes to KB, and the second one KB to MB
console.log('Uptime:', os.uptime() / 60 / 60)
