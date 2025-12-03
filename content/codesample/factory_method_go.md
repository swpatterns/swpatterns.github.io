---
title: "Factory Method - Go"
date: 2025-12-03T10:58:24.667-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["Go"]
---
The Factory Method pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate. It promotes loose coupling by decoupling specific classes from the code that uses them. This Go implementation uses an interface `Product` and concrete types `ConcreteProductA` and `ConcreteProductB`. The `Creator` interface defines the `Operation` which uses a `Product` created by the `FactoryMethod`.  Concrete creators `ConcreteCreatorA` and `ConcreteCreatorB` override the `FactoryMethod` to return different concrete products. This is idiomatic Go as it leverages interfaces for abstraction and composition over inheritance, fitting well with Go's design principles.

```go
// Product interface defines the common interface for all products.
type Product interface {
	Operation() string
}

// ConcreteProductA is a concrete product.
type ConcreteProductA struct{}

func (c *ConcreteProductA) Operation() string {
	return "ConcreteProductA operation"
}

// ConcreteProductB is a concrete product.
type ConcreteProductB struct{}

func (c *ConcreteProductB) Operation() string {
	return "ConcreteProductB operation"
}

// Creator interface declares the factory method.
type Creator interface {
	FactoryMethod() Product
	Operation() string
}

// ConcreteCreatorA creates ConcreteProductA.
type ConcreteCreatorA struct{}

func (c *ConcreteCreatorA) FactoryMethod() Product {
	return &ConcreteProductA{}
}

func (c *ConcreteCreatorA) Operation() string {
	product := c.FactoryMethod()
	return "ConcreteCreatorA: " + product.Operation()
}

// ConcreteCreatorB creates ConcreteProductB.
type ConcreteCreatorB struct{}

func (c *ConcreteCreatorB) FactoryMethod() Product {
	return &ConcreteProductB{}
}

func (c *ConcreteCreatorB) Operation() string {
	product := c.FactoryMethod()
	return "ConcreteCreatorB: " + product.Operation()
}

func main() {
	creatorA := &ConcreteCreatorA{}
	creatorB := &ConcreteCreatorB{}

	println(creatorA.Operation())
	println(creatorB.Operation())
}
```