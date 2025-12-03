---
title: "State - Java"
date: 2025-12-03T13:27:47.926-05:00
draft: false
pattern_usage: ["State"]
language: ["Java"]
---
The State pattern allows an object to alter its behavior when its internal state changes. It encapsulates each state into separate classes, making the code more organized and easier to maintain. Instead of a complex series of `if/else` or `switch` statements to handle different states, the object delegates the behavior to its current state object.

This Java example models a traffic light. The `TrafficLight` class maintains a `currentState` (an instance of a `State` subclass) and delegates the `handle()` method to it. Concrete states (`RedState`, `YellowState`, `GreenState`) implement the `State` interface, defining the traffic light's behavior in each respective state. Transitions between states are managed within each state's `handle()` method. This approach follows Java's object-oriented principles, especially encapsulation and polymorphism, and avoids tight coupling between state logic and the main `TrafficLight` class.

```java
// State Interface
interface State {
    void handle(TrafficLight trafficLight);
}

// Concrete States
class RedState implements State {
    @Override
    public void handle(TrafficLight trafficLight) {
        System.out.println("Traffic light is RED.  Stopping cars.");
        trafficLight.changeState(new GreenState());
    }
}

class YellowState implements State {
    @Override
    public void handle(TrafficLight trafficLight) {
        System.out.println("Traffic light is YELLOW.  Prepare to stop or go!");
        trafficLight.changeState(new RedState());
    }
}

class GreenState implements State {
    @Override
    public void handle(TrafficLight trafficLight) {
        System.out.println("Traffic light is GREEN.  Go cars!");
        trafficLight.changeState(new YellowState());
    }
}

// Context
class TrafficLight {
    private State currentState;

    public TrafficLight() {
        currentState = new RedState();
    }

    public void changeState(State state) {
        this.currentState = state;
    }

    public void handle() {
        currentState.handle(this);
    }

    public static void main(String[] args) {
        TrafficLight trafficLight = new TrafficLight();
        trafficLight.handle();
        trafficLight.handle();
        trafficLight.handle();
        trafficLight.handle();
    }
}
```