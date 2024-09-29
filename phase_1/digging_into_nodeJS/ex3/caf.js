/**
 * Chat-GPT:
 * 
 * When you're using Promises to handle asynchronous tasks,
 * you can't easily stop the execution once it's started.
 * This becomes problematic in cases like file processing or streams,
 * where you might need to abort an ongoing task (e.g., due to a timeout).
 * 
 * 
 * CAF (Cancelable Async Flows). CAF allows you to create cancelable asynchronous
 * flows using JavaScript generators. Essentially, it transforms a generator
 * function into something that behaves like an async function but with the
 * added ability to cancel the operation if needed.
 * 
 * If there any Task take time longer that expected. Caf allows
 * you to cancele this process.
 * */
const CAF = require("caf");

function delay(ms) {
  return CAF(function* (signal) {   // retrun generator function
    let timeoutId;
    const promise = new Promise((resolve) => {
      timeoutId = setTimeout(resolve, ms);
    });

    // Check if cancel signal is triggered
    signal.pr.catch(() => clearTimeout(timeoutId));

    // Wait for either the delay to finish or the cancellation
    yield promise;
  });
}

const cancelableTask = CAF(function* (signal) {
  console.log("Task started...");
  yield delay(5000); // Simulating a long-running task
  console.log("Task completed!");
});

const task = cancelableTask();

// Let's cancel the task after 2 seconds
setTimeout(() => {
  console.log("Canceling task...");
  task.abort(); // This cancels the task
}, 2000);


/**
 * Chat-GPT:
 * 
 * Yes, exactly! The main idea is that if a task takes longer than the time you've specified, you can use `CAF` to cancel the task instead of letting it run to completion.
 * 
 * With **regular Promises**, there’s no built-in way to stop the task once it has started. But with `CAF` (Cancelable Async Flows), you can:
 * 1. Define a task (such as an operation that takes a certain amount of time).
 * 2. Monitor that task to check if it should be canceled (e.g., if it exceeds the set time limit).
 * 3. Cancel the task effectively if needed, stopping it early.
 * 
 * ### The Benefit:
 * For instance, if you're waiting for a task, like an API call or reading a file, but the task is taking too long (due to a slow network, for example), you can cancel it and avoid unnecessary waiting.
 * 
 * ### Example:
 * If you’ve set a task to take 5 seconds and want to cancel it if it exceeds 2 seconds, the code monitors the task and cancels it if it runs longer than the allowed time.
 * 
 * ```javascript
 * setTimeout(() => {
 *   console.log("Canceling task...");
 *   task.abort(); // Cancels the task after 2 seconds
 * }, 2000);
 * ```
 * 
 * This part of the code cancels the task after 2 seconds, even though the original task was designed to take 5 seconds.
 * */