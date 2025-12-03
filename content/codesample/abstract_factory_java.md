---
title: "Abstract Factory - Java"
date: 2025-12-03T10:47:38.801-05:00
draft: false
pattern_usage: ["Abstract Factory"]
language: ["Java"]
---
The Abstract Factory pattern is a creational design pattern that provides an interface for creating families of related or dependent objects without specifying their concrete classes. It's a "factory of factories," allowing you to switch between different "looks and feels" or object configurations easily.

The Java code demonstrates this by defining an `AbstractFactory` interface with a method to create buttons. Concrete factories, `WindowsButtonFactory` and `MacButtonFactory`, implement this interface to produce platform-specific buttons. A `Client` class uses the abstract factory to obtain buttons without knowing their concrete implementation, promoting loose coupling and flexibility. This approach aligns with Java's OOP principles and interface-based programming, making it easily extensible for new platforms or button types.

```java
// AbstractFactory.java
interface ButtonFactory {
    Button createButton();
}

// ConcreteFactory.java
class WindowsButtonFactory implements ButtonFactory {
    @Override
    public Button createButton() {
        return new WindowsButton();
    }
}

class MacButtonFactory implements ButtonFactory {
    @Override
    public Button createButton() {
        return new MacButton();
    }
}

// Product.java
interface Button {
    void click();
}

class WindowsButton implements Button {
    @Override
    public void click() {
        System.out.println("Windows Button Clicked");
    }
}

class MacButton implements Button {
    @Override
    public void click() {
        System.out.println("Mac Button Clicked");
    }
}

// Client.java
public class Client {
    public static void main(String[] args) {
        ButtonFactory factory;

        // Create Windows buttons
        factory = new WindowsButtonFactory();
        Button windowsButton = factory.createButton();
        windowsButton.click();

        // Create Mac buttons
        factory = new MacButtonFactory();
        Button macButton = factory.createButton();
        macButton.click();
    }
}
```