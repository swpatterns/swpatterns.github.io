---
title: "Abstract Factory - Go"
date: 2025-12-03T10:49:51.149-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["Go"]
---
The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's a "factory of factories," allowing you to switch between different "looks and feels" or configurations of objects easily.

This Go implementation defines interfaces for `Chair`, `Table`, and `Factory`. Concrete types like `ModernChair`, `ModernTable`, `ArtDecoChair`, and `ArtDecoTable` implement the product interfaces.  `ModernFurnitureFactory` and `ArtDecoFurnitureFactory` implement the `Factory` interface, each responsible for creating a complete set of furniture in its style. The client code interacts with the factory interface, not the concrete classes, promoting loose coupling and flexibility.  Go's interfaces make this pattern a natural fit, as they define behavior without dictating implementation.

```go
// Chair interface represents a chair.
type Chair interface {
	Sit() string
}

// Table interface represents a table.
type Table interface {
	Use() string
}

// Factory interface represents the abstract factory.
type Factory interface {
	CreateChair() Chair
	CreateTable() Table
}

// ModernChair is a concrete chair.
type ModernChair struct{}

func (c *ModernChair) Sit() string {
	return "Sitting on a modern chair."
}

// ModernTable is a concrete table.
type ModernTable struct{}

func (t *ModernTable) Use() string {
	return "Using a modern table."
}

// ArtDecoChair is a concrete chair.
type ArtDecoChair struct{}

func (c *ArtDecoChair) Sit() string {
	return "Sitting on an Art Deco chair."
}

// ArtDecoTable is a concrete table.
type ArtDecoTable struct{}

func (t *ArtDecoTable) Use() string {
	return "Using an Art Deco table."
}

// ModernFurnitureFactory creates modern furniture.
type ModernFurnitureFactory struct{}

func (f *ModernFurnitureFactory) CreateChair() Chair {
	return &ModernChair{}
}

func (f *ModernFurnitureFactory) CreateTable() Table {
	return &ModernTable{}
}

// ArtDecoFurnitureFactory creates Art Deco furniture.
type ArtDecoFurnitureFactory struct{}

func (f *ArtDecoFurnitureFactory) CreateChair() Chair {
	return &ArtDecoChair{}
}

func (f *ArtDecoFurnitureFactory) CreateTable() Table {
	return &ArtDecoTable{}
}

// Client code
func main() {
	var factory Factory

	// Create modern furniture
	factory = &ModernFurnitureFactory{}
	chair := factory.CreateChair()
	table := factory.CreateTable()
	println(chair.Sit())
	println(table.Use())

	// Create Art Deco furniture
	factory = &ArtDecoFurnitureFactory{}
	chair = factory.CreateChair()
	table = factory.CreateTable()
	println(chair.Sit())
	println(table.Use())
}
```