---
title: "Memento - Kotlin"
date: 2025-12-03T13:21:29.118-05:00
draft: false
pattern_usage: ["Memento"]
language: ["Kotlin"]
---
The Memento pattern is a behavioral pattern that allows you to capture and externalize the internal state of an object without violating encapsulation. It's often used for implementing undo/redo functionality.  A `Memento` object holds a snapshot of the object's state. The `Originator` creates mementos and restores its state from them, while a `Caretaker` is responsible for storing mementos but cannot modify them.

This Kotlin implementation uses data classes for conciseness and immutability – a key Kotlin idiom. The `Originator`'s state is encapsulated within its properties.  The `Memento` holds a copy of this state. The `Caretaker` simply stores `Memento` objects in a list. This approach adheres to Kotlin's preference for immutable data and functional-style programming where applicable, making it clean and easy to understand.

```kotlin
data class Memento(val state: String)

class Originator(var state: String) {
    fun createMemento(): Memento {
        return Memento(state)
    }

    fun restoreMemento(memento: Memento) {
        state = memento.state
    }
}

class Caretaker {
    private val mementos = mutableListOf<Memento>()

    fun addMemento(memento: Memento) {
        mementos.add(memento)
    }

    fun getMemento(index: Int): Memento? {
        return mementos.getOrNull(index)
    }
}

fun main() {
    val originator = Originator("Initial State")
    val caretaker = Caretaker()

    caretaker.addMemento(originator.createMemento())

    originator.state = "First State"
    caretaker.addMemento(originator.createMemento())

    originator.state = "Second State"
    println("Current State: ${originator.state}")

    val previousState = caretaker.getMemento(0)
    originator.restoreMemento(previousState!!)
    println("Restored State: ${originator.state}")

    val latestState = caretaker.getMemento(1)
    originator.restoreMemento(latestState!!)
    println("Restored State: ${originator.state}")
}
```