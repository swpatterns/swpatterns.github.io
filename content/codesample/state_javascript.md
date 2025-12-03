---
title: "State - JavaScript"
date: 2025-12-03T13:28:16.844-05:00
draft: false
pattern_usage: ["State"]
language: ["JavaScript"]
---
The State pattern allows an object to alter its behavior when its internal state changes. Instead of using conditional logic to handle different states, the pattern creates separate state classes to encapsulate each state's behavior. This promotes the Single Responsibility Principle and makes the code more maintainable and extensible.

This JavaScript implementation models a traffic light using the State pattern. Each state (Red, Yellow, Green) is a class implementing a `handle()` method that defines the light's action when triggered. A `TrafficLight` class manages the current state and delegates requests to it. Using classes for each state and composition within `TrafficLight` are idiomatic JavaScript for structuring state-based logic and avoiding long if/else chains.

```javascript
// State interface
class State {
  handle() {
    throw new Error("Handle method must be implemented in subclasses");
  }
}

// Concrete states
class Red extends State {
  handle() {
    console.log("Red Light: Stop!");
    return new Yellow(); // Transition to the next state
  }
}

class Yellow extends State {
  handle() {
    console.log("Yellow Light: Caution!");
    return new Green(); // Transition to the next state
  }
}

class Green extends State {
  handle() {
    console.log("Green Light: Go!");
    return new Red(); // Transition to the next state
  }
}

// Context class
class TrafficLight {
  constructor() {
    this.state = new Red();
  }

  setState(state) {
    this.state = state;
  }

  handle() {
    this.state.handle();
  }
}

// Example usage:
const trafficLight = new TrafficLight();

for (let i = 0; i < 5; i++) {
  trafficLight.handle();
}

```