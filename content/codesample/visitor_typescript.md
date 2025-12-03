---
title: "Visitor - TypeScript"
date: 2025-12-03T13:41:47.718-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["TypeScript"]
---
The Visitor pattern lets you define a new operation without changing the classes of the objects on which it operates. It's useful when you have a complex object structure and want to add functionality that depends on the specific types of objects within that structure.  Here, we define `Element` and concrete elements like `ConcreteElementA` and `ConcreteElementB`. The `Visitor` interface declares `visit` methods for each concrete element. `ConcreteVisitor1` and `ConcreteVisitor2` implement these visits to perform different operations. The `ObjectStructure` (a simple array in this case) accepts a visitor and calls the appropriate `visit` method on each element. This TypeScript implementation leverages interfaces and type safety, common practices in the language, to ensure correct visitor dispatching.

```typescript
// Element interface
interface Element {
  accept(visitor: Visitor): void;
}

// Concrete Elements
class ConcreteElementA implements Element {
  operationA(): string {
    return "ConcreteElementA operation";
  }

  accept(visitor: Visitor): void {
    visitor.visitConcreteElementA(this);
  }
}

class ConcreteElementB implements Element {
  operationB(): string {
    return "ConcreteElementB operation";
  }

  accept(visitor: Visitor): void {
    visitor.visitConcreteElementB(this);
  }
}

// Visitor interface
interface Visitor {
  visitConcreteElementA(element: ConcreteElementA): void;
  visitConcreteElementB(element: ConcreteElementB): void;
}

// Concrete Visitors
class ConcreteVisitor1 implements Visitor {
  visitConcreteElementA(element: ConcreteElementA): void {
    console.log("ConcreteVisitor1 visited ConcreteElementA: " + element.operationA());
  }

  visitConcreteElementB(element: ConcreteElementB): void {
    console.log("ConcreteVisitor1 visited ConcreteElementB: " + element.operationB());
  }
}

class ConcreteVisitor2 implements Visitor {
  visitConcreteElementA(element: ConcreteElementA): void {
    console.log("ConcreteVisitor2 visited ConcreteElementA: " + element.operationA().toUpperCase());
  }

  visitConcreteElementB(element: ConcreteElementB): void {
    console.log("ConcreteVisitor2 visited ConcreteElementB: " + element.operationB().repeat(2));
  }
}

// Object Structure
class ObjectStructure {
  private elements: Element[];

  constructor(elements: Element[]) {
    this.elements = elements;
  }

  traverse(visitor: Visitor): void {
    this.elements.forEach(element => {
      element.accept(visitor);
    });
  }
}

// Example Usage
const elements = [new ConcreteElementA(), new ConcreteElementB(), new ConcreteElementA()];
const objectStructure = new ObjectStructure(elements);

const visitor1 = new ConcreteVisitor1();
const visitor2 = new ConcreteVisitor2();

objectStructure.traverse(visitor1);
objectStructure.traverse(visitor2);
```