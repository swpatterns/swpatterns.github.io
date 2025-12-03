---
title: "Visitor - Dart"
date: 2025-12-03T13:45:21.912-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["Dart"]
---
The Visitor pattern allows you to define a new operation without modifying the classes of the objects on which it operates. It's achieved by moving the operation to a separate "visitor" class that has a `visit` method for each type of object it can handle. This promotes the Open/Closed Principle.

This Dart implementation defines a basic shape hierarchy (Circle, Square) and a `Shape` interface. The `Visitor` interface declares a `visit` method for each `Shape` type.  `ConcreteVisitor` implements the `Visitor` to perform specific operations (e.g., calculating area, printing details). The `accept` method in each `Shape` takes a `Visitor` and calls the appropriate `visit` method on it, enabling the visitor to operate on the shape. This is idiomatic Dart due to its use of interfaces and method overriding, aligning with its object-oriented nature.

```dart
// Define the element interface
abstract class Shape {
  void accept(Visitor visitor);
}

// Concrete elements
class Circle implements Shape {
  final double radius;

  Circle(this.radius);

  @override
  void accept(Visitor visitor) {
    visitor.visitCircle(this);
  }
}

class Square implements Shape {
  final double side;

  Square(this.side);

  @override
  void accept(Visitor visitor) {
    visitor.visitSquare(this);
  }
}

// Define the visitor interface
abstract class Visitor {
  void visitCircle(Circle circle);
  void visitSquare(Square square);
}

// Concrete visitor: Area calculation
class AreaVisitor implements Visitor {
  double totalArea = 0;

  @override
  void visitCircle(Circle circle) {
    totalArea += 3.14159 * circle.radius * circle.radius;
  }

  @override
  void visitSquare(Square square) {
    totalArea += square.side * square.side;
  }
}

// Concrete visitor: Printing details
class PrintVisitor implements Visitor {
  @override
  void visitCircle(Circle circle) {
    print('Circle with radius: ${circle.radius}');
  }

  @override
  void visitSquare(Square square) {
    print('Square with side: ${square.side}');
  }
}

void main() {
  final circle = Circle(5.0);
  final square = Square(4.0);

  // Calculate area
  final areaVisitor = AreaVisitor();
  circle.accept(areaVisitor);
  square.accept(areaVisitor);
  print('Total area: ${areaVisitor.totalArea}');

  // Print details
  final printVisitor = PrintVisitor();
  circle.accept(printVisitor);
  square.accept(printVisitor);
}
```