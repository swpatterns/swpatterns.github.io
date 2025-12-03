---
title: "Strategy - Python"
date: 2025-12-03T13:32:17.961-05:00
draft: false
pattern_usage: ["Strategy"]
language: ["Python"]
---
The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows an algorithm to vary independently from the clients that use it.  This implementation utilizes Python's first-class functions to represent different strategies for calculating shipping costs. A `ShippingCostCalculator` class takes a strategy function as a dependency, allowing different cost calculations (e.g., by weight, by volume, flat rate) to be used at runtime without modifying the calculator class itself.  This approach is highly Pythonic due to its emphasis on functions as objects and the ease of passing them around, facilitating dynamic behavior.

```python
from enum import Enum

class ShippingMethod(Enum):
    WEIGHT = 1
    VOLUME = 2
    FLAT_RATE = 3

def calculate_by_weight(package_weight, rate_per_kg):
    """Calculates shipping cost based on weight."""
    return package_weight * rate_per_kg

def calculate_by_volume(package_volume, rate_per_cubic_cm):
    """Calculates shipping cost based on volume."""
    return package_volume * rate_per_cubic_cm

def calculate_flat_rate(shipping_fee):
    """Calculates a flat shipping rate."""
    return shipping_fee

class ShippingCostCalculator:
    """
    Calculates shipping costs using a given strategy.
    """
    def __init__(self, strategy):
        self.strategy = strategy

    def calculate_cost(self, *args):
        """
        Calculates the shipping cost using the currently selected strategy.
        """
        return self.strategy(*args)


if __name__ == '__main__':
    package_weight = 2.5
    package_volume = 1000
    flat_shipping_fee = 10

    # Calculate cost by weight
    weight_calculator = ShippingCostCalculator(calculate_by_weight)
    weight_cost = weight_calculator.calculate_cost(package_weight, 5)
    print(f"Shipping cost by weight: ${weight_cost}")

    # Calculate cost by volume
    volume_calculator = ShippingCostCalculator(calculate_by_volume)
    volume_cost = volume_calculator.calculate_cost(package_volume, 0.01)
    print(f"Shipping cost by volume: ${volume_cost}")

    # Calculate flat rate
    flat_rate_calculator = ShippingCostCalculator(calculate_flat_rate)
    flat_cost = flat_rate_calculator.calculate_cost(flat_shipping_fee)
    print(f"Flat rate shipping cost: ${flat_cost}")
```