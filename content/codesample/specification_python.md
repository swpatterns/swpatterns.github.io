---
title: "Specification - Python"
date: 2025-12-03T13:49:58.503-05:00
draft: false
pattern_usage: ["Specification"]
language: ["Python"]
---
The Specification pattern is a powerful way to encapsulate complex business rules into reusable objects. It allows you to define a predicate (a boolean expression) that can be applied to objects to determine if they satisfy certain criteria without tightly coupling the criteria to the object itself. This promotes flexibility and maintainability.

The Python implementation uses classes to define the specification and concrete specifications for specific criteria. The `Specification` class acts as an interface, and concrete specifications inherit from it, implementing the `is_satisfied_by` method.  The code demonstrates checking if a product is both featured and within a price range. Python's duck typing and first-class functions make this pattern a natural fit, avoiding the need for explicit interfaces in many cases.

```python
from dataclasses import dataclass
from typing import TypeVar, Generic

T = TypeVar('T')

@dataclass
class Product:
    name: str
    price: float
    is_featured: bool

class Specification(Generic[T]):
    def is_satisfied_by(self, obj: T) -> bool:
        raise NotImplementedError

class FeaturedProduct(Specification[Product]):
    def is_satisfied_by(self, product: Product) -> bool:
        return product.is_featured

class PriceLessThan(Specification[Product]):
    def __init__(self, max_price: float):
        self.max_price = max_price

    def is_satisfied_by(self, product: Product) -> bool:
        return product.price < self.max_price

class AndSpecification(Specification[Product]):
    def __init__(self, spec1: Specification[Product], spec2: Specification[Product]):
        self.spec1 = spec1
        self.spec2 = spec2

    def is_satisfied_by(self, product: Product) -> bool:
        return self.spec1.is_satisfied_by(product) and self.spec2.is_satisfied_by(product)

# Example Usage
products = [
    Product("Laptop", 1200.0, True),
    Product("Mouse", 25.0, False),
    Product("Keyboard", 75.0, True),
    Product("Monitor", 300.0, False)
]

featured_and_cheap = AndSpecification(FeaturedProduct(), PriceLessThan(500.0))

for product in products:
    if featured_and_cheap.is_satisfied_by(product):
        print(f"{product.name} is featured and costs less than $500")
```