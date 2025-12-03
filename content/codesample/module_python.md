---
title: "Module - Python"
date: 2025-12-03T12:49:13.771-05:00
draft: false
pattern_usage: ["Module"]
language: ["Python"]
---
The Module pattern organizes code into reusable, self-contained units. It encapsulates related data and functionality, exposing only a necessary public interface while hiding implementation details. This promotes code maintainability, reduces naming conflicts, and enhances reusability.

The Python code demonstrates this by defining a module `math_operations`. It contains functions for addition and subtraction, but these are considered internal to the module.  A `calculate` function serves as the public interface, choosing the appropriate operation based on input. This aligns with Python's emphasis on modularity and the use of functions and classes to group related code. The use of a single module file is standard practice for simple modules in Python.

```python
# math_operations.py

def _add(x, y):
    """Internal function for addition."""
    return x + y

def _subtract(x, y):
    """Internal function for subtraction."""
    return x - y

def calculate(operation, x, y):
    """Public interface for performing calculations."""
    if operation == "add":
        return _add(x, y)
    elif operation == "subtract":
        return _subtract(x, y)
    else:
        raise ValueError("Invalid operation")

if __name__ == '__main__':
    # Example usage
    result = calculate("add", 5, 3)
    print(f"5 + 3 = {result}")

    result = calculate("subtract", 10, 4)
    print(f"10 - 4 = {result}")

    try:
        result = calculate("multiply", 2, 6)
    except ValueError as e:
        print(e)
```