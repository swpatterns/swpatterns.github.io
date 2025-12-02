
---
title: "Identity Map"
date: 2023-10-27T10:30:00Z
draft: false
pattern_types: ["behavioral", "data access"]
wikipedia: "https://en.wikipedia.org/wiki/Identity_map"
diagramtype: "class"
diagram: "[Client]--[IdentityMap: Map] : uses\n[IdentityMap: Map]--[Database: Data] : retrieves\n[IdentityMap: Map]--[Entity: Object] : stores"
code: true
---

The Identity Map pattern ensures that each object has a unique representation in memory. It maintains a registry of objects already loaded from the database, and when an object is requested, the map checks if it already exists before retrieving it from the persistence store. This reduces memory consumption and improves performance by avoiding redundant database queries and object creation.

This pattern is particularly useful in object-relational mapping (ORM) frameworks and complex data modeling scenarios. It's common in applications dealing with a large number of interconnected entities where maintaining object identity is crucial for consistency and efficiency.  By guaranteeing a single instance per database record, it simplifies object comparisons and prevents unexpected behavior due to duplicate data in memory.

## Usage

*   **Object-Relational Mapping (ORM):** Frameworks like Hibernate and Entity Framework heavily utilize Identity Maps to manage the persistence and retrieval of domain objects, ensuring consistency between in-memory state and the database.
*   **Caching:** As a form of object-level caching, it reduces database load and improves application response times.
*   **Large Data Sets:** When dealing with a large graph of related objects, the Identity Map prevents memory explosion from creating multiple copies of the same object.
*   **Distributed Systems:**  Can be adapted to work with distributed caches to provide consistent object identification across different application instances.

## Examples

*   **Hibernate (Java):**  Hibernate’s first-level cache acts as an Identity Map. When a user requests an entity, Hibernate first checks if it's already present in the session's Identity Map. If so, it retrieves the existing instance; otherwise, it loads it from the database and stores it in the map.

*   **Doctrine ORM (PHP):** Doctrine's Unit of Work and Identity Map work together to track changes to entities.  The Identity Map establishes whether a given database identifier corresponds to an object that it's already managing in memory. If it is, the existing object is used; if not, a new object will be created and added to the map.
