---
title: "Template Method - TypeScript"
date: 2025-12-03T13:37:22.711-05:00
draft: false
pattern_usage: ["Template Method"]
language: ["TypeScript"]
---
The Template Method pattern defines the skeleton of an algorithm in a base class, deferring some steps to subclasses. It allows one of the algorithm's steps to be overridden without changing the algorithm's structure. This example uses an abstract `CoffeeMaker` class with a `makeCoffee()` template method. Concrete classes (`SimpleCoffee`, `Espresso`) implement the varying steps like `brew()` and `addIngredients()`, while the `makeCoffee()` method maintains the overall order (boil water, brew, add ingredients, pour). TypeScript's abstract classes and method overriding capabilities are leveraged for a natural and type-safe implementation.

```typescript
// Template Method Pattern in TypeScript

// Abstract class defining the template method
abstract class CoffeeMaker {
  abstract brew(): void;
  abstract addIngredients(): void;

  public makeCoffee(): void {
    this.boilWater();
    this.brew();
    this.addIngredients();
    this.pour();
  }

  private boilWater(): void {
    console.log("Boiling water...");
  }

  private pour(): void {
    console.log("Pouring coffee...");
  }
}

// Concrete class: Simple Coffee
class SimpleCoffee extends CoffeeMaker {
  brew(): void {
    console.log("Brewing simple coffee...");
  }

  addIngredients(): void {
    console.log("Adding sugar and milk...");
  }
}

// Concrete class: Espresso
class Espresso extends CoffeeMaker {
  brew(): void {
    console.log("Brewing espresso...");
  }

  addIngredients(): void {
    console.log("Adding hot water...");
  }
}

// Usage
const simpleCoffeeMaker = new SimpleCoffee();
simpleCoffeeMaker.makeCoffee();

const espressoMaker = new Espresso();
espressoMaker.makeCoffee();
```