const { Worker } = require('worker_threads');

async function runWorker() {
    const worker = new Worker('./worker.js', { workerData: 1e9 });
    
    worker.on("message", (data) => {
        console.log(data)
    })

    worker.on("error", (error) => {
        console.log('error');
    })
}


async function runMainThread() {
    let sum = 0;
    for (let i = 1; i <= 1e9; i++) {
      sum += i;
    }
    return sum;
}

async function main() {
    console.log("Starting worker ....");
    // const result = await runWorker();
    const result = await runMainThread();
    console.log("Worker result:", result);
    console.log("End of program");
}


main();