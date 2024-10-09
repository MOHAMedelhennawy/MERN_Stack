import express from 'express';
import path from 'node:path'
import { fileURLToPath } from 'node:url';

const PORT = 9068;
const app = express();
const FILE_PATH = fileURLToPath(import.meta.url);
const BASE_PATH = path.dirname(FILE_PATH)


app.get('/', (req, res) => {
    // res.send('Hello, World!')       // You havent to determine what the type of mime
    // res.send('<h1>Hello, World!</h1>')
    // res.send({message: 'Hello, World!'})
    res.sendFile(path.join(BASE_PATH, `public`, `index.html`));
})

app.get('/about', (req, res) => {
    // res.send('About')
    res.sendFile(path.join(BASE_PATH, `public`, `about.html`));
})

app.listen(PORT, _ => console.log(`Server running now on http://localhost:${PORT}`))

// ========== Node.js ===========
// import http from 'node:http'
// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         res.writeHead(200, {'Content-Type': 'text/plain'})
//         res.end('Hello, World!')
//     }
// })
// server.listen(PORT, _ => console.log(`Server running now on http://localhost:${PORT}`))
