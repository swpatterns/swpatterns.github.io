---
title: "Template Method - Swift"
date: 2025-12-03T13:39:28.201-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["Swift"]
---
The Template Method pattern defines the skeleton of an algorithm in a base class, deferring some steps to subclasses. It allows subclasses to redefine certain steps of an algorithm without changing the algorithm's structure. This promotes code reuse and avoids duplication.

The Swift example defines a `CaffeineBeverage` class with a `prepareBeverage` method acting as the template. Subclasses like `Coffee` and `Tea` override the `brew`, `addCondiments`, and potentially `addMilk` methods to customize the beverage preparation while maintaining the overall flow defined in the template method. This leverages Swift's class inheritance and method overriding capabilities for a clean and type-safe implementation, fitting the language's object-oriented nature.

```swift
// CaffeineBeverage.swift

protocol Beverage {
    func brew()
    func addCondiments()
    func addMilk() -> Bool
    func prepareBeverage()
}

class CaffeineBeverage: Beverage {
    func prepareBeverage() {
        brew()
        addCondiments()
        if addMilk() {
            println("Adding milk")
        }
    }

    func brew() {
        fatalError("Brew must be overridden by subclasses")
    }

    func addCondiments() {
        fatalError("Add condiments must be overridden by subclasses")
    }

    func addMilk() -> Bool {
        return false
    }
}

class Coffee: CaffeineBeverage {
    override func brew() {
        println("Brewing coffee")
    }

    override func addCondiments() {
        println("Adding sugar and cream to coffee")
    }
}

class Tea: CaffeineBeverage {
    override func brew() {
        println("Brewing tea")
    }

    override func addCondiments() {
        println("Adding lemon to tea")
    }

    override func addMilk() -> Bool {
        return true
    }
}

// Example Usage
let coffee = Coffee()
coffee.prepareBeverage()

let tea = Tea()
tea.prepareBeverage()
```