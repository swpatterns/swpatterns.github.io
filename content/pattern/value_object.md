---
title: "Value Object"
date: 2024-02-29T10:31:00Z
draft: false
pattern_types: ["DDD", "behavioral"]
wikipedia: "https://en.wikipedia.org/wiki/Value-based_design"
diagramtype: "class"
diagram: "[ValueObject] -- has attributes --> [Attribute1: Type]
[ValueObject] -- has attributes --> [Attribute2: Type]
[ValueObject] ..> [ImmutableInterface: Interface] : implements"
code: true
---

A Value Object is an object that describes some characteristic of a Domain, but has no concept of identity. Instead of being defined by its unique position in memory (like an Entity), it is defined by the values it *holds*. Two Value Objects with the same values are considered equal, and are interchangeable. They are typically immutable – once created, their values cannot be changed.

Value Objects are important for ensuring data consistency and simplifying logic within a domain model. Operations that might modify a Value Object instead return a new instance with the modified values. This immutability helps prevent unintended side effects and makes reasoning about the code easier. They are frequently used to represent things like dates, currency amounts, addresses, or color, where the semantic meaning lies in the value itself, not in 'who owns' it or a unique ID.

## Usage

The Value Object pattern is commonly used in:

*   **Domain-Driven Design (DDD):** Representing domain concepts like quantities, measurements, or specifications.
*   **Functional Programming:**  Where immutability is a core principle. Value Objects fit naturally into this paradigm.
*   **Data Validation:**  Encapsulating validation logic within the Value Object itself ensures data integrity.
*   **Representing Simple Data Structures:**  When you need to group related data elements together, but don’t require a unique identity for the group.

## Examples

1.  **Java - `java.time.LocalDate`:**  The `LocalDate` class in Java's `java.time` package is a prime example of a Value Object. It represents a date (year, month, day) without any inherent identity. Two `LocalDate` instances representing the same date are considered equal and can be used interchangeably. It's also immutable; methods that appear to modify the date actually return *new* `LocalDate` instances.

2.  **JavaScript - `lodash.cloneDeep` with Immutable Data:** Although JavaScript doesn’t have built-in immutability, libraries like Immutable.js or using `lodash.cloneDeep` to create copies can effectively implement value objects. Consider representing an address as a JavaScript object:

javascript
const address = {
  street: "123 Main St",
  city: "Anytown",
  zipCode: "12345"
};

// Creating a "new" address involving a change to the city
const newAddress = { ...address, city: "Newtown" };


Here, `address` and `newAddress` are distinct objects with potentially identical content but both are new instances. This approach is effective for representing values that should not be modified in place. The `...address` syntax in Javascript uses the spread operator to create a shallow copy, but for nested objects, leveraging libraries like `lodash.cloneDeep` to ensure deep immutability is crucial for reliable value object behavior.