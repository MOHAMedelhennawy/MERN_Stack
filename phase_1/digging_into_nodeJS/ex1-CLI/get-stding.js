// command: echo test | node get-stding.js

/**
 * The get-stdin package in JavaScript is a simple utility for reading
 * data from the standard input (stdin) stream. It's especially useful
 * when you're building command-line tools in Node.js, where you might
 * need to handle input piped from another process or manually entered by a user. 
 */
const content = async () => {
    const data = await import('get-stdin')
    return data.default();
}

content()
    .then(data => console.log(data))