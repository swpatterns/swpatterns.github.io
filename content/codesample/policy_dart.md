---
title: "Policy - Dart"
date: 2025-12-03T13:58:46.507-05:00
draft: false
pattern_usage: ["Policy"]
language: ["Dart"]
---
The Policy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows you to change the algorithm used at runtime without modifying the client code. This is achieved by defining a common interface for all algorithms (the "policy") and then having concrete policy classes implement that interface.  The context object holds a reference to the policy and delegates the execution of the algorithm to it.

In this Dart example, we have a `DiscountPolicy` interface and concrete policies like `FixedAmountDiscount`, and `PercentageDiscount`. The `ShoppingCart` class (the context) accepts a `DiscountPolicy` during construction and uses it to calculate the final price. This demonstrates Dart's use of interfaces and dependency injection for flexible algorithm selection.

```dart
// Define the policy interface
abstract class DiscountPolicy {
  double applyDiscount(double originalPrice);
}

// Concrete policy: Fixed amount discount
class FixedAmountDiscount implements DiscountPolicy {
  final double amount;

  FixedAmountDiscount(this.amount);

  @override
  double applyDiscount(double originalPrice) {
    return originalPrice - amount;
  }
}

// Concrete policy: Percentage discount
class PercentageDiscount implements DiscountPolicy {
  final double percentage;

  PercentageDiscount(this.percentage);

  @override
  double applyDiscount(double originalPrice) {
    return originalPrice * (1 - percentage / 100);
  }
}

// Context: Shopping Cart
class ShoppingCart {
  final DiscountPolicy discountPolicy;
  final List<double> items;

  ShoppingCart(this.discountPolicy, this.items);

  double calculateTotalPrice() {
    double total = items.fold(0.0, (sum, item) => sum + item);
    return discountPolicy.applyDiscount(total);
  }
}

void main() {
  // Example usage with different policies
  final cart1 = ShoppingCart(FixedAmountDiscount(10.0), [100.0, 50.0, 25.0]);
  print('Cart 1 Total: ${cart1.calculateTotalPrice()}'); // Output: Cart 1 Total: 165.0

  final cart2 = ShoppingCart(PercentageDiscount(20.0), [100.0, 50.0, 25.0]);
  print('Cart 2 Total: ${cart2.calculateTotalPrice()}'); // Output: Cart 2 Total: 130.0
}
```