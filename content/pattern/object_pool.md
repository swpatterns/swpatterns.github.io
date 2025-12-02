---
title: "Object Pool"
date: 2024-02-29T17:23:45-00:00
draft: false
pattern_types: ["creational", "performance"]
wikipedia: "https://en.wikipedia.org/wiki/Object_pool_pattern"
diagramtype: "class"
diagram: "[Pool] -- creates --> [PooledObject] : reuse\n[Client] -- requests --> [Pool] : borrowObject()\n[Client] -- returns --> [Pool] : releaseObject()\n[Pool] ..> [Factory] : creates objects"
code: true
---

The Object Pool pattern is a creational design pattern that aims to improve performance by reusing objects that are expensive to create. Instead of creating a new object each time one is needed, the pool maintains a collection of pre-initialized objects. When an object is required, it's borrowed from the pool; when it's no longer needed, it's returned to the pool for later use, rather than being destroyed. This reduces the overhead of frequent object creation and destruction, especially valuable when dealing with resource-intensive objects.

This pattern is particularly useful when object instantiation is slow or limited by external resources (e.g., database connections, network sockets, threads).  It can significantly reduce latency and improve system throughput in scenarios involving high object churn, and helps manage resource constraints effectively. By limiting the overall number of objects created, it also contributes to better resource utilization and stability.

## Usage

The Object Pool pattern is widely used in systems requiring efficient management of costly resources:

*   **Database Connection Pooling:** Most database libraries and application servers utilize object pools to manage database connections. Establishing a database connection is a slow operation, so pooling these connections significantly improves performance.
*   **Thread Pooling:**  Similar to database connections, creating and destroying threads is expensive. Thread pools are essential components of concurrent programming, reusing threads to handle multiple tasks efficiently.
*   **Graphics and Game Development:**  Creating and disposing of graphical objects (textures, models, etc.) can be time-consuming. Object pools are used to reuse these objects, reducing lag and improving frame rates.
*   **Network Socket Management:**  Managing a large number of network sockets can be resource-intensive. Pooling sockets allows for efficient reuse and reduces the overhead of connection establishment and teardown.

## Examples

1.  **Apache Commons Pool (Java):** This library provides a generic object pooling framework for Java applications. It allows developers to easily create pools for various types of objects, including database connections, threads, and custom objects. Configuration options allow for controlling pool size, eviction policies, and validation logic.  https://commons.apache.org/proper/commons-pool/

2.  **HikariCP (Java):** Specifically designed for database connection pooling, HikariCP is a high-performance JDBC connection pool.  It emphasizes speed and minimizes overhead, making it a popular choice for modern Java applications. It offers advanced features like connection validation, timeout handling, and monitoring.  https://github.com/brettwooldridge/HikariCP

3.  **Unity Engine (C#):** Unity uses object pooling extensively in game development for reusable game objects like bullets, enemies, and particle effects. The `Object.Instantiate()` and `Object.Destroy()` methods can be slow within a game loop; using a pool avoids this performance bottleneck.  Unity provides built-in tools and community-created asset store packages to facilitate object pooling. https://docs.unity3d.com/Manual/ObjectPooling.html