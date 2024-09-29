#!/usr/bin/node
const fs = require('fs')

// Create a readable stream from '0-ex2.js'
const myReadStream = fs.createReadStream('./0-ex2.js', 'utf-8');
// Create a writable stream to '1-ex2.js'
const myWriteStream = fs.createWriteStream('./1-ex2.js');
// 3-party readable
let myReadStream2 = fs.createReadStream('./input.txt', 'utf-8')

// myReadStream.on('data', (chunk) => {
//     /**
//      * Every time the readStream receives a chunk of data,
//      * it writes that chunk to the 'write.txt' file.
//      */
//     console.log('New chunk received, writing it to write.txt file...');
//     myWriteStream.write(chunk);
// });


// There a another way to retrieve, using pipe
myReadStream2 = myReadStream.pipe(myWriteStream)

console.log(myReadStream2)

/**
 * The main difference between using fs.readFile and streams
 * is that with streams, you don't need to wait for the entire
 * file to be loaded into memory before processing it.
 * 
 * Instead, the data is split into smaller chunks, and each chunk
 * is processed as soon as it becomes available, allowing more efficient
 * memory usage, especially for large files.
 */
