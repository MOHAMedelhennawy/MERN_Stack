#!/usr/bin/env node

"use strict";

console.log("Hello World");
console.error("Oops!")

/**
 * those two lines may look no differnce but try to redirect those output in command line:
 * 1 - node ex1.js 1>/dev/null  "STDOUT_FILENO in file descriptor"
 * 2 - node ex1.js 2>/dev/null  "STDERR_FILENO in file descriptor"
 * 
 * so, when you need to console error, don't console it using console.log.
 * it's better to use console.error instead to redirect to STDERR
 */

console.log(process.argv)
console.log(process.argv.slice(2))

/** 
 * but ther a package called minimist. It converts command-line arguments
 * (like those passed to process.argv) into an easily accessible object
 * format, allowing you to handle flags, options, and positional arguments more simply.
 */

// Example:
const args = require('minimist')(process.argv.slice(2), {
    // You can define how specific arguments should be parsed here.
    
    boolean: ["help"], // For example, the "help" argument will be treated as a boolean.
                       // If "help" is passed, its value will be true; otherwise, it will be false.

    string: ["name"]   // The "name" argument will always be treated as a string, regardless of its input.
});
console.log(args)

/**
 * running script: `./ex1.js -x 3 -y 4 -n5 -abc --beep=boop foo bar baz --help=test -name=Mohammed`
 *
 * output:
 * {
 *     _: [ 'foo', 'bar', 'baz' ],  // here what that doesn't enything he can deal with
 *     help: true,
 *     x: 3,
 *     y: 4,
 *     n: 5,
 *     a: true,
 *     b: true,
 *     c: true,
 *     beep: 'boop'
 * }
 */


const {_, x, y, n, a, b, c, beep, name, help} = args;
console.log('------')
console.log(_)  // ['foo', 'bar', 'baz']
console.log(x)  // 3
console.log(y)  // 4
console.log(n)  // 5
console.log(a)  // true
console.log(b)  // true
console.log(c)  // true
console.log(beep)   // boop
console.log(name)   // Mohammed
console.log(help)   // true