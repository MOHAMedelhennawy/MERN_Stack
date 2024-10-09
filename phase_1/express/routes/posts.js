import express from 'express';

const router = express.Router();

let posts = [
    {id: 1, title: 'Post 1'},
    {id: 2, title: 'Post 2'},
    {id: 3, title: 'Post 3'},
    {id: 4, title: 'Post 4'},

]

// GET => /api/posts/{id}
router.get('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);
    const matches = posts.find(post => post.id === id)

    if (!matches) {
        const err = new Error('Post Not Found!');
        err.status = 404;
        return next(err)
    }
    res.status(200).json(matches)
})

// GET => /api/posts
router.get('/', (req, res) => {
    const limit = parseInt(req.query.limit);
    if (!isNaN(limit) && limit > 0) {
        return res.status(200).json(posts.slice(0, limit))
    }

    res.status(200).json(posts)
})

// POST => api/posts
router.post('/', (req, res, next) => {
    const newPost = {
        id: posts.length + 1,
        title: req.body.title
    }

    if (!newPost.title) {
        const err = new Error('Please include a title');
        err.status = 404;
        return next(err)
    }

    posts.push(newPost)
    res.status(201).json(posts)
})

// PUT => api/posts/{id}
router.put('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const matches = posts.find(post => post.id === id);

    if (!matches) {
        const err = new Error('Post Not Found');
        err.status = 404;
        return next(err)
    }

    if (!req.body.title) {
        const err = new Error('Please include a title');
        err.status = 404;
        return next(err)
    }

    matches.title = req.body.title;

    res.status(200).json(posts)
})

// DELETE => /api/posts/{id}
router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id)
    const matches = posts.find(post => post.id === id);

    if (!matches) {
        const err = new Error('Post Not Found');
        err.status = 404;
        return next(err)        
    }

    posts = posts.filter(post => post !== matches)
    res.status(200).json(posts)    
})
export default router;