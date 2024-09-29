#!/usr/bin/env node
import fs from 'node:fs'
import path from 'path';
import minimist from "minimist";
import { fileURLToPath } from 'url'
import { Transform } from 'node:stream'

const BASE_PATH = new URL('.', import.meta.url).pathname
const FILE_PATH = fileURLToPath(import.meta.url)

const args = minimist(process.argv.slice(2), {
    boolean: ['in', 'help', 'out'],
    string: ["filename", "outfile"]
})


if (args.help) {
    printHelp()
} else if (args.in || args._.includes('-')) {
    processFile(process.stdin)
} else if (args.filename) {
    let readStream;
    readStream = fs.createReadStream(path.join(BASE_PATH, args.filename), 'utf-8')
    processFile(readStream);

} else {
    error('Incorrect Usage', true)
}

function processFile(stream) {
    let outfile;
    let targetStream;
    let outStream = stream;
    const upperCaseTransform = new Transform({
        transform(chunk, enc, next) {
            this.push(chunk.toString().toUpperCase())
            next();
        }
    })

    if (args.out) {
        targetStream = process.stdout;
    } else {
        outfile = args.outfile? args.outfile : 'outfile.txt';
        targetStream = fs.createWriteStream(path.join(BASE_PATH, outfile))
    }

    outStream = stream.pipe(upperCaseTransform)
    outStream.pipe(targetStream)
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
  node 2-ex2.js --file=lorem.txt --outfile=outfile.txt
  node 2-ex2.js --file=lorem.txt --out --outfile=outfile.txt
  node 4-ex2.js --file=lorem.txt --outfile=text.txt --out --compress => to print the output without creating .gz file
  node 4-ex2.js --file=lorem.txt --outfile=text.txt --compress => to create the .gz file
`);
}
