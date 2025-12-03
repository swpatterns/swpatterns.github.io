---
title: "Observer - Swift"
date: 2025-12-03T13:26:23.741-05:00
draft: false
pattern_usage: ["Observer"]
language: ["Swift"]
---
The Observer pattern defines a one-to-many dependency between objects. When the state of one object (the subject) changes, all its dependent objects (the observers) are notified and updated automatically. This promotes loose coupling, allowing subjects and observers to interact without knowing each other's concrete classes.

The Swift code below uses closures as observers.  A `Subject` class maintains a list of observers (closures) and `notify`s them when its `state` changes. The `Observer` struct simply holds a name for identification and prints a message when updated. Swift's concise syntax and first-class function support make closure-based observers a common and idiomatic approach for this pattern, avoiding the need for explicit protocol conformance in many cases.

```swift
// Observer.swift

struct Observer {
    let name: String

    func update(state: Int) {
        print("\(name) received update: \(state)")
    }
}

class Subject {
    private var state: Int = 0
    private var observers: [(Observer) -> Void] = []

    func attach(observer: @escaping (Observer) -> Void) {
        observers.append(observer)
    }

    func detach(observer: @escaping (Observer) -> Void) {
        observers = observers.filter { $0 !== observer }
    }

    func setState(newState: Int) {
        state = newState
        notify()
    }

    private func notify() {
        for observer in observers {
            observer(Observer(name: "Observer")) // a simplified observer
        }
    }
}

// Example Usage:

let subject = Subject()

subject.attach { observer in
    observer.update(state: subject.state)
}

subject.setState(newState: 1)
subject.setState(newState: 2)

```