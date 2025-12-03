---
title: "Prototype - Swift"
date: 2025-12-03T11:03:36.849-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["Swift"]
---
The Prototype pattern is a creational design pattern that specifies the kinds of objects to create using an instance of a prototype. Instead of instantiating new objects using a class directly (like with `new`), the pattern copies an existing object, thus cloning it to create new ones. This is useful when object creation is expensive or when the exact type of objects to create isn't known until runtime.

This Swift implementation uses the `NSCopying` protocol (a standard way to handle object duplication in the Objective-C/Swift ecosystem) to define a `prototype()` method on each concrete prototype. A `Factory` class manages the prototypes and can efficiently create new objects by cloning them. This leverages Swift’s protocol-oriented programming and is a common practice for handling object copies, especially within UIKit or frameworks heavily influenced by Objective-C.

```swift
// Define the protocol for cloning
protocol Prototype: NSCopying {
    var id: Int { get }
}

// Concrete Prototype class
class ConcretePrototype: Prototype {
    var id: Int

    init(id: Int) {
        self.id = id
    }

    func prototype() -> Self {
        return self.copy() as! Self
    }

    // Required for NSCopying
    func copy(with zone: NSZone? = nil) -> Any {
        return ConcretePrototype(id: self.id)
    }
}

// Prototype Factory
class PrototypeFactory {
    private var prototypes: [Int: Prototype] = [:]

    func registerPrototype(prototype: Prototype, withID id: Int) {
        prototypes[id] = prototype
    }

    func getPrototype(withID id: Int) -> Prototype? {
        return prototypes[id]?.prototype()
    }
}

// Usage
let factory = PrototypeFactory()

let prototype1 = ConcretePrototype(id: 1)
let prototype2 = ConcretePrototype(id: 2)

factory.registerPrototype(prototype: prototype1, withID: 1)
factory.registerPrototype(prototype: prototype2, withID: 2)

if let clonedPrototype1 = factory.getPrototype(withID: 1) {
    print("Cloned Prototype 1 ID: \(clonedPrototype1.id)")
}

if let clonedPrototype2 = factory.getPrototype(withID: 2) {
    print("Cloned Prototype 2 ID: \(clonedPrototype2.id)")
}
```