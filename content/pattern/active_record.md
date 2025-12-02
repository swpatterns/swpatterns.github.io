---
title: Active Record
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["creational", "DDD"]
wikipedia: https://en.wikipedia.org/wiki/Active_record
diagramtype: "class"
diagram: "[Client] --|> [ActiveRecord] : uses\n[ActiveRecord] --|> [Database] : persists\n[ActiveRecord] <|-- [User]\n[ActiveRecord] <|-- [Product]"
code: true
---

The Active Record pattern is a design pattern where objects representing data, typically database records, carry both data and the logic to interact with the database.  Instead of having a separate object to manage database access (like a Data Access Object), the Active Record object itself is responsible for reading and writing its own data.

This pattern effectively encapsulates database interactions within the domain model, making the code more object-oriented and potentially reducing boilerplate. It simplifies data access by providing methods directly on the object to perform database operations like saving, updating, deleting, and querying.

## Usage

The Active Record pattern is commonly used in:

*   **Object-Relational Mapping (ORM) frameworks:**  It’s the foundation of many ORMs like Ruby on Rails’ ActiveRecord, Django’s models, and SQLAlchemy.
*   **Data-driven applications:**  Any application where the primary focus is managing data stored in a relational database benefits from this pattern.
*   **Simplifying database interactions:** When you want to minimize the complexity of database access and prefer a more object-centric approach to data management.
*   **Rapid development:** The built-in database functionality accelerates development by reducing the custom code needed for simple CRUD operations.

## Examples

*   **Ruby on Rails ActiveRecord:**  In Rails, every model class inherits from `ActiveRecord::Base`. You define database tables with migrations, and then create Ruby classes that correspond to those tables.  Instances of these classes represent rows in the table and have methods like `save`, `update`, `destroy`, and `find` to interact with the database.  For example, a `User` class would automatically have methods to fetch, create, update, and delete user records.

*   **Django ORM:** Django's ORM utilizes the Active Record pattern through its `models.py` files.  Each Python class defining a model (representing a database table) automatically gains database interaction abilities. You define fields that map to database columns, and Django provides methods to query and manipulate the data, such as `save()`, `objects.get()`, and `objects.filter()`. A `Product` model inherits these capabilities.

*   **SQLAlchemy (Python):** While more flexible than rigid Active Record implementations, SQLAlchemy can be used in a way that approximates Active Record.  By defining classes that map to database tables and using `Session` objects to manage those classes, you can treat instances of these classes as directly responsible for their own persistence, akin to the Active Record approach.