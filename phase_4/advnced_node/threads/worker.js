const { parentPort, threadId } = require("worker_threads");

console.log(`Worker thread id: ${threadId}`);

let counter = 0;
for (let i = 0; i < 1e9; i++) {
    counter++;
}


parentPort.postMessage(`counter = ${counter}`);