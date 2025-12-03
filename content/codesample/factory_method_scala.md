---
title: "Factory Method - Scala"
date: 2025-12-03T10:59:57.142-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["Scala"]
---
The Factory Method pattern is a creational pattern that defines an interface for creating an object, but lets subclasses decide which class to instantiate. It promotes loose coupling by letting the client work with objects through an interface, without knowing their concrete classes. This allows for flexibility and extensibility.

The Scala code defines a `Product` trait and concrete implementations `ProductA` and `ProductB`. A `Creator` abstract class declares a `factoryMethod` which returns a `Product`. Concrete creators, `ConcreteCreatorA` and `ConcreteCreatorB`, override `factoryMethod` to return specific product types. The client code interacts with the `Creator` abstract class, delegating the object creation to subclasses, achieving decoupling. Using traits and abstract classes common in Scala allows for a clean and type-safe implementation.

```scala
// Product interface
trait Product {
  def operation(): String
}

// Concrete Products
case class ProductA() extends Product {
  override def operation(): String = "Product A operation"
}

case class ProductB() extends Product {
  override def operation(): String = "Product B operation"
}

// Creator interface
abstract class Creator {
  def factoryMethod(): Product
  def someOperation(): String
}

// Concrete Creators
class ConcreteCreatorA() extends Creator {
  override def factoryMethod(): Product = ProductA()
  override def someOperation(): String = "Creator A operation with " + factoryMethod().operation()
}

class ConcreteCreatorB() extends Creator {
  override def factoryMethod(): Product = ProductB()
  override def someOperation(): String = "Creator B operation with " + factoryMethod().operation()
}

// Client
object Client {
  def main(args: Array[String]): Unit = {
    val creatorA = new ConcreteCreatorA()
    println(creatorA.someOperation())

    val creatorB = new ConcreteCreatorB()
    println(creatorB.someOperation())
  }
}
```