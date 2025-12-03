---
title: "Prototype - Dart"
date: 2025-12-03T11:04:38.992-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["Dart"]
---
The Prototype pattern creates new objects from an existing object, a prototype, rather than using a traditional constructor. This is useful when object creation is expensive or when the exact type of objects to be created isn’t known until runtime.  We achieve this in Dart using the `clone()` method, which each prototype can implement to create a copy of itself. This approach avoids tight coupling to specific classes and allows flexible object instantiation. The Dart example demonstrates a base `Shape` class and concrete `Circle` and `Rectangle` prototypes. Cloning allows creation of new shapes with varying attributes without directly instantiating the classes. This aligns with Dart's object-oriented nature and promotes code reuse.

```dart
abstract class Shape implements Cloneable<Shape> {
  String color;

  Shape(this.color);

  Shape clone();

  @override
  String toString() {
    return 'Shape(color: $color)';
  }
}

class Circle extends Shape {
  int radius;

  Circle(String color, this.radius) : super(color);

  @override
  Circle clone() {
    return Circle(color, radius);
  }

  @override
  String toString() {
    return 'Circle(color: $color, radius: $radius)';
  }
}

class Rectangle extends Shape {
  int width;
  int height;

  Rectangle(String color, this.width, this.height) : super(color);

  @override
  Rectangle clone() {
    return Rectangle(color, width, height);
  }

  @override
  String toString() {
    return 'Rectangle(color: $color, width: $width, height: $height)';
  }
}

// Extend Cloneable to allow use of the clone method.
extension Cloneable<T> on T {
  T clone() {
    return this as T;
  }
}

void main() {
  final circle = Circle('red', 5);
  final rectangle = Rectangle('blue', 10, 20);

  final clonedCircle = circle.clone();
  final clonedRectangle = rectangle.clone();

  print('Original Circle: $circle');
  print('Cloned Circle: $clonedCircle');

  print('Original Rectangle: $rectangle');
  print('Cloned Rectangle: $clonedRectangle');
}
```