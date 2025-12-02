---
title: Proactor
date: 2024-02-29T15:30:00-00:00
draft: false
pattern_types: ["behavioral", "concurrency"]
wikipedia: https://en.wikipedia.org/wiki/Proactor
diagramtype: "class"
diagram: "[Proactor] -- 'handles async events' --> [EventHandler]
[Proactor] -- 'registers' --> [AsyncOperation]
[AsyncOperation] -- 'completes with' --> [Key]
[EventHandler] -- 'receives' --> [Key]
[Key] [note: Represents the completed operation]
"
code: true
---

The Proactor pattern is a concurrent design pattern that tackles the challenges of handling numerous asynchronous operations. It decouples the initiation of an asynchronous operation from its completion, allowing a single thread (the proactor) to manage multiple operations without blocking. When an operation completes, the proactor notifies the associated event handler via a completion key, which is then processed.

This pattern is particularly useful in building scalable I/O-bound applications, like network servers or GUI applications. It avoids the overhead of creating and managing a large number of threads, improving performance and resource utilization. The Proactor manages the asynchronous operations and routes completion events to appropriate handlers, thereby simplifying concurrent programming.

## Usage

The Proactor pattern finds common use in:

*   **High-performance network servers:** Handling numerous client connections concurrently without thread-per-connection models, improving scalability and efficiency.  Examples include servers written in .NET's `SocketAsyncEventArgs` framework or Node.js's event loop.
*   **GUI event handling:**  Managing user interface events asynchronously. The proactor (often part of the GUI framework) dispatches events to appropriate handlers without blocking the UI thread, ensuring responsiveness.
*   **Asynchronous I/O in operating systems:** Modern operating systems like Windows (using I/O Completion Ports) implement Proactor-like mechanisms to manage I/O operations efficiently.
*   **Game engines:** Handling events from various sources like input, networking, and physics in a non-blocking manner.

## Examples

**1. .NET's `SocketAsyncEventArgs`:**

.NET provides the `SocketAsyncEventArgs` class and its related mechanisms (like I/O Completion Ports) which fundamentally implement the Proactor pattern. Developers register `SocketAsyncEventArgs` objects with a socket.  I/O operations are initiated asynchronously, and when completed, the operating system signals the socket, which then invokes the `Completed` event on the registered `SocketAsyncEventArgs`. This avoids thread blocking by using the operating system's I/O completion mechanism.

**2. Node.js Event Loop:**

Node.js extensively utilizes the Proactor pattern through its event loop.  Asynchronous operations like file I/O, network requests, and timers are registered with the event loop.  When these operations complete, the event loop queues a callback function to be executed. The single-threaded event loop efficiently handles numerous concurrent operations without resorting to blocking calls or excessive threading.