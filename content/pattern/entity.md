
---
title: Entity
date: 2023-10-27T14:35:00-00:00
draft: false
pattern_types: ["DDD", "foundational"]
wikipedia: https://en.wikipedia.org/wiki/Entity_(object-oriented_programming)
diagramtype: "class"
diagram: "[Entity]--* [Attribute] : has >\n[Entity]--* [Value Object] : owns >\n[Entity]--* [Behavior] : implements >"
code: true
---

The Entity pattern represents a real-world object with a distinct identity that persists over time.  Entities are defined by their attributes and behaviors, but crucially, they are distinguished from Value Objects by having a unique identifier (ID) that remains constant even if their attributes change. This identity allows for tracking changes and maintaining consistency within a domain model.

Entities are fundamental in Domain-Driven Design (DDD) and are commonly used in systems where object persistence and tracking are important. They are particularly useful in scenarios involving business rules, data validation, and auditing, as the identity allows for associating history and constraints with specific objects.  They are also core to object-relational mapping (ORM) frameworks.

## Usage

*   **Database Modeling:** Representing records in a database table.  Each entity corresponds to a row, and its ID corresponds to the primary key.
*   **Business Domain Logic:** Modeling core business concepts (e.g., Customer, Product, Order) with unique identities and behaviors relevant to the business.
*   **Event Sourcing:** Entities are used as the state foundation that is changed by events, where their IDs are critical for reconstructing the history.
*   **Microservices:** Consistent identification of business objects across service boundaries.

## Examples

*   **Java Persistence API (JPA) / Hibernate:** In JPA and Hibernate, every persistent class is treated as an entity. The `@Entity` annotation marks a class as being mapped to a database table.  Each entity has an `@Id` field which functions as primary key, marking it as identifiable even though other attributes change.
*   **Django ORM:** Django's models are directly mapped to database tables, acting as entities. Each model has a primary key (typically an auto-incrementing integer field) that uniquely identifies each instance, even when it's updated.
*   **Ruby on Rails ActiveRecord:** ActiveRecord models are a direct implementation of the Entity pattern, where each model instance represents a record in a database table and uses a primary key for identification.
