---
title: "Interpreter - Python"
date: 2025-12-03T13:05:20.877-05:00
draft: false
pattern_usage: ["Interpreter"]
language: ["Python"]
---
The Interpreter pattern defines a way to evaluate a language, a simple grammar, or a sequence of commands. It's useful when you need to parse and execute expressions dynamically. This implementation defines a simple arithmetic expression interpreter with classes for terminals (numbers) and non-terminals (addition/subtraction expressions).  The `evaluate()` method in each class is the core of the interpretation process.  Python's dynamic typing and use of classes makes it a natural fit, and the clear separation of expression components aligns well with Pythonic object-oriented principles.

```python
# interpreter.py

class Node:
    """Base class for all nodes in the interpreter."""
    def evaluate(self, context=None):
        pass

class Number(Node):
    """Represents a number (terminal node)."""
    def __init__(self, value):
        self.value = value

    def evaluate(self, context=None):
        return self.value

class Add(Node):
    """Represents an addition expression (non-terminal node)."""
    def __init__(self, left, right):
        self.left = left
        self.right = right

    def evaluate(self, context=None):
        return self.left.evaluate(context) + self.right.evaluate(context)

class Subtract(Node):
    """Represents a subtraction expression (non-terminal node)."""
    def __init__(self, left, right):
        self.left = left
        self.right = right

    def evaluate(self, context=None):
        return self.left.evaluate(context) - self.right.evaluate(context)


# Example Usage
if __name__ == "__main__":
    # (1 + 2) - 3
    expression = Subtract(
        Add(Number(1), Number(2)),
        Number(3)
    )

    result = expression.evaluate()
    print(f"Result: {result}")  # Output: Result: 0

    # 5 - (2 + 1)
    expression2 = Subtract(
        Number(5),
        Add(Number(2), Number(1))
    )
    result2 = expression2.evaluate()
    print(f"Result: {result2}") # Output: Result: 2
```