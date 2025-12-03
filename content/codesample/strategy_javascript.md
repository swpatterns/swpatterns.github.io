---
title: "Strategy - JavaScript"
date: 2025-12-03T13:32:34.180-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["JavaScript"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one as an object, and makes them interchangeable. This allows you to vary the algorithm used at runtime without modifying the client code. In this JavaScript example, we have a `ShippingCostCalculator` that accepts a `strategy` object with a `calculate` method. Different shipping strategies (Standard, Express, Overnight) implement the `calculate` method to determine the cost based on package weight and other factors.  This leverages JavaScript's first-class function capabilities; the strategy is essentially passed as a function, making the code flexible and maintainable, and avoiding conditional statements to switch between algorithms.

```javascript
// Strategy Interface (can be implicit in JavaScript via duck typing)
// No need for a formal Interface

// Concrete Strategies
const standardShipping = {
  calculate: (packageWeight, distance) => {
    return packageWeight * 0.5 + distance * 0.1;
  },
  name: "Standard"
};

const expressShipping = {
  calculate: (packageWeight, distance) => {
    return packageWeight * 1.0 + distance * 0.25;
  },
  name: "Express"
};

const overnightShipping = {
  calculate: (packageWeight, distance) => {
    return packageWeight * 2.0 + distance * 0.5;
  },
  name: "Overnight"
};


// Context
class ShippingCostCalculator {
  constructor(strategy) {
    this.strategy = strategy;
  }

  setStrategy(strategy) {
    this.strategy = strategy;
  }

  calculateCost(packageWeight, distance) {
    return this.strategy.calculate(packageWeight, distance);
  }
}

// Example Usage
const calculator = new ShippingCostCalculator(standardShipping);
console.log(`Shipping cost with ${calculator.strategy.name} shipping: $${calculator.calculateCost(5, 100)}`);

calculator.setStrategy(expressShipping);
console.log(`Shipping cost with ${calculator.strategy.name} shipping: $${calculator.calculateCost(5, 100)}`);

calculator.setStrategy(overnightShipping);
console.log(`Shipping cost with ${calculator.strategy.name} shipping: $${calculator.calculateCost(5, 100)}`);
```