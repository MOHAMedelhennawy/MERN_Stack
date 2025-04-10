import express from 'express';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 4000;
const app = express();

const DB_USER='root';
const DB_PASSWORD='example';
const DB_PORT='27017';

const URI = `mongodb://${DB_USER}:${DB_PASSWORD}@host:${DB_PORT}`;
mongoose.connect().then(() => console.log(`Connected to DB`));

app.get('/', (req, res) => res.send(`<h1> Hello, World </h1>`))
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})