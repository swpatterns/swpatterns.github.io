---
title: "Abstract Factory - Dart"
date: 2025-12-03T10:51:49.287-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["Dart"]
---
The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's a creational pattern that promotes loose coupling and allows for easy switching between different "themes" or variations of objects.

This Dart implementation defines an `AbstractFactory` interface with a method to create a `ProductA` and a `ProductB`. Concrete factories, like `ConcreteFactory1` and `ConcreteFactory2`, implement this interface to produce specific variations of these products. A `Client` class then uses the factory interface to obtain objects without knowing their concrete types. This adheres to Dart's preference for interfaces and abstract classes for defining contracts, and utilizes constructor injection for dependency management, making the code testable and maintainable.

```dart
abstract class ProductA {
  void interact(ProductB b);
}

abstract class ProductB {
  void interact(ProductA a);
}

abstract class AbstractFactory {
  ProductA createProductA();
  ProductB createProductB();
}

class ConcreteProductA1 implements ProductA {
  @override
  void interact(ProductB b) {
    print('ConcreteProductA1 interacts with ProductB');
    b.interact(this);
  }
}

class ConcreteProductB1 implements ProductB {
  @override
  void interact(ProductA a) {
    print('ConcreteProductB1 interacts with ProductA');
  }
}

class ConcreteProductA2 implements ProductA {
  @override
  void interact(ProductB b) {
    print('ConcreteProductA2 interacts with ProductB');
    b.interact(this);
  }
}

class ConcreteProductB2 implements ProductB {
  @override
  void interact(ProductA a) {
    print('ConcreteProductB2 interacts with ProductA');
  }
}

class ConcreteFactory1 implements AbstractFactory {
  @override
  ProductA createProductA() {
    return ConcreteProductA1();
  }

  @override
  ProductB createProductB() {
    return ConcreteProductB1();
  }
}

class ConcreteFactory2 implements AbstractFactory {
  @override
  ProductA createProductA() {
    return ConcreteProductA2();
  }

  @override
  ProductB createProductB() {
    return ConcreteProductB2();
  }
}

class Client {
  final AbstractFactory factory;

  Client(this.factory);

  void run() {
    final productA = factory.createProductA();
    final productB = factory.createProductB();

    productA.interact(productB);
  }
}

void main() {
  final factory1 = ConcreteFactory1();
  final client1 = Client(factory1);
  client1.run();

  final factory2 = ConcreteFactory2();
  final client2 = Client(factory2);
  client2.run();
}
```