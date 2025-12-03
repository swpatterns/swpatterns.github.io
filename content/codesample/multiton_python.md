---
title: "Multiton - Python"
date: 2025-12-03T11:08:12.234-05:00
draft: false
pattern_usage: ["Multiton"]
language: ["Python"]
---
The Multiton pattern ensures that only a limited number of instances of a class exist. Unlike a Singleton which allows only one instance, a Multiton permits a predefined number. This is useful when managing a pool of resources or managing a small set of unique entities. The Python implementation uses a class-level dictionary to store instances, creating them on demand up to the specified maximum limit.  The `__new__` method is overridden to control instantiation.  This is idiomatic Python as it leverages the language's dynamic nature and uses dictionaries for efficient instance management, avoiding excessive class decoration or complex static initialization.

```python
class Multiton:
    """
    Multiton pattern implementation.  Limits the number of instances of a class.
    """
    _instances = {}
    _max_instances = 3  # Define maximum number of instances

    def __new__(cls, *args, **kwargs):
        if len(cls._instances) < cls._max_instances:
            instance = super().__new__(cls)
            cls._instances[id(instance)] = instance
            return instance
        else:
            # Return an existing instance if the limit is reached
            for inst in cls._instances.values():
                return inst
            #Should not reach here, but handle case where no instances exist after exceeding limit.
            return None 

    def __init__(self, name):
        self.name = name

    def __repr__(self):
        return f"Multiton instance: {self.name}, id: {id(self)}"


# Example Usage:
if __name__ == "__main__":
    instance1 = Multiton("Instance 1")
    instance2 = Multiton("Instance 2")
    instance3 = Multiton("Instance 3")
    instance4 = Multiton("Instance 4")  # Will return an existing instance

    print(instance1)
    print(instance2)
    print(instance3)
    print(instance4)

    print(f"Number of instances: {len(Multiton._instances)}")
```