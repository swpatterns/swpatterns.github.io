---
title: "Interpreter - Dart"
date: 2025-12-03T13:09:29.037-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["Dart"]
---
The Interpreter pattern defines a way to evaluate a language, often a simple one, given its grammar. It's useful when a problem requires flexibility in evaluating expressions or when the grammar is relatively simple and doesn't warrant a full parser. This implementation represents a simple arithmetic expression interpreter, handling addition and subtraction.  The code defines abstract `Expression` classes for terminals (numbers) and non-terminals (operations). Concrete classes like `NumberExpression` and `AddExpression` interpret specific parts of the expression string by recursively evaluating their operands.  Dart’s class-based structure and ability to define custom data types make it a natural fit for implementing this pattern with clearly defined components.

```dart
abstract class Expression {
  int interpret();
}

class NumberExpression implements Expression {
  final int number;

  NumberExpression(this.number);

  @override
  int interpret() {
    return number;
  }
}

abstract class OperationExpression implements Expression {
  final Expression left;
  final Expression right;

  OperationExpression(this.left, this.right);
}

class AddExpression extends OperationExpression {
  AddExpression(super.left, super.right);

  @override
  int interpret() {
    return left.interpret() + right.interpret();
  }
}

class SubtractExpression extends OperationExpression {
  SubtractExpression(super.left, super.right);

  @override
  int interpret() {
    return left.interpret() - right.interpret();
  }
}

void main() {
  // Example expression: 1 + 2 - 3
  Expression expression = AddExpression(
    NumberExpression(1),
    SubtractExpression(
      NumberExpression(2),
      NumberExpression(3),
    ),
  );

  int result = expression.interpret();
  print('Result: $result'); // Output: Result: 0
}
```