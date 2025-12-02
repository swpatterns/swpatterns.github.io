
---
title: Producer-Consumer
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["concurrency", "behavioral"]
wikipedia: "https://en.wikipedia.org/wiki/Producer%E2%80%93consumer_problem"
diagramtype: "sequence"
diagram: "sequenceDiagram\n  participant Producer\n  participant Queue\n  participant Consumer\n  Producer->>Queue: Produce item\n  Queue->>Consumer: Deliver item\n  Consumer->>Consumer: Consume item"
code: true
---

The Producer-Consumer pattern decouples the production of data from its consumption, enabling concurrent processing.  A 'producer' creates data and places it into a shared buffer (typically a queue), while one or more 'consumers' retrieve and process that data. This separation allows producers and consumers to operate at different paces, enhancing system responsiveness and efficiency.

## Usage

The Producer-Consumer pattern is widely used in scenarios involving asynchronous task processing, data pipelines, and resource management. Common implementations involve multithreading or message queues. Examples include handling incoming network requests (producers) and processing them in a worker thread pool (consumers). It's also present in logging systems where producers write log messages and consumers write to disk.  Another frequent application is in game development, where producers generate game events, and consumers handle game logic updates.

## Examples

1. **Java's `ExecutorService` with `BlockingQueue`:** Java’s concurrency utilities heavily utilize the Producer-Consumer pattern. `ExecutorService` can manage a pool of consumer threads, and producers submit tasks to a `BlockingQueue`. The `BlockingQueue` handles synchronization, ensuring that producers don’t add items to a full queue and consumers don’t try to retrieve items from an empty queue.  This is a core mechanism in building scalable and responsive Java applications.

2. **RabbitMQ (Message Broker):**  RabbitMQ is a popular message broker that inherently embodies the Producer-Consumer pattern.  Different applications or services act as producers, publishing messages to exchanges. Consumers subscribe to these exchanges and receive messages from queues. This decoupling allows services to communicate asynchronously without direct dependencies, improving resilience and scalability.

3. **Python's `queue` module and `multiprocessing`:** Python offers a `queue` module for thread-safe queues and the `multiprocessing` module to spawn processes. Developers can use these to create producer processes that add data to the queue and consumer processes that retrieve and act on the data. This is useful for parallelizing CPU-bound tasks.
