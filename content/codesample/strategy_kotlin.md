---
title: "Strategy - Kotlin"
date: 2025-12-03T13:34:47.927-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["Kotlin"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows an algorithm to vary independently from clients that use it.  In this Kotlin example, we use a functional approach with function types to define different shipping strategies (e.g., ground, air). The `ShippingService` class accepts a strategy function as a dependency, allowing it to calculate shipping costs based on the chosen strategy without knowing the strategy's implementation details. This leverages Kotlin’s first-class function support for a concise and flexible implementation, common in Kotlin's style favoring immutability and functional composition.

```kotlin
// Strategy Interface (Function Type)
typealias ShippingStrategy = (weight: Double, distance: Double) -> Double

// Concrete Strategies
val groundShipping: ShippingStrategy = { weight, distance -> weight * 0.1 + distance * 0.05 }
val airShipping: ShippingStrategy = { weight, distance -> weight * 0.5 + distance * 0.2 }
val seaShipping: ShippingStrategy = { weight, distance -> weight * 0.02 + distance * 0.01 }


// Context
class ShippingService(private val strategy: ShippingStrategy) {
    fun calculateShippingCost(weight: Double, distance: Double): Double {
        return strategy(weight, distance)
    }
}

// Usage
fun main() {
    val groundService = ShippingService(groundShipping)
    val airService = ShippingService(airShipping)
    val seaService = ShippingService(seaShipping)

    val weight = 10.0
    val distance = 100.0

    println("Ground Shipping Cost: ${groundService.calculateShippingCost(weight, distance)}")
    println("Air Shipping Cost: ${airService.calculateShippingCost(weight, distance)}")
    println("Sea Shipping Cost: ${seaService.calculateShippingCost(weight, distance)}")
}
```