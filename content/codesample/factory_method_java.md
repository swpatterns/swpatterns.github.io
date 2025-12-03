---
title: "Factory Method - Java"
date: 2025-12-03T10:56:42.372-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["Java"]
---
The Factory Method pattern is a creational design pattern that provides an interface for creating objects but lets subclasses decide which class to instantiate. This promotes loose coupling between the creator and the concrete products.  Here, we define a `Product` interface and concrete product classes (`ConcreteProductA`, `ConcreteProductB`). The `Creator` class declares the `factoryMethod` which returns a `Product`.  The `ConcreteCreator` overrides `factoryMethod` to return specific product types. This implementation is idiomatic Java due to its use of interfaces and abstract classes, leveraging polymorphism to achieve flexibility and maintainability.

```java
// Product interface
interface Product {
    String operation();
}

// Concrete Products
class ConcreteProductA implements Product {
    @Override
    public String operation() {
        return "ConcreteProductA operation";
    }
}

class ConcreteProductB implements Product {
    @Override
    public String operation() {
        return "ConcreteProductB operation";
    }
}

// Creator class
abstract class Creator {
    abstract Product factoryMethod();

    public final void someOperation() {
        Product product = factoryMethod();
        System.out.println(product.operation());
    }
}

// Concrete Creator
class ConcreteCreator extends Creator {
    @Override
    public Product factoryMethod() {
        return new ConcreteProductA();
    }
}

class ConcreteCreatorB extends Creator {
    @Override
    public Product factoryMethod() {
        return new ConcreteProductB();
    }
}

// Usage
public class FactoryMethodDemo {
    public static void main(String[] args) {
        Creator creatorA = new ConcreteCreator();
        creatorA.someOperation(); // Output: ConcreteProductA operation

        Creator creatorB = new ConcreteCreatorB();
        creatorB.someOperation(); // Output: ConcreteProductB operation
    }
}
```