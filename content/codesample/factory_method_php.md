---
title: "Factory Method - PHP"
date: 2025-12-03T10:59:41.129-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["PHP"]
---
The Factory Method is a creational pattern that defines an interface for creating an object, but lets subclasses decide which class to instantiate. It enables a class to defer instantiation to subclasses. This promotes loose coupling, as the client doesn't need to know concrete classes, and facilitates extending the system with new product types without modifying the existing client code. 

The example uses an abstract `Product` class and concrete `ConcreteProductA` and `ConcreteProductB`.  The `Creator` abstract class declares the `factoryMethod` which subclasses override to return specific `Product` instances. The `Client` code interacts with the `Creator` and its `factoryMethod` without needing to know the concrete product classes, adhering to the Dependency Inversion Principle. This structure is typical of PHP's object-oriented approach, leveraging inheritance and abstract classes for flexible object creation.

```php
<?php

/**
 * Product interface.
 */
abstract class Product
{
    public abstract function operation(): string;
}

/**
 * Concrete Product A.
 */
class ConcreteProductA extends Product
{
    public function operation(): string
    {
        return "ConcreteProductA operation.";
    }
}

/**
 * Concrete Product B.
 */
class ConcreteProductB extends Product
{
    public function operation(): string
    {
        return "ConcreteProductB operation.";
    }
}

/**
 * Creator abstract class.
 */
abstract class Creator
{
    public abstract function factoryMethod(): Product;

    public function someOperation(): string
    {
        $product = $this->factoryMethod();
        return "Creator: The product is " . $product->operation();
    }
}

/**
 * Concrete Creator A.
 */
class ConcreteCreatorA extends Creator
{
    public function factoryMethod(): Product
    {
        return new ConcreteProductA();
    }
}

/**
 * Concrete Creator B.
 */
class ConcreteCreatorB extends Creator
{
    public function factoryMethod(): Product
    {
        return new ConcreteProductB();
    }
}

/**
 * Client code.
 */
class Client
{
    public static function main(): void
    {
        $creatorA = new ConcreteCreatorA();
        echo $creatorA->someOperation() . PHP_EOL;

        $creatorB = new ConcreteCreatorB();
        echo $creatorB->someOperation() . PHP_EOL;
    }
}

Client::main();

?>
```