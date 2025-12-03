---
title: "Builder - Python"
date: 2025-12-03T10:52:28.984-05:00
draft: false
pattern_usage: ["Builder"]
language: ["Python"]
---
The Builder pattern is a creational design pattern that lets you construct complex objects step by step. It allows for the separation of construction from representation, making the process more flexible and readable, especially when dealing with objects that have many optional attributes.

The Python code below demonstrates the Builder pattern for constructing `Computer` objects. A `ComputerBuilder` class provides methods to set individual components (CPU, RAM, Storage, etc.). A `Director` class orchestrates the building process using the builder. This approach keeps the `Computer` class simple and allows for different configurations without modifying the core class.  Using methods for each component is a natural fit for Python's object-oriented style, and the Director provides a clean interface for creating common configurations.

```python
class Computer:
    def __init__(self):
        self.cpu = None
        self.ram = None
        self.storage = None
        self.graphics_card = None
        self.operating_system = None

    def __str__(self):
        return (
            f"Computer:\n"
            f"  CPU: {self.cpu}\n"
            f"  RAM: {self.ram}\n"
            f"  Storage: {self.storage}\n"
            f"  Graphics Card: {self.graphics_card}\n"
            f"  Operating System: {self.operating_system}"
        )


class ComputerBuilder:
    def __init__(self):
        self.computer = Computer()

    def with_cpu(self, cpu):
        self.computer.cpu = cpu
        return self

    def with_ram(self, ram):
        self.computer.ram = ram
        return self

    def with_storage(self, storage):
        self.computer.storage = storage
        return self

    def with_graphics_card(self, graphics_card):
        self.computer.graphics_card = graphics_card
        return self

    def with_operating_system(self, operating_system):
        self.computer.operating_system = operating_system
        return self

    def build(self):
        return self.computer


class Director:
    def __init__(self, builder):
        self.builder = builder

    def construct_gaming_computer(self):
        return (
            self.builder
            .with_cpu("Intel i9")
            .with_ram("32GB DDR5")
            .with_storage("2TB NVMe SSD")
            .with_graphics_card("NVIDIA RTX 4090")
            .with_operating_system("Windows 11")
            .build()
        )

    def construct_office_computer(self):
        return (
            self.builder
            .with_cpu("Intel i5")
            .with_ram("16GB DDR4")
            .with_storage("512GB SSD")
            .with_operating_system("Windows 10")
            .build()
        )


if __name__ == "__main__":
    builder = ComputerBuilder()
    director = Director(builder)

    gaming_computer = director.construct_gaming_computer()
    print(gaming_computer)

    office_computer = director.construct_office_computer()
    print("\n" + str(office_computer))
```