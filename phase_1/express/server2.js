import dotenv from 'dotenv'
import path from 'node:path'
import express from 'express';
import { fileURLToPath } from 'node:url';

const app = express();
const config = dotenv.config();
const PORT = process.env.PORT || 8001;
const FILE_PATH = fileURLToPath(import.meta.url);
const BASE_PATH = path.dirname(FILE_PATH)

const posts = [
    {id: 1, title: 'Post 1'},
    {id: 2, title: 'Post 2'},
    {id: 3, title: 'Post 3'},
    {id: 4, title: 'Post 4'},

]

// app.use(express.static(path.join(BASE_PATH, 'public')));

// GET => /api/posts
app.get('/api/posts', (req, res) => {
    const limit = parseInt(req.query.limit);    // to make sure it's a number, to avoid sql injection
    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(posts.slice(0, limit))     // return first 3 posts
    }

    res.status(200).json(posts)
})

// GET => /api/posts/{id}
app.get('/api/posts/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const matches = posts.find(post => post.id === id)

    if (matches) {
        return res.status(200).json(matches)
    }

    res.status(404).json({msg: `Post With id ${id} Was Not Found`})
})
app.listen(PORT, _ => console.log(`Server running now on http://localhost:${PORT}`))
