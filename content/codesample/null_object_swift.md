---
title: "Null Object - Swift"
date: 2025-12-03T13:48:17.575-05:00
draft: false
pattern_usage: ["Null Object"]
language: ["Swift"]
---
The Null Object pattern provides a substitute for a null reference or nil value, allowing you to avoid null checks throughout your code. Instead of checking for nil, you call a method on the null object, which performs a no-op or returns a default value. This simplifies code and reduces the risk of NullPointerExceptions (or similar errors in Swift).

The Swift implementation uses a protocol to define the interface that both the real object and the null object conform to. The `NullProduct` class conforms to the `Product` protocol, providing empty or default implementations for all required methods. This allows it to be used anywhere a `Product` is expected without causing errors.  Swift's protocol-oriented programming style makes this a natural fit, promoting flexibility and avoiding conditional unwrapping.

```swift
protocol Product {
    func use()
    func getName() -> String
}

class RealProduct: Product {
    private let name: String

    init(name: String) {
        self.name = name
    }

    func use() {
        print("Using \(name)")
    }

    func getName() -> String {
        return name
    }
}

class NullProduct: Product {
    func use() {
        // Do nothing
    }

    func getName() -> String {
        return "No Product"
    }
}

func processProduct(product: Product) {
    product.use()
    print("Product name: \(product.getName())")
}

// Example Usage
let product1: Product = RealProduct(name: "Laptop")
let product2: Product = NullProduct()

processProduct(product: product1)
processProduct(product: product2)
```