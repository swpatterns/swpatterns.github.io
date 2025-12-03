---
title: "Visitor - Python"
date: 2025-12-03T13:41:08.383-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["Python"]
---
The Visitor pattern allows you to add new operations to a hierarchy of objects without modifying the objects themselves. It achieves this by defining a separate "visitor" class that contains the new operation, and then providing a method in each element of the hierarchy to "accept" the visitor. The visitor then implements the specific operation for each element type. This promotes the Open/Closed Principle.

The Python example defines an `Element` interface with an `accept` method. Concrete elements like `ConcreteElementA` and `ConcreteElementB` implement this interface. The `Visitor` interface defines `visit_a` and `visit_b` methods. `ConcreteVisitor` implements these to perform specific operations on each element. The `client` code creates elements and a visitor, then calls `accept` on each element, passing the visitor. This triggers the appropriate `visit` method in the visitor, executing the operation. This approach is Pythonic due to its reliance on duck typing and interfaces (implicitly defined through method signatures).

```python
# Element interface
class Element:
    def accept(self, visitor):
        raise NotImplementedError

# Concrete Elements
class ConcreteElementA(Element):
    def accept(self, visitor):
        visitor.visit_a(self)

class ConcreteElementB(Element):
    def accept(self, visitor):
        visitor.visit_b(self)

# Visitor interface
class Visitor:
    def visit_a(self, element):
        raise NotImplementedError

    def visit_b(self, element):
        raise NotImplementedError

# Concrete Visitor
class ConcreteVisitor(Visitor):
    def visit_a(self, element):
        print(f"ConcreteVisitor visited ConcreteElementA: {element}")

    def visit_b(self, element):
        print(f"ConcreteVisitor visited ConcreteElementB: {element}")

# Client code
if __name__ == "__main__":
    elements = [ConcreteElementA(), ConcreteElementB()]
    visitor = ConcreteVisitor()

    for element in elements:
        element.accept(visitor)
```