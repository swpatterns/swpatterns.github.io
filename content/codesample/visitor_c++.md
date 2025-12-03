---
title: "Visitor - C++"
date: 2025-12-03T13:42:29.593-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["C++"]
---
The Visitor pattern allows you to add new operations to a hierarchy of objects without modifying the objects themselves. It achieves this by defining a separate "visitor" class that implements the operations, and then having each element in the hierarchy "accept" the visitor, allowing the visitor to perform its operation on that element. This promotes the Open/Closed Principle.

The C++ example defines a basic `Element` interface and concrete elements `ConcreteElementA` and `ConcreteElementB`.  The `Visitor` interface declares `visit` methods for each concrete element. `ConcreteVisitor` implements these visits, defining the operations. The `accept` method in each element calls the appropriate `visit` method on the visitor. This implementation leverages polymorphism and double dispatch, common C++ techniques, to achieve the pattern's goals in a type-safe and efficient manner.

```cpp
#include <iostream>
#include <vector>

// Element Interface
class Element {
public:
  virtual void accept(class Visitor& visitor) = 0;
};

// Concrete Elements
class ConcreteElementA : public Element {
public:
  void accept(Visitor& visitor) override {
    visitor.visit(*this);
  }
  void operationA() {
    std::cout << "ConcreteElementA: Operation A called." << std::endl;
  }
};

class ConcreteElementB : public Element {
public:
  void accept(Visitor& visitor) override {
    visitor.visit(*this);
  }
  void operationB() {
    std::cout << "ConcreteElementB: Operation B called." << std::endl;
  }
};

// Visitor Interface
class Visitor {
public:
  virtual void visit(ConcreteElementA& element) = 0;
  virtual void visit(ConcreteElementB& element) = 0;
};

// Concrete Visitor
class ConcreteVisitor : public Visitor {
public:
  void visit(ConcreteElementA& element) override {
    std::cout << "ConcreteVisitor: Visiting ConcreteElementA" << std::endl;
    element.operationA();
  }
  void visit(ConcreteElementB& element) override {
    std::cout << "ConcreteVisitor: Visiting ConcreteElementB" << std::endl;
    element.operationB();
  }
};

int main() {
  std::vector<Element*> elements = {new ConcreteElementA(), new ConcreteElementB(), new ConcreteElementA()};
  ConcreteVisitor visitor;

  for (Element* element : elements) {
    element->accept(visitor);
  }

  for (Element* element : elements) {
    delete element;
  }

  return 0;
}
```