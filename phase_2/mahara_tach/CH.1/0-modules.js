/**
 * **NOTE**: In the Browser (window object):
 *              Variables declared with var at the global scope are attached to the window object
 *              But variables with let and const not attached.
 * 
 *          In Node.js (global object):
 *              Variables declared with var, let, and const are not attached to the global object.
 */

function sum() {return 3 + 5}
var x = 5;
module.exports = {
    sum,
    x
}

/**
 * module has property called exports. Here is saves all the functions
 * that exports from this file.
 */
console.log(module)
console.log('==========================')

/**
 * There another object called `exports`, `exports` object a reference to `module.exports` obj
 */

console.log(exports)

/**
 * This makes x a global variable available across the entire application.
*/
global.x = 10


/**
 * it's print 5, because he look at module scope first and he find it.
 * 
 * To print the global x you need to determine which one you need to use
 */
console.log(x)  // 5

console.log(module.filename)
console.log(module.path)