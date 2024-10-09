// https://chatgpt.com/share/66fc74da-1084-8005-914e-399c80361738

/**
 * When use require, it load the exported parts of the module AND run the entire file
 */
var otherFile = require('./0-modules.js');

console.log(x)  // 10  Because you define x as a global variable in `0-module.js` file
console.log(otherFile.x)  // 5 you use the local variable of the module
console.log(otherFile)  // { sum: [Function: sum], x: 5 }   which is the exported object from `modules.js` file

/**
 * The global object is shared between all the app modules. The 5 main object is:
 *  - module
 *  - export
 *  - require
 *  - __dirname
 *  - __filename
 * 
 * So those five objects are shared between all modules.
 * 
 * If you need to add more functions ro varibales, you can add to global object:
 * global.x = 50
 */