
---
title: Class Table Inheritance
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "data modeling"]
wikipedia: "https://en.wikipedia.org/wiki/Class_table_inheritance"
diagramtype: "class"
diagram: "[BaseClass] --|> [ConcreteClass1] : inherits\n[BaseClass] --|> [ConcreteClass2] : inherits\n[BaseClass] |..o[DiscriminatorColumn] : 1\n[ConcreteClass1] |..o[SpecificColumn1] : 1\n[ConcreteClass2] |..o[SpecificColumn2] : 1"
code: true
---

Class Table Inheritance (CTI) is a database schema design pattern used to represent class hierarchies in a relational database.  Instead of creating a separate table for each class in the hierarchy, CTI uses a single table for the base class and all its subclasses.  The table contains columns for all attributes of all classes, with subclass-specific attributes being nullable for the base class instances. A discriminator column is used to identify the actual class of each row.

## Usage

CTI is useful when you have a relatively small and stable class hierarchy, and when the subclasses don't have many unique attributes. It simplifies queries that need to access common attributes across all classes in the hierarchy. It's often used in scenarios where performance is critical for retrieving base class data, and the overhead of joins is undesirable. However, it can lead to sparse tables with many null values and potential issues with data integrity if not carefully managed.

## Examples

1. **SQLAlchemy (Python ORM):** SQLAlchemy's `single_table_inheritance` feature implements CTI. You define a base class and subclasses, and SQLAlchemy automatically creates a single table with columns for all attributes, using a `__discriminator__` attribute to differentiate between instances of different classes.

2. **Hibernate (Java ORM):** Hibernate supports CTI through its inheritance mapping strategies.  You can map a class hierarchy to a single table using the `@Inheritance(strategy = InheritanceType.SINGLE_TABLE)` annotation.  A discriminator column is then used to identify the concrete class of each row.

3. **Database Schema for a Payment System:** Consider a base class `Payment` with attributes like `payment_id`, `amount`, and `payment_date`. Subclasses could be `CreditCardPayment` (with `card_number`, `expiry_date`) and `PayPalPayment` (with `paypal_transaction_id`). CTI would represent all these in a single `Payments` table with columns for all attributes, and a `payment_type` column to indicate whether a row represents a `CreditCardPayment` or a `PayPalPayment`.
