---
title: "Decorator - C++"
date: 2025-12-03T11:39:26.183-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["C++"]
---
The Decorator pattern dynamically adds responsibilities to an object. It provides a flexible alternative to subclassing for extending functionality.  Instead of inheriting from a base class to add behavior, we wrap the object with decorator classes that implement the same interface. This allows for combining behaviors at runtime without altering the original object's class.

The C++ example demonstrates this by having a `Component` interface (abstract class) representing the object to be decorated. `ConcreteComponent` is the base object. `Decorator` is an abstract base class for decorators, holding a pointer to the component.  `ConcreteDecoratorA` and `ConcreteDecoratorB` add specific responsibilities by overriding the `operation` method, first calling the component's operation and then adding their own. This approach is idiomatic C++ due to its use of polymorphism and pointers to achieve runtime flexibility.

```cpp
#include <iostream>
#include <string>

// Component interface
class Component {
public:
  virtual std::string operation() = 0;
};

// Concrete Component
class ConcreteComponent : public Component {
public:
  std::string operation() override {
    return "Core functionality";
  }
};

// Decorator base class
class Decorator : public Component {
public:
  Decorator(Component* component) : component_(component) {}

  std::string operation() override {
    return component_->operation();
  }

protected:
  Component* component_;
};

// Concrete Decorator A
class ConcreteDecoratorA : public Decorator {
public:
  ConcreteDecoratorA(Component* component) : Decorator(component) {}

  std::string operation() override {
    return Decorator::operation() + " with added feature A";
  }
};

// Concrete Decorator B
class ConcreteDecoratorB : public Decorator {
public:
  ConcreteDecoratorB(Component* component) : Decorator(component) {}

  std::string operation() override {
    return Decorator::operation() + " and feature B";
  }
};

int main() {
  Component* simple = new ConcreteComponent();
  std::cout << "Simple component: " << simple->operation() << std::endl;

  Component* decorated = new ConcreteDecoratorA(simple);
  std::cout << "Decorated with A: " << decorated->operation() << std::endl;

  Component* doubly_decorated = new ConcreteDecoratorB(decorated);
  std::cout << "Decorated with A and B: " << doubly_decorated->operation() << std::endl;

  delete simple;
  delete decorated;
  delete doubly_decorated;

  return 0;
}
```