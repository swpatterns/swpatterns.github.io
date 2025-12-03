---
title: "Extension Object - Swift"
date: 2025-12-03T12:54:19.584-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["Swift"]
---
The Extension Object pattern allows you to add functionality to an existing class without subclassing or using categories (as in Objective-C). It achieves this by creating a separate object that encapsulates the new behavior and holds an instance of the original class. The original class remains untouched, adhering to the Open/Closed Principle. This is particularly useful when you need to add functionality that doesn't logically belong in the original class or when you can't modify the original class directly.

In Swift, this is naturally implemented using extensions and composition. The extension defines the new functionality, and the original object is held as a property within the extension object. The extension object then delegates calls to the original object, augmenting its behavior. This approach is idiomatic Swift because extensions are a core language feature for adding functionality to existing types in a clean and type-safe manner.

```swift
// Original object
class Product {
    var name: String

    init(name: String) {
        self.name = name
    }

    func describe() -> String {
        return "This is a \(name)."
    }
}

// Extension object
extension Product {
    var discount: Double {
        get { return 0.0 }
    }

    func applyDiscount(price: Double) -> Double {
        return price * (1 - discount)
    }
}

// Specialized extension object
class DiscountedProduct {
    private let product: Product
    let discountRate: Double

    init(product: Product, discountRate: Double) {
        self.product = product
        self.discountRate = discountRate
    }

    func describe() -> String {
        return product.describe() + " It's on sale!"
    }

    func discountedPrice(originalPrice: Double) -> Double {
        return originalPrice * (1 - discountRate)
    }
}

// Usage
let product = Product(name: "Awesome Widget")
print(product.describe())

let discountedProduct = DiscountedProduct(product: product, discountRate: 0.2)
print(discountedProduct.describe())
print("Original price: 100, Discounted price: \(discountedProduct.discountedPrice(originalPrice: 100))")
```