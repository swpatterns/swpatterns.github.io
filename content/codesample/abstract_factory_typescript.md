---
title: "Abstract Factory - TypeScript"
date: 2025-12-03T10:48:31.512-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["TypeScript"]
---
The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's a creational pattern that promotes loose coupling and allows for easy switching between different "themes" or variations of objects.

This TypeScript example defines an `AbstractFactory` interface and concrete factories for `ConcreteFactoryA` and `ConcreteFactoryB`. Each factory creates a `ProductA` and `ProductB`.  The client code interacts with the factories through the `AbstractFactory` interface, remaining unaware of the specific product types being created.  TypeScript's interfaces and classes naturally lend themselves to this pattern, enforcing type safety and clear structure.  The use of abstract classes further clarifies the intended design.

```typescript
// Abstract Factory Interface
interface AbstractFactory {
  createProductA(): ProductA;
  createProductB(): ProductB;
}

// Product A Interface
interface ProductA {
  operationA(): string;
}

// Product B Interface
interface ProductB {
  operationB(): string;
}

// Concrete Product A 1
class ConcreteProductA1 implements ProductA {
  operationA(): string {
    return "ConcreteProductA1 operation";
  }
}

// Concrete Product A 2
class ConcreteProductA2 implements ProductA {
  operationA(): string {
    return "ConcreteProductA2 operation";
  }
}

// Concrete Product B 1
class ConcreteProductB1 implements ProductB {
  operationB(): string {
    return "ConcreteProductB1 operation";
  }
}

// Concrete Product B 2
class ConcreteProductB2 implements ProductB {
  operationB(): string {
    return "ConcreteProductB2 operation";
  }
}

// Concrete Factory 1
class ConcreteFactory1 implements AbstractFactory {
  createProductA(): ProductA {
    return new ConcreteProductA1();
  }
  createProductB(): ProductB {
    return new ConcreteProductB1();
  }
}

// Concrete Factory 2
class ConcreteFactory2 implements AbstractFactory {
  createProductA(): ProductA {
    return new ConcreteProductA2();
  }
  createProductB(): ProductB {
    return new ConcreteProductB2();
  }
}

// Client Code
function clientCode(factory: AbstractFactory) {
  const productA = factory.createProductA();
  const productB = factory.createProductB();

  console.log(productA.operationA());
  console.log(productB.operationB());
}

// Usage
const factory1 = new ConcreteFactory1();
clientCode(factory1);

const factory2 = new ConcreteFactory2();
clientCode(factory2);
```