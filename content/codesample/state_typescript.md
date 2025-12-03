---
title: "State - TypeScript"
date: 2025-12-03T13:28:32.625-05:00
draft: false
pattern_usage: ["State"]
language: ["TypeScript"]
---
The State pattern allows an object to alter its behavior when its internal state changes. It encapsulates each state as a separate class, promoting single-responsibility and open/closed principles. Instead of using conditional logic based on a state variable, the current state object handles the specific requests.

This TypeScript implementation models a traffic light. Each light color (Red, Yellow, Green) is a `State` class. The `TrafficLight` class delegates behavior to the current `State` instance.  Using classes for states and interfaces for state behavior is a natural fit for TypeScript’s OOP capabilities, ensuring type safety and clear contracts.  It promotes maintainability, as adding new states only requires creating new classes without modifying existing ones.

```typescript
// Define the State interface
interface TrafficLightState {
  handle(): string;
}

// Concrete State: Red Light
class RedLight implements TrafficLightState {
  public handle(): string {
    return "Stop!";
  }
}

// Concrete State: Yellow Light
class YellowLight implements TrafficLightState {
  public handle(): string {
    return "Caution!";
  }
}

// Concrete State: Green Light
class GreenLight implements TrafficLightState {
  public handle(): string {
    return "Go!";
  }
}

// The Context: Traffic Light
class TrafficLight {
  private currentState: TrafficLightState;

  constructor() {
    this.currentState = new RedLight(); // Initial state
  }

  public setCurrentState(state: TrafficLightState): void {
    this.currentState = state;
  }

  public handleRequest(): string {
    return this.currentState.handle();
  }
}

// Usage
const trafficLight = new TrafficLight();
console.log(trafficLight.handleRequest()); // Output: Stop!

trafficLight.setCurrentState(new GreenLight());
console.log(trafficLight.handleRequest()); // Output: Go!

trafficLight.setCurrentState(new YellowLight());
console.log(trafficLight.handleRequest()); // Output: Caution!
```