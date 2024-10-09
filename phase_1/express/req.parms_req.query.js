import express from 'express';


const app = express();

app.get('/api/posts', (req, res) => {
    console.log(req.params) 
    console.log(req.query)   // this works on /api/posts?limit=10&sort=desc

    /**
     * /api/posts?limit=10&sort=desc
     * 
     * output: 
     * req.query = { limit: '10', sort: 'desc'}
     * req.params = {}
     * 
     * But in this case you need to be aware of sql injection
     *  /api/posts?limit=DELETE FROM
     */

    res.end('')
})
app.get('/api/posts/:id', (req, res) => {
    console.log(req.params) // this works on /api/posts/3
    console.log()
    /**
     * /api/posts/3
     * 
     * output:
     * req.params = {id: 3, title: 'post 1'}
     * req.query = {}
     */
    res.end('')
})

app.listen(9090, _ => {
    console.log('Server running on http://localhost:9090');
})