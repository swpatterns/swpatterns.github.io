
---
title: Monitor Object
date: 2024-02-29T16:32:53-00:00
draft: false
pattern_types: ["concurrency", "behavioral"]
wikipedia: https://en.wikipedia.org/wiki/Monitor_pattern
diagramtype: "class"
diagram: "[Monitor] --|> [Object]\n[Thread1] --> [Monitor] : access()\n[Thread2] --> [Monitor] : access()\n[Monitor] : condition1\n[Monitor] : condition2"
code: true
---

The Monitor Object pattern provides a mechanism to control access to a shared resource in a concurrent environment. It encapsulates the shared resource and its associated access methods, ensuring that only one thread can operate on the resource at any given time.  This is achieved through the use of internal locking and condition variables, which allow threads to wait for specific conditions to become true before proceeding.

## Usage

The Monitor Object pattern is commonly used in scenarios involving:

*   **Shared Resource Management:** Protecting critical sections of code that access and modify shared data, preventing race conditions and data corruption.
*   **Producer-Consumer Problems:** Coordinating the actions of producer threads that generate data and consumer threads that process it, ensuring that consumers don't attempt to consume data before it's produced, and producers don't overflow a limited buffer.
*   **Concurrent Collections:** Implementing thread-safe collections like queues or stacks where multiple threads need to add or remove elements without interference.
*   **Database Connection Pooling:** Managing a limited pool of database connections, allowing multiple threads to request connections while preventing exceeding the pool's capacity.

## Examples

1.  **Java `synchronized` keyword and `wait`/`notify`:** Java's built-in `synchronized` keyword effectively creates a monitor object around a block of code or a method. Threads must acquire the lock associated with the object before entering the synchronized block.  The `wait()`, `notify()`, and `notifyAll()` methods allow threads to pause execution and wait for specific conditions to be signaled by other threads holding the lock. This is a direct implementation of the Monitor Object pattern.

2.  **Python `threading.Lock` and `threading.Condition`:** Python's `threading` module provides `Lock` objects for mutual exclusion (similar to Java's `synchronized`) and `Condition` objects for managing thread waiting and signaling.  A `Condition` object is always associated with a `Lock`, and threads can `wait()` on the condition, releasing the lock temporarily. Other threads can then `notify()` or `notifyAll()` to wake up waiting threads when a specific condition becomes true. This combination implements the Monitor Object pattern.
