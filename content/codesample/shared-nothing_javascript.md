---
title: "Shared-Nothing - JavaScript"
date: 2025-12-03T15:11:34.179-05:00
draft: false
pattern_usage: ["Shared-Nothing"]
language: ["JavaScript"]
---
The Shared-Nothing pattern aims for scalability and concurrency by avoiding shared state between processing units. Each unit operates on its own private data and communicates results through passing messages or using a central aggregator. This eliminates the need for locks or other synchronization mechanisms, reducing contention.

This JavaScript example simulates a worker pool using `Array.map` and represents the core concept. Each 'worker' (map callback function) receives a unique section of the input data and calculates a result *without* accessing or modifying any shared variables. The final results are combined in the main thread. This is idiomatic JavaScript due to the reliance on functional concepts (map) and avoiding mutable shared state, favoring immutability and message passing (returning values from the function). While JavaScript's single-threaded nature limits true parallelism without Web Workers, this approach reflects the pattern's principle for asynchronous operations.

```javascript
/**
 * Demonstrates the Shared-Nothing pattern using a simple worker pool.
 *
 * @param {number[]} data The input data to be processed.
 * @param {number} numWorkers The number of workers to use.
 * @param {function} workerFunction The function each worker will execute on its data.
 * @returns {number[]} The combined results from all workers.
 */
function sharedNothing(data, numWorkers, workerFunction) {
  const chunkSize = Math.ceil(data.length / numWorkers);
  const chunks = [];
  for (let i = 0; i < data.length; i += chunkSize) {
    chunks.push(data.slice(i, i + chunkSize));
  }

  const results = chunks.map(chunk => {
    // Each worker processes its own chunk of data.
    return chunk.map(workerFunction);
  });

  // Flatten the results array.
  return results.flat();
}

// Example Usage:
const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const numWorkers = 3;

// A simple worker function that squares a number.
const squareWorker = (num) => num * num;

const squaredData = sharedNothing(data, numWorkers, squareWorker);
console.log(squaredData); // Output: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
```