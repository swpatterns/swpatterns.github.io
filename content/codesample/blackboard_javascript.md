---
title: "Blackboard - JavaScript"
date: 2025-12-03T15:23:23.484-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["JavaScript"]
---
The Blackboard pattern is a computational problem-solving approach where multiple independent knowledge sources (agents) operate on a shared data structure (the blackboard) to collectively solve a complex problem. Each agent recognizes patterns in the blackboard's state and contributes relevant information, triggering other agents in a cycle until a solution is found. This promotes loose coupling and allows for dynamic problem-solving.

The JavaScript implementation uses a central `Blackboard` object holding the evolving solution.  `Agent` classes define `apply` methods which modify the blackboard based on their assigned criteria. A `Dispatcher` manages the agents and orchestrates the process, iteratively applying agents until a `solved` flag is set on the blackboard. This leverages JavaScript's flexible object model and favors composition over inheritance, fitting its typical style. Asynchronous operations could easily be integrated within the agents.

```javascript
// blackboard.js
class Blackboard {
  constructor(initialData) {
    this.data = initialData;
    this.solved = false;
  }

  setData(newData) {
    this.data = newData;
  }

  getData() {
    return this.data;
  }

  isSolved() {
    return this.solved;
  }

  setSolved() {
    this.solved = true;
  }
}

// agent.js
class Agent {
  constructor(name, condition, apply) {
    this.name = name;
    this.condition = condition;
    this.apply = apply;
  }

  shouldApply(blackboard) {
    return this.condition(blackboard.getData());
  }

  apply(blackboard) {
    this.apply(blackboard.getData());
  }
}

// dispatcher.js
class Dispatcher {
  constructor(blackboard, agents) {
    this.blackboard = blackboard;
    this.agents = agents;
  }

  run() {
    while (!this.blackboard.isSolved()) {
      for (const agent of this.agents) {
        if (agent.shouldApply(this.blackboard)) {
          agent.apply(this.blackboard);
          break; // Apply only one agent per cycle
        }
      }
    }
  }
}

// Example Usage:
// problem: Determine if a number is prime
const initialData = 17;
const blackboard = new Blackboard(initialData);

const checkDivisibility = new Agent(
  "DivisibilityChecker",
  (data) => data > 1,
  (data) => {
    for (let i = 2; i <= Math.sqrt(data); i++) {
      if (data % i === 0) {
        blackboard.setData(`Not prime, divisible by ${i}`);
        return;
      }
    }
    blackboard.setData("Prime");
  }
);

const setSolved = new Agent(
  "SolutionSetter",
  (data) => data === "Prime" || data === "Not prime, divisible by",
  (data) => {
    blackboard.setSolved();
  }
);

const dispatcher = new Dispatcher(blackboard, [checkDivisibility, setSolved]);
dispatcher.run();

console.log(blackboard.getData()); // Output: Prime
console.log(blackboard.isSolved()); // Output: true
```