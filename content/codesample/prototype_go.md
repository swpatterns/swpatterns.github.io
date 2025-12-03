---
title: "Prototype - Go"
date: 2025-12-03T11:02:43.960-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["Go"]
---
The Prototype pattern creates new objects from an existing object, a prototype, rather than using a traditional constructor. This is useful when creating new objects is expensive, or when the exact type of objects to create isn’t known until runtime. In Go, this is naturally achieved through struct embedding and methods that allow for object cloning. This example demonstrates a `Shape` interface and concrete shapes. The `Clone()` method on each shape returns a new instance with the same properties, avoiding repeated initialization logic.  Go's interface-based approach lends itself well to defining the cloning behavior without altering the underlying structure.

```go
package main

import "fmt"

// Shape is the interface for all shapes.
type Shape interface {
	Clone() Shape
	Type() string
}

// Circle represents a circle shape.
type Circle struct {
	Radius float64
	Color  string
}

func (c *Circle) Clone() Shape {
	return &Circle{Radius: c.Radius, Color: c.Color}
}

func (c *Circle) Type() string {
	return "Circle"
}

// Rectangle represents a rectangle shape.
type Rectangle struct {
	Width  float64
	Height float64
	Color  string
}

func (r *Rectangle) Clone() Shape {
	return &Rectangle{Width: r.Width, Height: r.Height, Color: r.Color}
}

func (r *Rectangle) Type() string {
	return "Rectangle"
}

// ShapeFactory manages the cloning of shapes.
type ShapeFactory struct {
	Prototype Shape
}

func (f *ShapeFactory) SetPrototype(shape Shape) {
	f.Prototype = shape
}

func (f *ShapeFactory) CreateShape() Shape {
	return f.Prototype.Clone()
}

func main() {
	// Create a prototype circle
	circlePrototype := &Circle{Radius: 5.0, Color: "Red"}

	// Create a factory and set the prototype
	factory := &ShapeFactory{}
	factory.SetPrototype(circlePrototype)

	// Create new shapes from the prototype
	shape1 := factory.CreateShape()
	shape2 := factory.CreateShape()

	// Verify that the new shapes are different instances
	fmt.Printf("Shape 1: Type=%s, Radius=%f, Color=%s\n", shape1.Type(), shape1.Radius, shape1.Color)
	fmt.Printf("Shape 2: Type=%s, Radius=%f, Color=%s\n", shape2.Type(), shape2.Radius, shape2.Color)

	//Change the prototype after creating shape1 and shape2
	circlePrototype.Color = "Blue"
	shape3 := factory.CreateShape()
	fmt.Printf("Shape 3: Type=%s, Radius=%f, Color=%s\n", shape3.Type(), shape3.Radius, shape3.Color)
}
```