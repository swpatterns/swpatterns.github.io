---
title: "Builder - Go"
date: 2025-12-03T10:54:24.554-05:00
draft: false
pattern_usage: ["Builder"]
language: ["Go"]
---
The Builder pattern is a creational design pattern that lets you construct complex objects step by step. The pattern allows for the separation of construction from representation, making it easier to create different variations of an object without changing the core construction logic.

This Go implementation defines a `Product` struct representing the complex object and a `Builder` interface outlining the steps to build it. A concrete `ConcreteBuilder` struct implements the interface, accumulating parts of the product in its internal state. A `Director` struct orchestrates the building process using the builder.  The `GetProduct()` method retrieves the final built product. This approach is idiomatic Go as it leverages interfaces for flexibility and composition over inheritance, aligning with Go's design principles.

```go
// Product represents the complex object being built.
type Product struct {
	PartA string
	PartB string
	PartC string
}

// Builder defines the interface for building a Product.
type Builder interface {
	SetPartA(partA string) Builder
	SetPartB(partB string) Builder
	SetPartC(partC string) Builder
	GetProduct() *Product
}

// ConcreteBuilder implements the Builder interface.
type ConcreteBuilder struct {
	product *Product
}

// NewConcreteBuilder creates a new ConcreteBuilder.
func NewConcreteBuilder() *ConcreteBuilder {
	return &ConcreteBuilder{
		product: &Product{},
	}
}

func (b *ConcreteBuilder) SetPartA(partA string) Builder {
	b.product.PartA = partA
	return b
}

func (b *ConcreteBuilder) SetPartB(partB string) Builder {
	b.product.PartB = partB
	return b
}

func (b *ConcreteBuilder) SetPartC(partC string) Builder {
	b.product.PartC = partC
	return b
}

func (b *ConcreteBuilder) GetProduct() *Product {
	return b.product
}

// Director orchestrates the building process.
type Director struct {
	builder Builder
}

// NewDirector creates a new Director.
func NewDirector(builder Builder) *Director {
	return &Director{builder: builder}
}

// Construct builds a Product using the provided Builder.
func (d *Director) Construct(partA, partB, partC string) *Product {
	d.builder.SetPartA(partA).SetPartB(partB).SetPartC(partC)
	return d.builder.GetProduct()
}
```