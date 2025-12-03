---
title: "Command - JavaScript"
date: 2025-12-03T13:00:52.875-05:00
draft: false
pattern_usage: ["Command"]
language: ["JavaScript"]
---
The Command pattern encapsulates a request as an object, allowing parameterization of clients with different requests, queue or log requests, and support undoable operations. This implementation uses a simple `Command` interface with an `execute` method. Concrete commands (like `AddCommand`, `SubtractCommand`) implement this interface, holding the necessary data to perform the operation.  An `Invoker` (Calculator) takes and stores commands, delegating execution to them. This is idiomatic JavaScript by leveraging its flexible object and function-as-first-class-citizen nature.  The use of functions as command objects simplifies the code and avoids the need for complex class hierarchies often seen in statically-typed languages.

```javascript
// Command Interface
class Command {
  constructor(receiver, action, operand) {
    this.receiver = receiver;
    this.action = action;
    this.operand = operand;
  }

  execute() {
    this.receiver[this.action](this.operand);
  }
}

// Receiver
class Calculator {
  constructor() {
    this.value = 0;
  }

  add(operand) {
    this.value += operand;
    console.log(`Added ${operand}, value is now ${this.value}`);
  }

  subtract(operand) {
    this.value -= operand;
    console.log(`Subtracted ${operand}, value is now ${this.value}`);
  }

  getValue() {
    return this.value;
  }
}

// Invoker
class CommandInvoker {
  constructor() {
    this.commands = [];
  }

  addCommand(command) {
    this.commands.push(command);
  }

  executeCommands() {
    for (const command of this.commands) {
      command.execute();
    }
  }
}


// Usage
const calculator = new Calculator();
const invoker = new CommandInvoker();

const addCommand1 = new Command(calculator, 'add', 10);
const subtractCommand = new Command(calculator, 'subtract', 5);
const addCommand2 = new Command(calculator, 'add', 2);

invoker.addCommand(addCommand1);
invoker.addCommand(subtractCommand);
invoker.addCommand(addCommand2);

invoker.executeCommands();
console.log("Final value:", calculator.getValue());
```