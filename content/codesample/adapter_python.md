---
title: "Adapter - Python"
date: 2025-12-03T11:26:39.636-05:00
draft: false
pattern_usage: ["Adapter"]
language: ["Python"]
---
The Adapter pattern converts the interface of a class into another interface clients expect. It allows classes with incompatible interfaces to collaborate. Here, we adapt a `LegacyRectangle` class (with a `draw` method taking width and height) to the `Shape` interface, which uses a `calculate_area` method.  The `RectangleAdapter` class wraps the `LegacyRectangle` and provides a `calculate_area` method, effectively making the legacy code usable within a newer system designed around the `Shape` interface. This implementation is Pythonic due to its use of duck typing – the adapter doesn't *enforce* a specific interface, but provides the necessary method to satisfy the client's expectations.

```python
# Define the desired interface (Shape)
class Shape:
    def calculate_area(self):
        raise NotImplementedError

# The legacy class with an incompatible interface
class LegacyRectangle:
    def draw(self, width, height):
        print(f"Drawing rectangle with width {width} and height {height}")

# The Adapter class
class RectangleAdapter(Shape):
    def __init__(self, legacy_rectangle):
        self.legacy_rectangle = legacy_rectangle

    def calculate_area(self):
        # Adapt the LegacyRectangle's draw functionality to calculate area
        width = 10  # Assuming some default width
        height = 5 # Assuming some default height
        self.legacy_rectangle.draw(width, height) #Side effect of traditional use
        return width * height

# Client code
def process_shape(shape):
    area = shape.calculate_area()
    print(f"Calculated area: {area}")

# Usage
legacy_rectangle = LegacyRectangle()
rectangle_adapter = RectangleAdapter(legacy_rectangle)

process_shape(rectangle_adapter)
```