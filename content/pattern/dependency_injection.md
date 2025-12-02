
---
title: Dependency Injection
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["creational", "behavioral"]
wikipedia: "https://en.wikipedia.org/wiki/Dependency_injection"
diagramtype: "class"
diagram: "[Client] -- "depends on" --> [AbstractModule]\n[AbstractModule] -- "creates" --> [ConcreteDependency]\n[ConcreteDependency] -- "used by" --> [Client]"
code: true
---

Dependency Injection (DI) is a software design pattern that implements the Inversion of Control (IoC) principle for resolving dependencies. Instead of a component creating its dependencies, or directly looking them up, those dependencies are *injected* into the component. This promotes loose coupling, making the code more modular, reusable, and testable.  DI leads to more maintainable and flexible applications, as changes to one part of the system are less likely to cascade through other parts.

## Usage

Dependency Injection is a widely used pattern in modern software development. It's commonly employed in:

*   **Frameworks:** Many frameworks (like Spring, Angular, and .NET) have built-in DI containers to manage object dependencies.
*   **Testing:** DI makes unit testing easier by allowing you to inject mock dependencies, isolating the component under test.
*   **Large Applications:** For complex projects, DI helps manage the relationships between numerous components, improving overall structure and maintainability.
*   **Microservices:** Loosely coupled microservice architectures inherently benefit from dependency injection.

## Examples

1.  **Spring Framework (Java):** Spring’s core feature is its DI container. Developers define beans (objects) and their dependencies declaratively (through XML configuration or annotations like `@Autowired`). Spring then automatically resolves and injects these dependencies when it creates the beans. This makes application components highly configurable and testable.

2.  **Angular (TypeScript):** Angular uses a hierarchical dependency injection system. Components declare their dependencies in their constructors, and the Angular injector provides those dependencies.  Angular’s dependency injection simplifies development and promotes modularity, enhancing code reusability and maintainability. For example, an `HttpClient` service can be injected into any component that needs to make HTTP requests.



