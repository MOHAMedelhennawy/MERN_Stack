const path = require('path')
const express = require('express');
const Ajv = require('ajv');


const schema = {
    "type": "object",
    "properties": {
        "name": {
            "type": "string",
            "pattern": '^[A-Z][a-z]*$'
        },
        "dept": {
            "type": "string",
            "minLength": 2,
            "maxLength": 5,
        }
    }
}

const ajv = new Ajv();
let validators = ajv.compile(schema);


const app = express();

app.use(express.json())
/**
 * One you define this middleware, you can access http request body
 */
app.use(express.urlencoded({extended: true}))
// =============== GET ===============

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/main.html"))
})

/**
 * The info that coming from the from its added on query string
 * ex:
 *  first name: mohammed
 *  last name: elhennawy
 * 
 * 
 * url: `http://localhost:8000/welcome.html?fname=mohammed&lname=elhennawy`
 * req.query = { fname: 'mohammed', lname: 'elhennawy' }
 */
app.get("/welcome.html", (req, res) => {
    // res.send(`Welcome, ${req.query.fname} ${req.query.lname}`)
    console.log(req.query)
    req.sendFile(path.join(__dirname, 'welcome.html'))
})

// =============== POST ===============

/**
 * otherwise, on post method the data is coming from the form its coming
 * through the http req body
 * 
 * req.body
 */


app.post('/welcome.html', (req, res) => {
    let validate = validators(req.body);    // To ensure that the req.body comes with the same format of schema
    if (validate) {
        console.log(req.body)   // undefiend, because you should to parse it first using middleware
        res.send('Thanks for sending required data')
    } else {
        
    }
})
app.listen(8000, () => {
    console.log('Server running on http://localhost:8000')
})