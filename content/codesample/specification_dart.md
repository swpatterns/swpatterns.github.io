---
title: "Specification - Dart"
date: 2025-12-03T13:54:20.596-05:00
draft: false
pattern_usage: ["Specification"]
language: ["Dart"]
---
The Specification pattern is a functional approach to defining complex data validation or filtering rules. It encapsulates a condition as an object, allowing for reusable and composable logic. Instead of embedding validation directly within a class, Specifications define *what* criteria data must meet, separate from *how* the data is handled.

This Dart implementation uses a generic `Specification` class with a `satisfies` method that takes an object and returns a boolean.  Concrete specifications are created by extending this class and overriding `satisfies`.  The `and`, `or`, and `not` methods allow for combining specifications, promoting code reuse and readability. This approach aligns with Dart's support for functional programming and encourages a declarative style.

```dart
// specification.dart

abstract class Specification<T> {
  bool satisfies(T item);

  Specification<T> and(Specification<T> other) {
    return _AndSpecification(this, other);
  }

  Specification<T> or(Specification<T> other) {
    return _OrSpecification(this, other);
  }

  Specification<T> not() {
    return _NotSpecification(this);
  }
}

class _AndSpecification<T> implements Specification<T> {
  final Specification<T> first;
  final Specification<T> second;

  _AndSpecification(this.first, this.second);

  @override
  bool satisfies(T item) => first.satisfies(item) && second.satisfies(item);
}

class _OrSpecification<T> implements Specification<T> {
  final Specification<T> first;
  final Specification<T> second;

  _OrSpecification(this.first, this.second);

  @override
  bool satisfies(T item) => first.satisfies(item) || second.satisfies(item);
}

class _NotSpecification<T> implements Specification<T> {
  final Specification<T> spec;

  _NotSpecification(this.spec);

  @override
  bool satisfies(T item) => !spec.satisfies(item);
}

class IsPositive extends Specification<int> {
  @override
  bool satisfies(int number) => number > 0;
}

class IsEven extends Specification<int> {
  @override
  bool satisfies(int number) => number % 2 == 0;
}

void main() {
  final isPositiveAndEven = IsPositive().and(IsEven());

  print(isPositiveAndEven.satisfies(4));   // true
  print(isPositiveAndEven.satisfies(5));   // false
  print(isPositiveAndEven.satisfies(-2));  // false

  final isPositiveOrNegative = IsPositive().or(IsEven().not());

  print(isPositiveOrNegative.satisfies(3)); // true
  print(isPositiveOrNegative.satisfies(2)); // false
  print(isPositiveOrNegative.satisfies(-1)); // true
}
```