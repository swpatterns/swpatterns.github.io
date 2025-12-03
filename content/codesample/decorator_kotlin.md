---
title: "Decorator - Kotlin"
date: 2025-12-03T11:40:32.385-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["Kotlin"]
---
The Decorator pattern dynamically adds responsibilities to an object. It provides a flexible alternative to subclassing for extending functionality.  Instead of inheriting from a base class to add behavior, you "wrap" the original object with decorator classes, each adding a specific responsibility. This implementation uses Kotlin's extension functions and interfaces to achieve a clean and concise decorator. The `Coffee` interface defines the core behavior, while concrete coffee types implement it. `CoffeeDecorator` is an abstract class that holds a reference to a `Coffee` and delegates to it, allowing decorators to add functionality before or after the core coffee behavior.  This approach leverages Kotlin's functional aspects and avoids the verbosity of traditional Java Decorator implementations.

```kotlin
// Component Interface
interface Coffee {
    fun brew(): String
    fun getCost(): Double
}

// Concrete Component
class SimpleCoffee : Coffee {
    override fun brew(): String = "Simple coffee"
    override fun getCost(): Double = 1.0
}

// Decorator
abstract class CoffeeDecorator(protected var coffee: Coffee) : Coffee {
    override fun brew(): String {
        return coffee.brew()
    }

    override fun getCost(): Double {
        return coffee.getCost()
    }
}

// Concrete Decorators
class MilkDecorator(coffee: Coffee) : CoffeeDecorator(coffee) {
    override fun brew(): String = "${coffee.brew()} with milk"
    override fun getCost(): Double = coffee.getCost() + 0.5
}

class SugarDecorator(coffee: Coffee) : CoffeeDecorator(coffee) {
    override fun brew(): String = "${coffee.brew()} with sugar"
    override fun getCost(): Double = coffee.getCost() + 0.2
}

fun main() {
    val coffee = SimpleCoffee()
    println(coffee.brew()) // Output: Simple coffee
    println("Cost: $${coffee.getCost()}") // Output: Cost: $1.0

    val milkCoffee = MilkDecorator(coffee)
    println(milkCoffee.brew()) // Output: Simple coffee with milk
    println("Cost: $${milkCoffee.getCost()}") // Output: Cost: $1.5

    val sugarMilkCoffee = SugarDecorator(milkCoffee)
    println(sugarMilkCoffee.brew()) // Output: Simple coffee with milk with sugar
    println("Cost: $${sugarMilkCoffee.getCost()}") // Output: Cost: $1.7
}
```