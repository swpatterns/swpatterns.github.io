
---
title: Balking
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "state"]
wikipedia: ""
diagramtype: "class"
diagram: "[State] --|> [NormalState]\n[State] --|> [BusyState]\n[Context] -- ContextState : has-a\n[Context] --> [State] : uses\n[NormalState] ..> [BusyState] : request()\n[note: Context represents the object that wants to perform an action, but may be unable to due to its current state {bg:lightyellow}]"
code: true
---

The Balking pattern is a behavioral pattern that allows an object to postpone the execution of a request until a specific condition is met. It essentially prevents an object from performing an action if it's already in a particular state, often a "busy" or "occupied" state. This is achieved by delegating the responsibility of handling the request to a state object, which determines whether the request can be fulfilled immediately or needs to be deferred.

This pattern is useful when an operation is resource-intensive or requires exclusive access to a resource, and you want to avoid contention or errors that might occur if multiple requests are attempted concurrently. It provides a clean way to manage state and control access to critical sections of code, ensuring that operations are performed only when the object is ready.

## Usage

The Balking pattern is commonly used in scenarios like:

*   **Asynchronous Task Queues:** Preventing multiple submissions of the same task when the queue is already processing one.
*   **Resource Management:**  Controlling access to a limited number of resources (e.g., database connections, file handles) by delaying requests until a resource becomes available.
*   **Event Handling:**  Deferring the processing of events when the system is overloaded or in a critical state.
*   **UI Interactions:** Disabling buttons or input fields while a long-running operation is in progress to prevent multiple triggers.

## Examples

1.  **Java's `java.util.concurrent.BlockingQueue`:**  Implementations like `LinkedBlockingQueue` internally use a mechanism similar to Balking. When a producer attempts to add an element to a full queue (a "busy" state), the `put()` method blocks until space becomes available, effectively "balking" the immediate addition.

2.  **Thread Pools:**  Most thread pool implementations employ a Balking-like strategy. When all threads in the pool are occupied, incoming tasks are queued. The task submission "balks" – it doesn't immediately start executing – until a thread becomes free to pick it up from the queue.  Libraries like `java.util.concurrent` provide `ExecutorService` which manages this behavior.

3.  **Asynchronous JavaScript and Promises:** While not a direct implementation, the concept of awaiting a Promise before performing an action embodies the Balking pattern.  If a resource is not yet available (the Promise is not yet resolved), the execution "balks" until the resource is ready.
