
---
title: Double-Checked Locking
date: 2024-02-29T14:35:00Z
draft: false
pattern_types: ["concurrency", "performance"]
wikipedia: "https://en.wikipedia.org/wiki/Double-checked_locking"
diagramtype: "sequence"
diagram: "[Client] ->> [SingletonHelper:getInstance()]\nactivate [SingletonHelper]\n[SingletonHelper] -->> [SingletonHelper:Check if instance is null]\n[SingletonHelper] ->> [Synchronized Block]\n[SingletonHelper] -->> [SingletonHelper:Create instance]\n[SingletonHelper] -->> [SingletonHelper:Return instance]\ndeactivate [SingletonHelper]\n[Client] <<== [Instance]"
code: true
---

Double-Checked Locking is a software design pattern used to reduce the overhead of synchronization, specifically when initializing a resource, such as a singleton instance, in a multithreaded environment. It aims to combine the benefits of lazy initialization (delaying resource creation until it's actually needed) with the thread safety provided by synchronization. The pattern involves checking for the resource's existence *before* acquiring a lock, and then checking again *inside* the lock to ensure that another thread hasn't already created it.

This pattern attempts to optimize performance by minimizing the time spent in a synchronized block. However, it’s notoriously difficult to implement correctly due to potential issues with memory visibility and thread safety, particularly in older versions of Java. Modern languages & JVMs often have optimizations that can mitigate some of these risks, but careful consideration is still needed.



## Usage

Double-Checked Locking is commonly considered for:

*   **Singleton initialization:**  Creating a single instance of a class in a multithreaded environment, avoiding unnecessary synchronization overhead.
*   **Expensive resource initialization:** Delaying the creation of costly resources (e.g., database connections, large objects) until they are first used, and protecting against multiple threads creating those resources simultaneously.
*   **Caching:**  When a cache needs to be initialized only once and accessed by multiple threads.



## Examples

*   **Java Concurrency Utilities (Historically):** While not explicitly recommended now due to complexity, early implementations of caching and singleton patterns in Java often used Double-Checked Locking.  The `java.util.concurrent` package offers better alternatives like `Volatile` with simple initialization or using an `enum` for singletons, which provide inherent thread safety.
*   **Logging Frameworks:** Some logging frameworks might use double-checked locking to ensure that the logging system is initialized only once, even if multiple threads attempt to log messages concurrently before the system has finished initializing.  For example, initializing a file handler or network socket for logging could benefit from this pattern (although modern frameworks generally employ more robust and simpler techniques).
*   **HttpClient Connection Pool:**  An HTTP client library might use double-checked locking to ensure that its connection pool is initialized only once by the first thread that attempts to make an HTTP request. This avoids multiple threads potentially creating identical connection pools, consuming unnecessary resources.
