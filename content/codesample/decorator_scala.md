---
title: "Decorator - Scala"
date: 2025-12-03T11:41:34.069-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["Scala"]
---
The Decorator pattern dynamically adds responsibilities to an object. It provides a flexible alternative to subclassing for extending functionality.  Here, we define a base `Beverage` trait and concrete implementations like `Espresso`.  Decorators, also traits, wrap a `Beverage` and add cost and description.  `MilkDecorator` and `SoyDecorator` are examples. The `main` method demonstrates how to compose decorators to create a beverage with varying additions. This implementation is idiomatic Scala due to its use of traits for defining types and composition over inheritance, aligning with Scala's functional and object-oriented strengths.

```scala
trait Beverage {
  val cost: Double
  val description: String
}

class Espresso extends Beverage {
  val cost = 2.0
  val description = "Espresso"
}

trait BeverageDecorator extends Beverage {
  protected var decoratedBeverage: Beverage
  def this(beverage: Beverage) = {
    this.decoratedBeverage = beverage
    this
  }
}

class MilkDecorator(beverage: Beverage) extends BeverageDecorator {
  val cost = beverage.cost + 0.5
  val description = beverage.description + ", Milk"
}

class SoyDecorator(beverage: Beverage) extends BeverageDecorator {
  val cost = beverage.cost + 0.7
  val description = beverage.description + ", Soy"
}

object Main {
  def main(args: Array[String]): Unit = {
    val espresso = new Espresso()
    val milkEspresso = new MilkDecorator(espresso)
    val soyMilkEspresso = new SoyDecorator(milkEspresso)

    println(s"Description: ${soyMilkEspresso.description}")
    println(s"Cost: $${soyMilkEspresso.cost}")
  }
}
```