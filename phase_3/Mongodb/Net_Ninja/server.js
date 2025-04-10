const express = require('express');
const { connectToDb, getDb } = require('./db.js');
const { ObjectId } = require('mongodb');

// init app
const app = express();

app.use(express.json());


// db connection
let db;

connectToDb((err) => {  // pass callback to the function
    if (!err) { // if connected successfully, run the server.
        app.listen(4000, () => {
            console.log('app listening on http://localhost:4000');
        })

        db = getDb();   // That db that will use to fetching data
    }
})


// Get all users
app.get('/users', async (req, res, next) => {

    try {
        // Pagination
        const page = req.query.page || 0;
        const userPerPage = 3;
        const skippedUsers = page * userPerPage;

        let users = [];

        await db.collection('users')
            .find()
            .sort({ age: 1 })
            .skip(skippedUsers)
            .limit(userPerPage)
            .forEach(user => {  // without forEach it will return `FindCursor` Object
                users.push(user);
            });

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: `${error.message}`});
    }
})

// Get user with id
app.get('/users/:id', async (req, res, next) => {
    
    try {
        const id = req.params.id;
        
        if (ObjectId.isValid(id)) {
            const user = await db.collection('users')
                .findOne({ _id: new ObjectId(id) });
    
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Invalid id' });
        }
    } catch (error) {
        res.status(500).json({message: `${error.message}`});
    }

})

// Add new user
app.post('/users', async (req, res, next) => {
    try {
        const user = req.body;

        const result = await db.collection('users')
            .insertOne(user);
        
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ message: `${error.message}` });
    }
})

// Delete user
app.delete('/users/:id', async (req, res, next) => {
    try {
        const id = req.params.id;

        if (ObjectId.isValid(id)) {
            const result = await db.collection('users')
                .deleteOne({ _id: new ObjectId(id) });
            
            res.status(200).json({
                message: 'User deleted successful!',
                result
            }) 
        } else {
            res.status(500).json({ message: `id is not valid` });
        }
    } catch (error) {
        res.status(500).json({ message: `${error.message}` });
    }
})

// Update user
app.patch('/users/:id', async (req, res, next) => {
    try {
        const updates = req.body;
        const id = req.params.id;

        if (ObjectId.isValid(id)) {
            const result = await db.collection('users')
                .updateOne({ _id: new ObjectId(id) }, { $set: updates })
            
            res.status(200).json({
                message: 'User updated successfull!',
                result
            })
        } else {
            res.status(500).json({ message: `id is not valid` });
        }
    } catch (error) {
        res.status(500).json({ message: `${error.message}` });
    }
})