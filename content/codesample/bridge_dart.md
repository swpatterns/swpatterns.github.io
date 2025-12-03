---
title: "Bridge - Dart"
date: 2025-12-03T11:33:46.564-05:00
draft: false
pattern_usage: ["Bridge"]
language: ["Dart"]
---
The Bridge pattern is a structural design pattern that lets you split an abstraction from its implementation so that objects can have different implementations. This is useful when you want to avoid a tight coupling between abstract and concrete classes, allowing you to change implementations independently without affecting the abstraction.

The code demonstrates a `Shape` abstraction with `Color` implementations. `Shape` has a `render()` method that delegates to a `Color` object to actually *do* the coloring.  Different `Color` implementations (e.g., `RedColor`, `BlueColor`) provide different coloring behaviors.  This allows us to combine different shapes with different colors without creating a combinatorial explosion of shape-color classes. The use of interfaces (`Color`) and abstract classes (`Shape`) is idiomatic Dart for defining contracts and abstractions.

```dart
// Define the abstraction
abstract class Shape {
  Color color;

  Shape(this.color);
  void render();
}

// Define the implementation interface
abstract class Color {
  void applyColor();
}

// Concrete implementations
class RedColor implements Color {
  @override
  void applyColor() {
    print('Applying red color.');
  }
}

class BlueColor implements Color {
  @override
  void applyColor() {
    print('Applying blue color.');
  }
}

// Concrete abstractions
class Circle extends Shape {
  Circle(Color color) : super(color);

  @override
  void render() {
    print('Rendering a circle with ');
    color.applyColor();
  }
}

class Square extends Shape {
  Square(Color color) : super(color);

  @override
  void render() {
    print('Rendering a square with ');
    color.applyColor();
  }
}

// Usage
void main() {
  final redCircle = Circle(RedColor());
  redCircle.render();

  final blueSquare = Square(BlueColor());
  blueSquare.render();
}
```