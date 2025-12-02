
---
title: Unit of Work
date: 2024-02-29T10:35:00Z
draft: false
pattern_types: ["behavioral", "DDD"]
wikipedia: https://en.wikipedia.org/wiki/Unit_of_work
diagramtype: "class"
diagram: "[UnitOfWork] --|> [Repository] : uses\n[Repository] --|> [Entity] : manages\n[Entity] -- [Changes]\n[UnitOfWork] ..> [Changes] : tracks"
code: true
---

The Unit of Work pattern is a mechanism to manage a sequence of operations against a data store as a single logical unit. It encapsulates all changes made to persistent objects within a single transaction, ensuring that either all changes are applied successfully, or none are. This is crucial for maintaining data consistency, especially in complex business scenarios involving multiple entities.

This pattern is particularly useful in Domain-Driven Design (DDD) where it helps to maintain the integrity of the domain model. It abstracts the complexities of the underlying data access technology, allowing the domain logic to focus on business rules rather than transaction management. It provides a clear separation between the domain and data access concerns.

## Usage

The Unit of Work pattern is commonly used in:

*   **Database-driven applications:**  Ensuring atomic operations across multiple tables.
*   **Object-Relational Mapping (ORM) frameworks:** Many ORMs (like Hibernate, Entity Framework) internally implement a Unit of Work to track changes and manage transactions.
*   **Applications with complex business rules:**  Guaranteeing that a set of operations representing a business transaction is completed entirely or rolled back in case of failure.
*   **Microservices:** Coordinating data changes across multiple services while preserving eventual consistency.

## Examples

*   **Hibernate (Java ORM):** Hibernate's `Session` object acts as a Unit of Work.  All state changes to managed entities within a `Session` are tracked and only persisted when `session.commit()` is called. If an exception occurs before commit, `session.rollback()` is executed, discarding all changes. This ensures consistency even with complex entity relationships.

*   **Entity Framework (C# ORM):** In Entity Framework, the `DbContext` represents the Unit of Work. Changes to entities tracked by the `DbContext` are not immediately written to the database. Instead, they are accumulated and applied in a single transaction when `SaveChanges()` is called.  Entity Framework provides mechanisms for handling concurrent changes and rollback scenarios within the context of the Unit of Work.

*   **Symfony Doctrine (PHP Framework):**  Symfony uses Doctrine ORM and its `EntityManager` as the Unit of Work. All changes performed on entities managed by the `EntityManager` are tracked, and the  `$entityManager->flush()` method commits those changes, or a rollback can be triggered if necessary.
