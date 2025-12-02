---
title: Table Data Gateway
date: 2024-02-29T16:17:33-00:00
draft: false
pattern_types: ["creational", "data access"]
wikipedia: 
diagramtype: "class"
diagram:  mermaid
classDiagram
    class TableDataGateway {
        + select(query: string): List<Record>
        + insert(data: Map<string, Object>): void
        + update(data: Map<string, Object>, condition: string): void
        + delete(condition: string): void
    }
    class Record {
        + get(columnName: string): Object
        + set(columnName: string, value: Object): void
    }
    class DatabaseConnection {
        + execute(query: string): ResultSet
        + close(): void
    }
    TableDataGateway -- DatabaseConnection : uses
    TableDataGateway --> Record : creates
    DatabaseConnection -- ResultSet : returns
    [note: Represents interaction with a single table]

code: true
---

The Table Data Gateway pattern provides an interface to a database table that encapsulates the table’s structure and ensures data consistency. It isolates the database-specific access logic from the rest of the application, making it easier to switch databases or modify the data access layer without impacting the core business logic. Essentially, it’s a class that represents the table, providing methods for all standard CRUD (Create, Read, Update, Delete) operations.

This pattern is particularly useful when you want to abstract away the details of database interactions, providing a higher-level, object-oriented interface.  It’s beneficial in scenarios where you need to support multiple databases or when your data model evolves frequently, as it centralizes the mapping between the object model and the relational database schema. This makes refactoring the data access logic significantly easier.

## Usage

*   **Legacy Systems:** Often used to modernize older applications with tight database coupling.
*   **Data Portability:** Facilitates easier migration to different database systems by isolating database-specific code.
*   **Complex Data Access:** Simplifies data access when dealing with intricate relationships and transformations within a single table.
*   **Reporting and Data Analysis:** Provides a clean interface for generating reports and performing data analysis operations.

## Examples

1.  **Ruby on Rails ActiveRecord:** ActiveRecord in Ruby on Rails is a prime example. Each model class represents a database table, and methods like `find`, `create`, `update`, and `destroy` are implemented by the ActiveRecord layer, acting as a Table Data Gateway. The developer interacts with the model objects, and ActiveRecord handles the translation to SQL and database interaction.

2.  **Django ORM:** In Python’s Django web framework, the Object-Relational Mapper (ORM) provides a similar functionality. Each model corresponds to a database table, and the ORM’s methods (e.g., `get()`, `create()`, `save()`, `delete()`) encapsulate the database access logic, allowing developers to work with Python objects instead of raw SQL queries.  This simplifies data interaction and ensures database consistency.