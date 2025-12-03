---
title: "Decorator - Dart"
date: 2025-12-03T11:41:47.199-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["Dart"]
---
The Decorator pattern dynamically adds responsibilities to an object. It provides a flexible alternative to subclassing for extending functionality.  Instead of inheriting from a base class to add behavior, we wrap the object in decorator classes that add the desired functionality. This implementation uses Dart's type system and composition to achieve this. The `Component` interface defines the core functionality, `ConcreteComponent` provides a basic implementation, and `Decorator` extends `Component` and holds a reference to another `Component`.  Specific behaviors are added by `ConcreteDecorator` classes, which wrap the component and augment its behavior. This approach is idiomatic Dart as it favors composition over inheritance and leverages Dart's flexible type system.

```dart
// Component interface
abstract class Component {
  String operation();
}

// Concrete Component
class ConcreteComponent implements Component {
  @override
  String operation() => 'Base operation';
}

// Decorator abstract class
abstract class Decorator implements Component {
  final Component _component;

  Decorator(this._component);

  @override
  String operation() => _component.operation();
}

// Concrete Decorator 1
class ConcreteDecoratorA extends Decorator {
  ConcreteDecoratorA(Component component) : super(component);

  @override
  String operation() {
    return 'Decorator A: ' + super.operation();
  }
}

// Concrete Decorator 2
class ConcreteDecoratorB extends Decorator {
  ConcreteDecoratorB(Component component) : super(component);

  @override
  String operation() {
    return 'Decorator B: ' + super.operation();
  }
}

void main() {
  Component component = ConcreteComponent();
  print(component.operation());

  Component decoratorA = ConcreteDecoratorA(component);
  print(decoratorA.operation());

  Component decoratorB = ConcreteDecoratorB(decoratorA);
  print(decoratorB.operation());
}
```