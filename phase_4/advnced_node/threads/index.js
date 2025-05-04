const express = require("express");
const { Worker, isMainThread, threadId } = require("worker_threads");

const app = express();
const port = 4000;


app.get("/non-blocking/", (req, res) => {
    res.status(200).send(`This page is non-blocking`);
})

app.get("/blocking", (req, res) => {
    const worker = new Worker(`./worker.js`);

    worker.on("message", (data) => {
        res.status(200).send(`result is ${data}`);
    })

    worker.on("error", (error) => {
        res.status(200).send(`An error accured ${error}`);
    })
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
})