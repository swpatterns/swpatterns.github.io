---
title: "Singleton - Python"
date: 2025-12-03T11:05:01.987-05:00
draft: false
pattern_usage: ["Singleton"]
language: ["Python"]
---
The Singleton pattern ensures a class has only one instance and provides a global point of access to it. This is useful for managing resources like database connections or configuration settings where multiple instances would be detrimental.

The Python implementation uses a class with a private class variable `_instance` to store the single instance. The `__new__` method is overridden to control instance creation. It checks if `_instance` is already set; if not, it creates a new instance and stores it in `_instance`. Subsequent calls to the constructor return the stored instance. This approach is Pythonic as it leverages the language's dynamic nature and avoids explicit locking mechanisms often found in other languages.

```python
class Singleton:
    """
    A Python implementation of the Singleton pattern.
    """
    _instance = None

    def __new__(cls, *args, **kwargs):
        if not cls._instance:
            cls._instance = super(Singleton, cls).__new__(cls, *args, **kwargs)
        return cls._instance

    def __init__(self, value):
        if not hasattr(self, 'initialized'):
            self.value = value
            self.initialized = True

    def get_value(self):
        return self.value

# Example Usage
if __name__ == "__main__":
    s1 = Singleton(10)
    s2 = Singleton(20)  # This will return the same instance as s1

    print(f"s1 value: {s1.get_value()}")
    print(f"s2 value: {s2.get_value()}")
    print(f"s1 is s2: {s1 is s2}")
```