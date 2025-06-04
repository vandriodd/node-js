// Native module Path -> in the path we can get the name of the file, create new routes, etc
const path = require('node:path')

// We can join paths with path.join instead of create it (that is, actually, a bad practice)
// `./content/subfolder/test.txt` // <--- Bad practice
// Is not accepted by the OS, because...
// In unix, we use / and in windows we use \

// FUN FACT: we can use the command below to see the separator of the OS (this is how important they are)
console.log('Separator of the OS ->', path.sep)

// Join routes
const filePath = path.join('content', 'subfolder', 'test.txt')
console.log('Joining a path ->', filePath)

// Obtain the name of a file
const base = path.basename('tmp/secret-files/password.txt')
console.log('Filename + ext ->', base)

// Same but without extension
const filename = path.basename('tmp/secret-files/password.txt', '.txt')
console.log('Filename ->', filename)

// Obtain ONLY the extension
const extension = path.extname('tmp/secret-files/password.txt')
console.log('Extension ->', extension)
