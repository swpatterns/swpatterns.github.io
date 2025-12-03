---
title: "Cluster-based Architecture - JavaScript"
date: 2025-12-03T15:15:58.244-05:00
draft: false
pattern_usage: ["Cluster-based Architecture"]
language: ["JavaScript"]
---
The Cluster-based Architecture pattern divides a larger task into smaller, independent "clusters" of work. Each cluster can be handled by a separate worker or process, improving responsiveness and allowing for parallel execution. This example simulates worker clusters using JavaScript's `worker_threads` module to perform computationally intensive tasks (in this case, calculating a Fibonacci number) concurrently. A `master` thread distributes work to available `worker` threads and collects results. This leverages JavaScript’s single-threaded nature by adding concurrency, improving performance without blocking the main event loop.

```javascript
// master.js
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  const numTasks = 5;
  const workers = [];
  const results = [];

  for (let i = 0; i < numTasks; i++) {
    const worker = new Worker('./worker.js', { workerId: i });
    workers.push(worker);

    worker.on('message', (result) => {
      results[worker.workerId] = result;
      if (results.every(x => x !== undefined)) {
        console.log('All results received:', results);
      }
    });
    worker.on('error', (err) => {
      console.error(`Worker ${worker.workerId} error:`, err);
    });
    worker.on('exit', (code) => {
      if (code !== 0) {
        console.error(`Worker ${worker.workerId} stopped with exit code ${code}`);
      }
    });

    worker.postMessage({ task: 'fibonacci', data: i + 1 }); // Send task to worker
  }
}

// worker.js
const { parentPort } = require('worker_threads');

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

parentPort.on('message', (message) => {
  const { task, data } = message;
  if (task === 'fibonacci') {
    const result = fibonacci(data);
    parentPort.postMessage(result);
  }
});
```