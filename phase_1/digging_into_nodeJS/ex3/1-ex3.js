#!/usr/bin/env node
const path = require('path');
const fs = require('fs');
const zlib = require('zlib')
const Transform = require('stream').Transform;
const CAF = require('caf')
const args = require('minimist')( process.argv.slice(2), {
    boolean: ["help", "in", "out", "compress", "uncompress"],
    string: ["file", "outfile"]
});

processFile = CAF(processFile); // to be look like an async function, but the function should be generator func

// use env varibales
const BASE_PATH = path.resolve(
    process.env.BASE_PATH || __dirname
);


if (args.help) {
    printHelp();
} else if (args.in || args._.includes('-')) {
    const tooLong = CAF.timeout(3, "Took too long!")
    processFile(tooLong, process.stdin)
    .then(() => console.log("complete!"))  // Only logs after processing is finished
    .catch(error);
} else if (args.file) {
    const FILE_PATH = path.join(BASE_PATH, args.file);
    const streams = fs.createReadStream(FILE_PATH);
    const tooLong = CAF.timeout(3, "Took too long!")  // to passing to function to tell the program if the task doesn't finished after
                                    // 3 ms, stop it.
    processFile(tooLong, streams)
    .then(() => console.log("complete!"))  // Only logs after processing is finished
    .catch(error);
} else {
    error('Incorrect Usage.', true);
}

// ==============================
function* processFile(signal, inStream) {
    /**
     * Explanation:
     * - `outStream` and `inStream` initially refer to the same stream (the input stream).
     * - `targetStream` will either print the output to the terminal (using `process.stdout`) 
     *   or write it to a file, depending on the input arguments.
     * 
     * When a readable stream (`inStream`) is passed to the function, it is first assigned to `outStream`.
     * The stream passes through `upperStream`, which is a `Transform` stream that modifies each chunk of data.
     * In this case, `upperStream` converts each chunk to uppercase, logs its size, and increments a chunk counter.
     * 
     * After passing through `upperStream`, the data is sent to `targetStream`.
     * 
     * - If an `out` argument is provided, `targetStream` will be `process.stdout`, printing the data to the terminal.
     * - If an `outfile` argument is provided, the data will be written to the specified file.
     * - If no `outfile` is specified, the data will be written to a default file (`outfile.txt`).
     */
    var count = 0;
    var targetStream;
    var outStream = inStream; // inStream is the Readable Stream object
    var OUTFILE = args.outfile? args.outfile: 'outfile.txt';
    var OUTFILE_PATH =  path.join(BASE_PATH, OUTFILE);
    
    // Transform stream to convert data chunks to uppercase
    var upperStream = new Transform({
        transform(chunk, enc, next) {
            this.push(chunk.toString().toUpperCase());  // Convert chunk to uppercase
            if (!args.uncompress) {
                console.log('\nSize of chunk:', chunk.toString().length);  // Log chunk size
                console.log('Chunk Number:', ++count);  // Log the chunk number
                setTimeout(next, 0);  // Add a 1-second delay before processing the next chunk
            } else { 
                next()
            }
        }
    });
    

    if (args.uncompress) {
        let gunzipStream = zlib.createGunzip();
        outStream = outStream.pipe(gunzipStream);
    }
    // Pipe the output stream through the transform stream
    outStream = outStream.pipe(upperStream);
    
    if (args.compress) {
        let zlibStream = zlib.createGzip(); // create zlib stream
        outStream = outStream.pipe(zlibStream)
        OUTFILE = `${path.parse(OUTFILE).name}.gz`  // To convert whatever the file is passing to be with .gz extension
    }

    // Decide if output goes to the terminal or a file
    if (args.out) {
        targetStream = process.stdout;  // Print to terminal
    } else {
        // Write to a specified file or default to 'outfile.txt'
        targetStream = fs.createWriteStream(OUTFILE_PATH);  // Write to a file
    }

    // Pipe the transformed stream to the target stream
    outStream.pipe(targetStream);

    signal.pr.catch(() => {
        outStream.unpipe(targetStream);
        outStream.destroy();
    })

    yield streamComplete(outStream) // in generator function replace `await` with `yield`
}

function streamComplete(stream) {
    return new Promise((res) => {
        stream.on('end', res)
    })
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
  --out              Print to stdout
  --outfile          Specify output file
  --compress         gzip the output
  --uncompress       un-gzip the input
Examples:
  node script.js --file=input.txt
  cat input.txt | node script.js --in
  node 2-ex2.js --file=lorem.txt --outfile=outfile.txt
  node 2-ex2.js --file=lorem.txt --out --outfile=outfile.txt
  node 4-ex2.js --file=lorem.txt --outfile=text.txt --out --compress => to print the output without creating .gz file
  node 4-ex2.js --file=lorem.txt --outfile=text.txt --compress => to create the .gz file
`);
}
