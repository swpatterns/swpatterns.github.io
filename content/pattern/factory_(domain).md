
---
title: "Factory (Domain)"
date: 2024-02-29T14:56:32-00:00
draft: false
pattern_types: ["creational", "domain"]
wikipedia: "https://en.wikipedia.org/wiki/Factory_method_pattern"
diagramtype: "class"
diagram: "[Client] -- Factory : request()\n[Factory] -- AbstractProduct : createProduct()\n[ConcreteProductA] -- AbstractProduct\n[ConcreteProductB] -- AbstractProduct\n[Factory] ..> [AbstractProduct] : creates\n[Factory] ..> [ConcreteProductA] : creates\n[Factory] ..> [ConcreteProductB] : creates"
code: true
---

The Factory pattern is a creational pattern that provides an interface for creating objects but lets subclasses decide which class to instantiate. This promotes loose coupling between the client code and the concrete classes of the objects that need to be created, adhering to the "Don't repeat yourself" (DRY) principle.  Instead of directly instantiating concrete types, the client requests an object from a factory without specifying the exact class.

## Usage

The Factory pattern is widely used in scenarios where:

*   A class cannot anticipate the type of objects it must create.
*   A system needs to encapsulate the object creation logic.
*   You want to avoid tight coupling between classes and their dependencies.
*   There's a need to centralize object creation and maintain consistency.
*   Implementing a domain-driven design where complex object creation is common within an aggregate.

## Examples

1.  **Django's Model Managers:** Django's ORM utilizes factory patterns extensively through Model Managers.  Instead of directly constructing database objects, you use a `manager` (the factory) to provide methods like `create()`, `get_or_create()`, etc.  The manager handles the specific creation logic for the associated model (concrete product), abstracting away the intricacies of database interactions.

2.  **Java Persistence API (JPA) `EntityManagerFactory`:** In JPA, the `EntityManagerFactory` is a factory responsible for creating `EntityManager` instances (concrete products). The factory encapsulates the details of connecting to the database, configuring the persistence unit, and building the entity managers. Clients request an `EntityManager` from the factory without needing to know the underlying database implementation or configuration.

3. **Logback's `LoggerFactory`:** Logback, a popular Java logging framework, uses a factory pattern via its `LoggerFactory` class. Clients request a logger instance using `LoggerFactory.getLogger(name)`, and the factory handles the potentially complex logic of finding or creating the appropriate logger, including configuring appenders, filters, and layout.
