const fs = require('fs');

// Read
// Usin sync
const data = fs.readFileSync('./module_scope.txt');
console.log(data.toString())


// Usin async
fs.readFile('./module_scope.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
})

// Write
fs.writeFile('./newFile.txt', 'sssssssssss', (err) => {
    if (err) {
        console.log(err)
    }
})

// Append
fs.appendFile('./newFile.txt', ' aaaaaaaaaaaaaaaaaaa', (err) => {
    if (err) {
        console.log(err)
    }
})

// Delete
// fs.unlink('./newFile.txt', (err) => {
//     if (err) {
//         console.log(err)
//     }
// })


// Working with directories

// Create new dir
fs.mkdir('newDir', (err) => {
    if (err) {
        console.log(err)
    } else {
        // process.chdir('./newDir');
        fs.writeFile('./newDir/childFile', 'This is a new file', (err) => {
            console.log(err)
        })
    }
})

// Read dir
fs.readdir('./newDir', (err, files) => {
    if (err) {
        console.log(err)
    } else {
        console.log(files)
    }
})