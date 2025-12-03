---
title: "Object Pool - Swift"
date: 2025-12-03T11:14:32.825-05:00
draft: false
pattern_usage: ["Object Pool"]
language: ["Swift"]
---
The Object Pool pattern aims to reduce object creation/destruction overhead by maintaining a pool of reusable objects. Instead of creating new instances when needed, the pool provides existing ones, and returns them to the pool when finished. This is especially useful for expensive-to-create objects frequently used and discarded. 

The Swift implementation utilizes a generics-based pool to handle any type conforming to a specific protocol, ensuring objects can be reset to a known state before reuse. The `PooledObject` protocol defines a `reset()` function for this purpose. The `ObjectPool` class manages a queue of available objects, providing `borrowObject()` and `returnObject()` methods. Swift’s automatic reference counting (ARC) handles memory management efficiently, and the use of a protocol allows for type safety and flexibility.

```swift
protocol PooledObject {
    func reset()
}

class ObjectPool<T: PooledObject> {
    private var pool: [T] = []
    private let factory: () -> T

    init(factory: @escaping () -> T, initialSize: Int = 10) {
        self.factory = factory
        for _ in 0..<initialSize {
            pool.append(factory())
        }
    }

    func borrowObject() -> T? {
        if let object = pool.first {
            pool.removeFirst()
            return object
        } else {
            return factory()
        }
    }

    func returnObject(_ object: T) {
        object.reset()
        pool.append(object)
    }
}

class ExpensiveObject: PooledObject {
    var data: String

    init(data: String) {
        self.data = data
    }

    func reset() {
        self.data = ""
    }
}

// Example Usage
let pool = ObjectPool<ExpensiveObject>(factory: { ExpensiveObject(data: "Initial Data") })

if let obj1 = pool.borrowObject() {
    obj1.data = "Object 1 Used"
    print("Using object 1: \(obj1.data)")
    pool.returnObject(obj1)
}

if let obj2 = pool.borrowObject() {
    print("Using object 2: \(obj2.data)") // Expect "" because of reset
}
```