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
app.use(express.urlencoded({extended: true}))
// =============== GET ===============

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/main.html"))
})

app.get("/welcome.html", (req, res) => {
    console.log(req.query)
    req.sendFile(path.join(__dirname, 'welcome.html'))
})

app.post('/welcome.html', (req, res) => {
    let validate = validators(req.body);    // To ensure that the req.body comes with the same format of schema
    if (validate) {
        res.cookie("username", Buffer.from(req.body.fname).toString('base64'))
        res.cookie("age", 22)
        console.log(req.body)   // undefiend, because you should to parse it first using middleware
        res.send('Thanks for sending required data')
    } else {
        
    }
})

app.listen(8000, () => {
    console.log('Server running on http://localhost:8000')
})