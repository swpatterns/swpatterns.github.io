---
title: "Decorator - Python"
date: 2025-12-03T11:38:25.918-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["Python"]
---
The Decorator pattern dynamically adds responsibility to an object without modifying its structure. It provides a flexible alternative to subclassing for extending functionality. In this Python example, we define a base function `say_hello` and then create decorator functions `add_greeting` and `make_it_loud` that wrap the original function, adding new behavior (a greeting prefix and uppercase conversion, respectively).  The `@decorator_name` syntax is Python's syntactic sugar for applying a decorator, making the code concise and readable. This approach aligns with Python's emphasis on first-class functions and dynamic programming.

```python
def add_greeting(func):
    """Adds a greeting prefix to the function's output."""
    def wrapper(*args, **kwargs):
        return "Hello, " + func(*args, **kwargs)
    return wrapper

def make_it_loud(func):
    """Converts the function's output to uppercase."""
    def wrapper(*args, **kwargs):
        return func(*args, **kwargs).upper()
    return wrapper

@add_greeting
@make_it_loud
def say_hello(name):
    """A simple function that returns a greeting."""
    return f"hello {name}"

if __name__ == "__main__":
    print(say_hello("world"))  # Output: HELLO, WORLD
```