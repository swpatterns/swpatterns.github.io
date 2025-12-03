---
title: "Builder - TypeScript"
date: 2025-12-03T10:53:09.673-05:00
draft: false
pattern_usage: ["Builder"]
language: ["TypeScript"]
---
The Builder pattern is a creational design pattern that lets you construct complex objects step by step. It allows for the separation of construction logic from the object's representation, enabling different variations of the object to be created using the same construction process.

This TypeScript implementation defines an `IPizza` interface and a `Pizza` class representing the final product. The `PizzaBuilder` class provides a fluent interface with methods for setting each part of the pizza (dough, sauce, toppings). A `Director` class orchestrates the building process, using the builder to create specific pizza types. This approach is idiomatic TypeScript due to its use of interfaces for type safety, classes for structure, and method chaining for a clean, readable API.

```typescript
// Define the product
interface IPizza {
  getDough(): string;
  getSauce(): string;
  getToppings(): string[];
}

class Pizza implements IPizza {
  private dough: string;
  private sauce: string;
  private toppings: string[];

  constructor(dough: string, sauce: string, toppings: string[]) {
    this.dough = dough;
    this.sauce = sauce;
    this.toppings = toppings;
  }

  getDough(): string {
    return this.dough;
  }

  getSauce(): string {
    return this.sauce;
  }

  getToppings(): string[] {
    return this.toppings;
  }
}

// Define the Builder interface
interface PizzaBuilder {
  reset(): PizzaBuilder;
  setDough(dough: string): PizzaBuilder;
  setSauce(sauce: string): PizzaBuilder;
  addTopping(topping: string): PizzaBuilder;
  getPizza(): Pizza;
}

// Concrete Builder
class ConcretePizzaBuilder implements PizzaBuilder {
  private dough: string;
  private sauce: string;
  private toppings: string[] = [];

  reset(): PizzaBuilder {
    this.dough = "";
    this.sauce = "";
    this.toppings = [];
    return this;
  }

  setDough(dough: string): PizzaBuilder {
    this.dough = dough;
    return this;
  }

  setSauce(sauce: string): PizzaBuilder {
    this.sauce = sauce;
    return this;
  }

  addTopping(topping: string): PizzaBuilder {
    this.toppings.push(topping);
    return this;
  }

  getPizza(): Pizza {
    const pizza = new Pizza(this.dough, this.sauce, this.toppings);
    return pizza;
  }
}

// Director
class Director {
  constructor(private builder: PizzaBuilder) {}

  public constructMargherita(): Pizza {
    return this.builder
      .reset()
      .setDough("thin crust")
      .setSauce("tomato sauce")
      .addTopping("mozzarella")
      .getPizza();
  }

  public constructHawaiian(): Pizza {
    return this.builder
      .reset()
      .setDough("thick crust")
      .setSauce("tomato sauce")
      .addTopping("ham")
      .addTopping("pineapple")
      .addTopping("mozzarella")
      .getPizza();
  }
}

// Usage
const builder = new ConcretePizzaBuilder();
const director = new Director(builder);

const margherita = director.constructMargherita();
console.log("Margherita Pizza:");
console.log(`  Dough: ${margherita.getDough()}`);
console.log(`  Sauce: ${margherita.getSauce()}`);
console.log(`  Toppings: ${margherita.getToppings().join(", ")}`);

const hawaiian = director.constructHawaiian();
console.log("\nHawaiian Pizza:");
console.log(`  Dough: ${hawaiian.getDough()}`);
console.log(`  Sauce: ${hawaiian.getSauce()}`);
console.log(`  Toppings: ${hawaiian.getToppings().join(", ")}`);
```