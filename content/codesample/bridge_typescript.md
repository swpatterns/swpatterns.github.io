---
title: "Bridge - TypeScript"
date: 2025-12-03T11:30:47.090-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["TypeScript"]
---
The Bridge pattern is a structural design pattern that lets you split an abstraction from its implementation so that objects can have different implementations. This is useful when there's a need for multiple independent variations of an abstraction. In this example, we have a `Shape` abstraction with `Circle` and `Rectangle` concrete implementations, and separate `Color` and `Fill` implementations for how those shapes are rendered.  The `Shape` classes delegate the actual rendering to a `Renderer` (either `ColorRenderer` or `FillRenderer`). This TypeScript implementation leverages interfaces for loose coupling and type safety, adhering to modern TypeScript best practices.

```typescript
// Abstraction
interface Shape {
  render(): string;
  setRenderer(renderer: Renderer);
}

// Implementations (Color and Fill)
interface Renderer {
  apply(shape: string): string;
}

class ColorRenderer implements Renderer {
  apply(shape: string): string {
    return `Rendering ${shape} with color!`;
  }
}

class FillRenderer implements Renderer {
  apply(shape: string): string {
    return `Rendering ${shape} with fill!`;
  }
}

// Concrete Abstractions
class Circle implements Shape {
  private renderer: Renderer;

  constructor() {
    this.setRenderer(new ColorRenderer());
  }

  render(): string {
    return this.renderer.apply("Circle");
  }

  setRenderer(renderer: Renderer): void {
    this.renderer = renderer;
  }
}

class Rectangle implements Shape {
  private renderer: Renderer;

  constructor() {
    this.setRenderer(new ColorRenderer());
  }

  render(): string {
    return this.renderer.apply("Rectangle");
  }

  setRenderer(renderer: Renderer): void {
    this.renderer = renderer;
  }
}

// Usage
const circle = new Circle();
console.log(circle.render()); // Rendering Circle with color!

circle.setRenderer(new FillRenderer());
console.log(circle.render()); // Rendering Circle with fill!

const rectangle = new Rectangle();
console.log(rectangle.render()); // Rendering Rectangle with color!
```