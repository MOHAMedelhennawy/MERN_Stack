import express from 'express';

const PORT = process.env.PORT || 5000;
const app = express();

app.get('/', (req, res) => res.send(`<h1> Hello, World </h1>`))
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})