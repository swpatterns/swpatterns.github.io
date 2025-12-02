---
title: Abstract Factory
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["creational", "GOF"]
wikipedia: "https://en.wikipedia.org/wiki/Abstract_factory_pattern"
diagramtype: "class"
diagram: "[AbstractFactory] --|> [FactoryA] : creates\n[AbstractFactory] --|> [FactoryB] : creates\n[AbstractFactory]..\n[FactoryA] --|> [ConcreteProductA1] : produces\n[FactoryA] --|> [ConcreteProductA2] : produces\n[FactoryB] --|> [ConcreteProductB1] : produces\n[FactoryB] --|> [ConcreteProductB2] : produces\n[ConcreteProductA1] ..> [AbstractProductA] : implements\n[ConcreteProductA2] ..> [AbstractProductA] : implements\n[ConcreteProductB1] ..> [AbstractProductB] : implements\n[ConcreteProductB2] ..> [AbstractProductB] : implements\n[AbstractProductA] .. [AbstractProductB] : related products"
code: true
---

The Abstract Factory pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes. It allows you to create systems with multiple product families, where each family is designed to work together. Instead of instantiating concrete classes directly, the pattern uses an abstract factory to delegate the object creation responsibilities to specific factory implementations.

This pattern is particularly useful when you need to ensure that the objects you create are compatible, but you don't want to hardcode those dependencies. It promotes loose coupling between the creation and the usage of objects, leading to more flexible and maintainable code.  It encapsulates the knowledge of which concrete classes to use for different product configurations.

## Usage

*   **GUI Frameworks:** Creating widgets (buttons, text fields, sliders) that have a consistent look and feel across different platforms (Windows, macOS, Linux). Each platform would have its own factory creating platform-specific widgets.
*   **Database Abstraction:**  Providing a way to switch between different database systems (MySQL, PostgreSQL, Oracle) without changing the application code. Each database system would have a factory for creating database connection objects, query builders, etc.
*   **Configuration Management:**  Generating configuration objects for different environments (development, testing, production).  Each environment's factory would produce appropriately configured objects.
*   **Game Development:** Creating different character types or weapon sets having cohesive styles.

## Examples

1.  **Java's `java.awt.Toolkit`:** In Java's Abstract Window Toolkit (AWT), the `Toolkit` class acts as an Abstract Factory. It provides methods for creating different platform-specific GUI components (buttons, scrollbars, etc.). The concrete factories are determined by the operating system, automatically providing the correct components for each platform.

2.  **Spring Framework's `BeanFactory`:** Spring's `BeanFactory` (and its more advanced `ApplicationContext` implementation) can be seen as an Abstract Factory. It is responsible for creating and managing beans, which are the objects that make up the Spring application. The concrete factories are defined by the Spring configuration files (XML, annotations, etc.), specifying the types of beans to create and their dependencies.

3.  **Documentum's Content Server:** Documentum's Content Server platform employs Abstract Factories for handling different types of content storage and retrieval.  The platform can support multiple repositories, each potentially utilizing a distinct database or storage mechanism. An abstract factory ensures that all components related to a given repository (e.g., data access objects, metadata providers) are created with consistency and compatibility, dynamically switching the factory based on the chosen repository type. This simplifies integration with varied backend systems.