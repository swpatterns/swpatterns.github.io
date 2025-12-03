---
title: "Visitor - Go"
date: 2025-12-03T13:43:07.703-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["Go"]
---
The Visitor pattern allows you to define a new operation without changing the classes of the objects on which it operates. It's achieved by moving the operation to a separate "visitor" class that accepts the object as a parameter. This is useful when you have a complex object structure and want to perform many different operations on it without cluttering the object classes themselves.

This Go implementation defines an `Element` interface representing the objects to be visited. Concrete elements like `ConcreteElementA` and `ConcreteElementB` implement this interface. The `Visitor` interface declares `Visit` methods for each concrete element type. `ConcreteVisitor` implements these methods to perform specific operations. The `Accept` method on each element takes a visitor and calls the appropriate `Visit` method. This approach leverages Go's interfaces and method sets for a clean and type-safe implementation, fitting the language's emphasis on composition and explicit interfaces.

```go
// element.go
package main

import "fmt"

// Element is the interface for objects that can be visited.
type Element interface {
	Accept(Visitor)
}

// ConcreteElementA is a concrete element.
type ConcreteElementA struct {
	Data string
}

// Accept visits the concrete element A.
func (a *ConcreteElementA) Accept(v Visitor) {
	v.VisitA(a)
}

// ConcreteElementB is a concrete element.
type ConcreteElementB struct {
	Value int
}

// Accept visits the concrete element B.
func (b *ConcreteElementB) Accept(v Visitor) {
	v.VisitB(b)
}

// Visitor is the interface for visitors.
type Visitor interface {
	VisitA(a *ConcreteElementA)
	VisitB(b *ConcreteElementB)
}

// ConcreteVisitor is a concrete visitor.
type ConcreteVisitor struct{}

// VisitA performs an operation on ConcreteElementA.
func (v *ConcreteVisitor) VisitA(a *ConcreteElementA) {
	fmt.Printf("Visiting ConcreteElementA with data: %s\n", a.Data)
}

// VisitB performs an operation on ConcreteElementB.
func (v *ConcreteVisitor) VisitB(b *ConcreteElementB) {
	fmt.Printf("Visiting ConcreteElementB with value: %d\n", b.Value)
}

func main() {
	elementA := &ConcreteElementA{Data: "Hello"}
	elementB := &ConcreteElementB{Value: 42}

	visitor := &ConcreteVisitor{}

	elementA.Accept(visitor)
	elementB.Accept(visitor)
}
```