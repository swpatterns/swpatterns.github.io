---
title: "Master-Slave - TypeScript"
date: 2025-12-03T15:31:48.363-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["TypeScript"]
---
The Master-Slave pattern distributes work to multiple worker nodes (slaves) from a central coordinator (master). The master manages the tasks and distributes them, while the slaves execute the tasks and return results. This example uses TypeScript's asynchronous programming features (Promises and `async/await`) to simulate this. The `Master` class creates tasks and assigns them to `Slave` instances. Slaves process tasks and return results via Promises. The master awaits these results and aggregates them. This implementation leverages TypeScript's type safety and asynchronous capabilities for a clean and maintainable structure, fitting the language's modern approach to concurrency.

```typescript
// master-slave.ts

class Task {
  constructor(public id: number, public data: string) {}
}

class Slave {
  async processTask(task: Task): Promise<string> {
    // Simulate task processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    return `Slave processed task ${task.id} with data: ${task.data}`;
  }
}

class Master {
  private slaves: Slave[];

  constructor(numSlaves: number) {
    this.slaves = Array.from({ length: numSlaves }, () => new Slave());
  }

  async executeTasks(tasks: Task[]): Promise<string[]> {
    const results: Promise<string>[] = [];
    for (const task of tasks) {
      const slave = this.slaves[task.id % this.slaves.length]; // Distribute tasks round-robin
      results.push(slave.processTask(task));
    }
    return Promise.all(results);
  }
}

async function main() {
  const master = new Master(3);
  const tasks = [
    new Task(1, "Data A"),
    new Task(2, "Data B"),
    new Task(3, "Data C"),
    new Task(4, "Data D"),
    new Task(5, "Data E"),
  ];

  const results = await master.executeTasks(tasks);
  console.log("Results:", results);
}

main();
```