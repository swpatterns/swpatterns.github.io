---
title: "Multiton - Swift"
date: 2025-12-03T11:10:29.823-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["Swift"]
---
The Multiton pattern ensures a restricted number of instances of a class. Unlike a Singleton which allows only one instance, a Multiton allows a small, predefined set. This is useful when you need a few, globally accessible instances representing distinct, but related, states or roles. 

This Swift implementation uses a `static` array to hold the instances and a `static` method to access them based on an index or identifier. It leverages Swift's strong typing and `guard let` to ensure safe access to existing instances or creation of new ones within the defined limit. This approach is considered idiomatic in Swift because it relies on static properties for controlled access and utilizes optionals for managing potential nil values during initialization, aligning with Swift's safety-focused design.

```swift
class Multiton {
    static private var instances: [Int: Multiton] = [:]
    static private let maxInstances = 3

    static func getInstance(forKey key: Int) -> Multiton {
        if instances[key] == nil && key < maxInstances {
            instances[key] = Multiton()
        }
        return instances[key]!
    }

    private init() {
        // Private initializer to prevent direct instantiation
    }

    func doSomething(withKey key: Int) {
        print("Multiton instance with key \(key) is doing something.")
    }
}

// Usage:
let instance1 = Multiton.getInstance(forKey: 0)
let instance2 = Multiton.getInstance(forKey: 1)
let instance3 = Multiton.getInstance(forKey: 2)

instance1.doSomething(withKey: 0)
instance2.doSomething(withKey: 1)
instance3.doSomething(withKey: 2)

// Attempting to get an instance with an invalid key:
let instance4 = Multiton.getInstance(forKey: 3) // Will return instance3 because maxInstances is 3
```