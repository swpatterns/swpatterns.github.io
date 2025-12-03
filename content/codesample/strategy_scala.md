---
title: "Strategy - Scala"
date: 2025-12-03T13:35:56.842-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["Scala"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows an algorithm to vary independently from the clients that use it. This example demonstrates using traits in Scala to define different shipping cost calculation strategies. The `ShippingCostCalculator` class takes a `ShippingCostStrategy` as a constructor parameter, allowing the client to choose the desired algorithm at runtime without modifying the `ShippingCostCalculator` itself. This is idiomatic Scala because traits promote composition and functional programming principles, gracefully handling algorithm variations.

```scala
trait ShippingCostStrategy {
  def calculate(packageWeight: Double, distance: Double): Double
}

class StandardShipping(val rate: Double) extends ShippingCostStrategy {
  override def calculate(packageWeight: Double, distance: Double): Double =
    packageWeight * rate * distance
}

class ExpeditedShipping(val rate: Double) extends ShippingCostStrategy {
  override def calculate(packageWeight: Double, distance: Double): Double =
    (packageWeight * rate * distance) * 1.5
}

class ShippingCostCalculator(strategy: ShippingCostStrategy) {
  def calculateCost(packageWeight: Double, distance: Double): Double =
    strategy.calculate(packageWeight, distance)
}

object StrategyExample {
  def main(args: Array[String]): Unit = {
    val standardShipping = new StandardShipping(0.1)
    val expeditedShipping = new ExpeditedShipping(0.2)

    val calculator1 = new ShippingCostCalculator(standardShipping)
    val calculator2 = new ShippingCostCalculator(expeditedShipping)

    println(s"Standard Shipping Cost: ${calculator1.calculateCost(5.0, 100.0)}")
    println(s"Expedited Shipping Cost: ${calculator2.calculateCost(5.0, 100.0)}")
  }
}
```