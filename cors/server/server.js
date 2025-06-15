const express = require("express");
const cors = require("cors");

const app = express();

// app.use(cors({
//     origin: "http://localhost:5500"
// }))

app.get("/data", (req, res, next) => {
    res.json({ name: "Mohammed", age: 23 });
})


app.listen(4000);