---
title: "Command - Python"
date: 2025-12-03T13:00:35.414-05:00
draft: false
pattern_usage: ["Command"]
language: ["Python"]
---
The Command pattern encapsulates a request as an object, allowing for parameterization of clients with different requests, queuing or logging of requests, and support for undoable operations. This implementation defines a `Command` interface with an `execute` method. Concrete commands like `AddCommand` and `SubtractCommand` implement this interface, holding the necessary data to perform the operation. An `Invoker` class manages these commands, allowing execution without knowing the specific operation. This fits Python's duck typing well, as the invoker simply calls `execute` on any object that provides the method, supporting flexibility and loose coupling.

```python
# command.py

from abc import ABC, abstractmethod

class Command(ABC):
    @abstractmethod
    def execute(self):
        pass

class AddCommand(Command):
    def __init__(self, calculator, value):
        self.calculator = calculator
        self.value = value

    def execute(self):
        self.calculator.add(self.value)

class SubtractCommand(Command):
    def __init__(self, calculator, value):
        self.calculator = calculator
        self.value = value

    def execute(self):
        self.calculator.subtract(self.value)

class Calculator:
    def __init__(self):
        self.current_value = 0

    def add(self, value):
        self.current_value += value
        print(f"Added {value}, current value: {self.current_value}")

    def subtract(self, value):
        self.current_value -= value
        print(f"Subtracted {value}, current value: {self.current_value}")
    
    def get_value(self):
        return self.current_value


class Invoker:
    def __init__(self):
        self.commands = []

    def set_command(self, command):
        self.commands.append(command)

    def execute_commands(self):
        for command in self.commands:
            command.execute()

if __name__ == '__main__':
    calculator = Calculator()
    invoker = Invoker()

    invoker.set_command(AddCommand(calculator, 10))
    invoker.set_command(SubtractCommand(calculator, 5))
    invoker.set_command(AddCommand(calculator, 2))

    invoker.execute_commands()

    print(f"Final value: {calculator.get_value()}")
```