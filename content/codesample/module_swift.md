---
title: "Module - Swift"
date: 2025-12-03T12:51:06.062-05:00
draft: false
pattern_usage: ["Module"]
language: ["Swift"]
---
The Module Pattern is a way to encapsulate related functionality within a single object, exposing only a public API while hiding internal implementation details. This promotes code organization, prevents naming conflicts, and enhances maintainability. In Swift, this is naturally achieved using modules (files) and access control modifiers (public, private, internal, fileprivate).  The code defines a `Calculator` module with public methods for basic operations and private helper functions for internal logic. This aligns with Swift's emphasis on modularity and clear separation of concerns through access control, making the code readable and maintainable.

```swift
// Calculator.swift

public class Calculator {

    // Public API - methods exposed to other parts of the application
    public func add(_ a: Double, _ b: Double) -> Double {
        return performOperation(a, b, operation: +)
    }

    public func subtract(_ a: Double, _ b: Double) -> Double {
        return performOperation(a, b, operation: -)
    }

    public func multiply(_ a: Double, _ b: Double) -> Double {
        return performOperation(a, b, operation: *)
    }

    public func divide(_ a: Double, _ b: Double) -> Double {
        return performOperation(a, b, operation: /)
    }

    // Private helper function - internal implementation detail
    private func performOperation(_ a: Double, _ b: Double, operation: (Double, Double) -> Double) -> Double {
        // Add error handling or logging here if needed
        return operation(a, b)
    }
}
```