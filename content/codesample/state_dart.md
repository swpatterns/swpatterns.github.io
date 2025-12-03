---
title: "State - Dart"
date: 2025-12-03T13:31:41.128-05:00
draft: false
pattern_usage: ["State"]
language: ["Dart"]
---
The State pattern allows an object to alter its behavior when its internal state changes. It encapsulates each state into separate classes, avoiding the use of conditional statements based on the object's state. Each state class handles requests differently.

This Dart implementation demonstrates a simple traffic light with three states: Red, Yellow, and Green.  The `TrafficLight` class maintains a `currentState` object.  The `setState` method allows transitioning between states.  Each state (`RedState`, `YellowState`, `GreenState`) implements the `TrafficLightState` interface, defining how the light handles a `next()` call, resulting in state changes and appropriate actions (printing the current light).  Using interfaces promotes loose coupling and extensibility. This approach utilizes classes and interfaces, aligning with Dart's strong support for OOP and its emphasis on defining clear contracts through interfaces.

```dart
// Define the State interface
abstract class TrafficLightState {
  void next(TrafficLight trafficLight);
}

// Concrete State classes
class RedState implements TrafficLightState {
  @override
  void next(TrafficLight trafficLight) {
    print('Red -> Yellow');
    trafficLight.setState(YellowState());
  }
}

class YellowState implements TrafficLightState {
  @override
  void next(TrafficLight trafficLight) {
    print('Yellow -> Green');
    trafficLight.setState(GreenState());
  }
}

class GreenState implements TrafficLightState {
  @override
  void next(TrafficLight trafficLight) {
    print('Green -> Red');
    trafficLight.setState(RedState());
  }
}

// Context class
class TrafficLight {
  TrafficLightState currentState = RedState();

  void setState(TrafficLightState state) {
    currentState = state;
  }

  void next() {
    currentState.next(this);
  }

  String getCurrentState() {
    if (currentState is RedState) {
      return 'Red';
    } else if (currentState is YellowState) {
      return 'Yellow';
    } else {
      return 'Green';
    }
  }
}

// Example Usage
void main() {
  TrafficLight trafficLight = TrafficLight();
  print('Initial State: ${trafficLight.getCurrentState()}');

  trafficLight.next(); // Red -> Yellow
  print('Current State: ${trafficLight.getCurrentState()}');

  trafficLight.next(); // Yellow -> Green
  print('Current State: ${trafficLight.getCurrentState()}');

  trafficLight.next(); // Green -> Red
  print('Current State: ${trafficLight.getCurrentState()}');
}
```