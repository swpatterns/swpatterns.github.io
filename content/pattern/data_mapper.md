---
title: "Data Mapper"
date: 2024-02-29T14:52:56-00:00
draft: false
pattern_types: ["behavioral", "ORM"]
wikipedia: "https://en.wikipedia.org/wiki/Data_mapper_pattern"
diagramtype: "class"
diagram: "[DomainObject] --|> [RowData] : maps to\n[DataMapper] -- DomainObject : maps to/from\n[DataMapper] --|> [Database] : uses\n[Database] -- RowData : stores"
code: true
---

The Data Mapper pattern addresses the impedance mismatch between an object-oriented domain model and a relational database. It acts as a mediator, transferring data between these two representations without exposing the database structure to the domain layer. This separation allows the domain model to evolve independently of the data storage mechanism.

Essentially, the Data Mapper provides an interface for mapping domain objects to and from a data source (like a database table).  It encapsulates the data access logic, shielding the domain model from database-specific details like SQL queries and data types. This promotes loose coupling, testability, and flexibility in the application's architecture.

## Usage

The Data Mapper pattern is commonly used in applications where:

*   **Persistence is required:**  Data needs to be stored and retrieved from a database or other persistent storage.
*   **Domain model complexity is high:** A rich domain model with complex relationships exists, and directly mapping it to a relational database would be cumbersome.
*   **Database independence is desired:** The application needs to be able to switch between different database systems without significant code changes in the domain layer.
*   **Testability is crucial:**  The ability to easily mock or stub the data access layer for unit testing is important.
*   **ORM frameworks are not sufficient:** When the level of control needed over data access exceeds what a typical ORM provides.

## Examples

1.  **Ruby on Rails ActiveRecord:** While ActiveRecord is often considered an ORM, it fundamentally implements the Data Mapper pattern.  Each model class (e.g., `User`) is a domain object, and ActiveRecord provides methods to map these objects to and from database rows in the `users` table.  The `find()`, `create()`, `update()`, and `destroy()` methods are all part of the Data Mapper's functionality.

2.  **Doctrine ORM (PHP):** Doctrine is a more explicit implementation of the Data Mapper pattern than ActiveRecord.  It requires defining entity classes (domain objects) and mapping them to database tables using metadata (annotations, YAML, or XML).  The Data Mapper logic is handled by the `EntityManager`, which is responsible for persisting and retrieving entities.  Doctrine allows for more fine-grained control over the mapping process and supports complex database schemas.

3.  **Dapper (C#):** Dapper is a micro-ORM that provides a simple way to map database query results to C# objects. It doesn't have the full feature set of larger ORMs like Entity Framework, but it effectively acts as a Data Mapper by handling the translation between relational data and object graphs.  Developers write the SQL queries, and Dapper handles the mapping.