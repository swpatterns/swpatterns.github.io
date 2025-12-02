
---
title: "Circuit Breaker"
date: 2023-10-27T10:00:00Z
draft: false
pattern_types: ["behavioral", "resilience"]
wikipedia: "https://en.wikipedia.org/wiki/Circuit_breaker_(software)"
diagramtype: "class"
diagram: "[CircuitBreaker] --|> [State] : holds current state\n[State] <|-- [Closed] : initial state\n[State] <|-- [Open] : failure state\n[State] <|-- [HalfOpen] : recovery state\n[Client] -- CircuitBreaker : calls protected resource\n[ProtectedResource] -- [Exception] : can throw exceptions\n[note: State transitions managed by CircuitBreaker {bg:lightgreen}]"
code: true
---

The Circuit Breaker pattern protects a system from repeated failures of a dependent service. It monitors calls to the dependency and, upon observing a certain failure rate, "opens the circuit" to prevent further requests from being sent. This allows the dependent service to recover without being overwhelmed, while also providing a fallback mechanism for the client. After a timeout period, the circuit transitions to a "half-open" state, allowing a limited number of test requests to pass through. If those requests succeed, the circuit is "closed" again; otherwise, it remains open.

## Usage

The Circuit Breaker pattern is commonly used in microservices architectures to handle failures between services. It's also valuable when integrating with third-party APIs that may be unreliable or have limited availability.  Another core usage is in distributed systems where network latency or partitions increase the chance of cascading failures.  Modern implementations are also commonly found in cloud-native applications, where services scale dynamically and the risk of transient errors is higher.

## Examples

*   **Hystrix (Netflix):** Netflix's Hystrix library was a popular implementation of the Circuit Breaker pattern for isolating dependencies in distributed systems. Though no longer actively maintained, it heavily influenced other implementations.  Hystrix allowed developers to define thread pools, failure thresholds, and fallback commands to handle service outages gracefully.

*   **Resilience4j (Java):** Resilience4j is a lightweight, fault-tolerance library designed for building resilient microservices. It provides a Circuit Breaker module along with other resilience patterns like Retry, RateLimiter, Bulkhead, and TimeLimiter, all configurable via code or configuration files.

*   **Polly (.NET):**  Polly is a .NET resilience and transient-fault-handling library. It offers a fluent API to easily define and apply various policies, including a Circuit Breaker policy, to protect against failures in remote calls.
