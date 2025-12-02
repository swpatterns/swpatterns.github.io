
---
title: Specification
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "DDD"]
wikipedia: https://en.wikipedia.org/wiki/Specification_pattern
diagramtype: "class"
diagram: "[Client] ---> [Originator] : uses\n[Originator] ---> [Specification] : satisfies?\n[Specification] <|-- [ConcreteSpecificationA] : extends\n[Specification] <|-- [ConcreteSpecificationB] : extends\n[ConcreteSpecificationA] ..> [AndSpecification] : combines\n[ConcreteSpecificationB] ..> [AndSpecification] : combines\n[AndSpecification] --* [Specification] : contains"
code: true
---

The Specification pattern encapsulates business rules in objects, allowing for dynamic combinations and reuse. It’s a way to separate complex logic concerning data from the objects that hold that data. This enables you to define a variety of rules, combine them, and then apply these rules to objects without directly embedding the logic within the object itself.

This pattern is particularly useful in applications with complex validation or filtering requirements. It allows for greater flexibility and maintainability, as rules can be added, modified, or combined without altering the core classes.  It's a core pattern in Domain-Driven Design for enriching model objects with behavior and logic.

## Usage

The Specification pattern is commonly used in:

* **Data Validation:** Defining rules for acceptable data formats, ranges, or dependencies. For example, ensuring an email address is valid or a password meets complexity requirements.
* **Business Rules Engines:**  Implementing complex decision-making logic based on various criteria.
* **Querying and Filtering:** Constructing dynamic queries to retrieve data based on specific conditions.  This is common in ORM frameworks and data access layers.
* **Access Control:** Determining whether a user has permission to perform a certain action based on their role and the resource they are trying to access.

## Examples

1. **Hibernate (Java ORM):** Hibernate utilizes Specifications as part of its Criteria API. Users define criteria by creating `Predicate` objects representing constraints on entity properties. These predicates can be combined using logical operators like `AND` and `OR` to form complex queries.  The `Criteria` object essentially *is* a Specification, defining the conditions for data retrieval.

2. **Doctrine (PHP ORM):** Similar to Hibernate, Doctrine allows building queries using a `Where` clause which essentially models a Specification.  You can define conditions on entity attributes and combine them using logical operators, enabling flexible filtering of results.  The `QueryBuilder`'s `where()` method accepts specifications, dynamically building up the query.
