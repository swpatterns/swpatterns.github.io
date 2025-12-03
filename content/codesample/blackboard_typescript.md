---
title: "Blackboard - TypeScript"
date: 2025-12-03T15:23:38.074-05:00
draft: false
pattern_usage: ["Blackboard"]
language: ["TypeScript"]
---
The Blackboard pattern is a computational architecture where multiple independent knowledge sources (agents) collaborate to solve a complex problem. A central data structure, the "blackboard," holds the problem state, and agents react to changes on the blackboard, modifying it to move closer to a solution. This facilitates a flexible and adaptable system, well-suited for problems lacking a clear algorithmic solution.

This TypeScript implementation simulates a simple Blackboard with agents that add information to it. `Blackboard` class manages the shared data (`data`). `Agent` classes each define a `run` method that examines the blackboard and potentially manipulates the data.  Agents are loosely coupled and added to the blackboard instance, triggering their actions when the `solve` method is called.  Using classes and interfaces aligns with TypeScript's OOP capabilities and promotes type safety and organization.

```typescript
interface BlackboardData {
  [key: string]: any;
}

class Blackboard {
  private data: BlackboardData = {};
  private agents: Agent[] = [];

  constructor() {}

  getData(): BlackboardData {
    return this.data;
  }

  setData(key: string, value: any) {
    this.data[key] = value;
    this.notifyAgents();
  }

  addAgent(agent: Agent) {
    this.agents.push(agent);
  }

  solve(): void {
    this.agents.forEach(agent => agent.run(this.data, this));
  }

  private notifyAgents(): void {
    this.agents.forEach(agent => agent.run(this.data, this));
  }
}

interface Agent {
  run(data: BlackboardData, blackboard: Blackboard): void;
}

class InputAgent implements Agent {
  run(data: BlackboardData, blackboard: Blackboard): void {
    if (!data.input) {
      console.log("Input Agent: Providing initial input.");
      blackboard.setData("input", "Initial Data");
    }
  }
}

class ProcessingAgent implements Agent {
  run(data: BlackboardData, blackboard: Blackboard): void {
    if (data.input && !data.processed) {
      console.log("Processing Agent: Processing input.");
      blackboard.setData("processed", data.input.toUpperCase());
    }
  }
}

class OutputAgent implements Agent {
  run(data: BlackboardData, blackboard: Blackboard): void {
    if (data.processed) {
      console.log("Output Agent: Displaying result.");
      console.log("Result:", data.processed);
    }
  }
}

// Example Usage:
const blackboard = new Blackboard();
blackboard.addAgent(new InputAgent());
blackboard.addAgent(new ProcessingAgent());
blackboard.addAgent(new OutputAgent());

blackboard.solve();
```