---
title: Fluent Interface
date: 2024-01-27T13:32:15-00:00
draft: false
pattern_types: ["behavioral", "idiomatic"]
wikipedia: https://en.wikipedia.org/wiki/Fluent_interface
diagramtype: "class"
diagram: "[Builder] --|> [Object]\n[Object] : +method1()\n[Object] : +method2()\n[Builder] : -obj: Object\n[Builder] : +method1(): Builder\n[Builder] : +method2(): Builder\n[Builder] : +build(): Object"
code: true
---

The Fluent Interface pattern enables the creation of readable and maintainable code by allowing method calls to be chained together. It achieves this by making methods return the object itself (or another builder object) instead of void. This results in a more natural and expressive syntax for configuring or building complex objects, resembling a domain-specific language.

This pattern is commonly used for configuring objects with many optional parameters, building objects step-by-step, and creating a more user-friendly API where a sequence of operations can be expressed in a clear and concise manner. It enhances code readability by removing boilerplate and improving the flow of configuration.

## Usage

The Fluent Interface pattern is frequently used in:

*   **Builder patterns:** Simplifying the construction of complex objects with numerous parameters.
*   **Configuration APIs:**  Providing a smooth and readable way to configure an object or system. E.g., database connection settings, UI element properties.
*   **Domain-Specific Languages (DSLs):**  Creating a more intuitive and expressive interface for interacting with a specific domain.
*   **Testing frameworks:** Enabling a more natural and readable syntax for defining test assertions.
*   **Query Builders:** Constructing database queries using a chainable method approach.

## Examples

1.  **Guava’s `FluentTime` (Java):** Guava’s `FluentTime` class offers a fluent interface for manipulating time units. You can chain method calls like `plusHours().plusMinutes().toString()` to elegantly express time adjustments.  This hides the complexity of `DateTime` manipulations behind a readable API.

2.  **jQuery (JavaScript):** jQuery is a classic example of a fluent interface.  You can chain method calls like `$("#myElement").hide().fadeIn().addClass("highlight")` to perform a series of operations on a DOM element in a single, readable statement.  Each method returns the jQuery object, allowing for the chainability.

3. **Laravel Query Builder (PHP):** Laravel’s Eloquent ORM provides a fluent query builder. You can chain methods like `where()`, `orderBy()`, `limit()`, and `get()` to construct complex database queries in a human-readable way. For example: `$users = DB::table('users')->where('status', 1)->orderBy('created_at', 'desc')->get();`