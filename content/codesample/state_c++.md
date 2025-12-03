---
title: "State - C++"
date: 2025-12-03T13:29:09.803-05:00
draft: false
pattern_usage: ["State"]
language: ["C++"]
---
The State pattern is a behavioral pattern that allows an object to alter its behavior when its internal state changes. It separates the state-dependent behavior from the object itself, encapsulating each state in a separate class. This promotes the Single Responsibility Principle and makes state transitions more manageable.

The code demonstrates a simple traffic light with states: Red, Yellow, and Green. Each state is represented by a derived class of the abstract `TrafficLightState` class, implementing the `handle()` method to define the light's behavior. The `TrafficLight` class holds a pointer to the current state and delegates behavior to it. State transitions are handled within the states themselves, changing the `TrafficLight`'s current state as needed. This implementation is idiomatic C++ using inheritance and polymorphism.

```cpp
#include <iostream>
#include <memory>

// Forward declaration
class TrafficLight;

// Abstract State class
class TrafficLightState {
public:
    virtual void handle(TrafficLight& light) = 0;
    virtual ~TrafficLightState() = default;
};

// Concrete State classes
class RedState : public TrafficLightState {
public:
    void handle(TrafficLight& light) override {
        std::cout << "RED: Stop!\n";
        light.setState(std::make_unique<YellowState>());
    }
};

class YellowState : public TrafficLightState {
public:
    void handle(TrafficLight& light) override {
        std::cout << "YELLOW: Caution!\n";
        light.setState(std::make_unique<GreenState>());
    }
};

class GreenState : public TrafficLightState {
public:
    void handle(TrafficLight& light) override {
        std::cout << "GREEN: Go!\n";
        light.setState(std::make_unique<RedState>());
    }
};

// Context class
class TrafficLight {
private:
    std::unique_ptr<TrafficLightState> currentState;

public:
    TrafficLight() : currentState(std::make_unique<RedState>()) {}

    void setState(std::unique_ptr<TrafficLightState> state) {
        currentState = std::move(state);
    }

    void handle() {
        currentState->handle(*this);
    }
};

int main() {
    TrafficLight light;
    for (int i = 0; i < 5; ++i) {
        light.handle();
    }
    return 0;
}
```