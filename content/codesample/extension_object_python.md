---
title: "Extension Object - Python"
date: 2025-12-03T12:52:16.724-05:00
draft: false
pattern_usage: ["Extension Object"]
language: ["Python"]
---
The Extension Object pattern allows adding new functionality to an existing class without modifying its code. This is achieved by creating a separate "extension" class that holds the new methods and data, and then composing the extension into the original object. This promotes the Open/Closed Principle – software entities should be open for extension, but closed for modification.

The Python implementation uses composition. The `ExtendedObject` class takes an instance of the original `OriginalObject` in its constructor and delegates calls to it. New functionality is added as methods within `ExtendedObject`. This approach is idiomatic Python as it leverages the language's flexible object model and avoids inheritance-based extension which can lead to brittle designs.  It also allows for multiple extensions to be applied to the same original object.

```python
# original_object.py
class OriginalObject:
    def __init__(self, data):
        self.data = data

    def existing_method(self):
        return f"Original data: {self.data}"

# extension_object.py
class ExtendedObject:
    def __init__(self, original_object):
        self._original_object = original_object

    def existing_method(self):
        return self._original_object.existing_method()

    def new_method(self):
        return f"Extended data: {self.data_extension()}"

    def data_extension(self):
        return self._original_object.data + " - extended"

# main.py
from original_object import OriginalObject
from extension_object import ExtendedObject

original = OriginalObject("Initial Value")
extended = ExtendedObject(original)

print(extended.existing_method())
print(extended.new_method())
```