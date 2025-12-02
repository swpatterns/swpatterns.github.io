
---
title: Onion Architecture
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["architectural", "DDD"]
wikipedia: https://en.wikipedia.org/wiki/Onion_architecture
diagramtype: "class"
diagram: "[Core] --|> [Domain]
[Domain] --|> [Infrastructure]
[Application] --|> [Core]
[Presentation] --|> [Application]
[External Agencies] --|> [Presentation]
[note: Layers represent dependencies. Inner layers know nothing of outer layers. {bg:lightgreen}]"
code: true
---

Onion Architecture is a software design pattern that advocates for separating concerns into distinct layers, with the core business logic residing at the very center. This central core is independent of any external concerns like databases, UI frameworks, or external services.  Layers represent different levels of abstraction, and dependencies point *inward* – outer layers depend on inner layers, but inner layers have no knowledge of outer layers.

This architecture promotes testability, maintainability, and flexibility. By isolating the domain logic, changes to infrastructure or presentation layers don't impact the core functionality. It's particularly useful in complex applications where business rules are expected to evolve independently of the technology stack.

## Usage

Onion Architecture is commonly used in:

*   **Enterprise Applications:** Where complex business rules and long-term maintainability are crucial.
*   **Microservices:** To ensure each service has a well-defined core and can be adapted to different technologies without affecting other services.
*   **Domain-Driven Design (DDD) Projects:** It provides a natural structure for implementing DDD principles, keeping the domain model pure and independent.
*   **Applications requiring high testability:** The decoupled nature of the layers makes unit testing much easier.

## Examples

*   **Hexagonal Architecture (Ports and Adapters):** Often considered a close relative, Hexagonal Architecture shares the same core principles of dependency inversion and isolating the domain. Many .NET projects utilizing DDD adopt a variation of Onion Architecture, sometimes referred to as "Clean Architecture" which is heavily influenced by Robert C. Martin's work and builds upon the Onion Architecture principles.
*   **ASP.NET Core with MediatR:** A typical implementation involves a Core layer containing entities and interfaces, a Domain layer with business logic, an Application layer using MediatR for commands and queries, and an Infrastructure layer for database access and external service integrations. The Presentation layer (e.g., an ASP.NET Core API) then interacts with the Application layer.
