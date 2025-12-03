---
title: "Supervisor-Worker - JavaScript"
date: 2025-12-03T15:35:16.668-05:00
draft: false
pattern_usage: ["Supervisor-Worker"]
language: ["JavaScript"]
---
The Supervisor-Worker pattern delegates computationally intensive or blocking tasks to worker threads, preventing the main thread from freezing and maintaining a responsive user interface. A supervisor manages the workers, distributing tasks and collecting results. This example uses web workers in JavaScript. The supervisor creates a worker, sends it a message with the task (calculating a factorial), and receives the result via a message event.  This approach is idiomatic JavaScript because it leverages the event-driven, non-blocking nature of the language and the browser's web worker API to achieve concurrency without true multithreading.

```javascript
// supervisor.js
const worker = new Worker('worker.js');

function calculateFactorial(n) {
  return new Promise((resolve, reject) => {
    worker.postMessage({ task: 'factorial', data: n });

    worker.onmessage = (event) => {
      if (event.data.error) {
        reject(event.data.error);
      } else {
        resolve(event.data.result);
      }
    };

    worker.onerror = (error) => {
      reject(error);
    };
  });
}

// Example usage:
calculateFactorial(5)
  .then(result => console.log(`Factorial of 5 is: ${result}`))
  .catch(error => console.error(`Error calculating factorial: ${error}`));

// worker.js
self.onmessage = (event) => {
  const { task, data } = event.data;

  if (task === 'factorial') {
    let result = 1;
    for (let i = 2; i <= data; i++) {
      result *= i;
    }
    self.postMessage({ result: result });
  }
};
```