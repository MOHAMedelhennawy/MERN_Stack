import dotenv from 'dotenv'
import path from 'node:path'
import express from 'express';
import posts from './routes/posts.js'
import { fileURLToPath } from 'node:url';
import logger from './middleware/logger.js'
import notFound from './middleware/notFound.js';
import errorHandler from './middleware/error.js';

const app = express();
const config = dotenv.config();
const PORT = process.env.PORT || 8001;
const FILE_PATH = fileURLToPath(import.meta.url);
const BASE_PATH = path.dirname(FILE_PATH)


// Body parser middleware
app.use(express.json())                             // for handle `row` requests
app.use(express.urlencoded({ extended: false }))    // for handle `x-www-form-urlencoded` requests

// Logger middleware
app.use(logger)

// Routes
app.use('/api/posts', posts)

// not found error handler
app.use(notFound)

// Error middleware
app.use(errorHandler)

app.listen(PORT, _ => console.log(`Server running now on http://localhost:${PORT}`))
