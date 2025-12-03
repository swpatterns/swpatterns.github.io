---
title: "Prototype - Python"
date: 2025-12-03T11:00:55.126-05:00
draft: false
pattern_usage: ["Prototype"]
language: ["Python"]
---
The Prototype pattern is a creational design pattern that specifies the kinds of objects to create using an instance of a prototype and creates new objects by cloning this prototype. It’s useful when creating objects is complex or costly, and you want to avoid repetitive creation of similar objects.

The Python implementation uses the `copy` module’s `deepcopy()` function to create independent copies of prototype objects. An abstract base class `Shape` defines a clone method, implemented in concrete classes like `Rectangle` and `Circle`. A `ShapeStore` acts as a registry holding prototypes for different shapes.  Clients request new shapes by cloning existing prototypes from the store, rather than instantiating concrete classes directly. This fits Python's dynamic nature and reliance on duck typing, demonstrating flexibility and avoiding tight coupling to specific classes.  Using `deepcopy` ensures that changes to the cloned object don’t affect the original prototype.

```python
import copy

class Shape:
    def clone(self):
        raise NotImplementedError

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height

    def __str__(self):
        return f"Rectangle(width={self.width}, height={self.height})"

    def clone(self):
        return copy.deepcopy(self)

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius

    def __str__(self):
        return f"Circle(radius={self.radius})"

    def clone(self):
        return copy.deepcopy(self)

class ShapeStore:
    def __init__(self):
        self.shapes = {}

    def add_shape(self, key, shape):
        self.shapes[key] = shape

    def get_shape(self, key):
        return self.shapes[key].clone()

if __name__ == "__main__":
    shape_store = ShapeStore()

    rectangle = Rectangle(10, 20)
    shape_store.add_shape("rectangle", rectangle)

    circle = Circle(5)
    shape_store.add_shape("circle", circle)

    clone_rectangle = shape_store.get_shape("rectangle")
    clone_circle = shape_store.get_shape("circle")

    print(f"Original Rectangle: {rectangle}")
    print(f"Cloned Rectangle:   {clone_rectangle}")

    clone_rectangle.width = 15
    print(f"Changed Cloned Rectangle width: {clone_rectangle}")
    print(f"Original Rectangle after clone change: {rectangle}") # unaffected

    print(f"Original Circle: {circle}")
    print(f"Cloned Circle:   {clone_circle}")
```