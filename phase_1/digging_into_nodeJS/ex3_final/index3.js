#!/usr/bin/env node
import fs from 'node:fs'
import zlib from 'node:zlib'
import path from 'node:path';
import minimist from "minimist";
import { fileURLToPath } from 'url'
import { Transform } from 'node:stream'
import { rejects } from 'node:assert';

const FILE_PATH = fileURLToPath(import.meta.url)
const BASE_PATH = new URL('.', import.meta.url).pathname

const args = minimist(process.argv.slice(2), {
    boolean: ['in', 'help', 'out', 'compress', 'uncompress'],
    string: ["file", "outfile"]
})


if (args.help) {
    printHelp()
} else if (args.in || args._.includes('-')) {
    processFile(process.stdin)
        .then(_ => {console.log('Complete...')})
} else if (args.file) {
    let stream = fs.createReadStream(path.join(BASE_PATH, args.file))
    processFile(stream)
        .then(_ => {console.log('Complete...')})

} else {
    error('Incorrect Usage', true)
}

async function processFile(stream) {
    let targetStream;
    let outStream = stream;
    let outfile = args.outfile || 'outfile.txt';
    const upperCaseTransform = upperStream(); // Create transform stream

    /**
     * If decompression is enabled, pipe the stream through gzip decompression (gunzip).
     * This step ensures that the data is decompressed before being processed by
     * the upperCaseTransform stream. The data must be in 'utf-8' encoding for the 
     * uppercase transformation to work correctly, as the transform expects string input.
     * 
     * Note: That createGunzip is transform streams too, look like that you build `upperCaseTransform`
     */
    if (args.uncompress) {
        let gunzipStream = zlib.createGunzip();
        outStream = outStream.pipe(gunzipStream);
    }

    /** Determine the target stream: stdout or file:
     * 
     *  to specify here need to store the ouput, you need to save it on file
     *  or just print it out to screen.
     */
    if (args.out) {
        targetStream = process.stdout;
    } else {
        outfile = args.compress? `${path.parse(outfile).name}.gz` : outfile
        targetStream = fs.createWriteStream(path.join(BASE_PATH, outfile))
    }

    // Pipe through the uppercase transformation
    outStream = outStream.pipe(upperCaseTransform)

    // If compression is enabled, pipe through gzip compression
    if (args.compress) {
        let zlibStream = zlib.createGzip();
        outStream = outStream.pipe(zlibStream);
    }

    outStream.pipe(targetStream)

    await onComplete(outStream);
}

function onComplete(stream) {
    return new Promise((resolve) => {
        stream.on('end', resolve)
    })
}

function upperStream() {
    return new Transform({
        transform(chunk, enc, next) {
            this.push(chunk.toString().toUpperCase())
            next();
        }
    })
}

function error(msg, includeHelp = false) {
    console.error(msg);
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
  
  print the file to the screen:
    node {{fileName}}.js --file=lorem.txt --out

  copy file to another file:
    node {{fileName}}.js --file=lorem.txt --outfile=outfile.txt

  compress:
    node {{fileName}}.js --file=lorem.txt --outfile=text.txt --out --compress => (to print the output without creating .gz file)
    node {{fileName}}.js --file=lorem.txt --outfile=text.txt --compress => (to create the .gz file)

  decompress:
    node {{fileName}}.js --file=outfile.gz --uncompress --out
    cat outfile.gz | node {{fileName}} --uncompress --in --out
    cat outfile.gz | {{fileName}}.js --outfile=lorem2.txt --uncompress --in
`);
}
