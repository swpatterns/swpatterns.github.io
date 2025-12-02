
---
title: "Future"
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["behavioral", "asynchronous"]
wikipedia: "https://en.wikipedia.org/wiki/Future_(computer_science)"
diagramtype: "class"
diagram: "[Client] --|> [Future] : requests result\n[Future] --> [RealComputation] : initiates\n[RealComputation] --x> [Result] : returns\n[Future] --> [Result] : holds"
code: true
---

The Future pattern encapsulates the result of an asynchronous computation. Instead of blocking the calling thread while waiting for the result, a Future object provides a placeholder.  The client can then query the Future for the availability of the result and retrieve it when it's ready, potentially doing other work in the meantime. This promotes responsiveness and avoids unnecessary delays.

## Usage

The Future pattern is used in scenarios involving long-running operations such as network requests, database queries, or computationally intensive tasks.  It's crucial in building concurrent and responsive applications, enabling the execution of tasks without halting the main thread of execution. Common areas include UI development (keeping the interface responsive during background processing), parallel processing (managing the results of tasks executed on different threads/processors) and distributed systems.

## Examples

1. **Java's `CompletableFuture`:** Java's `CompletableFuture` is a powerful implementation of the Future pattern. It allows for chaining operations to be performed on the result of the asynchronous computation once available, supporting methods for asynchronous composition and handling errors. It's widely used in modern Java backend services for handling I/O and CPU-bound tasks concurrently.

2. **Python's `asyncio.Future`:**  In Python's `asyncio` library, `Future` objects represent the eventual result of an asynchronous operation. Coroutines can await on these Futures, yielding control back to the event loop until the result is computed.  This is fundamental to Python's asynchronous web frameworks like FastAPI and aiohttp, allowing them to handle a large number of concurrent connections efficiently.

3. **JavaScript Promises:** While not technically called "Futures", JavaScript Promises effectively implement the same concept. A Promise represents the eventual completion (or failure) of an asynchronous operation, and allows attaching `.then()` callbacks to handle the result. Promises are native to Javascript and are used extensively in web development with frameworks like React, Angular, and Vue to manage asynchronous operations like fetching data from APIs.
