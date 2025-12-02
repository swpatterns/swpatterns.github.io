
---
title: Bounded Context
date: 2023-10-27T10:30:00Z
draft: false
pattern_types: ["DDD", "strategic"]
wikipedia: https://en.wikipedia.org/wiki/Bounded_context
diagramtype: "class"
diagram: "[BoundedContext] --|> [Entity] : owns\n[BoundedContext] --|> [ValueObject] : uses\n[BoundedContext] --|> [Aggregate] : organizes\n[BoundedContext] ..> [ExternalSystem] : interacts with\n[note: A single system may contain multiple Bounded Contexts {bg:lightyellow}]"
code: true
---

A Bounded Context is a central concept in Domain-Driven Design. It defines an explicit boundary within which a particular domain model applies. Within a Bounded Context, a specific set of terms and concepts have a precise and consistent meaning. Outside that boundary, those terms may have different meanings, or be irrelevant altogether. This is crucial for managing complexity in large systems.

The purpose of a Bounded Context is to compartmentalize different aspects of a business domain, preventing the model from becoming a monolithic, unmanageable mess. It enables teams to work independently on different parts of the system without constantly colliding over terminology or logic. Each Bounded Context can have its own unique language (Ubiquitous Language), data schemas, and business rules, all tailored to its specific domain responsibilities.

## Usage

Bounded Contexts are extremely helpful in situations like:

*   **Microservices Architecture:** Each microservice often represents a single Bounded Context, encapsulating a specific business capability.
*   **Large Monolithic Applications:** Breaking down a large monolith into Bounded Contexts can help to modularize the codebase, making it easier to understand and maintain.
*   **System Integration:** When integrating different systems, identifying their Bounded Contexts helps define clear integration boundaries and data transformation rules.
*   **Complex Business Domains:**  Any domain with multiple subdomains or areas of responsibility benefits from the explicit delineation that Bounded Contexts provide.

## Examples

*   **E-commerce Platform:** An e-commerce site can be divided into Bounded Contexts such as "Catalog," "Order Management," "Payment," and "Shipping." The concept of "Product" has a different meaning and properties in each context. In the Catalog, it's about descriptions and images. In Order Management, it's about quantities and prices.
*   **Healthcare System:** A healthcare system might have Bounded Contexts for "Patient Records," "Appointment Scheduling," "Billing," and "Pharmacy." “Medication” signifies different data and processes in the Pharmacy versus Patient Records contexts. The Pharmacy context focuses on dosage and inventory while Patient Records focuses on allergies and history.



