---
title: "Factory Method - Kotlin"
date: 2025-12-03T10:58:57.877-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["Kotlin"]
---
The Factory Method pattern is a creational design pattern that provides an interface for creating objects, but lets subclasses decide which class to instantiate. It promotes loose coupling by abstracting the object creation logic away from the client code.

The Kotlin code defines an abstract `Product` class representing the objects to be created.  An abstract `Creator` class declares the `factoryMethod` which returns a `Product`. Concrete `ConcreteProductA` and `ConcreteProductB` inherit from `Product`. `ConcreteCreatorA` and `ConcreteCreatorB` implement the `Creator` and override the `factoryMethod` to return instances of their respective concrete products. The client code interacts with the `Creator` interface, enabling it to create different types of `Product` objects without knowing their concrete classes. Using Kotlin’s concise syntax and class hierarchy promotes readability and adherence to the pattern's principles.

```kotlin
// Product
abstract class Product {
    abstract fun operation(): String
}

// Concrete Products
class ConcreteProductA : Product() {
    override fun operation(): String = "ConcreteProductA operation"
}

class ConcreteProductB : Product() {
    override fun operation(): String = "ConcreteProductB operation"
}

// Creator
abstract class Creator {
    abstract fun factoryMethod(): Product
    fun someOperation(): String {
        val product = factoryMethod()
        return "Creator: The Product does something: ${product.operation()}"
    }
}

// Concrete Creators
class ConcreteCreatorA : Creator() {
    override fun factoryMethod(): Product = ConcreteProductA()
}

class ConcreteCreatorB : Creator() {
    override fun factoryMethod(): Product = ConcreteProductB()
}

// Client
fun clientCode(creator: Creator) {
    println(creator.someOperation())
}

fun main() {
    clientCode(ConcreteCreatorA())
    clientCode(ConcreteCreatorB())
}
```