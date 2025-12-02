---
title: Immutable Object
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["creational", "best practice"]
wikipedia: https://en.wikipedia.org/wiki/Immutable_object
diagramtype: "class"
diagram: "[Client]--[ImmutableObject] : uses\n[ImmutableObject] : +getValue()\n[ImmutableObject] : +setData(data: Data) : new instance"
code: true
---

An Immutable Object is an object whose state cannot be modified after it is created.  Any operation that appears to modify the object actually returns a new object with the desired changes, leaving the original object untouched. This is achieved by making all of the object's fields final (or equivalent) and avoiding methods that can alter its internal state.

Immutability offers several benefits, including thread safety, simplified reasoning about code, and easier caching. Because the object's state is constant, it eliminates the need for synchronization mechanisms in concurrent environments. It also makes debugging easier, as you can be confident that an object's value will not change unexpectedly.

## Usage

The Immutable Object pattern is widely used in scenarios where data integrity and thread safety are paramount. Common use cases include:

*   **Value Objects:** Representing concepts like currency, dates, or coordinates where the value itself is the primary concern and modification is not allowed.
*   **Concurrency:**  In multi-threaded applications, immutable objects can be safely shared between threads without the need for locks or other synchronization primitives.
*   **Caching:** Immutable objects are ideal for caching, as their values will never change, eliminating cache invalidation concerns.
*   **Event Handling:**  Events can be represented as immutable objects, ensuring that event data remains consistent throughout the system.
*   **Functional Programming:** Immutability is a core principle of functional programming, promoting pure functions and predictable behavior.

## Examples

1.  **Java `String`:** The Java `String` class is a classic example of an immutable object.  Any string manipulation operation (e.g., concatenation, substring) creates a *new* `String` object instead of modifying the original. This ensures that strings are thread-safe and predictable.

2.  **React Props:** In React, `props` are used to pass data to components.  React strongly encourages treating props as immutable. Components should never modify their props directly. Instead, if a component needs to change the data, it should request a new set of props from its parent component. This immutability is crucial for React's efficient rendering and state management.

3.  **Kotlin Data Classes with `val`:** Kotlin data classes, when declared with `val` properties (read-only), automatically become immutable. This provides a concise way to create immutable data structures with built-in methods for equality, copying, and string representation.

4.  **JavaScript `Object.freeze()`:** While JavaScript objects are mutable by default, `Object.freeze()` can be used to make an object immutable. This prevents new properties from being added, existing properties from being removed, and the values of existing properties from being changed.  It's a shallow freeze, meaning nested objects are still mutable unless frozen individually.