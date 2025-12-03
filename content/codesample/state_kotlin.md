---
title: "State - Kotlin"
date: 2025-12-03T13:30:18.164-05:00
draft: false
pattern_usage: ["State"]
language: ["Kotlin"]
---
The State pattern allows an object to alter its behavior when its internal state changes. It encapsulates each state as a separate class and provides a way to transition between them. This avoids complex conditional logic and makes the code more maintainable and extensible by adding new states without modifying the original context class.

Here, the `TrafficLight` is the context, and `RedState`, `YellowState`, and `GreenState` represent the possible states. Each state handles the `display()` and `nextState()` logic specific to that state. The state transition is managed within the `TrafficLight` class, delegating behavior to the current state object. This implementation leverages Kotlin's class structure and object-oriented approach, utilizing interfaces for state definition and clear, concise function implementations.

```kotlin
// Define the State interface
interface State {
    fun display()
    fun nextState()
}

// Concrete states
class RedState : State {
    override fun display() {
        println("RED")
    }

    override fun nextState() {
        println("Red -> Green")
    }
}

class YellowState : State {
    override fun display() {
        println("YELLOW")
    }

    override fun nextState() {
        println("Yellow -> Red")
    }
}

class GreenState : State {
    override fun display() {
        println("GREEN")
    }

    override fun nextState() {
        println("Green -> Yellow")
    }
}

// Context class
class TrafficLight(private var state: State = RedState()) {
    fun setState(state: State) {
        this.state = state
    }

    fun display() {
        state.display()
    }

    fun nextState() {
        state.nextState()
        when (state) {
            is RedState -> setState(GreenState())
            is GreenState -> setState(YellowState())
            is YellowState -> setState(RedState())
        }
    }
}

fun main() {
    val trafficLight = TrafficLight()
    trafficLight.display()
    trafficLight.nextState()
    trafficLight.display()
    trafficLight.nextState()
    trafficLight.display()
    trafficLight.nextState()
    trafficLight.display()
}
```