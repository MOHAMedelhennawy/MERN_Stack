const fs = require('fs');
const path = require('path');
const args = require("minimist")(process.argv.slice(2), {
    string: ["file"],
    boolean: ["help", "in"],
    default: { help: false }  // Default value for help
});

console.log(args);

const BASE_PATH = path.resolve(
    process.env.BASE_PATH || __dirname
)

if (args.help) {
    printHelp();
} else if (args.in || args._.includes("-")) {
    /**
     * This handles commands like: `cat hello.txt | node ex1_2.js --in`.
     * In this case, `get-stdin` captures the text being piped into the script 
     * (e.g., the content of `hello.txt`), and then passes that input to the 
     * `processFile` function for further processing.
     */
    import('get-stdin').then(getStdin => {
        return getStdin.default();
    }).then(processFile)
      .catch(err => error(err.toString()));
} else if (args.file) {
    /**
     * This handles commands like:
     * `BASE_PATH=/home/elhennawy/MERN/phase_1/digging_into_nodeJS node ex1_2.js --file=hello.txt`
     * 
     * @BASE_PATH - The absolute path where the script is running. 
     * If `BASE_PATH` is not provided through environment variables, it defaults to the current directory (`__dirname`).
     * 
     * @file - The name of the file to be processed, passed via the `--file` argument.
     * 
     * The `path.join` method concatenates the `BASE_PATH` and `file` name into a full file path,
     * taking the operating system into account (Linux or Windows).
     */
    fs.readFile(path.join(BASE_PATH, args.file), (err, content) => {
        if (err) {
            error(err.toString());
        } else {
            processFile(content.toString());
        }
    });
} else {
    error('Incorrect Usage.', true);
}

function processFile(content) {
    content = content.toUpperCase();
    process.stdout.write(content);
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
