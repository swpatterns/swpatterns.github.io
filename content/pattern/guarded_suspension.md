
---
title: Guarded Suspension
date: 2024-02-29T16:32:00Z
draft: false
pattern_types: ["behavioral", "concurrency"]
wikipedia: ""
diagramtype: "sequence"
diagram: sequenceDiagram
    participant Client
    participant Resource
    participant Guard
    participant Worker
    Client->>Guard: Request Resource
    Guard->>Resource: Check Availability
    alt Resource Available
        Resource-->>Guard: Available
        Guard->>Worker: Assign Task (Resource)
        Worker->>Resource: Process
        Resource-->>Worker: Processed
        Worker-->>Guard: Task Complete
        Guard-->>Client: Resource Ready
    else Resource Unavailable
        Guard-->>Client: Resource Unavailable
    end
code: true
---

The Guarded Suspension pattern addresses the problem of a thread needing to wait for a resource that isn't immediately available. Instead of busy-waiting (repeatedly checking for availability), the requesting thread suspends itself, and a separate "guard" thread monitors the resource. When the resource becomes available, the guard thread resumes the waiting thread. This pattern efficiently manages resource contention and reduces CPU usage compared to polling.

This pattern is particularly useful in scenarios involving caching, database connections, or any situation where a limited number of resources are shared among multiple threads. It allows threads to efficiently wait for a resource to become free without consuming unnecessary CPU cycles. It's a frequently used technique in concurrent systems.

## Usage

*   **Connection Pooling:** Database connection pools utilize Guarded Suspension to manage a limited pool of connections. Threads requesting a connection wait until one is available, avoiding the overhead of creating new connections frequently.
*   **Caching with Limited Capacity:** When a cache has a maximum size, new requests might need to wait for space to become available when the cache is full.  Guarded Suspension helps manage threads waiting for cache eviction.
*   **Producer-Consumer Queues:** Although often implemented with semaphores, the core idea of a consumer waiting on available items in a queue perfectly aligns with Guarded Suspension.
*   **Asynchronous Task Completion:**  A thread can suspend until an asynchronous task completes, with a guard monitoring the tasks status and waking the thread upon completion.

## Examples

1.  **Java’s `java.util.concurrent.LinkedBlockingQueue`:** This class internally uses Guarded Suspension (or similar techniques) to allow threads to block on taking or putting elements when the queue is empty or full, respectively. Threads calling `take()` will suspend until an element becomes available, and the underlying mechanics involve a guard waking them up.

2.  **.NET’s `BlockingCollection`:**  Similar to Java’s `LinkedBlockingQueue`, the .NET `BlockingCollection` provides a concurrent collection that blocks adding or removing items when it reaches its capacity limits.  The `Add()` and `Take()` methods internally use a synchronization mechanism that embodies the Guarded Suspension pattern.

3.  **Akka Actors (Scala/Java):** While Akka uses a more sophisticated actor model, the concept of an actor waiting for a message is a form of guarded suspension. The actor's mailbox is the resource, and the actor's receive loop is the waiting thread. The Akka runtime acts as the guard, delivering messages and resuming the actor when they arrive.
