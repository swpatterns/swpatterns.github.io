---
title: "Abstract Factory - JavaScript"
date: 2025-12-03T10:48:13.738-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["JavaScript"]
---
The Abstract Factory pattern is a creational pattern that provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's useful when you need to create different "themes" or configurations of objects.

This JavaScript implementation defines an `AbstractFactory` interface with methods for creating related objects (e.g., `createButton` and `createInput`). Concrete factories (`WindowsFactory`, `MacOSFactory`) implement this interface to produce platform-specific object families. A `Client` then uses the factory to create objects without knowing their concrete types. This approach promotes loose coupling and makes it easy to switch between different object families. The use of classes and interfaces aligns with modern JavaScript's object-oriented capabilities, and the factory functions encapsulate the object creation logic.

```javascript
// Abstract Factory Interface
class AbstractFactory {
  createButton() {
    throw new Error('Method not implemented.');
  }
  createInput() {
    throw new Error('Method not implemented.');
  }
}

// Concrete Factory: Windows
class WindowsFactory extends AbstractFactory {
  createButton() {
    return new WindowsButton();
  }
  createInput() {
    return new WindowsInput();
  }
}

// Concrete Factory: macOS
class MacOSFactory extends AbstractFactory {
  createButton() {
    return new MacOSButton();
  }
  createInput() {
    return new MacOSInput();
  }
}

// Product: Button
class Button {
  render() {
    return "Rendering a Button";
  }
}

// Concrete Product: Windows Button
class WindowsButton extends Button {
  render() {
    return "Rendering a Windows Button";
  }
}

// Concrete Product: macOS Button
class MacOSButton extends Button {
  render() {
    return "Rendering a macOS Button";
  }
}

// Product: Input
class Input {
  focus() {
    return "Input focused";
  }
}

// Concrete Product: Windows Input
class WindowsInput extends Input {
  focus() {
    return "Windows Input focused";
  }
}

// Concrete Product: macOS Input
class MacOSInput extends Input {
  focus() {
    return "macOS Input focused";
  }
}

// Client
function clientCode(factory) {
  const button = factory.createButton();
  const input = factory.createInput();

  console.log(button.render());
  console.log(input.focus());
}

// Usage
const windowsFactory = new WindowsFactory();
clientCode(windowsFactory);

const macOsFactory = new MacOSFactory();
clientCode(macOsFactory);
```