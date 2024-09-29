const { error } = require('console');
const fs = require('fs')
const path = require('path')
const args = require("minimist")(process.argv.slice(2), {
    string: [ "file" ],
    boolean: [ "help" ]
});

console.log(args)

if (args.help) {
    printHelp()
} else if(args.file) {
    const FILE_PATH = path.resolve(args.file);
    processFile(FILE_PATH);
} else {
    error('Incorrect Usage.', false)
}

function processFile(filepath) {
    /**
     * command: node ex1_1.js --file=hello.txt
     */

    const content = fs.readFileSync(filepath);
    console.log(content);   // <Buffer 48 65 6c 6c 6f 2c 20 57 ..
    
    /** Now what if you use process.stdout.write? */
    process.stdout.write(content);  // Hello, World. from hello.txt file
    
    /**
     * console.log works differently under the hood.
     * console.log first converts the content to a string before printing it.
     * process.stdout.write, on the other hand, sends the binary buffer directly to the shell,
     * which knows how to handle and translate the bytes into characters.
     */

    console.log()
    fs.readFile(filepath, (err, content) => {
        if (err) {
            error(err.toString())
        } else {
            process.stdout.write(content)   // Hello, World. from hello.txt file
        }
    })
}

function printHelp() {
    console.log("Help")
}