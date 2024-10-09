// HTTP

const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    fs.readFile('./home.html', (err, data) => {
        if (err) {
            console.log(err)
        } else {
            res.end(data.toString())
        }
    })
});

server.listen(5000, () => {
    console.log("Server is running now on http://localhost:5000");
})