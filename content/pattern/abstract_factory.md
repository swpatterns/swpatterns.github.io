
---
title: Abstract Factory
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["creational", "GOF"]
wikipedia: "https://en.wikipedia.org/wiki/Abstract_factory_pattern"
diagramtype: "class"
diagram: "[AbstractFactory] -- Creates --> [AbstractProductA] : abstract\n[AbstractFactory] -- Creates --> [AbstractProductB] : abstract\n[ConcreteFactory1] -- extends --> [AbstractFactory]\n[ConcreteFactory1] -- Creates --> [ConcreteProductA1]\n[ConcreteFactory1] -- Creates --> [ConcreteProductB1]\n[ConcreteFactory2] -- extends --> [AbstractFactory]\n[ConcreteFactory2] -- Creates --> [ConcreteProductA2]\n[ConcreteFactory2] -- Creates --> [ConcreteProductB2]\n[Client] -- uses --> [AbstractFactory]\n[Client] -- uses --> [AbstractProductA]\n[Client] -- uses --> [AbstractProductB]"
code: true
---

The Abstract Factory pattern is a creational design pattern that provides an interface for creating families of related or dependent objects without specifying their concrete classes. It allows a system to be independent of how its products are created, composed, and represented. Effectively, it's a "factory of factories"—a way to delegate the responsibility of object creation to other objects.

This pattern is particularly useful when you need to create different combinations of related objects that depend on a configuration or platform. It promotes loose coupling between classes and makes it easy to switch between different "looks and feels" or object implementations without modifying the client code.  It addresses the issue of creating multiple coupled object families when a simple factory isn't flexible enough.

## Usage

The Abstract Factory pattern is commonly used in these scenarios:

*   **GUI Frameworks:** Creating widgets (buttons, text fields, etc.) that are specific to a particular operating system (Windows, macOS, Linux).  Each OS needs a distinct set of widgets.
*   **Database Abstraction:** Providing an abstraction layer for different database systems (MySQL, PostgreSQL, Oracle). An abstract factory can create database connections, queries, and commands.
*   **Configuration Management:** Dynamically loading and configuring different sets of components based on a configuration file or environment variable.
*   **Cross-Platform Development:** Where the same high-level code needs to interact with platform-specific implementations.

## Examples

1.  **Java Swing/JFace:** Java's Swing and Eclipse's JFace frameworks utilize abstract factories extensively. They provide different "look and feel" factories that allow applications to easily adapt to different operating systems and user preferences. Each factory creates a complete set of UI components—buttons, text fields, scrollbars, etc.—that share a consistent style.

2.  **Spring Framework (Bean Definition Factories):** Spring’s configuration mechanism uses an abstract factory approach.  While not directly named as such, the `BeanFactory` (and its implementations like `XmlBeanFactory` or `AnnotationConfigBeanFactory`) effectively act as abstract factories for creating and managing beans within the application context. Different `BeanFactory` implementations use differing sources for bean definitions (XML, annotations, Java config) but provide a consistent interface for retrieving beans.

3.  **Unity Game Engine:** Unity's Asset Serialization system can leverage Abstract Factories. Different asset formats (e.g., FBX, OBJ, custom formats) can have different serialization/deserialization methods. An abstract factory could be used to provide a common interface for creating asset importers and exporters tailored to specific asset types without the core engine needing to know the details of each format.
