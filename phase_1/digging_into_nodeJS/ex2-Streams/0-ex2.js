#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const { Transform } = require('stream');
const args = require('minimist')( process.argv.slice(2), {
    boolean: ["help", "in"],
    string: ["file"]
});

// use env varibales
const BASE_PATH = path.resolve(
    process.env.BASE_PATH || __dirname
);

console.log(args)
if (args.help) {
    printHelp();
} else if (args.in || args._.includes('-')) {
    /**
     * Since we are using streams, we need a readable stream
     * to handle incoming input from the terminal.
     * 
     * Why did we switch from the `get-stdin` package to using `process.stdin`?
     * 
     * Previously, we were not using streams, so we opted for `get-stdin`,
     * which is promise-based and suitable for capturing all input at once.
     * Now, since we're handling the input as a stream, we use `process.stdin`,
     * which provides a readable stream for continuous data handling.
     */
    processFile(process.stdin);  // to handle input from the terminal (standard input).
}else if (args.file) {
    const FILE_PATH = path.join(BASE_PATH, args.file);
    const streams = fs.createReadStream(FILE_PATH)
    processFile(streams)
} else {
    error('Incorrect Usage.', true);
}


// ================================

function processFile(inStream) {
    /**
     * Explanation:
     * - `outStream` and `inStream` are the same thing at this point.
     * - `targetStream` is used to display the output, in this case, it's set to `process.stdout` for printing to the terminal.
     * 
     * When any readable stream (such as `inStream`) is passed to this function,
     * it's assigned to `outStream`.
     * 
     * Then, the line `outStream.pipe(targetStream)` connects the readable stream (`inStream`)
     * to the writable stream (`targetStream`).
     * 
     * For every chunk of data received from `outStream` (which is really `inStream`),
     * it is sent to `targetStream`. In this case, `targetStream` is `process.stdout`,
     * so the data is printed to the terminal.
     */
    var outStream = inStream;    // it's ReadStream object
    var targetStream = process.stdout;   // process.stdout to print the output, instead of write it on anther file
 
    outStream.pipe(targetStream)
}

function error(msg, includeHelp = false) {
    console.error(msg);  // Use console.error for errors
    if (includeHelp) {
        console.log();
        printHelp();
    }
}

function printHelp() {
    console.log(`
Usage:
  --file={FILENAME}  Process the file
  --in               Process stdin input
  --help             Show help

Examples:
  node script.js --file=input.txt
  cat input.txt | node script.js --in
`);
}
