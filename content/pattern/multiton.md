
---
title: Multiton
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["creational"]
wikipedia: "https://en.wikipedia.org/wiki/Multiton"
diagramtype: "class"
diagram: "[Class1]--|> [Multiton] : manages\n[Class2]--|> [Multiton] : manages\n[Multiton]--[Instance1] : creates/holds\n[Multiton]--[Instance2] : creates/holds\n[note: Limited number of instances {bg:lightgreen}]"
code: true
---

The Multiton pattern is a variation of the Singleton pattern. While a Singleton restricts the instantiation of a class to only one instance, a Multiton allows a limited number of instances. This is useful when multiple instances are needed to represent different, but related, states or configurations without allowing unlimited creation. The Multiton controls the number of instances created and manages access to them.

It differs from a simple factory in that the Multiton remembers the created instances and provides access to them, whereas a factory simply creates and returns new instances each time. This pattern ensures that only a predefined number of instances of a class exist throughout the application lifecycle, improving resource management and potentially simplifying coordination between these instances.

## Usage

The Multiton pattern is useful in scenarios where:

*   **Limited Resources:** You need to control the number of instances of a resource-intensive class to prevent performance issues or resource exhaustion.  For example, database connection pools.
*   **Configuration Management:**  You need to manage a small set of configuration objects, each representing a different environment or setting.
*   **Load Balancing:**  You want to distribute work across a fixed number of worker instances.
*   **Regional Servers:** Managing a limited number of server instances in different geographical regions.

## Examples

1.  **Database Connection Pool:** Many database libraries utilize a Multiton-like approach to manage a pool of database connections. Instead of creating a new connection for every request, the pool maintains a limited number of connections, reusing them to improve performance and reduce overhead.  Libraries like HikariCP or Apache DBCP implement this concept.

2.  **Log Managers with Multiple Log Files:** A logging framework might use a Multiton to manage a fixed number of log files. Each instance of the Multiton represents a different log file (e.g., one for errors, one for warnings, one for information). This allows for organized logging without the overhead of creating a new file handler for every log message.  Log4j2 and similar frameworks can be configured to behave in this manner.
