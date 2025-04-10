const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    // To initalliy connect to database
    connectToDb: (cb) => {
        // It's take special mongodb url to connect our database.
        // Note: this url to connect to database on you local pc
        MongoClient.connect('mongodb://localhost:27017/testdb') // It's async function
            .then((client) => { // client it's represent the client that craeted by connecting to database
                dbConnection = client.db();    // return an instance of database connection
                return cb()
            })
            .catch(err => {
                console.log(err);
                return cb(err);
            })
    },
    
    // Get database connection
    getDb: () => dbConnection
}