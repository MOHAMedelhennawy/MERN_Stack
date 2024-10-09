// OS

const os = require('os');
const path = require('path');

console.log(os.hostname())
console.log(os.arch())
console.log(os.platform())
console.log(os.type())

console.log(os.freemem())
console.log(os.totalmem())
console.log(os.totalmem() - os.freemem())


// Path

const FILE_NAME = path.basename(__filename)
const FILE_PATH = path.join(__dirname, FILE_NAME)
console.log(FILE_NAME)
console.log(FILE_PATH)
console.log(path.dirname(FILE_PATH))    // /home/elhennawy/MERN/phase_1/mahara_tach/CH.1
console.log(__dirname)  // /home/elhennawy/MERN/phase_1/mahara_tach/CH.1
console.log(__dirname === path.dirname(FILE_PATH))  // false
console.log(path.extname(FILE_NAME))
console.log(path.parse(FILE_NAME))