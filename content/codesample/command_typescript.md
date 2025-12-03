---
title: "Command - TypeScript"
date: 2025-12-03T13:01:12.497-05:00
draft: false
pattern_usage: ["Command"]
language: ["TypeScript"]
---
The Command pattern encapsulates a request as an object, thereby allowing clients to parameterize simple operations with various actions, queue or log requests, and support undoable operations. This implementation uses TypeScript’s type system and classes to define a command interface and concrete commands for basic calculator operations. A `Calculator` class acts as the receiver, performing the operations. The `CommandInvoker` (here, the `Calculator` instance itself) holds and executes commands.  This is idiomatic TypeScript due to its use of interfaces for abstraction and classes for clear structure and type safety, enabling easy extensibility with new commands without modifying existing code.

```typescript
// Command Interface
interface Command {
  execute(): void;
  undo(): void;
}

// Receiver
class Calculator {
  private currentValue: number = 0;

  add(amount: number): void {
    this.currentValue += amount;
  }

  subtract(amount: number): void {
    this.currentValue -= amount;
  }

  getCurrentValue(): number {
    return this.currentValue;
  }
}

// Concrete Commands
class AddCommand implements Command {
  private amount: number;
  private calculator: Calculator;
  private previousValue: number;

  constructor(calculator: Calculator, amount: number) {
    this.calculator = calculator;
    this.amount = amount;
    this.previousValue = calculator.getCurrentValue();
  }

  execute(): void {
    this.calculator.add(this.amount);
  }

  undo(): void {
    this.calculator.add(-this.amount);
  }
}

class SubtractCommand implements Command {
  private amount: number;
  private calculator: Calculator;
  private previousValue: number;

  constructor(calculator: Calculator, amount: number) {
    this.calculator = calculator;
    this.amount = amount;
    this.previousValue = calculator.getCurrentValue();
  }

  execute(): void {
    this.calculator.subtract(this.amount);
  }

  undo(): void {
    this.calculator.add(this.amount);
  }
}

// Usage
const calculator = new Calculator();
const addCommand = new AddCommand(calculator, 10);
const subtractCommand = new SubtractCommand(calculator, 5);

addCommand.execute();
console.log("After add:", calculator.getCurrentValue());

subtractCommand.execute();
console.log("After subtract:", calculator.getCurrentValue());

subtractCommand.undo();
console.log("After subtract undo:", calculator.getCurrentValue());
```