---
title: "Visitor - JavaScript"
date: 2025-12-03T13:41:27.157-05:00
draft: false
pattern_usage: ["Visitor"]
language: ["JavaScript"]
---
The Visitor pattern allows you to add new operations to a hierarchy of objects without modifying the objects themselves. It achieves this by defining a separate "visitor" interface that contains `visit` methods for each concrete element type in the hierarchy. Each concrete visitor implements these methods to define the operation for that element.  The elements then "accept" the visitor, delegating the operation to the appropriate `visit` method.

This JavaScript implementation uses a simple AST (Abstract Syntax Tree) of mathematical expressions.  The `Expression` interface defines the `accept` method. Concrete expressions like `Number` and `Add` implement `accept`, passing themselves to the visitor. The `Visitor` interface defines `visitNumber` and `visitAdd`.  `ExpressionPrinter` is a concrete visitor that prints the expression. This approach is idiomatic JavaScript as it leverages interfaces (achieved through duck typing) and function dispatch to achieve polymorphism without strict class hierarchies.

```javascript
// Expression interface
class Expression {
  accept(visitor) {
    throw new Error("Method 'accept' must be implemented.");
  }
}

// Concrete Expressions
class Number extends Expression {
  constructor(value) {
    super();
    this.value = value;
  }

  accept(visitor) {
    visitor.visitNumber(this);
  }
}

class Add extends Expression {
  constructor(left, right) {
    super();
    this.left = left;
    this.right = right;
  }

  accept(visitor) {
    visitor.visitAdd(this);
  }
}

// Visitor interface
class Visitor {
  visitNumber(number) {
    throw new Error("Method 'visitNumber' must be implemented.");
  }

  visitAdd(add) {
    throw new Error("Method 'visitAdd' must be implemented.");
  }
}

// Concrete Visitor: Expression Printer
class ExpressionPrinter extends Visitor {
  constructor() {
    super();
    this.result = "";
  }

  visitNumber(number) {
    this.result += number.value;
  }

  visitAdd(add) {
    this.result += "(";
    add.left.accept(this);
    this.result += "+";
    add.right.accept(this);
    this.result += ")";
  }

  getResult() {
    return this.result;
  }
}

// Example Usage
const expression = new Add(new Number(1), new Add(new Number(2), new Number(3)));
const printer = new ExpressionPrinter();
expression.accept(printer);
console.log(printer.getResult()); // Output: (1+(2+3))
```