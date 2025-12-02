
---
title: "Builder"
date: 2023-10-27T10:30:00Z
draft: false
pattern_types: ["creational"]
wikipedia: "https://en.wikipedia.org/wiki/Builder_pattern"
diagramtype: "class"
diagram: "[Client] --|> [BuilderInterface]\n[ConcreteBuilder] --|> [BuilderInterface]\n[Director] --|> [BuilderInterface]\n[Product] <. [BuilderInterface] : creates\n[Product] <. [ConcreteBuilder] : creates\n[Director] --|> [Product] : uses"
code: true
---

The Builder pattern is a creational design pattern that lets you construct complex objects step-by-step. It allows customization of the object being built without making the construction process itself complex and unmanageable. The pattern separates the construction of a complex object from its representation, so the same construction process can create different representations.

This pattern is useful when an object has multiple optional attributes, or when the construction process is complex and involves many steps. It addresses the problems that can arise when using traditional constructors to create complex objects, particularly telescoping constructors and the need for a separate object for configuration.  It promotes code reusability and maintainability by encapsulating the construction logic.

## Usage

The Builder pattern is commonly used where:

*   **Complex Object Creation:** When constructing an object requires a sequence of steps and depends on various configuration options.
*   **Varied Representations:** When you need to create different versions or types of an object using the same construction process.
*   **Avoiding Constructor Complexity:** To avoid long and complicated constructors with numerous parameters.
*   **Immutable Objects:** When you want to construct immutable objects, as the builder can assemble the object's parts before final creation.

## Examples

1.  **Java's StringBuilder:** The `StringBuilder` class in Java effectively implements the Builder pattern.  You don't construct a final string directly; instead, you use methods like `append()`, `insert()`, and `delete()` to build up the string incrementally.  Finally, `toString()` creates the immutable `String` object. This avoids the inefficiencies of repeatedly creating new `String` objects during modification.

2.  **Python's `datetime` module:** Constructing a `datetime` object in Python can be done directly with `datetime(year, month, day, hour, minute, second)`. However, the `datetime.datetime` class also provides a builder-like interface through its various class methods (e.g., `datetime.now()`, `datetime.fromtimestamp()`). These methods allow you to create `datetime` objects with specific levels of detail, customizing the initialization process.

3. **Lombok `@Builder` Annotation (Java):** The Lombok library provides the `@Builder` annotation which generates a builder class for you automatically. This simplifies the use of the Builder pattern substantially and is seen in many Spring Boot projects where complex DTOs are used.
