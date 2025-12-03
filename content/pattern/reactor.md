---
title: Reactor
date: 2024-02-29T16:27:28-00:00
draft: false
pattern_types: ["behavioral", "concurrency"]
wikipedia: https://en.wikipedia.org/wiki/Reactor_pattern
diagramtype: "class"
diagram: "classDef default fill:#f9f,stroke:#333,stroke-width:2px
    classDef async fill:#ccf,stroke:#333,stroke-width:2px

    [EventLoop] -- handles --> [Handler]
    [EventLoop] -- registers --> [EventSource]
    [EventLoop] -- demultiplexes --> [Handler]
    [EventSource] -- emits --> [Event]
    [Handler] -- processes --> [Event]
    [Event] -- contains --> [Data]

    [EventLoop] <[note: Single-threaded core {bg:lightgreen}]>
    [Handler] <[note: Receives events & performs actions {bg:lightyellow}]>
    [EventSource] <[note: External systems triggering events {bg:lightblue}]>
    "
code: true
---

The Reactor pattern decouples event handling from the actual event sources. An event loop (“reactor”) monitors multiple event sources (like network sockets, timers, or user input) and dispatches events to associated handler functions when they occur. This allows for concurrent handling of multiple events within a single thread, improving efficiency and simplifying code complexity.

Essentially, the Reactor pattern provides a synchronous event demultiplexer. Instead of blocking and waiting for an event, the event loop continuously monitors available event sources. When an event is detected, the corresponding handler is invoked to process the event. This non-blocking approach is crucial for building scalable and responsive systems.

## Usage

The Reactor pattern is primarily used in systems requiring high concurrency and responsiveness, especially those dealing with I/O operations. Common use cases include:

*   **Network Servers:** Handling multiple client connections simultaneously without blocking.  Technologies like Node.js, Netty, and Twisted heavily leverage this pattern.
*   **GUI Applications:**  Managing user interface events (mouse clicks, keyboard presses) in a single-threaded environment, ensuring responsiveness.
*   **Asynchronous I/O:** Abstracting away the complexities of asynchronous I/O operations, providing a simplified event-driven model.
*   **Real-time Systems:** Processing data streams from various sources in a timely manner.

## Examples

1.  **Node.js Event Loop:** Node.js is built around a single-threaded event loop that utilizes the Reactor pattern. File I/O, network requests, and timers are all handled through this loop. When an asynchronous operation completes, a callback function (the handler) is added to the event queue and eventually processed by the event loop.  This enables Node.js to handle a large number of concurrent connections with minimal overhead.

2.  **Netty (Java Network Framework):** Netty is a popular Java framework for building high-performance network applications. It implements the Reactor pattern using non-blocking I/O (NIO). Netty's `EventLoop` is the core reactor component, responsible for monitoring network events and dispatching them to associated `ChannelHandler` instances. This allows Netty-based servers to handle thousands of concurrent connections efficiently.

3. **Twisted (Python Event-Driven Networking Engine):** Twisted uses the reactor pattern to handle asynchronous events and network communication. It provides an event loop that monitors file descriptors for readability, writability, and exceptional conditions, and dispatches events to registered callbacks when events occur, enabling building network services, servers, and clients in a non-blocking way.