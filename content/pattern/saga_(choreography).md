
---
title: Saga (Choreography)
date: 2023-10-27T10:00:00Z
draft: false
pattern_types: ["behavioral", "distributed systems", "DDD"]
wikipedia: "https://en.wikipedia.org/wiki/Saga_pattern"
diagramtype: "sequence"
diagram: "sequenceDiagram\n  participant Client\n  participant ServiceA\n  participant ServiceB\n  participant ServiceC\n  Client->>ServiceA: Initiate Saga (e.g., Create Order)\n  activate ServiceA\n  ServiceA->>ServiceB: Request Action (e.g., Reserve Inventory)\n  activate ServiceB\n  ServiceB-->>ServiceA: Action Completed/Failed\n  deactivate ServiceB\n  alt Action Completed\n  ServiceA->>ServiceC: Request Action (e.g., Authorize Payment)\n  activate ServiceC\n  ServiceC-->>ServiceA: Action Completed/Failed\n  deactivate ServiceC\n  alt Action Completed\n  ServiceA-->>Client: Saga Completed\n  deactivate ServiceA\n  else Action Failed\n  ServiceA->>ServiceB: Compensating Action (e.g., Release Inventory)\n  activate ServiceB\n  ServiceB-->>ServiceA: Compensation Completed\n  deactivate ServiceB\n  ServiceA-->>Client: Saga Failed (Compensated)\n  deactivate ServiceA\n  end\n  else Action Failed\n  ServiceA->>ServiceA: Compensating Action (e.g., Cancel Order)\n  ServiceA-->>Client: Saga Failed (Compensated)\n  deactivate ServiceA\n  end"
code: true
---

The Saga pattern is a distributed transaction management pattern for coordinating a sequence of local transactions across multiple microservices. Unlike traditional distributed transactions (like two-phase commit), Sagas don't rely on centralized locking or coordination. Instead, each local transaction updates data within a single service, and the Saga coordinates the overall process by defining a series of steps where each step publishes events that trigger the next. If a step fails, the Saga executes a series of compensating transactions to undo the changes made by the preceding steps, ensuring eventual consistency.

Saga choreography moves the coordination logic *into* each service.  Each service listens for events from other services and decides when to execute its local transaction.  This avoids a central orchestrator but can make the overall flow harder to understand and debug, as the logic is spread across multiple services.  It's best suited for simpler, well-defined workflows where dependencies aren't heavily interwoven.

## Usage

The Saga pattern is commonly used in microservices architectures to manage long-lived transactions that span multiple services, particularly in scenarios where traditional ACID transactions are not feasible or desirable.  Key use cases include:

*   **E-commerce Order Management:** Creating an order involves inventory reservation, payment authorization, and shipping scheduling. Each of these can be a separate service, and a Saga ensures that if any step fails, the entire order is rolled back consistently.
*   **Travel Booking:** Booking a flight, hotel, and rental car often involves interacting with different external services.  A Saga can orchestrate thesebookings, ensuring that if one booking fails, the others are cancelled.
*   **Financial Transactions:** Splitting payments across multiple accounts or services (e.g., a bank transfer involving a fraud check).
*   **Complex Data Pipelines:** Coordinating updates across various data stores or processing stages.

## Examples

*   **Axon Framework (Java):** Axon Framework provides built-in support for Sagas, allowing developers to define Saga logic using annotations or configuration.  Axon supports both orchestration and choreography-based Sagas. The framework handles event dispatching and compensating transaction execution, simplifying the implementation of distributed transactions.
    [axon-framework.org](https://axonframework.io/)

*   **Netflix Dastur (Java/Python):**  Although Dastur is a more general-purpose workflow automation tool, it effectively implements the Saga pattern by allowing the creation of composable, event-driven workflows.  Netflix used Dastur extensively to manage complex operational tasks and dependencies between various internal services, effectively handling failures and ensuring eventual consistency.
    [github.com/Netflix/Dastur](https://github.com/Netflix/Dastur)

*   **Eventualize (Go):** Eventualize is a lightweight Go library that provides tools for building event-driven applications, including support for the Saga pattern.  It allows developers to define Sagas as a series of event handlers and compensators, simplifying the development and management of distributed transactions, particularly in Kubernetes environments.
    [github.com/Bit-Monk/Eventualize](https://github.com/Bit-Monk/Eventualize)
