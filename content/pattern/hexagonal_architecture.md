---
title: Hexagonal Architecture
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["architectural", "DDD"]
wikipedia: https://en.wikipedia.org/wiki/Hexagonal_architecture
diagramtype: "class"
diagram: "[Core] --|> [Domain Model]\n[Core] <|-- [Interface: Port]\n[Driving Adapters: CLI, UI, Web] --|> [Interface: Port]\n[Driven Adapters: Database, Message Queue, External API] --|> [Interface: Port]\n[Port] --|> [Core]\n[Core] ..> [Domain Events]"
code: true
---

The Hexagonal Architecture (also known as Ports and Adapters) is a software design pattern that aims to create loosely coupled software applications with a clear separation of concerns. The core business logic is kept independent of external technologies like databases, UI frameworks, or messaging systems. This is achieved by defining “ports” (interfaces) that represent interactions with the outside world and “adapters” that implement these ports for specific technologies.

Essentially, the application’s core doesn’t *know* about the external world; it only interacts through these well-defined ports. This makes the core logic highly testable, maintainable, and adaptable to changes in external dependencies. Adapters translate the core’s requests into the language of the external system and vice-versa. This pattern promotes testability by allowing you to easily mock or stub external dependencies during testing.

## Usage

Hexagonal Architecture is commonly used in:

*   **Complex Business Logic:** Applications with substantial domain logic benefit greatly from the clear separation of concerns.
*   **Microservices:**  The pattern’s focus on isolation aligns well with the microservices approach.
*   **Long-Lived Applications:**  Where requirements and external technologies are likely to evolve over time.
*   **Test-Driven Development:**  The clear interfaces facilitate easy unit and integration testing.
*   **Systems Requiring Flexibility:** When you anticipate needing to switch databases, UI frameworks, or integrate with various external systems.

## Examples

*   **Spring Boot (Java):** Spring’s dependency injection and interface-based programming naturally lend themselves to Hexagonal Architecture. You can define interfaces for repositories (ports) and then provide different implementations (adapters) for different databases (e.g., JPA, MongoDB).  Spring Data REST further simplifies creating APIs that interact with these ports.
*   **NestJS (Node.js):** NestJS, a progressive Node.js framework, encourages the use of modules and providers, which can be structured to implement the Ports and Adapters pattern.  Services define the core logic and interact with repositories (ports) through interfaces. Different database technologies can be plugged in as adapters to these repository interfaces.
*   **Laravel (PHP):** While not strictly enforced, Laravel's service container and interface-based contracts allow developers to implement Hexagonal Architecture.  Repositories can be defined as interfaces, and different database implementations can be bound to those interfaces.  Event dispatching can be used to represent domain events.