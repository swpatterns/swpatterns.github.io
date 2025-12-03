---
title: "Space-Based Architecture - Swift"
date: 2025-12-03T14:59:22.566-05:00
draft: false
pattern_usage: ["Space-Based Architecture"]
language: ["Swift"]
---
The Space-Based Architecture pattern decouples components of an application by using a central "space" (often a dictionary or similar data structure) to store and retrieve data. Components communicate by publishing and subscribing to changes within this space. This avoids direct dependencies and promotes flexibility.

This Swift implementation uses a `Space` class holding a `[String: Any]` dictionary.  Components register for updates on specific keys using closures. When a value associated with a key is updated, all registered closures are executed. This leverages Swift's first-class functions and closures for a concise and type-safe approach.  The use of a class encapsulates the shared state and update mechanism, aligning with Swift's object-oriented capabilities.  The `Any` type allows for storing diverse data types, though in a production system, more specific types would be preferred for better safety.

```swift
class Space {
    private var data: [String: Any] = [:]
    private var observers: [String: [() -> Void]] = [:]

    func subscribe(key: String, observer: @escaping () -> Void) {
        observers[key, default: []].append(observer)
    }

    func unsubscribe(key: String, observer: @escaping () -> Void) {
        observers[key]?.removeAll { $0 === observer }
    }

    func publish(_ key: String, _ value: Any) {
        data[key] = value
        observers[key]?.forEach { $0() }
    }

    func observe<T>(key: String) -> T? {
        return data[key] as? T
    }
}

// Example Usage
class ComponentA {
    private let space: Space
    init(space: Space) {
        self.space = space
        space.subscribe(key: "message") {
            print("Component A received update: \(self.space.observe(key: "message") ?? "No message")")
        }
    }

    func sendMessage(message: String) {
        space.publish("message", message)
    }
}

class ComponentB {
    private let space: Space
    init(space: Space) {
        self.space = space
        space.subscribe(key: "message") {
            print("Component B received update: \(self.space.observe(key: "message") ?? "No message")")
        }
    }
}

let space = Space()
let componentA = ComponentA(space: space)
let componentB = ComponentB(space: space)

componentA.sendMessage(message: "Hello from Component A!")
componentB.sendMessage(message: "Another message!")
```