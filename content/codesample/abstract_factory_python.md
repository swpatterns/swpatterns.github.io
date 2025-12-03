---
title: "Abstract Factory - Python"
date: 2025-12-03T10:47:57.113-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["Python"]
---
The Abstract Factory pattern is a creational pattern that provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's useful when you need to create different "flavors" of objects that work together, and you want to decouple the client code from the specific implementations.

This Python example defines abstract classes for `Button` and `Checkbox`, and an abstract factory `GUIFactory`. Concrete factories, `WindowsFactory` and `MacOSFactory`, implement the `GUIFactory` to create platform-specific button and checkbox instances. The client code requests a factory and then uses it to create the necessary GUI elements, remaining unaware of the concrete classes being instantiated. This adheres to Python's duck typing and promotes loose coupling through interfaces (abstract base classes).

```python
from abc import ABC, abstractmethod

# Abstract Products
class Button(ABC):
    @abstractmethod
    def render(self):
        pass

class Checkbox(ABC):
    @abstractmethod
    def render(self):
        pass

# Abstract Factory
class GUIFactory(ABC):
    @abstractmethod
    def create_button(self) -> Button:
        pass

    @abstractmethod
    def create_checkbox(self) -> Checkbox:
        pass

# Concrete Products (Windows)
class WindowsButton(Button):
    def render(self):
        return "Rendering a Windows button"

class WindowsCheckbox(Checkbox):
    def render(self):
        return "Rendering a Windows checkbox"

# Concrete Products (MacOS)
class MacOSButton(Button):
    def render(self):
        return "Rendering a MacOS button"

class MacOSCheckbox(Checkbox):
    def render(self):
        return "Rendering a MacOS checkbox"

# Concrete Factories
class WindowsFactory(GUIFactory):
    def create_button(self) -> Button:
        return WindowsButton()

    def create_checkbox(self) -> Checkbox:
        return WindowsCheckbox()

class MacOSFactory(GUIFactory):
    def create_button(self) -> Button:
        return MacOSButton()

    def create_checkbox(self) -> Checkbox:
        return MacOSCheckbox()

# Client Code
def client_code(factory: GUIFactory):
    button = factory.create_button()
    checkbox = factory.create_checkbox()

    print(button.render())
    print(checkbox.render())

# Usage
if __name__ == "__main__":
    print("Testing with Windows:")
    client_code(WindowsFactory())

    print("\nTesting with MacOS:")
    client_code(MacOSFactory())
```