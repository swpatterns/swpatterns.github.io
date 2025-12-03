---
title: "Lazy Initialization - Python"
date: 2025-12-03T11:16:03.244-05:00
draft: false
pattern_usage: ["Lazy Initialization"]
language: ["Python"]
---
The Lazy Initialization pattern delays the creation of an object until it's actually needed, improving performance when the object is expensive to create or not always used. This avoids unnecessary resource consumption.  In this Python implementation, the `LazyLoader` class uses a property (`_value`) where the object is only created when the property is first accessed. The underscore prefix indicates it's intended as an internal attribute. This approach leverages Python's property descriptors for concise and readable lazy loading, fitting common Pythonic approaches for attribute access control and deferred computation.

```python
class LazyLoader:
    def __init__(self, factory_function):
        self._factory_function = factory_function
        self._value = None

    @property
    def value(self):
        if self._value is None:
            self._value = self._factory_function()
        return self._value


def expensive_object_factory():
    """Simulates creation of a resource-intensive object."""
    print("Creating expensive object...")
    import time
    time.sleep(2)  # Simulate a long creation time
    return "Expensive Object Created"

if __name__ == "__main__":
    loader = LazyLoader(expensive_object_factory)

    print("Loader created, but object not yet initialized.")
    
    # Object is initialized only when value is accessed
    print("Accessing the value now...")
    value = loader.value
    print(value)

    print("Accessing the value again (should be instant).")
    print(loader.value)
```