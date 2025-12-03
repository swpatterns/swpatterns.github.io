---
title: "State - Swift"
date: 2025-12-03T13:30:35.160-05:00
draft: false
pattern_usage: ["State"]
language: ["Swift"]
---
The State pattern is a behavioral pattern that allows an object to alter its behavior when its internal state changes. Instead of implementing state-specific logic within a single class using conditional statements, the pattern creates separate state classes to encapsulate each behavior. A context class holds a reference to the current state and delegates requests to it, thus changing the object's behavior dynamically.

This Swift implementation defines a `TrafficLight` context and separate `State` protocols conforming types for `Red`, `Yellow`, and `Green`. The `TrafficLight` maintains a current state and the `nextState()` method handles transitions. Each state dictates available actions (e.g., `showLight` for what color is displayed).  This approach utilizes protocols and enums—core Swift features—for type safety and clear state representation, fitting the language’s emphasis on these constructs.

```swift
enum TrafficLightState: State {
    case red
    case yellow
    case green

    func showLight() -> String {
        switch self {
        case .red: return "Red"
        case .yellow: return "Yellow"
        case .green: return "Green"
        }
    }

    func nextState() -> TrafficLightState {
        switch self {
        case .red: return .green
        case .yellow: return .red
        case .green: return .yellow
        }
    }
}

protocol State {
    func showLight() -> String
    func nextState() -> TrafficLightState
}

class TrafficLight {
    private var currentState: TrafficLightState = .red

    func showCurrentLight() -> String {
        return currentState.showLight()
    }

    func changeState() {
        currentState = currentState.nextState()
    }
}

// Example Usage
let trafficLight = TrafficLight()
print(trafficLight.showCurrentLight()) // Red
trafficLight.changeState()
print(trafficLight.showCurrentLight()) // Green
trafficLight.changeState()
print(trafficLight.showCurrentLight()) // Yellow
trafficLight.changeState()
print(trafficLight.showCurrentLight()) // Red
```