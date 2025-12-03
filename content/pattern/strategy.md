---
title: Strategy
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "design patterns"]
wikipedia: https://en.wikipedia.org/wiki/Strategy_pattern_(computer_programming)
diagramtype: "class"
diagram: "[Client] -- 'uses' --> [Context]\n[Context] -- 'holds a reference to' --> [Strategy]\n[Strategy] <|-- [ConcreteStrategyA]\n[Strategy] <|-- [ConcreteStrategyB]\n[ConcreteStrategyA] ..> 'Implements Algorithm A'\n[ConcreteStrategyB] ..> 'Implements Algorithm B'"
code: true
---

The Strategy pattern defines a family of algorithms, encapsulates each one, and makes them interchangeable. It allows the algorithm to vary independently from the clients that use it. This pattern avoids conditional complexity and promotes code reusability by defining a consistent interface for various algorithms.

This is particularly useful when you have multiple ways to accomplish a task, and you want to be able to select the appropriate algorithm at runtime, or when you need to be able to switch between algorithms easily.  It promotes loose coupling between the client and the algorithm’s implementation.

## Usage

The Strategy pattern is common in scenarios where you need flexible algorithms. Some examples include:

*   **Payment Processing:** Different payment methods (credit card, PayPal, bank transfer) can be implemented as separate strategies, allowing a shopping cart to support multiple payment options.
*   **Sorting Algorithms:**  A sorting class can accept different sorting strategies (bubble sort, quicksort, merge sort) to sort data in various ways.
*   **Compression Algorithms:**  A file archiver can use different compression algorithms (ZIP, GZIP, BZIP2) based on user preference or file type.
*   **Validation Rules:** Applying different validation rules to input data, such as email format, password strength, or data type.

## Examples

1.  **Java 8 Streams API:** The `Comparator` interface in Java 8's Streams API exemplifies the Strategy pattern. You can define different comparison strategies (e.g., comparing by name, by age, by date) and pass them to the `sorted()` method of a stream. The stream processing logic remains the same, but the sorting behavior changes based on the chosen comparator.

2.  **Spring Data JPA:** Spring Data JPA allows customizing query derivation by providing different `JpaEntityMappings` or implementing your own `QuerydslPredicateExecutor`. Each strategy determines how Spring Data JPA translates method names into database queries.  This allows developers to tailor query creation without affecting core Spring Data functionalities.

3.  **Log4j 2:** Log4j 2 uses strategies for different aspects of logging. For example, the `Layout` interface defines a strategy for formatting log messages, allowing you to choose between plain text, JSON, XML, or other formats. Similarly, different `Filter` implementations act as strategies to determine which log messages are processed.
