---
title: "Iterator - Python"
date: 2025-12-03T13:10:00.065-05:00
draft: false
pattern_usage: ["Iterator"]
language: ["Python"]
---
The Iterator pattern provides a way to access a sequence of elements in an object without exposing its underlying representation. It defines an interface for creating iterators and allows clients to traverse the elements without knowing how they are stored. This is achieved by separating the traversal logic from the data structure.  The Python implementation leverages the language’s built-in iterator protocol using `__iter__` and `__next__` methods.  `MyCollection` provides `__iter__` returning a `MyIterator` instance. `MyIterator` manages the current index for traversal and raises `StopIteration` when the end of the collection is reached, adhering to Python’s “duck typing” and enabling `for` loop compatibility.

```python
class MyCollection:
    def __init__(self, data):
        self.data = data
        self.index = 0

    def __iter__(self):
        return MyIterator(self.data)


class MyIterator:
    def __init__(self, data):
        self.data = data
        self.index = 0

    def __iter__(self):
        return self

    def __next__(self):
        if self.index < len(self.data):
            value = self.data[self.index]
            self.index += 1
            return value
        else:
            raise StopIteration


# Example usage
my_collection = MyCollection([1, 2, 3, 4, 5])

for item in my_collection:
    print(item)

# Getting the next item manually.
my_iterator = iter(my_collection)
print(next(my_iterator))
print(next(my_iterator))
```