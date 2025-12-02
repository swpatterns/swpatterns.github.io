
---
title: Aggregate Root
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["DDD", "behavioral"]
wikipedia: "https://en.wikipedia.org/wiki/Domain-Driven_Design"
diagramtype: "class"
diagram: "[AggregateRoot] -- 1..* [AggregateMember] : contains\n[ExternalObject] -- 1 [AggregateRoot] : referenced"
code: true
---

The Aggregate Root pattern is a core concept in Domain-Driven Design (DDD) used to define transactional consistency boundaries. It designates a specific entity within a cluster of associated objects (the aggregate) as the single point of access for modifying the aggregate’s state.  This root is responsible for ensuring that all invariants within the aggregate are maintained.

Aggregates model consistency boundaries.  Instead of individual persistence of each entity within the aggregate, the aggregate root handles the persistence of the entire aggregate, preserving its internal relationships and rules. This reduces complexity and prevents inconsistencies that could arise from separate updates.  Clients should only hold references to the Aggregate Root, not to individual members.

## Usage

The Aggregate Root pattern is commonly used in:

*   **E-commerce systems:** An `Order` might be an aggregate root containing `OrderItem`s and `ShippingAddress` as members. All changes to the order (adding items, changing address, etc.) would be done through the `Order` object.
*   **Banking applications:** An `Account` could be an aggregate root with `Transaction`s as members.  Deposits, withdrawals, and transfers would be handled by the `Account` including ensuring sufficient funds.
*   **Inventory management:** A `Product` might be an aggregate root containing details such as `StockLevel` or related `Attributes`. Modifying product information would go through the `Product` root.
*   **Any complex domain model:** Whenever a set of entities are logically related and need to be treated as a single unit for data consistency.

## Examples

1.  **Java Persistence API (JPA) with DDD:** In a JPA implementation using DDD principles, a domain object like `Customer` could be the aggregate root. Related entities such as `Address` and `ContactDetails` would be aggregate members. Using `@Entity` annotation on the `Customer` and not on `Address` nor `ContactDetails` (mapping them as embedded objects) enforces the boundary. All changes to the address or contact details would be made through methods on the `Customer` object.

2.  **Microsoft Entity Framework Core with DDD:** Similar to JPA, Entity Framework Core can be used to implement the Aggregate Root pattern. A `ShoppingCart` class, annotated with `[Entity]`, could serve as the aggregate root containing member classes like `ShoppingCartItem`. The framework would then treat the `ShoppingCart` as a single unit of persistence, preventing direct changes to the items without going through the root. This is commonly seen in e-commerce backends built using EF Core and DDD.

3.  **Rails Active Record with form objects:** Although active record isn’t strictly enacting DDD, the idea of insulating a complex model with modifications only applying via a form object acts as a simple Aggregate Root. For example, a `User` model might consider an `Address` to be part of its aggregate. Updates to addresses would be funnelled through a `ChangeAddressForm` object and ultimately applied to the `User` record with the `Address` data integrated.
