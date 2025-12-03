---
title: "Self-contained Systems - Dart"
date: 2025-12-03T14:31:30.247-05:00
draft: false
pattern_usage: ["Self-contained Systems"]
language: ["Dart"]
---
The Self-Contained System pattern focuses on encapsulating all dependencies within a single unit (like a class or function). This eliminates external dependencies, making the system portable, testable, and easier to reason about. It promotes loose coupling and simplifies deployments.

Here, we implement a simple calculator as a self-contained system using a class. All calculator logic, including parsing and performing operations, is encapsulated within the `Calculator` class, without reliance on external state or libraries beyond Dart's core functionality. This illustrates how to achieve modularity and reduce dependencies, fitting Dart's class-based structure and promoting code organization. The `calculate` method handles all operation logic, ensuring a clear entry point and contained behavior.

```dart
// main.dart
class Calculator {
  String calculate(String expression) {
    try {
      // Basic parsing and evaluation.  Could use a more robust library
      // if complexity increased, but keeping it contained.
      final List<String> parts = expression.split(' ');
      if (parts.length != 3) {
        return "Invalid expression";
      }

      final num operand1 = double.parse(parts[0]);
      final String operator = parts[1];
      final num operand2 = double.parse(parts[2]);

      num result;
      switch (operator) {
        case '+':
          result = operand1 + operand2;
          break;
        case '-':
          result = operand1 - operand2;
          break;
        case '*':
          result = operand1 * operand2;
          break;
        case '/':
          if (operand2 == 0) {
            return "Division by zero";
          }
          result = operand1 / operand2;
          break;
        default:
          return "Invalid operator";
      }

      return result.toString();
    } catch (e) {
      return "Invalid input";
    }
  }
}

void main() {
  final calculator = Calculator();
  print(calculator.calculate('10 + 5'));
  print(calculator.calculate('20 / 4'));
  print(calculator.calculate('3 * 7'));
  print(calculator.calculate('12 - 6'));
  print(calculator.calculate('5 + ')); // Invalid
  print(calculator.calculate('10 / 0')); // Division by zero
}
```