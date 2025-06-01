// ES Modules style (tip, to convert require to ES Modules, just click on the three dots under the require, Command + . and enter in "Convert require to ES modules" option)
// Over Node.js V16, we should use the "node:" prefix to import Node.js modules
import {
  platform,
  release,
  arch,
  cpus,
  freemem,
  totalmem,
  uptime
} from 'node:os'

console.log('Info about the Operation System:')
console.log('-----------------------------')

console.log('Name of the OS:', platform())
console.log('Version of the OS:', release())
console.log('Architecture of the OS:', arch())
console.log('CPUs:', cpus()) // <-- We can do some cool stuff with this information
console.log('Free memory:', freemem() / 1024 / 1024)
console.log('Total memory:', totalmem() / 1024 / 1024) // <-- 1st one converts bytes to KB, and the second one KB to MB
console.log('Uptime:', uptime() / 60 / 60)
