---
title: "Builder - Swift"
date: 2025-12-03T10:55:14.405-05:00
draft: false
pattern_usage: ["Builder"]
language: ["Swift"]
---
The Builder pattern is a creational design pattern that lets you construct complex objects step by step. The pattern allows separation of construction from representation, meaning the same construction process can create different representations. This is achieved by creating a separate builder class which encapsulates the construction process, providing methods for each step. A director class (often optional) can orchestrate the builder to create a specific object configuration.

This Swift implementation uses a `Pizza` struct representing the complex object and a `PizzaBuilder` class to handle its construction. The `buildCrust()`, `buildSauce()`, `buildTopping()` methods add components incrementally. A `Waiter` class acts as the director, defining common pizza recipes. The code leverages Swift's structs for data representation and classes for behavior, aligning with its preferred style. The use of associated values in the `PizzaBuilder` allows for flexible configuration.

```swift
// Product
struct Pizza {
    let crust: String
    let sauce: String
    let topping: [String]
}

// Builder Interface
protocol PizzaBuilder {
    mutating func buildCrust() -> Self
    mutating func buildSauce() -> Self
    mutating func buildTopping(topping: String) -> Self
    func getPizza() -> Pizza
}

// Concrete Builder
class MargheritaPizzaBuilder: PizzaBuilder {
    private var crust: String = ""
    private var sauce: String = ""
    private var topping: [String] = []

    func buildCrust() -> Self {
        self.crust = "Thin Crust"
        return self
    }

    func buildSauce() -> Self {
        self.sauce = "Tomato Sauce"
        return self
    }

    func buildTopping(topping: String) -> Self {
        self.topping.append(topping)
        return self
    }

    func getPizza() -> Pizza {
        return Pizza(crust: crust, sauce: sauce, topping: topping)
    }
}

// Director (Optional)
class Waiter {
    private var builder: PizzaBuilder

    init(builder: PizzaBuilder) {
        self.builder = builder
    }

    func constructMargherita() -> Pizza {
        return builder
            .buildCrust()
            .buildSauce()
            .buildTopping(topping: "Mozzarella")
            .getPizza()
    }

    func constructPepperoni() -> Pizza {
        return builder
            .buildCrust()
            .buildSauce()
            .buildTopping(topping: "Pepperoni")
            .buildTopping(topping: "Mozzarella")
            .getPizza()
    }
}

// Usage
let margheritaBuilder = MargheritaPizzaBuilder()
let waiter = Waiter(builder: margheritaBuilder)

let margherita = waiter.constructMargherita()
print(margherita)

let pepperoni = waiter.constructPepperoni()
print(pepperoni)
```