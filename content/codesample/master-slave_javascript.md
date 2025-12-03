---
title: "Master-Slave - JavaScript"
date: 2025-12-03T15:31:35.099-05:00
draft: false
pattern_usage: ["Master-Slave"]
language: ["JavaScript"]
---
The Master-Slave pattern involves one object (the Master) controlling and coordinating the actions of one or more other objects (the Slaves). The Master delegates tasks to the Slaves, and the Slaves provide results back to the Master. This allows for parallel processing or distribution of work. The JavaScript implementation uses a simple object structure where the Master holds references to the Slaves and defines the work distribution logic.  Asynchronous operations (Promises) are used to handle the potentially non-blocking nature of the Slaves' tasks, fitting JavaScript's event-driven, non-blocking model.  The use of methods and object properties is standard JavaScript practice.

```javascript
// Master class
class Master {
  constructor() {
    this.slaves = [];
  }

  addSlave(slave) {
    this.slaves.push(slave);
  }

  async executeTask(taskData) {
    const slavePromises = this.slaves.map(slave => slave.process(taskData));
    const results = await Promise.all(slavePromises);
    return results;
  }
}

// Slave class
class Slave {
  constructor(id) {
    this.id = id;
  }

  async process(taskData) {
    // Simulate asynchronous processing
    return new Promise(resolve => {
      setTimeout(() => {
        const result = `Slave ${this.id} processed: ${taskData}`;
        console.log(result);
        resolve(result);
      }, Math.random() * 500); // Simulate varying processing times
    });
  }
}

// Example Usage:
const master = new Master();
const slave1 = new Slave(1);
const slave2 = new Slave(2);

master.addSlave(slave1);
master.addSlave(slave2);

async function runExample() {
  const task = "Important Data";
  const results = await master.executeTask(task);
  console.log("All slaves completed. Results:", results);
}

runExample();
```