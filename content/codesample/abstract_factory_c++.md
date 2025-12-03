---
title: "Abstract Factory - C++"
date: 2025-12-03T10:49:05.452-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["C++"]
---
The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's a "factory of factories," allowing you to switch between different "looks and feels" or object configurations easily.

This C++ example defines abstract classes `Button` and `Checkbox` representing product types, and concrete classes `WindowsButton` and `MacOSButton` (and similar for Checkbox) as their implementations.  `AbstractFactory` declares methods to create these products. `WindowsFactory` and `MacOSFactory` implement the factory, returning Windows/MacOS specific objects.  The client code uses the factory interface to create UI elements, decoupling it from concrete classes. This implementation uses pure virtual functions to enforce the abstract nature and demonstrates a common C++ approach to polymorphism through inheritance.

```cpp
#include <iostream>

// Abstract Products
class Button {
public:
  virtual void paint() = 0;
};

class Checkbox {
public:
  virtual void paint() = 0;
};

// Concrete Products - Windows
class WindowsButton : public Button {
public:
  void paint() override {
    std::cout << "Painting a Windows Button" << std::endl;
  }
};

class WindowsCheckbox : public Checkbox {
public:
  void paint() override {
    std::cout << "Painting a Windows Checkbox" << std::endl;
  }
};

// Concrete Products - macOS
class MacOSButton : public Button {
public:
  void paint() override {
    std::cout << "Painting a macOS Button" << std::endl;
  }
};

class MacOSCheckbox : public Checkbox {
public:
  void paint() override {
    std::cout << "Painting a macOS Checkbox" << std::endl;
  }
};

// Abstract Factory
class AbstractFactory {
public:
  virtual Button* createButton() = 0;
  virtual Checkbox* createCheckbox() = 0;
  virtual ~AbstractFactory() = default;
};

// Concrete Factories
class WindowsFactory : public AbstractFactory {
public:
  Button* createButton() override {
    return new WindowsButton();
  }
  Checkbox* createCheckbox() override {
    return new WindowsCheckbox();
  }
};

class MacOSFactory : public AbstractFactory {
public:
  Button* createButton() override {
    return new MacOSButton();
  }
  Checkbox* createCheckbox() override {
    return new MacOSCheckbox();
  }
};

// Client Code
void clientCode(AbstractFactory* factory) {
  Button* button = factory->createButton();
  Checkbox* checkbox = factory->createCheckbox();

  button->paint();
  checkbox->paint();

  delete button;
  delete checkbox;
}

int main() {
  WindowsFactory* windowsFactory = new WindowsFactory();
  clientCode(windowsFactory);

  MacOSFactory* macOsFactory = new MacOSFactory();
  clientCode(macOsFactory);

  delete windowsFactory;
  delete macOsFactory;

  return 0;
}
```