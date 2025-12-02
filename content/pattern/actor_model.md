
---
title: Actor Model
date: 2024-02-29T10:45:00Z
draft: false
pattern_types: ["concurrency", "behavioral", "DDD"]
wikipedia: https://en.wikipedia.org/wiki/Actor_model
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    participant ActorA
    participant ActorB
    ActorA->>ActorB: Message
    activate ActorB
    ActorB->>ActorB: Process Message\n(potentially create more actors)
    ActorB-->>ActorA: Reply/State Change
    deactivate ActorB

code: true
---

The Actor Model is a concurrent computation model that treats "actors" as the fundamental units of computation. Actors encapsulate state and behavior, and communicate with each other exclusively through asynchronous message passing. This avoids the complexities of shared mutable state and locks, leading to more robust and scalable concurrent systems. Each actor has a mailbox where incoming messages are queued, and processes them sequentially.

This pattern is particularly useful in building highly concurrent, distributed, and fault-tolerant systems. It's well-suited for scenarios involving many independent, interacting components, such as real-time applications, game servers, and distributed data processing. The Actor Model simplifies reasoning about concurrency by eliminating the need for explicit thread management and synchronization primitives.

## Usage

The Actor Model is widely used in modern concurrent systems for:

*   **Building Reactive Systems:**  Handling streams of events and responding to changes in state in a non-blocking manner.
*   **Distributed Systems:**  Facilitating communication and coordination between nodes in a cluster.
*   **Game Development:**  Managing game entities and their interactions concurrently.
*   **Microservices Architecture:** Implementing individual microservices as actors, promoting isolation and scalability.
*   **Real-time Data Processing:** Processing high volumes of data streams with low latency.

## Examples

1.  **Akka (Java/Scala):** Akka is a toolkit and runtime for building highly concurrent, distributed, and resilient message-driven applications. It provides a hierarchical actor system, supervision strategies, and various extensions for building complex systems. Akka is used in production at companies like LinkedIn, Netflix, and Airbnb.

2.  **Erlang/OTP (Erlang):** Erlang was one of the earliest languages to embrace the Actor Model. The OTP (Open Telecom Platform) provides a set of libraries and design principles for building fault-tolerant, concurrent systems. Erlang is renowned for its use in telecommunications systems, such as WhatsApp, which relies on Erlang's concurrency and fault tolerance to handle millions of concurrent users.

3.  **Ray (Python):** Ray is a unified framework for scaling AI and Python applications. It uses actors as a core abstraction for stateful computations, allowing developers to easily parallelize and distribute their code. Ray is used in reinforcement learning, hyperparameter tuning, and large-scale data processing.
