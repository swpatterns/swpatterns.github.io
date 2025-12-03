---
title: "Module - Dart"
date: 2025-12-03T12:51:49.497-05:00
draft: false
pattern_usage: ["Module"]
language: ["Dart"]
---
The Module pattern encapsulates related functionality into a self-contained unit, exposing only a public API while hiding implementation details. This promotes code organization, reduces global namespace pollution, and enhances maintainability. In Dart, this is naturally achieved using libraries and private members (prefixed with an underscore `_`). The example demonstrates a `CalculatorModule` with internal methods for performing calculations and a public `calculate` method to access them. This aligns with Dart's library-centric approach, where libraries define modules and the underscore prefix enforces encapsulation, a core Dart principle.

```dart
// calculator_module.dart
library calculator_module;

// Internal helper function
double _add(double a, double b) {
  return a + b;
}

// Internal helper function
double _subtract(double a, double b) {
  return a - b;
}

// Public API - the module's exposed interface
class CalculatorModule {
  double calculate(double a, double b, String operation) {
    switch (operation) {
      case 'add':
        return _add(a, b);
      case 'subtract':
        return _subtract(a, b);
      default:
        throw ArgumentError('Invalid operation');
    }
  }
}
```