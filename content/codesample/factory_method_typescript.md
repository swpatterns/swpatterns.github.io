---
title: "Factory Method - TypeScript"
date: 2025-12-03T10:57:23.353-05:00
draft: false
pattern_usage: ["Factory Method"]
language: ["TypeScript"]
---
The Factory Method pattern defines an interface for creating an object, but lets subclasses decide which class to instantiate. It promotes loose coupling by abstracting the object creation process. This allows for flexibility – new types can be added without modifying the existing code that *uses* the factory.

The code defines a `Product` interface and concrete products `ConcreteProductA` and `ConcreteProductB`.  The `Creator` class declares the `factoryMethod` which returns a `Product`.  `ConcreteCreatorA` and `ConcreteCreatorB` override `factoryMethod` to return their specific product types.  The client code calls the `factoryMethod` through the creator, without knowing the exact product being created. This is idiomatic TypeScript due to its use of interfaces, classes, and inheritance to achieve abstraction and polymorphism, leveraging TypeScript's type system for strong contracts.

```typescript
// Product interface
interface Product {
  operation(): string;
}

// Concrete Products
class ConcreteProductA implements Product {
  operation(): string {
    return "ConcreteProductA operation";
  }
}

class ConcreteProductB implements Product {
  operation(): string {
    return "ConcreteProductB operation";
  }
}

// Creator class
abstract class Creator {
  abstract factoryMethod(): Product;

  public someOperation(): string {
    // Call the factory method to create the product.
    const product = this.factoryMethod();
    // Use the product.
    return "Creator: The product is " + product.operation();
  }
}

// Concrete Creators
class ConcreteCreatorA extends Creator {
  factoryMethod(): Product {
    return new ConcreteProductA();
  }
}

class ConcreteCreatorB extends Creator {
  factoryMethod(): Product {
    return new ConcreteProductB();
  }
}

// Client code
function clientCode(creator: Creator) {
  console.log(creator.someOperation());
}

// Example usage
const creatorA = new ConcreteCreatorA();
clientCode(creatorA);

const creatorB = new ConcreteCreatorB();
clientCode(creatorB);
```