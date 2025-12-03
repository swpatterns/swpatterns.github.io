---
title: "Supervisor-Worker - TypeScript"
date: 2025-12-03T15:35:34.990-05:00
draft: false
pattern_usage: ["Supervisor-Worker"]
language: ["TypeScript"]
---
The Supervisor-Worker pattern delegates complex or potentially blocking tasks to worker threads, preventing the main thread from freezing and maintaining responsiveness. A supervisor thread manages the workers, distributing work and collecting results. This is particularly useful in TypeScript/JavaScript environments where the single-threaded nature of the main event loop can cause UI unresponsiveness.

This implementation uses Node.js's `worker_threads` module. The `Supervisor` class creates and manages `Worker` instances, sending them messages with tasks. Workers perform the task and return the result. The Supervisor then handles the results.  TypeScript's type safety is leveraged to define the message types exchanged between supervisor and workers, improving code clarity and preventing runtime errors.  Using classes and async/await aligns with modern TypeScript best practices for managing asynchronous operations and thread communication.

```typescript
// supervisor.ts
import { Worker } from 'worker_threads';
import * as path from 'path';

type Task = {
  type: 'calculatePi';
  iterations: number;
};

type Result = {
  type: 'piResult';
  value: number;
};

class Supervisor {
  private workers: Worker[] = [];
  private numWorkers: number;

  constructor(numWorkers: number) {
    this.numWorkers = numWorkers;
    this.initializeWorkers();
  }

  private initializeWorkers(): void {
    for (let i = 0; i < this.numWorkers; i++) {
      const worker = new Worker(path.resolve(__dirname, 'worker.ts'));
      this.workers.push(worker);

      worker.on('message', (result: Result) => {
        console.log(`Received result: ${result.value}`);
      });

      worker.on('error', (err) => {
        console.error(`Worker error: ${err}`);
      });

      worker.on('exit', (code) => {
        console.log(`Worker exited with code ${code}`);
      });
    }
  }

  public sendTask(task: Task): void {
    // Round-robin task distribution
    const worker = this.workers[this.getWorkerIndex()];
    worker.postMessage(task);
  }

  private getWorkerIndex(): number {
    let index = 0;
    for (let i = 0; i < this.workers.length; i++) {
      if (!this.workers[i].isBusy) {
        index = i;
        break;
      }
    }
    return index;
  }
}

// worker.ts
import { parentPort } from 'worker_threads';
import { Task, Result } from './supervisor';

parentPort?.on('message', (task: Task) => {
  if (task.type === 'calculatePi') {
    const pi = calculatePi(task.iterations);
    (parentPort as any).postMessage({ type: 'piResult', value: pi } as Result);
  }
});

function calculatePi(iterations: number): number {
  let pi = 0;
  let sign = 1;
  for (let i = 0; i < iterations; i++) {
    pi += sign / (2 * i + 1);
    sign *= -1;
  }
  return pi * 4;
}

// main.ts
const supervisor = new Supervisor(2);

for (let i = 0; i < 5; i++) {
  const iterations = 1000000 + i * 200000;
  setTimeout(() => {
    supervisor.sendTask({ type: 'calculatePi', iterations });
  }, i * 500);
}
```