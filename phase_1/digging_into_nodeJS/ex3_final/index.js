#!/usr/bin/env node
import fs from 'fs/promises'
import path from 'path';
import minimist from "minimist";
import getStdin from 'get-stdin';
import { fileURLToPath } from 'url'

const BASE_PATH = new URL('.', import.meta.url).pathname
const FILE_PATH = fileURLToPath(import.meta.url)

const args = minimist(process.argv.slice(2), {
    boolean: ['in', 'help'],
    string: ["filename"]
})


if (args.help) {
    printHelp()
} else if (args.in || args._.includes('-')) {
    getStdin()
        .then(processFile)
} else if (args.filename) {
    fs.readFile(path.join(BASE_PATH, args.filename), 'utf-8')
        .then(processFile)
} else {
    error('Incorrect Usage', true)
}

function processFile(stream) {
    const upperStream = stream.toString().toUpperCase()
    console.log(upperStream)
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
