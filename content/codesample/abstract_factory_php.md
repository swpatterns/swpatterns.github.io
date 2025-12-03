---
title: "Abstract Factory - PHP"
date: 2025-12-03T10:51:18.566-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["PHP"]
---
The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's a "factory of factories," allowing you to switch between different "themes" or configurations of objects easily.

This PHP example defines abstract classes for `Button` and `Checkbox` (the products) and an abstract `GUIFactory` (the abstract factory). Concrete factories, `WindowsGUIFactory` and `WebGUIFactory`, implement the `GUIFactory` to create platform-specific buttons and checkboxes.  The `Application` class uses a factory to create a complete GUI, demonstrating how to decouple the client code from the concrete widget classes. This approach is idiomatic PHP due to its reliance on interfaces and abstract classes for achieving loose coupling and extensibility, common practices in larger PHP projects.

```php
<?php

// Abstract Products
abstract class Button {
  abstract public function render(): string;
}

abstract class Checkbox {
  abstract public function render(): string;
}

// Concrete Products (Windows)
class WindowsButton extends Button {
  public function render(): string {
    return '<button>Windows Button</button>';
  }
}

class WindowsCheckbox extends Checkbox {
  public function render(): string {
    return '<input type="checkbox" value="Windows Checkbox">';
  }
}

// Concrete Products (Web)
class WebButton extends Button {
  public function render(): string {
    return '<button>Web Button</button>';
  }
}

class WebCheckbox extends Checkbox {
  public function render(): string {
    return '<input type="checkbox" value="Web Checkbox">';
  }
}

// Abstract Factory
abstract class GUIFactory {
  abstract public function createButton(): Button;
  abstract public function createCheckbox(): Checkbox;
}

// Concrete Factories
class WindowsGUIFactory extends GUIFactory {
  public function createButton(): Button {
    return new WindowsButton();
  }

  public function createCheckbox(): Checkbox {
    return new WindowsCheckbox();
  }
}

class WebGUIFactory extends GUIFactory {
  public function createButton(): Button {
    return new WebButton();
  }

  public function createCheckbox(): Checkbox {
    return new WebCheckbox();
  }
}

// Client
class Application {
  private GUIFactory $factory;

  public function __construct(GUIFactory $factory) {
    $this->factory = $factory;
  }

  public function createGUI(): void {
    $button = $this->factory->createButton();
    $checkbox = $this->factory->createCheckbox();

    echo $button->render();
    echo $checkbox->render();
  }
}

// Usage
$windowsFactory = new WindowsGUIFactory();
$appWindows = new Application($windowsFactory);
$appWindows->createGUI();

$webFactory = new WebGUIFactory();
$appWeb = new Application($webFactory);
$appWeb->createGUI();

?>
```