---
title: "Observer - Kotlin"
date: 2025-12-03T13:26:08.387-05:00
draft: false
pattern_usage: ["Observer"]
language: ["Kotlin"]
---
The Observer pattern defines a one-to-many dependency between objects, so that when one object changes state, all its dependents are notified and updated automatically. This promotes loose coupling and improved modularity. Here, `Subject` maintains a list of `Observers` and notifies them when its data changes. The `ConcreteSubject` holds the data and notifies observers. `Observer` defines an `update` method, and `ConcreteObserver` implements this to react to the subject’s changes.  Kotlin’s support for extension functions and first-class functions allows for a concise and flexible implementation. The use of interfaces promotes abstraction.

```kotlin
// Observer Pattern in Kotlin

// Observer Interface
interface Observer {
    fun update(data: String)
}

// Subject Interface
interface Subject {
    fun registerObserver(observer: Observer)
    fun unregisterObserver(observer: Observer)
    fun notifyObservers(data: String)
}

// Concrete Subject
class ConcreteSubject : Subject {
    private val observers = mutableListOf<Observer>()
    private var data: String = "Initial Data"

    override fun registerObserver(observer: Observer) {
        observers.add(observer)
    }

    override fun unregisterObserver(observer: Observer) {
        observers.remove(observer)
    }

    override fun notifyObservers(data: String) {
        this.data = data
        observers.forEach { it.update(data) }
    }

    fun getData(): String = data
}

// Concrete Observer
class ConcreteObserver(private val id: Int) : Observer {
    override fun update(data: String) {
        println("Observer $id: Data updated to: $data")
    }
}

// Example Usage
fun main() {
    val subject = ConcreteSubject()

    val observer1 = ConcreteObserver(1)
    val observer2 = ConcreteObserver(2)

    subject.registerObserver(observer1)
    subject.registerObserver(observer2)

    subject.notifyObservers("New Data 1")
    subject.notifyObservers("New Data 2")

    subject.unregisterObserver(observer1)
    subject.notifyObservers("Final Data")
}
```