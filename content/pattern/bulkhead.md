
---
title: Bulkhead
date: 2024-02-29T10:30:00Z
draft: false
pattern_types: ["resilience", "behavioral"]
wikipedia: https://en.wikipedia.org/wiki/Bulkhead_(naval_architecture)
diagramtype: "sequence"
diagram: mermaid
sequenceDiagram
    participant Client
    participant Bulkhead
    participant ServiceA
    participant ServiceB
    participant ServiceC

    Client->>Bulkhead: Request
    activate Bulkhead
    Bulkhead->>ServiceA: Forward Request (if available)
    alt ServiceA is healthy
        ServiceA-->>Bulkhead: Response
    else ServiceA is failing
        Bulkhead->>ServiceB: Forward Request (fallback)
        ServiceB-->>Bulkhead: Response
    end
    Bulkhead-->>Client: Response
    deactivate Bulkhead

code: true
---

The Bulkhead pattern isolates parts of an application from each other, preventing failures in one part from cascading and bringing down the entire system.  It's inspired by the compartmentalization of a ship's hull – if one section is breached, the bulkheads prevent the flooding from spreading to the rest of the vessel. In software, this is achieved by limiting the resources (e.g., threads, connections) that a particular operation can consume.

## Usage

Bulkheads are commonly used in microservice architectures to protect against cascading failures.  If one microservice becomes slow or unavailable, a bulkhead prevents that issue from exhausting resources in other services that depend on it. They are also useful in applications that interact with external systems, such as databases or third-party APIs, where unpredictable behavior can occur.  Specifically, bulkheads are applied to:

*   **Protecting critical functionality:** Isolating core features from less important ones.
*   **Managing dependencies:** Limiting the impact of failures in dependent services.
*   **Controlling resource usage:** Preventing a single operation from monopolizing resources.
*   **Improving responsiveness:** Maintaining performance for other operations even when one is experiencing issues.

## Examples

1.  **Hystrix (Netflix):**  Hystrix is a widely known resilience library that implements the Bulkhead pattern (along with others like Circuit Breaker).  It allows developers to define thread pools or semaphore-based limits for calls to remote services. If a service call exceeds the configured limit, Hystrix will reject further requests, preventing resource exhaustion. Netflix used Hystrix extensively to manage the complexity of their microservice-based streaming platform.

2.  **Resilience4j (Java):** Resilience4j is a lightweight, fault-tolerance library that provides implementations of various resilience patterns, including Bulkhead. It offers both thread pool and semaphore-based bulkheads, allowing developers to choose the most appropriate approach for their needs.  It's used in many Java-based applications to improve stability and responsiveness.

3.  **Istio (Service Mesh):** Istio, a popular service mesh, can implement bulkhead patterns through features like connection pooling and request rate limiting. By configuring these features, operators can limit the number of concurrent connections or requests to a specific service, effectively creating a bulkhead to protect other services from overload.
