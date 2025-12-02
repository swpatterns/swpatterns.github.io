
---
title: Concrete Table Inheritance
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "object-relational"]
wikipedia: "https://en.wikipedia.org/wiki/Table_per_class_inheritance"
diagramtype: "class"
diagram: "[Vehicle] --|> [Car]\n[Vehicle] --|> [Truck]\n[Vehicle] --|> [Motorcycle]\n[note: Each concrete class has its own table]"
code: true
---

Concrete Table Inheritance is a strategy for implementing inheritance in a relational database where each class in the inheritance hierarchy has its own dedicated table.  Unlike Class Table Inheritance (Single Table Inheritance) or Shared Table Inheritance, this approach avoids storing all attributes in a single table and doesn't require joining tables to retrieve data. Each subclass table includes all attributes of the superclass, effectively duplicating the superclass's data across multiple tables.

This pattern is useful when subclasses have a significant number of unique attributes and the overhead of duplicating superclass attributes is acceptable. It simplifies queries for specific subclasses as no joins are needed. However, it can lead to data redundancy and makes changes to the superclass schema more complex, as they need to be propagated to all subclass tables.

## Usage

*   **Modeling distinct entities with varying attributes:** When dealing with entities that share common characteristics but have substantial differences in their data requirements, Concrete Table Inheritance provides a clear separation of concerns.
*   **Performance optimization for subclass-specific queries:** If queries primarily target individual subclasses, avoiding joins can improve performance.
*   **Legacy database integration:**  Sometimes, existing database schemas are structured in this way, and the pattern is used to map object-oriented models onto them.

## Examples

*   **Payment Systems:** Consider a payment system with `Payment` as the base class and subclasses like `CreditCardPayment`, `PayPalPayment`, and `BankTransferPayment`. Each payment type might have unique attributes (e.g., credit card number, PayPal transaction ID, bank account details). Concrete Table Inheritance would create separate tables for `Payments`, `CreditCardPayments`, `PayPalPayments`, and `BankTransferPayments`, each containing all necessary information for that specific payment type.

*   **E-commerce Product Catalog:** In an e-commerce system,  `Product` could be the base class with subclasses like `Book`, `ElectronicDevice`, and `ClothingItem`. Each subclass has attributes unique to its type (e.g., ISBN for books, wattage for electronic devices, size for clothing). Using Concrete Table Inheritance, you’d have `Product`, `Book`, `ElectronicDevice`, and `ClothingItem` tables, each with its relevant columns.
