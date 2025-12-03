---
title: "Snapshot - Kotlin"
date: 2025-12-03T14:01:45.591-05:00
draft: false
pattern_usage: ["Snapshot"]
language: ["Kotlin"]
---
The Snapshot pattern captures the state of an object at a specific point in time without affecting the original object. This allows for operations like undo/redo, transaction rollback, or simply observing a past state. In this Kotlin example, we use data classes and copy() to create immutable snapshots of a `SystemState` object.  The `takeSnapshot()` function returns a new `SystemState` instance with the current values, leaving the original unchanged. Kotlin's data classes and immutability features make this pattern concise and safe, aligning with its functional programming aspects and emphasis on avoiding side effects.

```kotlin
data class SystemState(val temperature: Int, val pressure: Int, val humidity: Int)

class SystemController(private var state: SystemState) {

    fun takeSnapshot(): SystemState {
        return state.copy()
    }

    fun adjustTemperature(delta: Int) {
        state = state.copy(temperature = state.temperature + delta)
    }

    fun getCurrentState(): SystemState {
        return state
    }
}

fun main() {
    val controller = SystemController(SystemState(25, 1013, 60))

    val snapshot1 = controller.takeSnapshot()
    println("Snapshot 1: $snapshot1")

    controller.adjustTemperature(5)
    println("Current State after adjustment: ${controller.getCurrentState()}")

    val snapshot2 = controller.takeSnapshot()
    println("Snapshot 2: $snapshot2")

    controller.adjustTemperature(-10)
    println("Current State after further adjustment: ${controller.getCurrentState()}")

    println("Restoring to Snapshot 1: ${SystemController(snapshot1).getCurrentState()}")
}
```