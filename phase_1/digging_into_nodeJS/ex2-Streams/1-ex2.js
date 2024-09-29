#!/usr/bin/env node
const path = require('path');
const fs = require('fs')
const Transform = require('stream').Transform
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
    processFile(process.stdin)
} else if (args.file) {
    const FILE_PATH = path.join(BASE_PATH, args.file);
    const streams = fs.createReadStream(FILE_PATH);
    processFile(streams);
} else {
    error('Incorrect Usage.', true);
}

// ==============================
var count = 0;
function processFile(inStream) {
    /**
     * Explanation:
     * - `outStream` and `inStream` are the same stream initially.
     * - `targetStream` is set to `process.stdout`, which prints the output to the terminal.
     * 
     * When any readable stream (like `inStream`) is passed to this function, 
     * it is first assigned to `outStream`.
     * 
     * The line `outStream.pipe(targetStream)` connects the readable stream (`inStream`)
     * to the writable stream (`targetStream`). Every chunk of data from `inStream`
     * will be sent to `targetStream`, which prints it to the terminal.
     * 
     * However, before the chunks are printed to the terminal, they pass through `upperStream`.
     * `upperStream` acts as a middle processing stream, where each chunk is transformed 
     * (in this case, converted to uppercase) before it is printed.
     * 
     * The `upperStream` uses a `Transform` stream, which allows for modifying the data chunks.
     * For every chunk received, the data is converted to uppercase, the size of the chunk is logged, 
     * and the chunk number is incremented and displayed. There is also a 1-second delay (`setTimeout`) 
     * before moving to the next chunk.
     */
    var targetStream = process.stdout;
    var outStream = inStream;    // inStream is the Readable Stream object
    var upperStream = new Transform({
        transform(chunk, enc, next) {
            this.push(chunk.toString().toUpperCase());   // Convert the chunk to uppercase
            console.log('\nSize of chunk:', chunk.toString().length);  // Log the size of the chunk
            console.log('Chunk Number:', ++count);  // Log the chunk number
            setTimeout(next, 1000);  // Add a 1-second delay before processing the next chunk
        }
    });

    // Pipe the inStream through upperStream (to process the data) and then to targetStream (to print it)
    outStream = inStream.pipe(upperStream);
    outStream.pipe(targetStream);
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
