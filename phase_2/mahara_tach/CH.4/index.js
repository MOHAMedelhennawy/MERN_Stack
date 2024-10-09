/**
 * Middleware:
 * Built-in: express.json   express.urlencoded      express.static
 * Route-handler
 * 
 */
const express = require('express')

const app = express();

// To handle all get requests
app.get('*', (req, res, next) => {
    console.log("i handle all get requrest :)")
    next()
})

app.use(express.static("public")) // => http://localhost:8000/readme.txt
app.use('/assets', express.static("public"))    // => localhost:8000/assets/readme.txt

// You can build inline middleware
app.get('/', (req, res, next) => {
    console.log('Hello')
    // res.send('Hello');
    next()
}, (req, res, next) => {
    console.log('Welcome')
    next()
})

// OR, but you should to be aware that to be the same route `/`
app.get('/', (req, res) => {
    console.log('Done..')
    res.send('Done..')
})


// cookies
app.post('/welcome.html')

app.listen('8000', () => {
    console.log('Server running on http://localhost:8000');
})