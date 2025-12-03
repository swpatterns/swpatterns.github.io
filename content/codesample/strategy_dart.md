---
title: "Strategy - Dart"
date: 2025-12-03T13:36:17.563-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["Dart"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows an algorithm to vary independently from the clients that use it. This example demonstrates the Strategy pattern by defining different shipping cost calculation strategies (Standard, Express, Overnight). A `ShippingContext` class uses a `ShippingStrategy` interface to determine the cost, promoting loose coupling and flexibility. The Dart implementation leverages abstract classes and interfaces (protocols) which are core tenets of Dart's type system and allow for clear contract definition between the context and strategies, fitting Dart's emphasis on type safety and code organization.

```dart
// Define the Strategy interface
abstract class ShippingStrategy {
  double calculateCost(double weight, String destination);
}

// Concrete Strategies
class StandardShipping implements ShippingStrategy {
  @override
  double calculateCost(double weight, String destination) {
    // Some complex logic for standard shipping
    double baseCost = 5.0;
    double distanceCost = 0.1 * double.parse(destination.length); //simplified distance
    return baseCost + (weight * 2) + distanceCost;
  }
}

class ExpressShipping implements ShippingStrategy {
  @override
  double calculateCost(double weight, String destination) {
    // Some complex logic for express shipping
    double baseCost = 10.0;
    double distanceCost = 0.25 * double.parse(destination.length); //simplified distance
    return baseCost + (weight * 3) + distanceCost;
  }
}

class OvernightShipping implements ShippingStrategy {
  @override
  double calculateCost(double weight, String destination) {
    // Some complex logic for overnight shipping
    double baseCost = 20.0;
    double distanceCost = 0.5 * double.parse(destination.length); //simplified distance
    return baseCost + (weight * 5) + distanceCost;
  }
}

// Context
class ShippingContext {
  final ShippingStrategy strategy;

  ShippingContext(this.strategy);

  double calculateShippingCost(double weight, String destination) {
    return strategy.calculateCost(weight, destination);
  }
}

void main() {
  final standardShipping = StandardShipping();
  final expressShipping = ExpressShipping();
  final overnightShipping = OvernightShipping();

  final context1 = ShippingContext(standardShipping);
  final cost1 = context1.calculateShippingCost(2.0, "New York");
  print("Standard Shipping Cost: \$${cost1.toStringAsFixed(2)}");

  final context2 = ShippingContext(expressShipping);
  final cost2 = context2.calculateShippingCost(2.0, "Los Angeles");
  print("Express Shipping Cost: \$${cost2.toStringAsFixed(2)}");

  final context3 = ShippingContext(overnightShipping);
  final cost3 = context3.calculateShippingCost(2.0, "Miami");
  print("Overnight Shipping Cost: \$${cost3.toStringAsFixed(2)}");
}
```