---
title: "Cluster-based Architecture - TypeScript"
date: 2025-12-03T15:16:12.223-05:00
draft: false
pattern_usage: ["Cluster-based Architecture"]
language: ["TypeScript"]
---
The Cluster-based Architecture pattern distributes processing across multiple worker processes (clusters) to improve performance and reliability, particularly in single-threaded environments like Node.js/TypeScript. It leverages multi-core processors. This example uses Node’s `cluster` module to create a simple HTTP server forked into multiple workers. Each worker handles requests independently. The `master` process manages the workers, restarting them if they crash, thereby increasing application uptime. This approach is idiomatic TypeScript for Node.js as it directly utilizes Node's built-in capabilities for process management and concurrency, avoiding complex threading models.

```typescript
// cluster.ts
import * as cluster from 'cluster';
import * as http from 'http';
import { cpus } from 'os';

const numCPUs = cpus().length;
const port = 3000;

if (cluster.isMaster) {
  console.log(`Master process running on PID ${process.pid}`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker process exited with code ${code} and signal ${signal}`);
    cluster.fork(); // Restart the worker
  });
} else {
  const workerId = cluster.worker.id;
  console.log(`Worker process running on PID ${process.pid}, ID ${workerId}`);

  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Hello from worker ${workerId}!`);
  });

  server.listen(port, () => {
    console.log(`Worker ${workerId} listening on port ${port}`);
  });

  process.on('uncaughtException', (err) => {
    console.error(`Worker ${workerId} uncaught exception: ${err}`);
    process.exit(1);
  });
}
```