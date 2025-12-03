---
title: "Module - Scala"
date: 2025-12-03T12:51:38.062-05:00
draft: false
pattern_usage: ["Module"]
language: ["Scala"]
---
The Module Pattern in Scala is achieved through the use of objects. Objects are singleton instances of classes and act as namespaces for related functions and data. This provides a way to encapsulate state and behavior, preventing accidental modification from outside and promoting code organization.

In this example, the `Calculator` object encapsulates the addition and subtraction operations.  The operations are defined as private methods, and only public methods are exposed to the user. This adheres to the principle of information hiding. Scala's object-oriented nature makes this a natural and concise way to implement the Module Pattern, avoiding the need for explicit class instantiation and static members.  The use of `object` is the idiomatic way to create modules in Scala.

```scala
object Calculator {

  private def add(x: Int, y: Int): Int =
    x + y

  private def subtract(x: Int, y: Int): Int =
    x - y

  def calculateSum(x: Int, y: Int): Int =
    add(x, y)

  def calculateDifference(x: Int, y: Int): Int =
    subtract(x, y)
}

// Example Usage:
object Main extends App {
  val sum = Calculator.calculateSum(5, 3)
  val difference = Calculator.calculateDifference(10, 4)
  println(s"Sum: $sum")
  println(s"Difference: $difference")
}
```