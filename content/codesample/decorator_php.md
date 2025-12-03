---
title: "Decorator - PHP"
date: 2025-12-03T11:41:21.047-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["PHP"]
---
The Decorator pattern dynamically adds responsibilities to an object. It provides a flexible alternative to subclassing for extending functionality.  Instead of inheriting from a base class to add features, we wrap the original object with one or more decorator objects, each adding a specific responsibility. This implementation uses interfaces to define the core component and the decorator, allowing for multiple decorators to be stacked.  PHP's dynamic nature and lack of true multiple inheritance make the Decorator pattern particularly useful for extending object behavior without rigid class hierarchies, fitting its flexible design principles.

```php
<?php

/**
 * Component Interface: Defines the interface for objects that can have
 * responsibilities added dynamically.
 */
interface Coffee {
    public function getCost(): float;
    public function getDescription(): string;
}

/**
 * Concrete Component: The base coffee object.
 */
class SimpleCoffee implements Coffee {
    public function getCost(): float {
        return 2.0;
    }

    public function getDescription(): string {
        return "Simple coffee";
    }
}

/**
 * Decorator Abstract Class: Holds a reference to the object it decorates.
 */
abstract class CoffeeDecorator implements Coffee {
    protected Coffee $coffee;

    public function __construct(Coffee $coffee) {
        $this->coffee = $coffee;
    }
}

/**
 * Concrete Decorator: Adds milk to the coffee.
 */
class MilkDecorator extends CoffeeDecorator {
    public function getCost(): float {
        return $this->coffee->getCost() + 0.5;
    }

    public function getDescription(): string {
        return $this->coffee->getDescription() . ", with milk";
    }
}

/**
 * Concrete Decorator: Adds sugar to the coffee.
 */
class SugarDecorator extends CoffeeDecorator {
    public function getCost(): float {
        return $this->coffee->getCost() + 0.2;
    }

    public function getDescription(): string {
        return $this->coffee->getDescription() . ", with sugar";
    }
}

// Usage
$coffee = new SimpleCoffee();
$coffee = new MilkDecorator($coffee);
$coffee = new SugarDecorator($coffee);

echo "Description: " . $coffee->getDescription() . "\n";
echo "Cost: $" . $coffee->getCost() . "\n";

?>
```