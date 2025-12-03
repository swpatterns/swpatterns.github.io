---
title: "Proxy - Swift"
date: 2025-12-03T12:47:59.331-05:00
draft: false
pattern_usage: ["Proxy"]
language: ["Swift"]
---
The Proxy pattern provides a surrogate or placeholder for another object to control access to it. This is useful for adding security, logging, or other cross-cutting concerns without modifying the original object.  The proxy has the same interface as the real object, allowing clients to interact with it transparently.

Here, `Subject` defines the interface. `RealSubject` is the actual object with the resource. `Proxy` acts as the intermediary, controlling access to `RealSubject`.  The `Proxy` checks a condition (e.g., authentication) before delegating to the `RealSubject`. This implementation uses Swift's protocol-oriented programming, defining the `Subject` as a protocol and conforming to it with concrete types. This is a common and idiomatic approach in Swift for achieving polymorphism and defining interfaces.

```swift
// Define the Subject interface
protocol Subject {
    func request()
}

// The RealSubject class
class RealSubject: Subject {
    func request() {
        print("RealSubject: Handling request.")
    }
}

// The Proxy class
class Proxy: Subject {
    private var realSubject: RealSubject?

    init() {
        // Potentially lazy load the real subject
    }

    private func createRealSubject() {
        realSubject = RealSubject()
    }

    func request() {
        if realSubject == nil {
            createRealSubject()
        }

        // Add some logic here - e.g., check permissions, log access
        print("Proxy: Checking access before firing real request.")
        realSubject?.request()
    }
}

// Client code
let proxy = Proxy()
proxy.request()
proxy.request() // Demonstrates potential lazy loading
```