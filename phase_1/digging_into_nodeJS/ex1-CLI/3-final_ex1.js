#!/usr/bin/env node
const path = require('path');
const fs = require('fs/promises')
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
    import('get-stdin')
        .then(data => {return data.default()})
        .then(processFile)
} else if (args.file) {
    fs.readFile(path.join(BASE_PATH, args.file), 'utf-8')
        .then(processFile)
        .catch(error => {
            console.error('Error reading the file:', error);
        });
} else {
    error('Incorrect Usage.', true);
}




function processFile(content) {
    content = content.toUpperCase()
    process.stdout.write(content)
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
