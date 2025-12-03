---
title: "Bridge - Swift"
date: 2025-12-03T11:32:44.881-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["Swift"]
---
The Bridge pattern is a structural design pattern that lets you split an abstraction from its implementation so that the two can vary independently. It's useful when you have an abstraction with multiple, potentially varying implementations. This avoids a proliferation of classes caused by combining each abstraction and implementation.

The code defines a `RenderingImplementation` protocol representing the different rendering engines. Concrete implementations like `VectorRendering` and `RasterRendering` provide specific rendering logic. The `Shape` abstraction doesn't directly implement rendering; instead, it holds an instance of `RenderingImplementation`. This allows changing the rendering engine at runtime without modifying the `Shape` classes themselves. This approach is idiomatic Swift because of its strong use of protocols for defining interfaces and dependency injection for loose coupling.

```swift
// RenderingImplementation protocol
protocol RenderingImplementation {
    func render(shape: Shape)
}

// Concrete implementations
struct VectorRendering: RenderingImplementation {
    func render(shape: Shape) {
        print("Rendering \(shape.name) as vector graphics.")
    }
}

struct RasterRendering: RenderingImplementation {
    func render(shape: Shape) {
        print("Rendering \(shape.name) as raster graphics.")
    }
}

// Abstraction
struct Shape {
    let name: String
    private let renderer: RenderingImplementation

    init(name: String, renderer: RenderingImplementation) {
        self.name = name
        self.renderer = renderer
    }

    func draw() {
        renderer.render(shape: self)
    }
}

// Usage
let vectorRenderer = VectorRendering()
let rasterRenderer = RasterRendering()

let circle = Shape(name: "Circle", renderer: vectorRenderer)
circle.draw()

let square = Shape(name: "Square", renderer: rasterRenderer)
square.draw()
```