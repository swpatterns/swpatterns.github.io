---
title: "Strategy - TypeScript"
date: 2025-12-03T13:32:52.679-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["TypeScript"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows an algorithm to vary independently from the clients that use it. This implementation uses TypeScript interfaces and classes to define the strategy and context.  Different shipping cost calculation strategies (e.g., flat rate, weight-based) are implemented as separate classes adhering to a common `ShippingCostStrategy` interface. The `ShoppingCart` class (the context) accepts a strategy via dependency injection and uses it to calculate the final shipping cost. This approach is idiomatic TypeScript as it leverages strong typing with interfaces and classes for maintainability and scalability.

```typescript
// Shipping Cost Strategy Interface
interface ShippingCostStrategy {
  calculate(cartValue: number, weight: number): number;
}

// Concrete Strategy: Flat Rate Shipping
class FlatRateShippingStrategy implements ShippingCostStrategy {
  private readonly rate: number;

  constructor(rate: number = 10) {
    this.rate = rate;
  }

  calculate(cartValue: number, weight: number): number {
    return this.rate;
  }
}

// Concrete Strategy: Weight Based Shipping
class WeightBasedShippingStrategy implements ShippingCostStrategy {
  private readonly costPerKg: number;

  constructor(costPerKg: number = 2.5) {
    this.costPerKg = costPerKg;
  }

  calculate(cartValue: number, weight: number): number {
    return weight * this.costPerKg;
  }
}

// Context: Shopping Cart
class ShoppingCart {
  private shippingStrategy: ShippingCostStrategy;

  constructor(shippingStrategy: ShippingCostStrategy) {
    this.shippingStrategy = shippingStrategy;
  }

  setShippingStrategy(strategy: ShippingCostStrategy): void {
    this.shippingStrategy = strategy;
  }

  calculateShippingCost(cartValue: number, weight: number): number {
    return this.shippingStrategy.calculate(cartValue, weight);
  }
}

// Example Usage
const flatRateStrategy = new FlatRateShippingStrategy();
const weightBasedStrategy = new WeightBasedShippingStrategy(3);

const cart = new ShoppingCart(flatRateStrategy);
console.log("Flat Rate Shipping:", cart.calculateShippingCost(50, 5)); // Output: 10

cart.setShippingStrategy(weightBasedStrategy);
console.log("Weight Based Shipping:", cart.calculateShippingCost(50, 5)); // Output: 15
```