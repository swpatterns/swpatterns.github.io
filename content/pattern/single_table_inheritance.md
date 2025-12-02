---
title: Single Table Inheritance
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "ORM", "DDD"]
wikipedia: https://en.wikipedia.org/wiki/Single_table_inheritance
diagramtype: "class"
diagram: "[Base Class]--|> [Derived Class 1]\n[Base Class]--|> [Derived Class 2]\n[Base Class] : attribute1\n[Base Class] : attribute2\n[Derived Class 1] : attribute3\n[Derived Class 2] : attribute4\n[note: All attributes are stored in a single table {bg:lightgreen}]"
code: true
---

Single Table Inheritance is a strategy for representing a class hierarchy in a relational database using only one table for all classes in the hierarchy.  A “type” column (or discriminator) is added to the table to indicate the specific class of each record. This approach simplifies querying and joins compared to other inheritance mapping strategies, but can lead to a table with many nullable columns if the subclasses have significantly different attributes.

## Usage

This pattern is commonly used when:

*   The class hierarchy is relatively small and doesn't have deep nesting.
*   Performance is critical, and avoiding joins is a priority.
*   The subclasses don't have a large number of unique attributes.
*   You want a simple database schema.
*   When using Object-Relational Mappers (ORMs) like SQLAlchemy or Django ORM, it's a straightforward way to map inheritance.

## Examples

1.  **Django ORM:** Django's ORM supports Single Table Inheritance (STI) through its model inheritance feature.  A base model defines common fields, and then child models inherit from it, adding their specific fields. Django automatically manages the type/discriminator column and maps records to the appropriate model class.

2.  **SQLAlchemy:** SQLAlchemy's `single_table_inheritance` option in the `__mapper_args__` of a base class allows you to map a class hierarchy to a single table.  Similar to Django, a discriminator column is used to identify the class of each row.  This is often used when integrating with existing database schemas or when a simple mapping is desired.

3.  **Payment Systems:** Consider a system for processing payments. You might have a base `Payment` class with attributes like `amount` and `date`. Subclasses could be `CreditCardPayment` (with `card_number`, `expiry_date`) and `PayPalPayment` (with `paypal_transaction_id`). Using STI, all these attributes would reside in a single `payments` table, with a `payment_type` column indicating which type of payment each row represents.