---
title: "Decorator - Java"
date: 2025-12-03T11:38:15.111-05:00
draft: false
pattern_usage: ["Decorator"]
language: ["Java"]
---
The Decorator pattern dynamically adds responsibilities to an object. It provides a flexible alternative to subclassing for extending functionality.  Instead of inheriting from a base class to add behavior, you "wrap" the original object with decorator classes, each adding a specific responsibility. This implementation uses Java interfaces to define the core component and the decorator. Concrete components and decorators then implement these interfaces.  The `decorate()` method allows for stacking decorators, enhancing the object's behavior incrementally. This approach aligns with Java's preference for composition over inheritance and promotes loose coupling.

```java
// Component Interface
interface Coffee {
    String getDescription();
    double getCost();
}

// Concrete Component
class SimpleCoffee implements Coffee {
    @Override
    public String getDescription() {
        return "Simple coffee";
    }

    @Override
    public double getCost() {
        return 2.0;
    }
}

// Decorator Abstract Class
abstract class CoffeeDecorator implements Coffee {
    protected Coffee coffee;

    public CoffeeDecorator(Coffee coffee) {
        this.coffee = coffee;
    }

    @Override
    public String getDescription() {
        return coffee.getDescription();
    }

    @Override
    public double getCost() {
        return coffee.getCost();
    }
}

// Concrete Decorators
class MilkDecorator extends CoffeeDecorator {
    public MilkDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return coffee.getDescription() + ", with milk";
    }

    @Override
    public double getCost() {
        return coffee.getCost() + 0.5;
    }
}

class SugarDecorator extends CoffeeDecorator {
    public SugarDecorator(Coffee coffee) {
        super(coffee);
    }

    @Override
    public String getDescription() {
        return coffee.getDescription() + ", with sugar";
    }

    @Override
    public double getCost() {
        return coffee.getCost() + 0.2;
    }
}

// Example Usage
public class DecoratorExample {
    public static void main(String[] args) {
        Coffee coffee = new SimpleCoffee();
        System.out.println("Cost: $" + coffee.getCost() + ", Description: " + coffee.getDescription());

        coffee = new MilkDecorator(coffee);
        System.out.println("Cost: $" + coffee.getCost() + ", Description: " + coffee.getDescription());

        coffee = new SugarDecorator(coffee);
        System.out.println("Cost: $" + coffee.getCost() + ", Description: " + coffee.getDescription());
    }
}
```