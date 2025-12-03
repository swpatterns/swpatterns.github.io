---
title: "Decorator - Swift"
date: 2025-12-03T11:40:49.724-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["Swift"]
---
The Decorator pattern dynamically adds responsibilities to an object. It provides a flexible alternative to subclassing for extending functionality.  Instead of inheriting from a base class to add features, we wrap the original object with one or more decorator objects, each adding a specific behavior.

This Swift implementation uses protocol-oriented programming, which is highly idiomatic.  The `Coffee` protocol defines the core functionality. `BaseCoffee` conforms to this protocol, providing a basic implementation.  `Decorator` also conforms to `Coffee`, holding a `Coffee` instance and delegating to it. Concrete decorators like `MilkDecorator` and `SugarDecorator` add their specific behaviors *before* delegating to the wrapped `Coffee`. This avoids modifying the original `Coffee` class and allows for runtime composition of features.

```swift
protocol Coffee {
    var cost: Double { get }
    var description: String { get }
}

class BaseCoffee: Coffee {
    let description: String
    let cost: Double

    init(description: String, cost: Double) {
        self.description = description
        self.cost = cost
    }
}

class CoffeeDecorator: Coffee {
    let coffee: Coffee

    init(coffee: Coffee) {
        self.coffee = coffee
    }

    var cost: Double {
        return coffee.cost
    }

    var description: String {
        return coffee.description
    }
}

class MilkDecorator: CoffeeDecorator {
    override var cost: Double {
        return super.cost + 0.5
    }

    override var description: String {
        return super.description + ", with milk"
    }
}

class SugarDecorator: CoffeeDecorator {
    override var cost: Double {
        return super.cost + 0.2
    }

    override var description: String {
        return super.description + ", with sugar"
    }
}

// Example Usage
let simpleCoffee = BaseCoffee(description: "Simple coffee", cost: 2.0)
let milkCoffee = MilkDecorator(coffee: simpleCoffee)
let sugaryMilkCoffee = SugarDecorator(coffee: milkCoffee)

print(sugaryMilkCoffee.description) // Output: Simple coffee, with milk, with sugar
print(sugaryMilkCoffee.cost) // Output: 2.7
```