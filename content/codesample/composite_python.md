---
title: "Composite - Python"
date: 2025-12-03T11:34:25.021-05:00
draft: false
pattern_usage: ["Composite"]
language: ["Python"]
---
The Composite pattern allows you to treat individual objects and compositions of objects uniformly. It’s used when you have a hierarchical structure where you want to perform operations on both leaves (individual objects) and composites (groups of objects) in the same way. 

This example models a file system. `File` represents a leaf node and `Folder` represents a composite node. Both implement a common `Component` interface with methods like `list_contents` and `get_size`. `Folder` contains a list of other `Component` objects, enabling us to recursively compute size and list contents.  This is idiomatic Python as it uses duck typing – the `list_contents` method operates on anything that responds to it, without strict type checking.  The use of composition over inheritance keeps the structure flexible and allows for easy extension.

```python
from abc import ABC, abstractmethod

class Component(ABC):
    @abstractmethod
    def list_contents(self):
        pass

    @abstractmethod
    def get_size(self):
        pass


class File(Component):
    def __init__(self, name, size):
        self.name = name
        self.size = size

    def list_contents(self):
        return [self.name]

    def get_size(self):
        return self.size


class Folder(Component):
    def __init__(self, name):
        self.name = name
        self.children = []

    def add(self, component):
        self.children.append(component)

    def list_contents(self):
        contents = [self.name]
        for child in self.children:
            contents.extend(child.list_contents())
        return contents

    def get_size(self):
        total_size = 0
        for child in self.children:
            total_size += child.get_size()
        return total_size


if __name__ == "__main__":
    file1 = File("document.txt", 1024)
    file2 = File("image.jpg", 2048)
    folder1 = Folder("My Documents")
    folder1.add(file1)
    folder1.add(file2)

    file3 = File("report.pdf", 4096)
    folder2 = Folder("Projects")
    folder2.add(folder1)
    folder2.add(file3)

    print(folder2.list_contents())
    print(f"Total size: {folder2.get_size()} bytes")
```