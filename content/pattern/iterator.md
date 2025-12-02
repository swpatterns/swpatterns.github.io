
---
title: Iterator
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "design patterns"]
wikipedia: https://en.wikipedia.org/wiki/Iterator_pattern
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    participant Client
    participant ConcreteIterator
    participant ConcreteCollection

    Client->>ConcreteIterator: requestNext()
    activate ConcreteIterator
    ConcreteIterator->>ConcreteCollection: getNext()
    activate ConcreteCollection
    ConcreteCollection-->>ConcreteIterator: item
    deactivate ConcreteCollection
    ConcreteIterator-->>Client: item
    deactivate ConcreteIterator

code: true
---

The Iterator pattern is a behavioral design pattern that provides a way to access the elements of an aggregate object (like a list, set, or tree) sequentially without exposing its underlying representation. It defines a standard interface for creating iterators, allowing clients to traverse and manipulate elements without knowing how the aggregate is organized.

This pattern decouples the algorithms for traversing a collection from the collection itself.  It promotes loose coupling between the collection and the code that uses it, making the collection more flexible and easier to maintain.  Iterators also allow for multiple traversals of the same collection concurrently.

## Usage

The Iterator pattern is commonly used in scenarios where:

*   You need to provide a way to access the elements of a collection without exposing its internal structure.
*   You want to support multiple traversal modes for a collection (e.g., forward, backward, skipping elements).
*   You need to iterate over complex data structures like trees or graphs.
*   You want to allow clients to iterate over a collection while it is being modified (with appropriate synchronization).

## Examples

1.  **Java Collections Framework:** The `java.util.Iterator` interface and its implementations (e.g., `ListIterator`, `Iterator<E>` for various collection types like `ArrayList`, `LinkedList`, `HashSet`) are a prime example.  You can iterate over these collections using a `for-each` loop, which internally utilizes the iterator pattern.

2.  **Python Generators:** Python's generators, created using the `yield` keyword, effectively implement the iterator pattern.  A generator function returns an iterator object that produces values on demand, rather than storing the entire sequence in memory. This is particularly useful for large datasets.

3.  **C++ Standard Template Library (STL):**  C++ provides iterators as a core part of its STL. Different container types (e.g., `vector`, `list`, `map`) have their own iterator classes, allowing you to traverse their elements in a generic way.  Iterators in C++ are more powerful than in Java, supporting various operations like increment, decrement, dereferencing, and comparison.
