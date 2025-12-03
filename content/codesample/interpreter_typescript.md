---
title: "Interpreter - TypeScript"
date: 2025-12-03T13:05:57.364-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["TypeScript"]
---
The Interpreter pattern defines a class to handle for a particular language or expression. This pattern is useful when a particular grammar needs to be interpreted, and the grammar is simple.  It allows you to evaluate expressions dynamically by composing interpreter components into an expression tree. This example demonstrates interpreting simple arithmetic expressions with addition and subtraction. The code defines classes for expressions (Number, Add, Subtract) and a context to store variables.  The `interpret()` method traverses the expression tree to produce a result. This TypeScript implementation utilizes interfaces and classes for type safety and clear structure, aligning well with TypeScript's OOP capabilities.

```typescript
// Expression interface
interface Expression {
  interpret(context: Context): number;
}

// Context class to store variables (optional, but good practice)
class Context {
  private variables: { [key: string]: number } = {};

  setVariable(name: string, value: number): void {
    this.variables[name] = value;
  }

  getVariable(name: string): number {
    return this.variables[name] || 0; // Default to 0 if not found
  }
}

// Terminal Expression: Number
class NumberExpression implements Expression {
  constructor(private value: number) {}

  interpret(context: Context): number {
    return this.value;
  }
}

// Non-Terminal Expression: Addition
class AddExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}

  interpret(context: Context): number {
    return this.left.interpret(context) + this.right.interpret(context);
  }
}

// Non-Terminal Expression: Subtraction
class SubtractExpression implements Expression {
  constructor(private left: Expression, private right: Expression) {}

  interpret(context: Context): number {
    return this.left.interpret(context) - this.right.interpret(context);
  }
}

// Example Usage
function main() {
  const context = new Context();

  // Build the expression tree: 5 + 2 - 3
  const expression = new SubtractExpression(
    new AddExpression(new NumberExpression(5), new NumberExpression(2)),
    new NumberExpression(3)
  );

  const result = expression.interpret(context);
  console.log(`Result: ${result}`); // Output: Result: 4
}

main();
```