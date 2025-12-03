---
title: "Composite - Swift"
date: 2025-12-03T11:37:03.897-05:00
draft: false
pattern_usage: ["Composite"]
language: ["Swift"]
---
The Composite pattern allows you to treat individual objects and compositions of objects uniformly. It's useful for representing hierarchical structures like file systems, organizational charts, or UI elements. In this example, we represent a graphical shape hierarchy where shapes can be primitives (like `Circle` or `Square`) or containers (`CompositeShape`) holding other shapes.  The `Shape` protocol defines a common `area()` method, enabling consistent calculation even with nested shapes.  Swift's protocol-oriented programming and optional children make it a natural fit for this pattern, avoiding deep class hierarchies.  The use of `var` for children makes the composition mutable, allowing shapes to be added/removed dynamically.

```swift
// Shape Protocol
protocol Shape {
    func area() -> Double
}

// Primitive Shapes
struct Circle: Shape {
    let radius: Double
    func area() -> Double {
        return .pi * radius * radius
    }
}

struct Square: Shape {
    let sideLength: Double
    func area() -> Double {
        return sideLength * sideLength
    }
}

// Composite Shape
class CompositeShape: Shape {
    private var children: [Shape] = []

    func add(shape: Shape) {
        children.append(shape)
    }

    func remove(shape: Shape) {
        children.removeAll { $0 as AnyObject === shape as AnyObject }
    }

    func getChild(index: Int) -> Shape? {
        return children[index] as? Shape
    }
    
    func area() -> Double {
        return children.reduce(0) { $0 + $1.area() }
    }
}

// Example Usage
let circle = Circle(radius: 5)
let square = Square(sideLength: 4)
let composite = CompositeShape()

composite.add(shape: circle)
composite.add(shape: square)

let anotherCircle = Circle(radius: 2)
composite.add(shape: anotherCircle)

print("Total area: \(composite.area())")

if let firstChild = composite.getChild(index: 0) {
    print("First child area: \(firstChild.area())")
}
```