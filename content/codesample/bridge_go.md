---
title: "Bridge - Go"
date: 2025-12-03T11:31:59.512-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["Go"]
---
The Bridge pattern is a structural design pattern that lets you split an abstraction from its implementation so that objects can have different implementations. This is useful when you want to avoid a tight coupling between abstract and concrete implementations, or when you have multiple independent abstractions that might require different implementations.

The Go implementation defines an `Abstraction` interface with a method that takes an `Implementor` interface as a dependency. Different `Abstractions` can use the same `Implementor`, and the same `Abstraction` can switch between different `Implementors` at runtime. This example presents a `Shape` abstraction and `Color` implementation, allowing for combinations like a "Red Circle" or "Blue Square" without creating rigid class hierarchies. Go’s interfaces and composition naturally lend themselves to this pattern, maximizing flexibility without inheritance.

```go
package main

import "fmt"

// Implementor interface
type Implementor interface {
	Operation() string
}

// Concrete Implementors
type ConcreteImplementorA struct{}

func (c *ConcreteImplementorA) Operation() string {
	return "ConcreteImplementorA's operation"
}

type ConcreteImplementorB struct{}

func (c *ConcreteImplementorB) Operation() string {
	return "ConcreteImplementorB's operation"
}

// Abstraction interface
type Abstraction interface {
	SetImplementor(impl Implementor)
	Operation() string
}

// Concrete Abstractions
type ConcreteAbstraction struct {
	implementor Implementor
}

func (c *ConcreteAbstraction) SetImplementor(impl Implementor) {
	c.implementor = impl
}

func (c *ConcreteAbstraction) Operation() string {
	return c.implementor.Operation()
}

// Example Usage - Shape and Color analogy
type Shape interface {
	Draw() string
}

type Circle struct {
	color Implementor
}

func (c *Circle) SetColor(color Implementor) {
	c.color = color
}

func (c *Circle) Draw() string {
	return fmt.Sprintf("Drawing a circle with %s", c.color.Operation())
}


func main() {
	implementorA := &ConcreteImplementorA{}
	implementorB := &ConcreteImplementorB{}

	abstraction := &ConcreteAbstraction{}
	abstraction.SetImplementor(implementorA)
	fmt.Println(abstraction.Operation()) // Output: ConcreteImplementorA's operation

	abstraction.SetImplementor(implementorB)
	fmt.Println(abstraction.Operation()) // Output: ConcreteImplementorB's operation

	redColor := &ConcreteImplementorA{}
	blueColor := &ConcreteImplementorB{}

	circle := &Circle{}
	circle.SetColor(redColor)
	fmt.Println(circle.Draw()) // Output: Drawing a circle with ConcreteImplementorA's operation

	circle.SetColor(blueColor)
	fmt.Println(circle.Draw()) // Output: Drawing a circle with ConcreteImplementorB's operation
}
```