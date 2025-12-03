---
title: "Decorator - JavaScript"
date: 2025-12-03T11:38:40.295-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["JavaScript"]
---
The Decorator pattern dynamically adds responsibilities to an object. It provides a flexible alternative to subclassing for extending functionality.  Instead of inheriting from a base class, you "wrap" the original object with decorator objects, each adding a specific behavior. This implementation uses closures to encapsulate the decorated functionality, a common JavaScript approach.  The `decorate` function takes a base object and a series of decorator functions, applying them sequentially to enhance the object's behavior without modifying its core. This leverages JavaScript's first-class function capabilities and avoids rigid class hierarchies.

```javascript
/**
 * Decorator Pattern Implementation in JavaScript
 */

// Base Component
const coffee = {
  cost: () => 5,
  description: () => "Simple coffee"
};

// Decorator base
const decorate = (base, ...decorators) => {
  return decorators.reduce((acc, decorator) => decorator(acc), base);
};

// Concrete Decorators
const milkDecorator = (coffee) => {
  return {
    cost: () => coffee.cost() + 2,
    description: () => `Coffee with milk - ${coffee.description()}`
  };
};

const sugarDecorator = (coffee) => {
  return {
    cost: () => coffee.cost() + 1,
    description: () => `Coffee with sugar - ${coffee.description()}`
  };
};

const whippedCreamDecorator = (coffee) => {
    return {
        cost: () => coffee.cost() + 3,
        description: () => `Coffee with whipped cream - ${coffee.description()}`
    };
}

// Usage
const myCoffee = decorate(coffee, milkDecorator, sugarDecorator);
const fancyCoffee = decorate(coffee, milkDecorator, whippedCreamDecorator, sugarDecorator);

console.log(myCoffee.description()); // Output: Coffee with milk - Simple coffee
console.log(myCoffee.cost());       // Output: 7

console.log(fancyCoffee.description()); // Output: Coffee with whipped cream - Coffee with milk - Simple coffee
console.log(fancyCoffee.cost());       // Output: 10
```