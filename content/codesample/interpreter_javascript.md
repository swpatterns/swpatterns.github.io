---
title: "Interpreter - JavaScript"
date: 2025-12-03T13:05:37.058-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["JavaScript"]
---
The Interpreter pattern is a behavioral design pattern that allows you to define a grammatical representation for a language and an interpreter to evaluate expressions in that language. It’s useful when you need to interpret a simple language with a fixed grammar.

This implementation defines a basic calculator language with addition and subtraction expressions.  `Expression` is an abstract class with an `evaluate` method.  Concrete classes `NumberExpression` and `OperationExpression` inherit from it. `NumberExpression` simply returns its number value, while `OperationExpression` recursively evaluates its left and right operands based on the operator (+ or -).  The code creates an expression tree from a string and then evaluates it, using the interpreter to process the operators. It uses a straightforward object-oriented approach, aligning well with JavaScript’s prototype-based inheritance and function-as-first-class-citizens paradigm.

```javascript
// Abstract Expression
class Expression {
  evaluate() {
    throw new Error("Evaluate method must be implemented in concrete classes.");
  }
}

// Concrete Expression: Number
class NumberExpression extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }

  evaluate() {
    return this.value;
  }
}

// Concrete Expression: Operation
class OperationExpression extends Expression {
  constructor(operator, left, right) {
    super();
    this.operator = operator;
    this.left = left;
    this.right = right;
  }

  evaluate() {
    switch (this.operator) {
      case "+":
        return this.left.evaluate() + this.right.evaluate();
      case "-":
        return this.left.evaluate() - this.right.evaluate();
      default:
        throw new Error("Invalid operator: " + this.operator);
    }
  }
}

// Example usage

// Build the expression tree manually for simplicity
const expression = new OperationExpression(
  "-",
  new OperationExpression("+", new NumberExpression(10), new NumberExpression(5)),
  new NumberExpression(2)
);

const result = expression.evaluate();
console.log(result); // Output: 13
```