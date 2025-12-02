---
title: "Factory Method"
date: 2024-02-29T14:35:00Z
draft: false
pattern_types: ["creational", "GOF"]
wikipedia: "https://en.wikipedia.org/wiki/Factory_method"
diagramtype: "class"
diagram: "[AbstractCreator] ..> [AbstractProduct] : creates\n[ConcreteCreator1] --|> [AbstractCreator] : extends\n[ConcreteCreator2] --|> [AbstractCreator] : extends\n[ConcreteProduct1] --|> [AbstractProduct] : extends\n[ConcreteProduct2] --|> [AbstractProduct] : extends\n[note: AbstractCreator declares the factory method, which subclasses override to return an instance of a ConcreteProduct]"
code: true
---

The Factory Method pattern is a creational design pattern that provides an interface for creating objects, but lets subclasses decide which class to instantiate. It defines a factory method, an operation that returns an object of a product class. Rather than directly instantiating concrete products, the client code calls this factory method within a creator class, and the creator's subclasses override the factory method to return different types of products.  This promotes loose coupling between the creator and the concrete products.

## Usage

The Factory Method pattern is commonly used when:

*   A class can't anticipate the class of objects it must create.
*   A class wants its subclasses to specify the objects it creates.
*   The creation of objects requires complex logic or relies on configuration data that is only available at runtime.
*   You want to centralize object creation logic to ensure consistency and maintainability.

## Examples

1.  **Java’s JDBC Framework:** The `java.sql.Connection` interface's `newConnection()` method (within its subclasses like `DriverManager`) serves as a factory method. It allows different database drivers (MySQL, PostgreSQL, Oracle) to provide their own specific connection implementations without the client code needing to know the concrete class.

2.  **Django’s Model Managers:** In Django, model managers provide a way to encapsulate database query logic.  The `create()` method on a manager acts as a factory method.  Different managers can be defined for a model, each creating instances with different default values or applying different validation rules, but clients always call `create()` on the manager without knowing the specifics of how the object is constructed.

3.  **Configuration Parsing Libraries:** Many configuration parsing libraries (e.g., for XML, YAML, JSON) use a factory method approach. A generic parser might have a method to create configuration objects, while specific parsers for different configuration formats implement that method to create the appropriate object type.